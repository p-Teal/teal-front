import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import { Plus, ReceiptX, TrashSimple } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { getAdocoes } from "../services/adocaoService";

interface IAdocao {
  _id: string;
  animalId: string;
  apelido: string;
  tipo: string;
  cpf: string;
  nome: string;
  dataAdocao: string;
  cancelada: boolean;
  dataCancelamento?: string;
  createdAt: string;
}

interface IAdocaoResponse {
  adocoes: IAdocao[];
  totalAdocoes: number;
}

const circleIcon = (ativo: boolean) => {
  if (ativo) {
    return (
      <div className="rounded-full bg-teal-700 h-4 w-4 m-1 shadow-teal-700 shadow-sm"></div>
    );
  }
  return (
    <div className="rounded-full bg-red-600 h-4 w-4 m-1 shadow-red-600 shadow-sm"></div>
  );
};

const sessionMessage = "Sessão expirada, faça login novamente para continuar.";

export default function Adocoes() {
  const { logoutContext } = useAppContext();
  const [adocoes, setAdocoes] = useState<IAdocaoResponse>({
    adocoes: [],
    totalAdocoes: -1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAdocoesData = async () => {
    setLoading(true);
    const response = await getAdocoes();

    if (response.status === 200) {
      setAdocoes(response.data);
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      setError(response.data.mensagem);
      toast.error(`Erro ao carregar adoções: ${response.data.mensagem}`);
    }

    setLoading(false);
  };


  useEffect(() => {
    getAdocoesData();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center pb-8 w-full max-h-[80px]">
        <h1 className="sm:text-5xl text-3xl font-medium text-slate-700">
          Adoções
        </h1>
        <NavLink
          to="/adocoes/novo"
          className="bg-teal-500 text-2xl text-white rounded-lg py-3 flex flex-row items-center justify-evenly w-64 hover:bg-teal-600 hover:shadow-md"
        >
          <Plus size={32} />
          Cadastrar
        </NavLink>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-xl text-red-600">{error}</p>}
      {adocoes.totalAdocoes === 0 && (
        <p className="text-xl text-slate-700">Nenhuma adoção registrada.</p>
      )}

      {adocoes.totalAdocoes > 0 && (
        <>
          <p className="text-xl text-slate-700">
            Total de adoções registradas: {adocoes.totalAdocoes}
          </p>

          <div className="mr-5 mt-8 w-auto">
            <table className="w-full min-w-min overflow-auto">
              <thead className="bg-teal-700 text-white">
                <tr className="flex flex-row justify-start text-left py-3 text-lg w-full px-8">
                  <th className="w-16"></th>
                  <th className="flex-1 pl-6">Animal</th>
                  <th className="w-80">Tutor</th>
                  <th className="w-56">Tipo</th>
                  <th className="w-24">Data</th>
                </tr>
              </thead>
              <tbody>
                {adocoes.adocoes.map((adocao, index) => (
                  <tr
                    className={`flex flex-row justify-start py-3 px-8 text-left ${index % 2 === 0 ? "bg-slate-300" : "bg-slate-400"
                      } hover:bg-teal-200 hover:cursor-pointer`}
                    key={adocao._id}
                    // onClick={() => setOpenDoacao(doacao)}
                  >
                    <td className="w-16">
                      {!adocao.cancelada ? circleIcon(true) : circleIcon(false)}
                    </td>
                    <td className="flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap px-6">
                      {adocao.apelido}
                    </td>
                    <td className="w-80 overflow-ellipsis overflow-hidden whitespace-nowrap pr-4">
                      {adocao.cpf} - {adocao.nome}
                    </td>
                    <td className="w-56 overflow-ellipsis overflow-hidden whitespace-nowrap pr-4">
                      {adocao.tipo}
                    </td>
                    <td className="w-24">
                      {adocao.dataAdocao}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
