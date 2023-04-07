import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import animalSchema from "../schemas/animalSchema";

type FormProps = z.infer<typeof animalSchema>;

export default function CadastroAnimal() {
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

  console.log(errors);

  const classNameInput = "border-2 border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-[320px] hover:border-teal-500 hover:shadow-md";

  const checkErrorInput = (message?: string) => {
    if (message) {
      return "border-2 border-red-600 p-2 rounded-lg w-[320px] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-red-600";
    }
    return classNameInput;
  }

  return (
    <>
      <h1 className="sm:text-5xl text-2xl font-medium text-slate-700 pb-8">
        Cadastro de Animal
      </h1>

      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="flex xl:flex-row flex-col gap-4 w-full h-fit pb-4"
      >
        <div className="flex flex-col min-w-1/2 w-1/2 pt-2 gap-5">
          <h2 className="text-2xl font-medium text-slate-700">
            Dados do Animal
          </h2>
          <div className="flex flex-col gap-1">
            <label htmlFor="registroAnimal" className="text-slate-700">
              Registro *
            </label>
            <input
              type="text"
              id="registroAnimal"
              {...register("registroAnimal")}
              className={checkErrorInput(errors.registroAnimal?.message)}
            />
            {errors.registroAnimal && (
              <span className="text-red-600 text-sm px-1">
                {errors.registroAnimal.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="nome" className="text-slate-700">
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
            <label htmlFor="apelido" className="text-slate-700">
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
            <label htmlFor="tipo" className="text-slate-700">
              Tipo *
            </label>
            <div className="relative inline-block w-[320px] text-slate-700">
              <select
                id="tipo"
                {...register("tipo")}
                className={`${checkErrorInput(errors.tipo?.message)} appearance-none pr-6`}
                defaultValue="">
                <option disabled value="">
                  Selecione
                </option>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="outro">Outro</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </div>
            </div>
            {errors.tipo && (
              <span className="text-red-600 text-sm px-1">
                {errors.tipo.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="sexo" className="text-slate-700">
              Sexo *
            </label>
            <div className="relative inline-block w-[320px] text-slate-700">
              <select
                id="sexo"
                {...register("sexo")}
                className={`${checkErrorInput(errors.sexo?.message)} appearance-none pr-6`}
                defaultValue="">
                <option disabled value="">
                  Selecione
                </option>
                <option value="macho">Macho</option>
                <option value="femea">Fêmea</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </div>
            </div>
            {errors.sexo && (
              <span className="text-red-600 text-sm px-1">
                {errors.sexo.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="raca" className="text-slate-700">
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
        </div>

        <div className="xl:min-h-full bg-teal-500 w-1 rounded-lg mr-12"></div>

        <div className="flex flex-col flex-1 pt-2 gap-5">
          <h2 className="text-2xl font-medium text-slate-700">Dados Extras</h2>
          <div className="flex flex-col gap-1">
            <label htmlFor="dataNascimento" className="text-slate-700">
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
            <label htmlFor="dataEntrada" className="text-slate-700">
              Data de Entrada
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
            <label className="text-slate-700">Castrado</label>
            <label className="inline-flex items-center mt-1">
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
            <label htmlFor="descricao" className="text-slate-700">
              Descrição
            </label>
            <textarea
              id="descricao"
              {...register("descricao")}
              className={`${checkErrorInput(errors.descricao?.message)} min-h-[100px]`}
            />
            {errors.descricao && (
              <span className="text-red-600 text-sm px-1">
                {errors.descricao.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="foto" className="text-slate-700">
              Foto *
            </label>
            <input
              type="file"
              id="foto"
              {...register("foto")}
              className="file:mr-3 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-50 file:text-teal-700
              hover:file:bg-teal-500 hover:file:text-white file:cursor-pointer"
            />
            {errors.foto && (
              <span className="text-red-600 text-sm px-1">
                {errors.foto.message as string}
              </span>
            )}
          </div>

          <div className="flex flex-row gap-6 items-center pt-4">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-5 rounded w-28"
            >
              Cadastrar
            </button>
            <button
              type="reset"
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-5 rounded w-28"
              onClick={() => reset()}
            >
              Limpar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
