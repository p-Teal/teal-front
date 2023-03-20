import { User } from "@phosphor-icons/react";


export default function LoginInput () {


  return (
    
    <div className="flex flex-row items-center rounded max-w-full h-14 shadow-md mb-4">
      <label className="bg-slate-200 h-full w-16 flex flex-col items-center justify-center" htmlFor="login">
      <User size={32} weight="regular" />
      </label>
      <input type="text" name="login" id="login" className="p-2 w-full h-full text-xl outline-0" placeholder="Usuário" autoComplete="off"/>
    </div>
    
  )
}