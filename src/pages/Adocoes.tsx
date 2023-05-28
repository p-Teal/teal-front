import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import { Plus, ReceiptX, TrashSimple } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

const circleIcon = (ativo: boolean) => {
  if (ativo) {
    return (
      <div className="rounded-full bg-teal-700 h-4 w-4 m-1 shadow-teal-700 shadow-sm"></div>
    );
  }
  return (
    <div className="rounded-full bg-red-600 h-4 w-4 m-1 shadow-red-600 shadow-sm"></div>
  );
};

const sessionMessage = "Sessão expirada, faça login novamente para continuar.";

export default function Adocoes() {
  return (
    <>
      <div className="flex flex-row justify-between items-center pb-8 w-full max-h-[80px]">
        <h1 className="sm:text-5xl text-3xl font-medium text-slate-700">
          Adoções
        </h1>
        <NavLink
          to="/adocoes/novo"
          className="bg-teal-500 text-2xl text-white rounded-lg py-3 flex flex-row items-center justify-evenly w-64 hover:bg-teal-600 hover:shadow-md"
        >
          <Plus size={32} />
          Cadastrar
        </NavLink>
      </div>
    </>
  );
}
