import { NavLink } from "react-router-dom";



export default function NotFoundPage() {

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <h1 className="text-5xl font-medium text-slate-700">404</h1>
      <p className="text-xl text-slate-700">Página não encontrada.</p>

      <NavLink to="/" className="text-xl text-teal-700">Voltar para a página inicial</NavLink>
    </div>
  )
}