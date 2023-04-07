import { Plus } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

export default function Animais() {
  return (
    <>
      <div className="flex flex-row justify-between items-center pb-8 w-full max-h-[80px]">
        <h1 className="sm:text-5xl text-3xl font-medium text-slate-700">
          Animais
        </h1>
        <NavLink
          to="/animais/novo"
          className="bg-teal-500 text-2xl text-white rounded-md py-3 sm:mr-5 flex flex-row items-center justify-evenly w-64 hover:bg-teal-600 hover:shadow-md"
        >
          <Plus size={32} />
          Cadastrar
        </NavLink>
      </div>
    </>
  );
}
