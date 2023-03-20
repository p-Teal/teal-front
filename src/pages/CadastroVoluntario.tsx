import { UserCirclePlus } from "@phosphor-icons/react";
import FormInputVoluntario from "../components/FormInputVoluntario";


export default function CadastroVoluntario() {
  return (
    <form>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col bg-white h-fit max-h-[600px] items-center p-8 w-fit mx-auto my-auto rounded hover:shadow-xl border-y-4 border-teal-500">
          <h1 className="text-3xl text-center mb-8 text-slate-700">
            Cadastro de Voluntário
          </h1>
          <div className="w-full overflow-y-scroll p-1">
            
            <FormInputVoluntario type="text" name="nome" text="Nome" />
            <FormInputVoluntario type="email" name="email" text="Email" autocomplete />
            <FormInputVoluntario type="text" name="cpf" text="CPF" />
            <FormInputVoluntario type="text" name="telefone" text="Telefone" />
            <div className="h-2 w-full bg-teal-500 rounded mb-4"></div>
            <h2 className="text-xl text-center mb-8 text-slate-700">
              Informações de Login
            </h2>
            <FormInputVoluntario type="text" name="login" text="Chave para Login" />
            <FormInputVoluntario type="password" name="senha" text="Senha" />
            
          </div>

          <div className="mt-8 bottom-0 w-full">
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-4 rounded my-6 shadow-md flex flex-row justify-center items-center w-full">
            <UserCirclePlus size={32} />
            Cadastrar
          </button>
          </div>

        </div>
      </div>
    </form>
  )
}