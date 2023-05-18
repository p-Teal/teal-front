import { useAppContext } from "../context/appContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import editTutorSchema from "../schemas/editTutorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { updateAnimal } from "../services/animalService";
import { useNavigate } from "react-router-dom";

type FormProps = z.infer<typeof editTutorSchema>;
const sessionMessage = "Sessão expirada, faça login novamente para continuar.";

const classNameInput =
  "border-2 border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-[320px] hover:border-teal-500 hover:shadow-md";

const checkErrorInput = (message?: string) => {
  if (message) {
    return "border-2 border-red-600 p-2 rounded-lg w-[320px] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-red-600";
  }
  return classNameInput;
};

interface Props {
  tutorData: any;
  tutorId: string | undefined;
}

export default function EdicaoTutor({ tutorData, tutorId }: Props) {
  const { logoutContext } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>({
    mode: "onSubmit",
    resolver: zodResolver(editTutorSchema),
    shouldFocusError: true,
  });
  const nav = useNavigate();

  useEffect(() => {
    if (tutorData) {
      reset(tutorData);
    }
  }, [tutorData, reset]);

  return (
    <>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="flex xl:flex-row flex-col gap-4 w-full h-fit pb-4"
        autoComplete="off"
      >
        <div className="flex flex-col min-w-1/2 w-1/2 pt-2 gap-5">
          <h2 className="text-2xl font-medium text-slate-700">
            Dados do Tutor
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="status" className="text-slate-700">
              Aprovação *
            </label>
            <div className="relative inline-block w-[320px] text-slate-700">
              <select
                id="status"
                {...register("status")}
                className={`${checkErrorInput(
                  errors.status?.message
                )} appearance-none pr-6`}
                defaultValue=""
              >
                <option disabled value="">
                  Selecione
                </option>
                <option value="aprovado">Aprovado</option>
                <option value="reprovado">Reprovado</option>
                <option value="em análise">Em análise</option>
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
            {errors.status && (
              <span className="text-red-600 text-sm px-1">
                {errors.status.message}
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
            <label htmlFor="telefone" className="text-slate-700">
              Telefone *
            </label>
            <input
              type="text"
              id="telefone"
              {...register("telefone")}
              className={checkErrorInput(errors.telefone?.message)}
            />
            {errors.telefone && (
              <span className="text-red-600 text-sm px-1">
                {errors.telefone.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="endereco" className="text-slate-700">
              Endereço *
            </label>
            <input
              type="text"
              id="endereco"
              {...register("endereco")}
              className={checkErrorInput(errors.endereco?.message)}
            />
            {errors.endereco && (
              <span className="text-red-600 text-sm px-1">
                {errors.endereco.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cidade" className="text-slate-700">
              Cidade *
            </label>
            <input
              type="text"
              id="cidade"
              {...register("cidade")}
              className={checkErrorInput(errors.cidade?.message)}
            />
            {errors.cidade && (
              <span className="text-red-600 text-sm px-1">
                {errors.cidade.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="estado" className="text-slate-700">
              Estado (UF) *
            </label>
            <input
              type="text"
              id="estado"
              {...register("estado")}
              className={checkErrorInput(errors.estado?.message)}
            />
            {errors.estado && (
              <span className="text-red-600 text-sm px-1">
                {errors.estado.message}
              </span>
            )}
          </div>
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
            <label htmlFor="profissao" className="text-slate-700">
              Profissão *
            </label>
            <input
              type="text"
              id="profissao"
              {...register("profissao")}
              className={checkErrorInput(errors.profissao?.message)}
            />
            {errors.profissao && (
              <span className="text-red-600 text-sm px-1">
                {errors.profissao.message}
              </span>
            )}
          </div>
        </div>

        <div className="xl:min-h-full bg-teal-500 w-1 rounded-lg mr-12"></div>

        <div className="flex flex-col flex-1 pt-2 gap-5">
          <h2 className="text-2xl font-medium text-slate-700">Dados Extras</h2>
          <div className="flex flex-col gap-1">
            <label htmlFor="tipoMoradia" className="text-slate-700">
              Tipo Moradia *
            </label>
            <div className="relative inline-block w-[320px] text-slate-700">
              <select
                id="tipoMoradia"
                {...register("tipoMoradia")}
                className={`${checkErrorInput(
                  errors.tipoMoradia?.message
                )} appearance-none pr-6`}
                defaultValue=""
              >
                <option disabled value="">
                  Selecione
                </option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="rural">Rural</option>
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
            {errors.tipoMoradia && (
              <span className="text-red-600 text-sm px-1">
                {errors.tipoMoradia.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="tamanhoFamilia" className="text-slate-700">
              Tamanho da Família *
            </label>
            <input
              type="number"
              id="tamanhoFamilia"
              defaultValue={0}
              {...register("tamanhoFamilia", { valueAsNumber: true })}
              className={checkErrorInput(errors.tamanhoFamilia?.message)}
            />
            {errors.tamanhoFamilia && (
              <span className="text-red-600 text-sm px-1">
                {errors.tamanhoFamilia.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="numCriancas" className="text-slate-700">
              Número de Crianças *
            </label>
            <input
              type="number"
              id="numCriancas"
              defaultValue={0}
              {...register("numCriancas", { valueAsNumber: true })}
              className={checkErrorInput(errors.numCriancas?.message)}
            />
            {errors.numCriancas && (
              <span className="text-red-600 text-sm px-1">
                {errors.numCriancas.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="numAnimais" className="text-slate-700">
              Número de Animais *
            </label>
            <input
              type="number"
              id="numAnimais"
              defaultValue={0}
              {...register("numAnimais", { valueAsNumber: true })}
              className={checkErrorInput(errors.numAnimais?.message)}
            />
            {errors.numAnimais && (
              <span className="text-red-600 text-sm px-1">
                {errors.numAnimais.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="descricao" className="text-slate-700">
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
            <label htmlFor="cpf" className="text-slate-700">
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              disabled
              {...register("cpf")}
              className={checkErrorInput(errors.cpf?.message)}
            />
            {errors.cpf && (
              <span className="text-red-600 text-sm px-1">
                {errors.cpf.message}
              </span>
            )}
          </div>

          <div className="flex flex-row gap-6 items-center pt-4">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-5 rounded w-[320px]"
              disabled={isSubmitting}
            >
              Atualizar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
