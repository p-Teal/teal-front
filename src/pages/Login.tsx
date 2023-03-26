import LoginInput from "../components/LoginInput";
import PasswordInput from "../components/PasswordInput";
import { GithubLogo, Link, SignIn } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

export default function Login () {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="rounded hover:shadow-xl bg-white p-8 mt-14 max-w-sm border-y-4 border-teal-500">
        <div className="w-full mb-8">
          <img src="/src/assets/Logo.svg" alt="Logo" className="mx-auto" />
        </div>
        <h1 className="text-4xl text-center mb-8 text-slate-700">Login</h1>
        <form className="flex flex-col">
          <LoginInput />
          <PasswordInput />
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-4 rounded my-6 shadow-md flex flex-row justify-center items-center">
            <SignIn size={32} />
            Acessar
          </button>
        </form>
        <NavLink to="/cadastro" className="text-right">
          <p className="text-slate-500 hover:text-slate-700 text-sm">Cadastre-se como voluntário</p>
        </NavLink>
      </div>
      <div className="mb-9 mt-5 flex flex-row">
        <GithubLogo size={32} color="#334155" className="cursor-pointer mr-2"/>
        <Link size={32} color="#334155" className="cursor-pointer ml-2"/>
      </div>
    </div>
  )
}