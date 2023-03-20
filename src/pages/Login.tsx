import LoginInput from "../components/LoginInput";
import PasswordInput from "../components/PasswordInput";
import { SignIn } from "@phosphor-icons/react";

export default function Login () {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="rounded hover:shadow-xl bg-white p-8 my-20 max-w-sm border-y-4 border-teal-500">
        <h1 className="text-4xl text-center mb-8 text-slate-700">Login</h1>
        <form className="flex flex-col">
          <LoginInput />
          <PasswordInput />
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-4 rounded my-6 shadow-md flex flex-row justify-center items-center">
            <SignIn size={32} />
            Acessar
          </button>
        </form>
        <div className="text-right">
          <a href="#" className="text-slate-500 hover:text-slate-700 text-sm">Cadastre-se como voluntário</a>
        </div>
      </div>
    </div>
  )
}