import { v4 as uuidv4 } from "uuid";
import { storage } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import animalSchema from "../schemas/animalSchema";
import { createAnimal } from "../services/animalService";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { ArrowLeft } from "@phosphor-icons/react";

type FormProps = z.infer<typeof animalSchema>;

export default function CadastroAnimal() {
  const { logoutContext } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>({
    mode: "onSubmit",
    resolver: zodResolver(animalSchema),
    shouldFocusError: true,
  });
  const nav = useNavigate();

  const classNameInput =
    "border-2 border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-[320px] hover:border-teal-500 hover:shadow-md";

  const checkErrorInput = (message?: string) => {
    if (message) {
      return "border-2 border-red-600 p-2 rounded-lg w-[320px] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-red-600";
    }
    return classNameInput;
  };

  const onSubmit = async (data: FormProps) => {
    const uuidValue = uuidv4();

    const dataToSend = {
      animalId: uuidValue,
      ...data,
    };

    const dataNascimentoFormatted = dataToSend.dataNascimento
      ? dataToSend.dataNascimento.split("-").reverse().join("/")
      : dataToSend.dataNascimento;
    const dataEntradaFormatted = dataToSend.dataEntrada
      ? dataToSend.dataEntrada.split("-").reverse().join("/")
      : dataToSend.dataEntrada;

    dataToSend.dataNascimento = dataNascimentoFormatted;
    dataToSend.dataEntrada = dataEntradaFormatted;

    if (dataToSend.dataNascimento === "") {
      delete dataToSend.dataNascimento;
    }

    if (dataToSend.descricao === "") {
      delete dataToSend.descricao;
    }

    const file = dataToSend.urlFoto[0];
    delete dataToSend.urlFoto;

    const imageRef = ref(storage, `Animais/${uuidValue}`);
    const firebaseReturn = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(firebaseReturn.ref);

    dataToSend.urlFoto = url;

    const resp = await createAnimal(dataToSend);

    if (resp.status === 201) {
      toast.success("Animal cadastrado com sucesso!");
      reset();
      setTimeout(() => {
        return nav("/animais");
      }, 2000);
    } else if (resp.status === 401) {
      toast.error("Sessão expirada, faça login novamente para continuar.");
      return logoutContext();
    } else {
      toast.error(`Erro! ${resp.data.mensagem}`);
    }
    return;
  };

  return (
    <>
      <h1 className="sm:text-5xl text-2xl font-medium text-slate-700 pb-8">
        Cadastro de Animal
      </h1>
      <NavLink
        to="/animais"
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
            Dados do Animal
          </h2>
          <div className="flex flex-col gap-1">
            <label htmlFor="nome" className="text-slate-700 w-fit">
              Nome *
            </label>
            <input
              type="text"
              id="nome"
              autoComplete="off"
              {...register("nome")}
              className={checkErrorInput(errors.nome?.message)}
            />
            {errors.nome && (
              <span className="text-red-600 text-sm px-1">
                {errors.nome.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="apelido" className="text-slate-700 w-fit">
              Apelido *
            </label>
            <input
              type="text"
              id="apelido"
              {...register("apelido")}
              className={checkErrorInput(errors.apelido?.message)}
            />
            {errors.apelido && (
              <span className="text-red-600 text-sm px-1">
                {errors.apelido.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="tipo" className="text-slate-700 w-fit">
              Tipo *
            </label>
            <div className="relative inline-block w-[320px] text-slate-700">
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
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
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
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="sexo" className="text-slate-700 w-fit">
              Sexo *
            </label>
            <div className="relative inline-block w-[320px] text-slate-700">
              <select
                id="sexo"
                {...register("sexo")}
                className={`${checkErrorInput(
                  errors.sexo?.message
                )} appearance-none pr-6`}
                defaultValue=""
              >
                <option disabled value="">
                  Selecione
                </option>
                <option value="M">Macho</option>
                <option value="F">Fêmea</option>
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
            {errors.sexo && (
              <span className="text-red-600 text-sm px-1">
                {errors.sexo.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="raca" className="text-slate-700 w-fit">
              Raça *
            </label>
            <input
              type="text"
              id="raca"
              {...register("raca")}
              className={checkErrorInput(errors.raca?.message)}
            />
            {errors.raca && (
              <span className="text-red-600 text-sm px-1">
                {errors.raca.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="porte" className="text-slate-700 w-fit">
              Porte *
            </label>
            <div className="relative inline-block w-[320px] text-slate-700">
              <select
                id="porte"
                {...register("porte")}
                className={`${checkErrorInput(
                  errors.porte?.message
                )} appearance-none pr-6`}
                defaultValue=""
              >
                <option disabled value="">
                  Selecione
                </option>
                <option value="pequeno">Pequeno</option>
                <option value="médio">Médio</option>
                <option value="grande">Grande</option>
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
            {errors.porte && (
              <span className="text-red-600 text-sm px-1">
                {errors.porte.message}
              </span>
            )}
          </div>
        </div>

        <div className="xl:min-h-full bg-teal-500 w-1 rounded-lg mr-12"></div>

        <div className="flex flex-col flex-1 pt-2 gap-5">
          <h2 className="text-2xl font-medium text-slate-700">Dados Extras</h2>
          <div className="flex flex-col gap-1">
            <label htmlFor="dataNascimento" className="text-slate-700 w-fit">
              Data de Nascimento
            </label>
            <input
              type="date"
              id="dataNascimento"
              {...register("dataNascimento")}
              className={checkErrorInput(errors.dataNascimento?.message)}
            />
            {errors.dataNascimento && (
              <span className="text-red-600 text-sm px-1">
                {errors.dataNascimento.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="dataEntrada" className="text-slate-700 w-fit">
              Data de Entrada *
            </label>
            <input
              type="date"
              id="dataEntrada"
              {...register("dataEntrada")}
              className={checkErrorInput(errors.dataEntrada?.message)}
            />
            {errors.dataEntrada && (
              <span className="text-red-600 text-sm px-1">
                {errors.dataEntrada.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-700 w-fit">Castrado</label>
            <label className="inline-flex items-center mt-1 w-fit">
              <input
                type="checkbox"
                id="castrado"
                {...register("castrado")}
                className="appearance-none w-6 h-6 text-teal-600 border-2 border-slate-700 bg-white rounded hover:ring-teal-500 hover:ring-2 checked:bg-teal-500"
              />
              <span className="ml-2 text-slate-700 hover:select-none">Sim</span>
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="descricao" className="text-slate-700 w-fit">
              Descrição
            </label>
            <textarea
              id="descricao"
              {...register("descricao")}
              className={`${checkErrorInput(
                errors.descricao?.message as string
              )} min-h-[100px]`}
            />
            {errors.descricao && (
              <span className="text-red-600 text-sm px-1">
                {errors.descricao.message as string}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="urlFoto" className="text-slate-700 w-fit">
              Foto *
            </label>
            <input
              type="file"
              accept="image/*"
              id="urlFoto"
              {...register("urlFoto")}
              className="file:mr-3 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-50 file:text-teal-700
              hover:file:bg-teal-500 hover:file:text-white file:cursor-pointer"
            />
            {errors.urlFoto && (
              <span className="text-red-600 text-sm px-1">
                {errors.urlFoto.message as string}
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
              onClick={() => reset()}
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
