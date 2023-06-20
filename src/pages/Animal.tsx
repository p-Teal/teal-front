import { ArrowLeft } from "@phosphor-icons/react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { deleteAnimal, getAnimal } from "../services/animalService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import EdicaoAnimal from "../components/EdicaoAnimal";
import EditarFotoAnimal from "../components/EditarFotoAnimal";
import { Registros } from "../components/Registros";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteObject, listAll, ref } from "firebase/storage";
import { storage } from "../utils/firebase";

interface TabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Tab = ({ active, onClick, children }: TabProps) => {
  const activeClasses = active ? "border-b-2 border-teal-500" : "";

  return (
    <button
      className={`px-4 py-2 font-medium text-slate-700 hover:bg-teal-500 focus:outline-none ${activeClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const sessionMessage = "Sessão expirada, faça login novamente para continuar.";

export default function Animal() {
  const { logoutContext, admin } = useAppContext();
  const param = useParams<{ id: string }>();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [animalData, setAnimalData] = useState();
  const [urlFoto, setUrlFoto] = useState("");

  const [activeTab, setActiveTab] = useState(0);

  const getAnimalData = async () => {
    setLoading(true);
    if (param.id) {
      const response = await getAnimal(param.id);
      setLoading(false);
      if (response.status === 200) {
        const { dataNascimento, dataEntrada } = response.data.animal;
        if (dataNascimento) {
          response.data.animal.dataNascimento = dataNascimento
            .split("/")
            .reverse()
            .join("-");
        }
        if (dataEntrada) {
          response.data.animal.dataEntrada = dataEntrada
            .split("/")
            .reverse()
            .join("-");
        }
        setAnimalData(response.data.animal);
        setUrlFoto(response.data.animal.urlFoto);
      } else if (response.status === 401) {
        toast.error(sessionMessage);
        return logoutContext();
      } else {
        toast.error(`Erro ao carregar animal: ${response.data.mensagem}`);
        return nav("/animais");
      }
    } else {
      nav("/animais");
    }
  };

  useEffect(() => {
    getAnimalData();
  }, []);


  const deleteFirebaseObjects = async () => {
    if (param.id) {
      const imageRef = ref(storage, `Animais/${param.id}`);
      await deleteObject(imageRef);

      const folderRef = ref(storage, `Outros/${param.id}`);
      const folder = await listAll(folderRef);

      const deletePromises = folder.items.map((item) => deleteObject(item));

      await Promise.all(deletePromises);

      // await deleteObject(folderRef);
    } else {
      nav("/animais");
    }
  }


  const handleDeleteAnimal = async () => {
    if (param.id) {
      const response = await deleteAnimal(param.id);
      if (response.status === 204) {
        await deleteFirebaseObjects();
        toast.success("Animal e todos os registros associados apagados com sucesso!");
        nav("/animais");
      } else if (response.status === 401) {
        toast.error(sessionMessage);
        return logoutContext();
      } else {
        toast.error(`Erro ao apagar animal: ${response.data.mensagem}`);
      }
    } else {
      nav("/animais");
    }
  }

  const tabs = [
    {
      label: "Editar Foto",
      content: <EditarFotoAnimal urlFoto={urlFoto} setUrl={setUrlFoto} />,
    },
    {
      label: "Editar Dados",
      content: <EdicaoAnimal animalData={animalData} animalId={param.id} />,
    },
    {
      label: "Registros",
      content: <Registros animalId={param.id} />,
    },
  ];

  if (admin) {
    tabs.push({
      label: "Apagar Animal",
      content: <div>
        <h1 className="text-2xl font-medium text-slate-700 pb-8">
          Apagar Animal
        </h1>
        <p className="text-slate-700 pb-8">
          Tem certeza que deseja apagar o animal? Apagar o animal irá apagar todos os registros relacionados a ele e também as adoções.
        </p>
        <button
          className="px-4 py-2 font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none rounded-sm"
          onClick={() => {
            handleDeleteAnimal();
          }}
        >
          Apagar
        </button>
      </div>
    })
  }

  return (
    <>
      <h1 className="sm:text-5xl text-2xl font-medium text-slate-700 pb-8">
        Editar Animal
      </h1>
      <NavLink
        to="/animais"
        className="text-teal-500 hover:underline font-medium hover:text-slate-700"
      >
        <ArrowLeft size={18} className="inline-block mr-2" />
        Voltar
      </NavLink>

      <div className="flex my-8 gap-2 w-fit">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </Tab>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div key={index} className={`${activeTab !== index ? "hidden" : ""}`}>
          {loading ? <LoadingSpinner /> : tab.content}
        </div>
      ))}
    </>
  );
}
