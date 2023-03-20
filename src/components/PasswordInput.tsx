import { Password } from "@phosphor-icons/react";


export default function PasswordInput () {


  return (
    
    <div className="flex flex-row items-center rounded max-w-full h-14 shadow-md mb-4">
      <label htmlFor="senha" className="bg-slate-200 h-full w-16 flex flex-col items-center justify-center">
      <Password size={32} />
      </label>
      <input type="password" name="senha" id="senha" className="p-2 w-full h-full text-xl outline-0" placeholder="Senha"/>
    </div>
    
  )
}