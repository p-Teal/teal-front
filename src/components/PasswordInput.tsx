import { Eye, EyeSlash, Password } from "@phosphor-icons/react";
import { useState } from "react";

interface Props {
  register: any;
}

export default function PasswordInput({ register }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex flex-row items-center rounded max-w-[320px] min-w-[320px] h-14 shadow-md mb-4">
      <label
        htmlFor="senha"
        className="bg-slate-200 h-full min-w-[50px] flex flex-col items-center justify-center"
      >
        <Password size={32} />
      </label>
      <input
        {...register("senha")}
        type={`${showPassword ? "text" : "password"}`}
        name="senha"
        id="senha"
        className="p-2 w-full h-full text-xl outline-0"
        placeholder="Senha"
      />
      <div
        className="bg-slate-200 h-full min-w-[50px] flex flex-col items-center justify-center cursor-pointer"
        onClick={handleShowPassword}
      >
        {showPassword ? <EyeSlash size={32} /> : <Eye size={32} />}
      </div>
    </div>
  );
}
