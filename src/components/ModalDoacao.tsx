import { X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { useAppContext } from "../context/appContext";
import doacaoSchema from "../schemas/doacaoSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createDoacao } from "../services/doacaoService";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchData: () => Promise<any>;
}

type FormProps = z.infer<typeof doacaoSchema>;

const Label = ({ children, ...rest }: { children: React.ReactNode, [key: string]: any; }) => (
  <label className="inline-block text-base text-slate-700 w-fit" {...rest}>{children}</label>
);


const classNameInput =
  "border-2 border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full hover:border-teal-500 hover:shadow-md";

const checkErrorInput = (message?: string) => {
  if (message) {
    return "border-2 border-red-600 p-2 rounded-lg w-full hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-red-600";
  }
  return classNameInput;
};

function ModalDoacao({ isOpen, onClose, fetchData }: ModalProps) {
  const modalRef = useRef<any>(null);
  const { logoutContext } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>({
    mode: "onSubmit",
    resolver: zodResolver(doacaoSchema),
    shouldFocusError: true,
  });

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      reset();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleFormSubmit = async (data: FormProps) => {

    if (data.descricao === "") {
      delete data.descricao;
    }

    const dataF = data.data
      ? data.data.split("-").reverse().join("/")
      : data.data;

    data.data = dataF;

    console.log(data);

    const resp = await createDoacao(data);

    if (resp.status === 201) {
      toast.success("Doação cadastrada com sucesso!");
      await fetchData();
    } else if (resp.status === 401) {
      toast.error("Sessão expirada, faça login novamente para continuar.");
      return logoutContext();
    } else {
      toast.error(`Erro! ${resp.data.mensagem}`);
    }
    reset();
    onClose();
  };

  return (
    <>
      {!isOpen ? null : (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md max-h-screen overflow-y-auto"
          >
            <div
              className="border-b px-4 py-2 flex justify-between items-center">
              <h3 className="font-semibold text-2xl">Cadastrar Doação</h3>
              <X size={28} className="cursor-pointer" onClick={onClose} />
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="remetente">Remetente</Label>
                  <input
                    type="text"
                    id="remetente"
                    {...register("remetente")}
                    className={checkErrorInput(errors.remetente?.message)}
                  />
                  {errors.remetente && (
                    <p className="text-red-600 text-sm px-1">
                      {errors.remetente.message}
                    </p>
                  )}

                  <Label htmlFor="contato">Contato</Label>
                  <input
                    type="text"
                    id="contato"
                    {...register("contato")}
                    className={checkErrorInput(errors.contato?.message)}
                  />
                  {errors.contato && (
                    <p className="text-red-600 text-sm px-1">
                      {errors.contato.message}
                    </p>
                  )}

                  <Label htmlFor="item">Item</Label>
                  <input
                    type="text"
                    id="item"
                    {...register("item")}
                    className={checkErrorInput(errors.item?.message)}
                  />
                  {errors.item && (
                    <p className="text-red-600 text-sm px-1">
                      {errors.item.message}
                    </p>
                  )}

                  <Label htmlFor="quantidade">Quantidade</Label>
                  <input
                    type="text"
                    id="quantidade"
                    {...register("quantidade")}
                    className={checkErrorInput(errors.quantidade?.message)}
                  />
                  {errors.quantidade && (
                    <p className="text-red-600 text-sm px-1">
                      {errors.quantidade.message}
                    </p>
                  )}

                  <Label htmlFor="data">Data</Label>
                  <input
                    type="date"
                    id="data"
                    {...register("data")}
                    className={checkErrorInput(errors.data?.message)}
                  />
                  {errors.data && (
                    <p className="text-red-600 text-sm px-1">
                      {errors.data.message}
                    </p>
                  )}

                  <Label htmlFor="descricao">Descrição</Label>
                  <textarea
                    id="descricao"
                    {...register("descricao")}
                    className={`${checkErrorInput(
                      errors.descricao?.message as string
                    )} min-h-[100px]`}
                  />
                  {errors.descricao && (
                    <p className="text-red-600 text-sm px-1">
                      {errors.descricao.message}
                    </p>
                  )}

                  <div className="flex flex-row justify-between items-center pt-4">
                    <button
                      type="submit"
                      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-5 rounded w-28"
                      disabled={isSubmitting}
                    >
                      Cadastrar
                    </button>
                    <button
                      type="reset"
                      className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-5 rounded w-28"
                      onClick={() => reset()}
                      disabled={isSubmitting}
                    >
                      Limpar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalDoacao;
