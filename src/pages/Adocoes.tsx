import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import { Plus, TrashSimple } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { cancelarAdocao, deleteAdocao, getAdocoes } from "../services/adocaoService";
import LoadingSpinner from "../components/LoadingSpinner";
import { cpfMask } from "../utils/cpfmask";

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
  observacao?: string;
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
  const { logoutContext, admin } = useAppContext();
  const [adocoes, setAdocoes] = useState<IAdocaoResponse>({
    adocoes: [],
    totalAdocoes: -1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openAdocao, setOpenAdocao] = useState<IAdocao | null>(null);

  const closeModal = () => {
    setOpenAdocao(null);
  };

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

  const handleDesativar = async (adocaoId: string) => {
    if (!adocaoId) return;

    const response = await cancelarAdocao(adocaoId);

    if (response.status === 204) {
      toast.success("Adoção cancelada com sucesso!");
      getAdocoesData();
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      toast.error(`Erro ao cancelar: ${response.data.mensagem}`);
    }
    closeModal();
  };

  const removeDoacao = async (adocaoId: string) => {
    if (!adocaoId) return;

    const response = await deleteAdocao(adocaoId);

    if (response.status === 204) {
      toast.success("Adoção removida com sucesso!");
      getAdocoesData();
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      toast.error(`Erro ao apagar adoção: ${response.data.mensagem}`);
    }
    closeModal();
  };

  function observacaoHandler(ob: string) {
    const newText = ob.replace(/\n/g, "<br />");
    return newText;
  }

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

      {loading && <LoadingSpinner />}
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
                  <th className="flex-1">Tutor</th>
                  <th className="w-24">Data</th>
                </tr>
              </thead>
              <tbody>
                {adocoes.adocoes.map((adocao, index) => (
                  <tr
                    className={`flex flex-row justify-start py-3 px-8 text-left ${index % 2 === 0 ? "bg-slate-300" : "bg-slate-400"
                      } hover:bg-teal-200 hover:cursor-pointer`}
                    key={adocao._id}
                    onClick={() => setOpenAdocao(adocao)}
                  >
                    <td className="w-16">
                      {!adocao.cancelada ? circleIcon(true) : circleIcon(false)}
                    </td>
                    <td className="flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap px-6">
                      {adocao.tipo.charAt(0).toUpperCase() + adocao.tipo.slice(1)} / {adocao.apelido}
                    </td>
                    <td className="flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap pr-4">
                      {cpfMask(adocao.cpf)} / {adocao.nome}
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

      <Modal
        isOpen={!!openAdocao}
        onClose={closeModal}
        title="Detalhes da adoção"
      >
        {/* <pre className="overflow-y-auto pb-6">
          {openAdocao && JSON.stringify(openAdocao, null, 2)}
        </pre> */}
        {openAdocao && (
          <div className="flex flex-col gap-2 text-slate-700 text-sm">
            <h1 className="text-lg font-medium">Animal</h1>
            <p>
              <b>Apelido: </b> {openAdocao.apelido}
            </p>
            <p>
              <b>Tipo: </b> {openAdocao.tipo.charAt(0).toUpperCase() + openAdocao.tipo.slice(1)}
            </p>
            <p>
              <b>Animal ID: </b> {openAdocao.animalId}
            </p>
            <h1 className="text-lg font-medium">Tutor</h1>
            <p>
              <b>Nome: </b> {openAdocao.nome}
            </p>
            <p>
              <b>CPF: </b> {cpfMask(openAdocao.cpf)}
            </p>
            <h1 className="text-lg font-medium">Adoção</h1>
            <p>
              <b>Data da adoção: </b> {openAdocao.dataAdocao}
            </p>
            <p>
              <b>Cancelada: </b> {openAdocao.cancelada ? "Sim" : "Não"}
            </p>
            {openAdocao.cancelada && (
              <p>
                <b>Data do cancelamento: </b> {openAdocao.dataCancelamento}
              </p>
            )}

            {openAdocao.observacao && (
              <p
                className="text-white"
                dangerouslySetInnerHTML={{
                  __html: observacaoHandler(openAdocao.observacao),
                }}
              ><b>Observação: </b></p>
            )}
            <p>
              <b>Doação ID: </b> {openAdocao._id}
            </p>
            <p>
              <b>Data do registro: </b> {new Date(openAdocao.createdAt).toLocaleDateString("pt-BR")}
            </p>

          </div>
        )}


        {admin && (
          <div className="flex flex-row-reverse items-center justify-between mt-6">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 flex flex-row items-center border-2 border-red-600 hover:border-red-700"
              type="button"
              onClick={() => removeDoacao(openAdocao?._id || "")}
            >
              Excluir
              <TrashSimple size={20} className="ml-2" />
            </button>

            {!openAdocao?.cancelada && (
              <button
                className="underline text-red-500 hover:text-red-700"
                type="button"
                onClick={() => handleDesativar(openAdocao?._id || "")}
              >
                Cancelar adoção
              </button>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
