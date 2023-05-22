import { Key } from "@phosphor-icons/react";

interface LoginProps {
  register: any;
  error: string | undefined;
}

export default function LoginInput({ register, error }: LoginProps) {
  const hasError = error ? true : false;

  return (
    <>
      <div
        className={`flex flex-row items-center rounded max-w-[320px] min-w-[320px] h-14 shadow-md`}
      >
        <label
          className="bg-slate-200 h-full min-w-[50px] flex flex-col items-center justify-center"
          htmlFor="login"
        >
          <Key size={32} weight="regular" />
        </label>
        <input
          {...register("login")}
          type="text"
          name="login"
          id="login"
          className="p-2 w-full h-full text-xl outline-0"
          placeholder="CPF"
          autoComplete="off"
        />
      </div>
      {hasError && (
        <span className="text-red-500 text-xs mt-2 pl-1">{error}</span>
      )}
    </>
  );
}
