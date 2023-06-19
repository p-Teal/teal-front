import {
  HandHeart,
  Heart,
  House,
  PawPrint,
  Question,
  Shield,
  SignOut,
  UserCircleGear,
  UsersThree,
} from "@phosphor-icons/react";
import { NavLink, Outlet } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import { useAppContext } from "../context/appContext";

export default function Layout() {
  const { logoutContext, admin } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleActive(isActive: boolean) {
    if (isActive) {
      return "w-full flex flex-row items-center bg-teal-400 p-2";
    }
    return "w-full flex flex-row items-center hover:bg-teal-200 p-2";
  }

  return (
    <main className="min-h-screen flex flex-row w-full">
      <div className="w-1/6 bg-white p-2 flex flex-col justify-between h-full fixed overflow-auto shadow-lg">
        <div>
          <img src="/src/assets/Logo.svg" alt="Logo" className="mx-auto mb-8" />
          <NavLink to="/" className={({ isActive }) => handleActive(isActive)}>
            <House size={30} className="mx-2" />
            {import.meta.env.VITE_ONG_NAME}
          </NavLink>
          <NavLink
            to="/animais"
            className={({ isActive }) => handleActive(isActive)}
          >
            <PawPrint size={30} className="mx-2" />
            Animais
          </NavLink>
          <NavLink
            to="/tutores"
            className={({ isActive }) => handleActive(isActive)}
          >
            <Shield size={30} className="mx-2" />
            Tutores
          </NavLink>
          <NavLink
            to="/adocoes"
            className={({ isActive }) => handleActive(isActive)}
          >
            <Heart size={30} className="mx-2" />
            Adoções
          </NavLink>
          <NavLink
            to="/doacoes"
            className={({ isActive }) => handleActive(isActive)}
          >
            <HandHeart size={30} className="mx-2" />
            Doações
          </NavLink>
          {admin && (
            <NavLink
              to="/voluntarios"
              className={({ isActive }) => handleActive(isActive)}
            >
              <UsersThree size={30} className="mx-2" />
              Voluntários
            </NavLink>
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <NavLink
            to="/perfil"
            className={({ isActive }) => handleActive(isActive)}
          >
            <UserCircleGear size={30} className="mx-2" />
            Perfil
          </NavLink>
          <NavLink
            to="/sobre"
            className={({ isActive }) => handleActive(isActive)}
          >
            <Question size={30} className="mx-2" />
            Sobre
          </NavLink>
          <div
            className="w-full flex flex-row items-center hover:bg-red-600 hover:text-white p-2 cursor-pointer"
            onClick={openModal}
          >
            <SignOut size={30} className="mx-2" />
            Sair
          </div>
        </div>
      </div>
      <div className="w-5/6 ml-[18%] pl-4 pt-10 pr-8 mb-14">
        <Outlet />
      </div>
      <Modal onClose={closeModal} isOpen={isOpen} title="LOGOUT">
        <p className="text-center py-3">Deseja realmente sair?</p>
        <div className="flex flex-row justify-center pt-3">
          <button
            className="bg-teal-500 text-white rounded-lg px-6 py-2 mx-2 hover:bg-teal-600"
            onClick={logoutContext}
          >
            Sim
          </button>
          <button
            className="border-2 border-teal-500 text-teal-500 rounded-lg px-6 py-2 mx-2 hover:font-bold"
            onClick={closeModal}
          >
            Não
          </button>
        </div>
      </Modal>
    </main>
  );
}
