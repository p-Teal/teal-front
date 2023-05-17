import { ArrowLeft } from "@phosphor-icons/react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getTutor } from "../services/tutorService";

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

export default function Tutor() {
  const { logoutContext } = useAppContext();
  const param = useParams<{ id: string }>();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tutorData, setTutorData] = useState();
  // const [urlFoto, setUrlFoto] = useState("");

  const [activeTab, setActiveTab] = useState(0);

  const getTutorData = async () => {
    setLoading(true);
    if (param.id) {
      const response = await getTutor(param.id);
      setLoading(false);
      if (response.status === 200) {
        const { dataNascimento } = response.data.tutor;
        if (dataNascimento) {
          response.data.tutor.dataNascimento = dataNascimento
            .split("/")
            .reverse()
            .join("-");
        }
        setTutorData(response.data.tutor);
        // setUrlFoto(response.data.animal.urlFoto);
      } else if (response.status === 401) {
        toast.error(sessionMessage);
        return logoutContext();
      } else {
        toast.error(`Erro ao buscar tutor: ${response.data.mensagem}`);
        return nav("/tutores");
      }
    } else {
      nav("/tutores");
    }
  };

  useEffect(() => {
    getTutorData();
  }, []);

  const tabs = [
    {
      label: "Editar Foto",
      // content: <EditarFotoAnimal urlFoto={urlFoto} setUrl={setUrlFoto} />,
    },
    {
      label: "Editar Dados",
      // content: <EdicaoAnimal animalData={animalData} animalId={param.id} />,
    },
  ];

  return (
    <>
      <h1 className="sm:text-5xl text-2xl font-medium text-slate-700 pb-8">
        Editar Tutor
      </h1>
      <NavLink
        to="/tutores"
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
      {/* {tabs.map((tab, index) => (
        <div key={index} className={`${activeTab !== index ? "hidden" : ""}`}>
          {loading ? <h1>Carregando...</h1> : tab.content}
        </div>
      ))} */}
    </>
  );
}
