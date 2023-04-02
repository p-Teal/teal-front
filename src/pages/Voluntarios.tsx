import { useEffect, useState } from "react";
import {
  ativarVoluntario,
  deleteVoluntario,
  desativarVoluntario,
  getVoluntarioById,
  getVoluntarios,
} from "../services/voluntarioService";
import { toast } from "react-toastify";
import { CheckCircle, Info, Prohibit, Trash } from "@phosphor-icons/react";
import Modal from "../components/Modal";
import { cpfMask } from "../utils/cpfmask";

interface Voluntario {
  _id: string;
  nome: string;
  cpf: string;
  ativo: boolean;
  createdAt: string;
}

interface IVoluntarioResponse {
  voluntarios: Voluntario[];
  totalVoluntarios: number;
}

export default function Voluntarios() {
  const [voluntarios, setVoluntarios] = useState<IVoluntarioResponse>({
    voluntarios: [],
    totalVoluntarios: -1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenOn, setIsOpenOn] = useState(false);
  const [isOpenOff, setIsOpenOff] = useState(false);
  const [voluntarioJson, setVoluntarioJson] = useState<any>();

  const circleIcon = (ativo: boolean) => {
    if (ativo) {
      return (
        <div className="rounded-full bg-teal-700 h-4 w-4 m-1 shadow-teal-700 shadow-sm"></div>
      );
    }
    return (
      <div className="rounded-full bg-red-500 h-4 w-4 m-1 shadow-red-500 shadow-sm"></div>
    );
  };

  const openModalInfo = async (id: string) => {
    const response = await getVoluntarioById(id);

    if (response.status === 200) {
      setIsOpenInfo(true);
    } else {
      return toast.error(
        `Erro ao carregar voluntário: ${response.data.message}`
      );
    }

    setVoluntarioJson(response.data.voluntario);
  };

  const openModalDelete = async (cpf: string) => {
    setVoluntarioJson(null);
    setIsOpenDelete(true);
    setVoluntarioJson(cpf);
  };

  const openModalOff = async (cpf: string) => {
    setVoluntarioJson(null);
    setIsOpenOff(true);
    setVoluntarioJson(cpf);
  };

  const openModalOn = async (cpf: string) => {
    setVoluntarioJson(null);
    setIsOpenOn(true);
    setVoluntarioJson(cpf);
  };

  const closeModal = () => {
    setVoluntarioJson(null);
    setIsOpenInfo(false);
    setIsOpenDelete(false);
    setIsOpenOn(false);
    setIsOpenOff(false);
  };

  const getVoluntariosData = async () => {
    setLoading(true);
    const response = await getVoluntarios();

    if (response.status === 200) {
      setVoluntarios(response.data);
    } else {
      setError(response.data.message);
      toast.error(`Erro ao carregar voluntários: ${response.data.message}`);
    }

    setLoading(false);
  };

  const deleteVoluntarioConfirm = async (cpf: string) => {
    const response = await deleteVoluntario(cpf);

    if (response.status === 200) {
      toast.success("Voluntário deletado com sucesso!");
      getVoluntariosData();
    } else {
      toast.error(`Erro ao deletar voluntário: ${response.data.message}`);
    }
    closeModal();
  };

  const ativarVoluntarioConfirm = async (cpf: string) => {
    const response = await ativarVoluntario(cpf);

    if (response.status === 200) {
      toast.success("Voluntário ativado com sucesso!");
      getVoluntariosData();
    } else {
      toast.error(`Erro ao ativar voluntário: ${response.data.message}`);
    }
    closeModal();
  };

  const desativarVoluntarioConfirm = async (cpf: string) => {
    const response = await desativarVoluntario(cpf);

    if (response.status === 200) {
      toast.success("Voluntário desativado com sucesso!");
      getVoluntariosData();
    } else {
      toast.error(`Erro ao desativar voluntário: ${response.data.message}`);
    }
    closeModal();
  };

  useEffect(() => {
    getVoluntariosData();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-medium pb-8 text-slate-700">Voluntários</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-xl text-slate-700">{error}</p>}
      {voluntarios.totalVoluntarios === 0 && (
        <p className="text-xl text-slate-700">Nenhum voluntário cadastrado.</p>
      )}

      {voluntarios.totalVoluntarios > 0 && (
        <>
          <p className="text-xl text-slate-700">
            Total de voluntários: {voluntarios.totalVoluntarios}
          </p>

          <div className="mr-5 mt-8 w-auto">
            <table className="w-full min-w-min overflow-auto">
              <thead className="bg-teal-700 text-white">
                <tr className="flex flex-row justify-start text-left py-3 text-lg w-full px-8">
                  <th className="w-16">Ativo</th>
                  <th className="flex-1 pl-6">Nome</th>
                  <th className="w-44">CPF</th>
                  <th className="w-44">Registro</th>
                  <th className="w-40 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {voluntarios.voluntarios.map((voluntario, index) => (
                  <tr
                    className={`flex flex-row justify-start py-3 px-8 text-left ${
                      index % 2 === 0 ? "bg-slate-300" : "bg-slate-400"
                    } hover:bg-teal-200 hover:cursor-pointer`}
                    key={voluntario._id}
                  >
                    <td className="w-16">
                      {voluntario.ativo ? circleIcon(true) : circleIcon(false)}
                    </td>
                    <td className="flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap px-6">
                      {voluntario.nome}
                    </td>
                    <td className="w-44">{cpfMask(voluntario.cpf)}</td>
                    <td className="w-44">
                      {new Date(voluntario.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </td>
                    <td className="w-40 flex flex-row justify-center items-center">
                      <Info
                        size={24}
                        className="hover:text-teal-700 mx-2"
                        onClick={() => openModalInfo(voluntario._id)}
                      />
                      <Trash
                        size={24}
                        className="hover:text-red-500 mx-2"
                        onClick={() => openModalDelete(voluntario.cpf)}
                      />
                      {voluntario.ativo ? (
                        <Prohibit
                          size={24}
                          className="hover:text-red-500 mx-2"
                          onClick={() => openModalOff(voluntario.cpf)}
                        />
                      ) : (
                        <CheckCircle
                          size={24}
                          className="hover:text-teal-700 mx-2"
                          onClick={() => openModalOn(voluntario.cpf)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            isOpen={isOpenInfo}
            onClose={closeModal}
            title="Detalhes do voluntário"
            key={voluntarioJson?._id}
          >
            <pre>{JSON.stringify(voluntarioJson, null, 2)}</pre>
          </Modal>
          <Modal
            isOpen={isOpenDelete}
            onClose={closeModal}
            title="Excluir voluntário"
            key={`delete${voluntarioJson}`}
          >
            <p className="text-center py-3">
              Deseja realmente excluir o voluntário com CPF: <br />
              {cpfMask(voluntarioJson)}?
            </p>
            <div className="flex flex-row justify-center pt-3">
              <button
                className="bg-teal-500 text-white rounded-lg px-6 py-2 mx-2 hover:bg-teal-600"
                onClick={() => {
                  deleteVoluntarioConfirm(voluntarioJson);
                }}
              >
                Sim
              </button>
              <button
                className="border-2 border-teal-500 text-teal-500 rounded-lg px-6 py-2 mx-2 hover:font-bold"
                onClick={closeModal}
              >
                Não
              </button>
            </div>
          </Modal>
          <Modal
            isOpen={isOpenOn}
            onClose={closeModal}
            title="Ativar voluntário"
            key={`on${voluntarioJson}`}
          >
            <p className="text-center py-3">
              Deseja ativar o voluntário com CPF: <br />
              {cpfMask(voluntarioJson)}?
            </p>
            <div className="flex flex-row justify-center pt-3">
              <button
                className="bg-teal-500 text-white rounded-lg px-6 py-2 mx-2 hover:bg-teal-600"
                onClick={() => {
                  ativarVoluntarioConfirm(voluntarioJson);
                }}
              >
                Sim
              </button>
              <button
                className="border-2 border-teal-500 text-teal-500 rounded-lg px-6 py-2 mx-2 hover:font-bold"
                onClick={closeModal}
              >
                Não
              </button>
            </div>
          </Modal>
          <Modal
            isOpen={isOpenOff}
            onClose={closeModal}
            title="Desativar voluntário"
            key={`off${voluntarioJson}`}
          >
            <p className="text-center py-3">
              Deseja desativar o voluntário com CPF: <br />
              {cpfMask(voluntarioJson)}?
            </p>
            <div className="flex flex-row justify-center pt-3">
              <button
                className="bg-teal-500 text-white rounded-lg px-6 py-2 mx-2 hover:bg-teal-600"
                onClick={() => {
                  desativarVoluntarioConfirm(voluntarioJson);
                }}
              >
                Sim
              </button>
              <button
                className="border-2 border-teal-500 text-teal-500 rounded-lg px-6 py-2 mx-2 hover:font-bold"
                onClick={closeModal}
              >
                Não
              </button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}
