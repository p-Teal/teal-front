import { Plus } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import { getAnimais } from "../services/animalService";
import { toast } from "react-toastify";
import CardAnimal from "../components/CardAnimal";
import Modal from "../components/Modal";

export interface IAnimal {
  animalId: string;
  apelido: string;
  status: string;
  sexo: string;
  raca: string;
  tipo: string;
  urlFoto: string;
  dataEntrada?: string;
  dataNascimento?: string;
  castrado?: boolean;
  _id: string;
  descricao?: string;
  createdAt: string;
}

interface IAnimalResponse {
  animais: IAnimal[];
  totalAnimais: number;
}

const sessionMessage = "Sessão expirada, faça login novamente para continuar.";

export default function Animais() {
  const { logoutContext } = useAppContext();
  const [animais, setAnimais] = useState<IAnimalResponse>({
    animais: [],
    totalAnimais: -1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [animalInfo, setAnimalInfo] = useState<IAnimal | null>(null);

  const openCardInfo = (animalParam: IAnimal) => {
    setAnimalInfo(animalParam);
    console.log(animalParam);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setAnimalInfo(null);
  };

  const getAnimaisData = async () => {
    setLoading(true);
    const response = await getAnimais();

    if (response.status === 200) {
      setAnimais(response.data);
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      setError(response.data.mensagem);
      toast.error(`Erro ao carregar voluntários: ${response.data.mensagem}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    getAnimaisData();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center pb-8 w-full max-h-[80px]">
        <h1 className="sm:text-5xl text-3xl font-medium text-slate-700">
          Animais
        </h1>
        <NavLink
          to="/animais/novo"
          className="bg-teal-500 text-2xl text-white rounded-lg py-3 sm:mr-5 flex flex-row items-center justify-evenly w-64 hover:bg-teal-600 hover:shadow-md"
        >
          <Plus size={32} />
          Cadastrar
        </NavLink>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-xl text-red-600">{error}</p>}
      {animais.totalAnimais === 0 && (
        <p className="text-xl text-slate-700">Nenhum animal cadastrado.</p>
      )}

      {animais.totalAnimais > 0 && (
        <>
          <p className="text-xl text-slate-700">
            Total de animais cadastrados: {animais.totalAnimais}
          </p>

          <div className="grid grid-flow-row gap-5 text-slate-200 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {animais.animais.map((animal) => (
              <CardAnimal
                animal={animal}
                key={animal.animalId}
                clickCard={() => openCardInfo(animal)}
              />
            ))}
          </div>
        </>
      )}
      <Modal isOpen={modalOpen} onClose={handleModalClose} title={`Detalhes`}>
        <pre className="overflow-y-auto">
          {animalInfo && JSON.stringify(animalInfo, null, 2)}
        </pre>
      </Modal>
    </>
  );
}
