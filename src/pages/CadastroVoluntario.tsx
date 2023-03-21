import { GithubLogo, Link, UserCirclePlus } from "@phosphor-icons/react";
import FormInputVoluntario from "../components/FormInputVoluntario";


export default function CadastroVoluntario() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="rounded hover:shadow-xl bg-white p-8 mt-7 max-w-sm border-y-4 border-teal-500">
        <div className="w-full mb-8">
          <img src="/src/assets/Logo.svg" alt="Logo" className="mx-auto" />
        </div>
        <h1 className="text-4xl text-center mb-8 text-slate-700">Cadastrar Voluntário</h1>
        <form className="flex flex-col">
          <FormInputVoluntario type="text" name="nome" text="Nome Completo"/>
          <FormInputVoluntario type="text" name="cpf" text="Cpf"/>
          <FormInputVoluntario type="text" name="celular" text="Celular"/>
          <FormInputVoluntario type="password" name="senha" text="Senha"/>
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-4 rounded my-6 shadow-md flex flex-row justify-center items-center">
            <UserCirclePlus size={32} />
            Registrar
          </button>
        </form>
        <div className="text-right">
          <a href="#" className="text-slate-500 hover:text-slate-700 text-sm">Já possuí cadastro? Logar</a>
        </div>
      </div>
      <div className="mb-2 mt-5 flex flex-row">
        <GithubLogo size={32} color="#334155" className="cursor-pointer mr-2"/>
        <Link size={32} color="#334155" className="cursor-pointer ml-2"/>
      </div>
    </div>
  )
}