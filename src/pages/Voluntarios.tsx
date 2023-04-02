import { useEffect, useState } from "react";
import {
  getVoluntarioById,
  getVoluntarios,
} from "../services/voluntarioService";
import { toast } from "react-toastify";
import { CheckCircle, Info, Prohibit, Trash } from "@phosphor-icons/react";
import Modal from "../components/Modal";

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
  const [isOpen, setIsOpen] = useState(false);
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

  const openModal = async (id: string) => {
    const response = await getVoluntarioById(id);

    if (response.status === 200) {
      setIsOpen(true);
    } else {
      return toast.error(
        `Erro ao carregar voluntário: ${response.data.message}`
      );
    }

    setVoluntarioJson(response.data.voluntario);
  };

  const closeModal = () => {
    setIsOpen(false);
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
                  <th className="w-20 text-center">Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {voluntarios.voluntarios.map((voluntario, index) => (
                  <tr
                    className={`flex flex-row justify-start py-3 px-8 text-left ${index % 2 === 0 ? "bg-slate-300" : "bg-slate-400"
                      } hover:bg-teal-200 hover:cursor-pointer`}
                    key={voluntario._id}
                  >
                    <td className="w-16">
                      {voluntario.ativo ? circleIcon(true) : circleIcon(false)}
                    </td>
                    <td className="flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap px-6">
                      {voluntario.nome}
                    </td>
                    <td className="w-44">{voluntario.cpf}</td>
                    <td className="w-44">
                      {new Date(voluntario.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </td>
                    <td className="w-20">
                      <Info
                        size={24}
                        className="hover:text-teal-700 mx-auto"
                        onClick={() => openModal(voluntario._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal isOpen={isOpen} onClose={closeModal} title="Voluntário" key={voluntarioJson?._id}>
            <pre>{JSON.stringify(voluntarioJson, null, 2)}</pre>

            <div className="flex justify-end mt-4">
              <Trash
                size={30}
                className="hover:text-red-500 mr-6 cursor-pointer"
              />
              {voluntarioJson?.ativo ? (
                <Prohibit
                  size={30}
                  className="hover:text-red-500 cursor-pointer"
                />
              ) : (
                <CheckCircle
                  size={30}
                  className="hover:text-teal-700 cursor-pointer"
                />
              )}
            </div>
          </Modal>
        </>
      )}
    </>
  );
}
