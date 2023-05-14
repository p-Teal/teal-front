import { useEffect, useState } from "react";
import { deleteRegistro, getRegistros } from "../services/registroService";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";
import ChipRegistro from "./ChipRegistro";
import ModalRegistro from "./ModalRegistro";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../utils/firebase";

interface Props {
  animalId: string | undefined;
}

export interface IRegistro {
  _id: string;
  titulo: string;
  tipo: string;
  data: string;
  observacao: string;
  registroId: string;
  animalId: string;
  anexo?: string;
}

interface IRegistroResponse {
  registros: IRegistro[];
  totalRegistros: number;
}

const sessionMessage = "Sessão expirada, faça login novamente para continuar.";

export function Registros({ animalId }: Props) {
  const { logoutContext } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [registros, setRegistros] = useState<IRegistroResponse>({
    registros: [],
    totalRegistros: 0,
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const getRegistrosByAnimalId = async () => {
    setLoading(true);
    const response = await getRegistros(animalId as string);
    if (response.status === 200) {
      setRegistros(response.data);
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      setError(response.data.mensagem);
      toast.error(`Erro ao carregar voluntários: ${response.data.mensagem}`);
    }
    setLoading(false);
  };

  const deleteRegistroHandler = async (
    id: string,
    registroId: string,
    animalId: string,
    anexo?: string
  ) => {
    const response = await deleteRegistro(id);

    if (response.status === 204) {
      if (anexo) {
        const imageRef = ref(storage, `Outros/${animalId}/${registroId}`);
        await deleteObject(imageRef);
      }
      toast.success("Registro deletado com sucesso!");
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      toast.error(`Erro ao deletar registro: ${response.data.mensagem}`);
    }
    getRegistrosByAnimalId();
  };

  useEffect(() => {
    getRegistrosByAnimalId();
  }, []);

  return (
    <>
      <div className="flex flex-row pt-2 pb-8 gap-5">
        <h2 className="text-2xl font-medium text-slate-700">Registros</h2>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-xl text-red-600">{error}</p>}
      {registros.totalRegistros === 0 ? (
        <p className="text-xl text-slate-700">
          Nenhum registro cadastrado para esse animal.
        </p>
      ) : (
        <p className="text-xl text-slate-700">
          Total de registros cadastrados: {registros.totalRegistros}
        </p>
      )}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded my-8"
      >
        Adicionar Registro
      </button>

      {registros.totalRegistros > 0 && (
        <>
          <div className="grid grid-flow-row gap-8 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            {registros.registros.map((registro) => (
              <ChipRegistro
                key={registro._id}
                registro={registro}
                deleteRegistroFunction={deleteRegistroHandler}
              />
            ))}
          </div>
        </>
      )}

      <ModalRegistro
        isOpen={isOpen}
        onClose={closeModal}
        fetchData={getRegistrosByAnimalId}
        animalId={animalId}
      />
    </>
  );
}
