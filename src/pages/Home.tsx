import { toast } from "react-toastify";
import { useAppContext } from "../context/appContext";
import { getStats } from "../services/statsService";
import { useEffect, useState } from "react";
import Charts from "../components/Charts";
import LoadingSpinner from "../components/LoadingSpinner";

const sessionMessage = "Sessão expirada, faça login novamente para continuar.";

interface IStatsResponse {
  adocoesMensais: [{
    date: string;
    count: number;
  }];
  animaisAdotados: number;
  animaisDisponiveis: number;
  animaisIndisponiveis: number;
  animaisEmTratamento: number;
  animaisCachorro: number;
  animaisGato: number;
  animaisOutros: number;
  totalAnimais: number;
}

export default function Home() {
  const { logoutContext, voluntarioNome } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<IStatsResponse>();
  const getStatsF = async () => {
    setLoading(true);
    const response = await getStats();

    if (response.status === 200) {
      setStats(response.data);
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      setError(response.data.mensagem);
      toast.error(`Erro ao carregar estatísticas: ${response.data.mensagem}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    getStatsF();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center pb-8 w-full max-h-[80px]">
        <h1 className="sm:text-5xl text-3xl font-medium text-slate-700">
          {import.meta.env.VITE_ONG_NAME}
        </h1>
      </div>
      <p className="text-xl text-slate-700 mb-8">Bem-vindo de volta, {voluntarioNome}.</p>

      {loading && <LoadingSpinner />}
      {error && <p className="text-xl text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 text-slate-700">
        
        <div className="bg-white rounded-lg shadow-lg py-4 text-center">
          <h2 className="text-xl font-medium">Adotados</h2>
          <p>{stats?.animaisAdotados}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg py-4 text-center">
          <h2 className="text-xl font-medium">Disponíveis</h2>
          <p>{stats?.animaisDisponiveis}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg py-4 text-center">
          <h2 className="text-xl font-medium">Não Disponíveis</h2>
          <p>{stats?.animaisIndisponiveis}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg py-4 text-center">
          <h2 className="text-xl font-medium">Em Tratamento</h2>
          <p>{stats?.animaisEmTratamento}</p>
        </div>
           
      </div>

      <hr className="h-2 bg-teal-500 my-6 rounded-lg" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 text-slate-700 mb-8">

        <div className="bg-white rounded-lg shadow-lg py-4 text-center">
          <h2 className="text-xl font-medium">Cachorros</h2>
          <p>{stats?.animaisCachorro}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg py-4 text-center">
          <h2 className="text-xl font-medium">Gatos</h2>
          <p>{stats?.animaisGato}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg py-4 text-center">
          <h2 className="text-xl font-medium">Outros</h2>
          <p>{stats?.animaisOutros}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg py-4 text-center">
          <h2 className="text-xl font-medium">Total</h2>
          <p>{stats?.totalAnimais}</p>
        </div>

      </div>

      {stats?.adocoesMensais && stats.adocoesMensais.length > 0 && <Charts data={stats.adocoesMensais} />}
    </>
  )
}