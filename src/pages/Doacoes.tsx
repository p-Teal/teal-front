import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";
import { deleteDoacao, desativaDoacao, getDoacoes } from "../services/doacaoService";
import Modal from "../components/Modal";
import { Plus, ReceiptX, TrashSimple } from "@phosphor-icons/react";
import ModalDoacao from "../components/ModalDoacao";

interface IDoacao {
  _id: string;
  remetente: string;
  item: string;
  quantidade: string;
  data: string;
  descricao?: string;
  createdAt: string;
  disponivel: boolean;
}

interface IDoacaoResponse {
  doacoes: IDoacao[];
  totalDoacoes: number;
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

export default function Doacoes() {
  const { logoutContext } = useAppContext();
  const [doacoes, setDoacoes] = useState<IDoacaoResponse>({
    doacoes: [],
    totalDoacoes: -1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openDoacao, setOpenDoacao] = useState<IDoacao | null>(null);
  const [openModalDoacao, setOpenModalDoacao] = useState<boolean>(false);

  const closeModal = () => {
    setOpenDoacao(null);
  };

  const closeModalDoacao = () => {
    setOpenModalDoacao(false);
  };

  const getDoacoesData = async () => {
    setLoading(true);
    const response = await getDoacoes();

    if (response.status === 200) {
      setDoacoes(response.data);
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      setError(response.data.mensagem);
      toast.error(`Erro ao carregar doações: ${response.data.mensagem}`);
    }

    setLoading(false);
  };

  const removeDoacao = async (doacaoId: string) => {
    if (!doacaoId) return;

    const response = await deleteDoacao(doacaoId);

    if (response.status === 204) {
      toast.success("Doação removida com sucesso!");
      getDoacoesData();
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      toast.error(`Erro ao remover doação: ${response.data.mensagem}`);
    }
    closeModal();
  };

  const handleDesativarDoacao = async (doacaoId: string) => {
    if (!doacaoId) return;

    const response = await desativaDoacao(doacaoId);

    if (response.status === 204) {
      toast.success("Doação desativada com sucesso!");
      getDoacoesData();
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      toast.error(`Erro ao desativar doação: ${response.data.mensagem}`);
    }
    closeModal();
  };

  useEffect(() => {
    getDoacoesData();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center pb-8 w-full max-h-[80px]">
        <h1 className="sm:text-5xl text-3xl font-medium text-slate-700">
          Doações
        </h1>
        <button
          onClick={() => setOpenModalDoacao(true)}
          className="bg-teal-500 text-2xl text-white rounded-lg py-3 sm:mr-5 flex flex-row items-center justify-evenly w-64 hover:bg-teal-600 hover:shadow-md">
          <Plus size={32} />
          Cadastrar
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-xl text-red-600">{error}</p>}
      {doacoes.totalDoacoes === 0 && (
        <p className="text-xl text-slate-700">Nenhuma doação cadastrada.</p>
      )}

      {doacoes.totalDoacoes > 0 && (
        <>
          <p className="text-xl text-slate-700">
            Total de doações cadastradas: {doacoes.totalDoacoes}
          </p>

          <div className="mr-5 mt-8 w-auto">
            <table className="w-full min-w-min overflow-auto">
              <thead className="bg-teal-700 text-white">
                <tr className="flex flex-row justify-start text-left py-3 text-lg w-full px-8">
                  <th className="w-16"></th>
                  <th className="flex-1 pl-6">Remetente</th>
                  <th className="w-80">Item</th>
                  <th className="w-56">Quantidade</th>
                  <th className="w-24">Data</th>
                </tr>
              </thead>
              <tbody>
                {doacoes.doacoes.map((doacao, index) => (
                  <tr
                    className={`flex flex-row justify-start py-3 px-8 text-left ${index % 2 === 0 ? "bg-slate-300" : "bg-slate-400"
                      } hover:bg-teal-200 hover:cursor-pointer`}
                    key={doacao._id}
                    onClick={() => setOpenDoacao(doacao)}
                  >
                    <td className="w-16">
                      {doacao.disponivel ? circleIcon(true) : circleIcon(false)}
                    </td>
                    <td className="flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap px-6">
                      {doacao.remetente}
                    </td>
                    <td className="w-80 overflow-ellipsis overflow-hidden whitespace-nowrap pr-4">
                      {doacao.item}
                    </td>
                    <td className="w-56 overflow-ellipsis overflow-hidden whitespace-nowrap pr-4">
                      {doacao.quantidade}
                    </td>
                    <td className="w-24">
                      {new Date(doacao.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <Modal
        isOpen={!!openDoacao}
        onClose={closeModal}
        title="Detalhes da doação"
      >
        <pre className="overflow-y-auto pb-6">
          {openDoacao && JSON.stringify(openDoacao, null, 2)}
        </pre>

        <div className="flex flex-row-reverse items-center justify-between">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 flex flex-row items-center border-2 border-red-600 hover:border-red-700"
            type="button"
            onClick={() => removeDoacao(openDoacao?._id || "")}
          >
            Excluir
            <TrashSimple size={20} className="ml-2" />
          </button>

          {openDoacao?.disponivel && (
            <button
              className="bg-white text-black px-4 py-2 rounded-md shadow-md flex flex-row items-center ml-2 border-red-600 border-2 hover:bg-red-50"
              type="button"
              onClick={() => handleDesativarDoacao(openDoacao?._id || "")}
            >
              Cancelar doação
              <ReceiptX size={20} className="ml-2" />
            </button>
          )}
        </div>
      </Modal>

      <ModalDoacao isOpen={openModalDoacao} onClose={closeModalDoacao} fetchData={getDoacoesData} />
    </>
  );
}
