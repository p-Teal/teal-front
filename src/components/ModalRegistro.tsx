import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import registroSchema from "../schemas/registroSchema";
import { useEffect, useRef } from "react";
import { useAppContext } from "../context/appContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { X } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { createRegistro } from "../services/registroService";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchData: () => Promise<any>;
  animalId: string | undefined;
}

type FormProps = z.infer<typeof registroSchema>;

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

export default function ModalRegistro({
  isOpen,
  onClose,
  fetchData,
  animalId,
}: ModalProps) {
  const modalRef = useRef<any>(null);
  const { logoutContext } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>({
    mode: "onSubmit",
    resolver: zodResolver(registroSchema),
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
    const uuidValue = uuidv4();

    const dataToSend = {
      registroId: uuidValue,
      animalId,
      ...data,
    };

    const dataFormatted = dataToSend.data
      ? dataToSend.data.split("-").reverse().join("/")
      : dataToSend.data;

    dataToSend.data = dataFormatted;

    console.log(dataToSend);

    if (dataToSend.anexo.length === 0) {
      delete dataToSend.anexo;
    } else if (dataToSend.anexo.length > 0) {
      const file = dataToSend.anexo[0];
      const imageRef = ref(storage, `Outros/${uuidValue}`);
      const firebaseReturn = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(firebaseReturn.ref);
      dataToSend.anexo = url;
    }
    console.log(dataToSend);
    const resp = await createRegistro(dataToSend);

    if (resp.status === 201) {
      toast.success("Registro cadastrado com sucesso!");
      await fetchData();
    } else if (resp.status === 401) {
      toast.error("Sessão expirada, faça login novamente para continuar.");
      return logoutContext();
    } else {
      toast.error(`Erro! ${resp.data.mensagem}`);
    }
    reset();
    onClose();
  }

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
              <h3 className="font-semibold text-2xl">Cadastrar Registro</h3>
              <X size={28} className="cursor-pointer" onClick={onClose} />
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="titulo">Título</Label>
                  <input
                    type="text"
                    id="titulo"
                    {...register("titulo")}
                    className={checkErrorInput(errors.titulo?.message)}
                  />
                  {errors.titulo && (
                    <p className="text-red-600 text-sm px-1">
                      {errors.titulo.message}
                    </p>
                  )}


                  <Label htmlFor="tipo">Tipo</Label>
                  <div className="relative inline-block w-full text-slate-700">
                    <select
                      id="tipo"
                      {...register("tipo")}
                      className={`${checkErrorInput(
                        errors.tipo?.message
                      )} appearance-none pr-6`}
                      defaultValue=""
                    >
                      <option disabled value="">
                        Selecione
                      </option>
                      <option value="veterinário">Veterinário</option>
                      <option value="vacina">Vacina</option>
                      <option value="banho">Banho</option>
                      <option value="tosa">Tosa</option>
                      <option value="medicação">Medicação</option>
                      <option value="outro">Outro</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {errors.tipo && (
                    <span className="text-red-600 text-sm px-1">
                      {errors.tipo.message}
                    </span>
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

                  <Label htmlFor="observacao">Observação</Label>
                  <textarea
                    id="observacao"
                    {...register("observacao")}
                    className={`${checkErrorInput(
                      errors.observacao?.message as string
                    )} min-h-[100px]`}
                  />
                  {errors.observacao && (
                    <p className="text-red-600 text-sm px-1">
                      {errors.observacao.message}
                    </p>
                  )}

                  <Label htmlFor="anexo">Anexo</Label>
                  <input
                    type="file"
                    id="anexo"
                    multiple={false}
                    {...register("anexo")}
                    className="file:mr-3 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-teal-50 file:text-teal-700
                    hover:file:bg-teal-500 hover:file:text-white file:cursor-pointer"
                  />

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
  )
}