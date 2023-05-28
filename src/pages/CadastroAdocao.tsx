import { ArrowLeft } from "@phosphor-icons/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import adocaoSchema from "../schemas/adocaoSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  createAdocao,
  getAnimaisDisponiveis,
  getTutorByCpf,
} from "../services/adocaoService";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const sessionMessage = "Sessão expirada, faça login novamente para continuar.";
type FormProps = z.infer<typeof adocaoSchema>;

export default function CadastroAdocao() {
  const { logoutContext } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormProps>({
    mode: "all",
    resolver: zodResolver(adocaoSchema),
    shouldFocusError: true,
    defaultValues: {
      cpf: "",
      animalId: "",
      dataAdocao: "",
    },
  });
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [animais, setAnimais] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [tutorResponse, setTutorResponse] = useState<any>(null);
  const [tutorResponseError, setTutorResponseError] = useState<string | null>(
    null
  );

  const cpf = watch("cpf");

  const classNameInput =
    "border-2 border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-[320px] hover:border-teal-500 hover:shadow-md";

  const checkErrorInput = (message?: string) => {
    if (message) {
      return "border-2 border-red-600 p-2 rounded-lg w-[320px] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-red-600";
    }
    return classNameInput;
  };

  const getAnimaisDisponiveisData = async () => {
    setLoading(true);
    const response = await getAnimaisDisponiveis();

    if (response.status === 200) {
      setAnimais(response.data.animais);
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      setError(response.data.mensagem);
      toast.error(`Erro ao carregar animais: ${response.data.mensagem}`);
    }

    setLoading(false);
  };

  const getTutorByCpfFunction = async (cpf: string) => {
    const response = await getTutorByCpf(cpf);

    if (response.status === 200) {
      setTutorResponse(response.data.tutor);
    } else if (response.status === 401) {
      toast.error(sessionMessage);
      return logoutContext();
    } else {
      setTutorResponseError(response.data.mensagem);
    }
  };

  useEffect(() => {
    reset();
    getAnimaisDisponiveisData();
  }, []);

  useEffect(() => {
    if (cpf.length !== 11) {
      setTutorResponse(null);
      setTutorResponseError(null);
    }
    if (cpf.length === 11 && cpf.match(/^\d{11}$/)) {
      getTutorByCpfFunction(cpf);
    }
  }, [cpf]);

  const onSubmit = async (data: FormProps) => {
    const dataAdocaoFormatted = data.dataAdocao
      ? data.dataAdocao.split("-").reverse().join("/")
      : data.dataAdocao;

    data.dataAdocao = dataAdocaoFormatted;

    const resp = await createAdocao(data);

    if (resp.status === 201) {
      toast.success("Adoção registrada com sucesso!");
      reset();
      setTimeout(() => {
        return nav("/adocoes");
      }, 2000);
    } else if (resp.status === 401) {
      toast.error("Sessão expirada, faça login novamente para continuar.");
      return logoutContext();
    } else {
      toast.error(`Erro! ${resp.data.mensagem}`);
    }
    return;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="sm:text-5xl text-2xl font-medium text-slate-700 pb-8">
        Registrar Adoção
      </h1>
      <NavLink
        to="/adocoes"
        className="text-teal-500 hover:underline font-medium hover:text-slate-700"
      >
        <ArrowLeft size={18} className="inline-block mr-2" />
        Voltar
      </NavLink>

      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex xl:flex-row flex-col gap-4 w-full h-fit pb-4"
      >
        <div className="flex flex-col min-w-1/2 w-1/2 pt-2 gap-5">
          <h2 className="text-2xl font-medium text-slate-700">
            Dados da adoção
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="animalId" className="text-slate-700 w-fit">
              Animal *
            </label>
            <div className="relative inline-block w-[320px] text-slate-700">
              <select
                id="animalId"
                {...register("animalId")}
                className={`${checkErrorInput(
                  errors.animalId?.message
                )} appearance-none pr-6`}
                defaultValue=""
              >
                <option disabled value="">
                  Selecione
                </option>
                {animais.map((animal: any) => (
                  <option key={animal.animalId} value={animal.animalId}>
                    {animal.apelido} -{" "}
                    {animal.tipo.charAt(0).toUpperCase() + animal.tipo.slice(1)}
                  </option>
                ))}
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
            {errors.animalId && (
              <span className="text-red-600 text-sm px-1">
                {errors.animalId.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="dataAdocao" className="text-slate-700 w-fit">
              Data da Adoção *
            </label>
            <input
              type="date"
              id="dataAdocao"
              {...register("dataAdocao")}
              className={checkErrorInput(errors.dataAdocao?.message)}
            />
            {errors.dataAdocao && (
              <span className="text-red-600 text-sm px-1">
                {errors.dataAdocao.message}
              </span>
            )}
          </div>
        </div>

        <div className="xl:min-h-full bg-teal-500 w-1 rounded-lg mr-12"></div>

        <div className="flex flex-col flex-1 pt-2 gap-5">
          <h2 className="text-2xl font-medium text-slate-700">
            Dados do Tutor
          </h2>
          <div className="flex flex-col gap-1">
            <label htmlFor="cpf" className="text-slate-700 w-fit">
              Cpf do Tutor *
            </label>
            <input
              type="text"
              id="cpf"
              autoComplete="off"
              {...register("cpf")}
              className={checkErrorInput(errors.cpf?.message)}
            />
            {errors.cpf && (
              <span className="text-red-600 text-sm px-1">
                {errors.cpf.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            {tutorResponseError && (
              <span className="text-red-600 px-1">{tutorResponseError}</span>
            )}
            {tutorResponse && (
              <span className="text-green-600 px-1">
                Tutor Aprovado Encontrado: {tutorResponse.nome}
              </span>
            )}
          </div>

          <div className="flex flex-row gap-6 items-center pt-4">
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
              onClick={() => {
                setTutorResponse(null);
                setTutorResponseError(null);
                reset();
              }}
              disabled={isSubmitting}
            >
              Limpar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
