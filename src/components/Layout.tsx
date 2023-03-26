import { Heart, House, Package, PawPrint, Question, Shield, SignOut, UserCircleGear, UsersThree } from "@phosphor-icons/react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {

  function handleActive(isActive: boolean) {
    if (isActive) {
      return "w-full flex flex-row items-center bg-teal-400 p-2"
    }
    return "w-full flex flex-row items-center hover:bg-teal-200 p-2";
  }

  return (
    <main className="min-h-screen flex flex-row w-full">
      <div className="w-1/6 bg-white p-2 flex flex-col justify-between h-screen fixed overflow-auto">
        <div>
          <img src="/src/assets/Logo.svg" alt="Logo" className="mx-auto mb-8" />
          <NavLink to="/" className={({ isActive }) => handleActive(isActive)}>
            <House size={30} className="mx-2" />
            {import.meta.env.VITE_ONG_NAME}
          </NavLink>
          <NavLink to="/voluntarios" className={({ isActive }) => handleActive(isActive)}>
            <UsersThree size={30} className="mx-2" />
            Voluntários
          </NavLink>
          <NavLink to="/animais" className={({ isActive }) => handleActive(isActive)}>
            <PawPrint size={30} className="mx-2" />
            Animais
          </NavLink>
          <NavLink to="/tutores" className={({ isActive }) => handleActive(isActive)}>
            <Shield size={30} className="mx-2" />
            Tutores
          </NavLink>
          <NavLink to="/adocoes" className={({ isActive }) => handleActive(isActive)}>
            <Heart size={30} className="mx-2" />
            Adoções
          </NavLink>
          <NavLink to="/estoque" className={({ isActive }) => handleActive(isActive)}>
            <Package size={30} className="mx-2" />
            Estoque
          </NavLink>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <NavLink to="/perfil" className={({ isActive }) => handleActive(isActive)}>
            <UserCircleGear size={30} className="mx-2" />
            Perfil
          </NavLink>
          <NavLink to="/sobre" className={({ isActive }) => handleActive(isActive)}>
            <Question size={30} className="mx-2" />
            Sobre
          </NavLink>
          <NavLink to="/sair" className="w-full flex flex-row items-center hover:bg-red-200 p-2">
            <SignOut size={30} className="mx-2" />
            Sair
          </NavLink>
        </div>
      </div>
      <div className="w-5/6 ml-[18%] p-2">
        <Outlet />
        <p className="text-white text-9xl">b</p>
        <p className="text-white text-9xl">b</p>
        <p className="text-white text-9xl">b</p>
        <p className="text-white text-9xl">b</p>
        <p className="text-white text-9xl">b</p>
        <p className="text-white text-9xl">b</p>
        <p className="text-white text-9xl">b</p>
        <p className="text-white text-9xl">b</p>

      </div>
    </main>
  )
}