import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { getTutores } from "../services/tutorService";
import { toast } from "react-toastify";
import { Plus } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import CardTutor from "../components/CardTutor";
import LoadingSpinner from "../components/LoadingSpinner";

export interface ITutor {
  _id: string;
  nome: string;
  email?: string;
  telefone: string;
  cpf: string;
  status: string;
  profissao: string;
  endereco: string;
  cidade: string;
  estado: string;
  tipoMoradia: string;
  tamanhoFamilia: number;
  numCriancas: number;
  numAnimais: number;
  createdAt: string;
}

interface ITutorResponse {
  tutores: ITutor[];
  totalTutores: number;
}

const sessionMessage = "Sessão expirada, faça login novamente para continuar.";

export default function Tutores() {
  const { logoutContext } = useAppContext();
  const [tutores, setTutores] = useState<ITutorResponse>({
    tutores: [],
    totalTutores: -1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getTutoresData = async () => {
    setLoading(true);
    const response = await getTutores();

    if (response.status === 200) {
      setTutores(response.data);
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      setError(response.data.mensagem);
      toast.error(`Erro ao carregar tutores: ${response.data.mensagem}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTutoresData();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center pb-8 w-full max-h-[80px]">
        <h1 className="sm:text-5xl text-3xl font-medium text-slate-700">
          Tutores
        </h1>
        <NavLink
          to="/tutores/novo"
          className="bg-teal-500 text-2xl text-white rounded-lg py-3 flex flex-row items-center justify-evenly w-64 hover:bg-teal-600 hover:shadow-md"
        >
          <Plus size={32} />
          Cadastrar
        </NavLink>
      </div>

      {loading && <LoadingSpinner />}
      {error && <p className="text-xl text-red-600">{error}</p>}
      {tutores.totalTutores === 0 && (
        <p className="text-xl text-slate-700">Nenhum tutor cadastrado.</p>
      )}

      {tutores.totalTutores > 0 && (
        <>
          <p className="text-xl text-slate-700 mb-8">
            Total de tutores cadastrados: {tutores.totalTutores}
          </p>

          <div className="grid grid-flow-row gap-6 sm:grid-cols-1 xl:grid-cols-2">
            {tutores.tutores.map((tutor) => (
              <CardTutor tutor={tutor} key={tutor._id} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
