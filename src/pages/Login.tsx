import LoginInput from "../components/LoginInput";
import PasswordInput from "../components/PasswordInput";
import { GithubLogo, Link, SignIn } from "@phosphor-icons/react";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginVoluntario } from "../services/voluntario";
import { toast } from "react-toastify";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";

const schema = z.object({
  login: z.string().trim().length(11, "CPF precisa ter 11 caracteres"),
  senha: z
    .string()
    .trim()
    .min(6, "Senha precisa ter no mínimo 6 caracteres")
    .max(30, "Senha precisa ter no máximo 30 caracteres"),
});

type FormProps = z.infer<typeof schema>;

export default function Login() {
  const { dispatch, voluntarioId } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (voluntarioId) {
      setTimeout(() => {
        navigate("/");
      }, 3500);
    }
  }, [voluntarioId, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    shouldFocusError: true,
  });

  const handleFormSubmit = async (data: FormProps) => {
    const response = await loginVoluntario({
      cpf: data.login,
      senha: data.senha,
    });
    if (response.status === 200) {
      toast.success("Login realizado com sucesso! Redirecionando...");
      reset();
      const { admin, _id, nome, cpf } = response.data.voluntario;
      dispatch({
        type: "SET_VOLUNTARIO",
        payload: {
          admin,
          voluntarioId: _id,
          voluntarioNome: nome,
          voluntarioCpf: cpf,
        },
      });
      return;
    } else if (response.status === 401) {
      toast.error(`Erro! ${response.data.mensagem}`);
      reset();
      return;
    } else {
      toast.error(`Erro! ${response.data.mensagem}`);
      reset();
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="rounded hover:shadow-xl bg-white p-8 mt-14 max-w-sm border-y-4 border-teal-500">
        <div className="w-full mb-8">
          <img src="/src/assets/Logo.svg" alt="Logo" className="mx-auto" />
        </div>
        <h1 className="text-4xl text-center mb-8 text-slate-700">Login</h1>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <LoginInput register={register} error={errors.login?.message} />
          <PasswordInput register={register} />
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-4 rounded my-6 shadow-md flex flex-row justify-center items-center"
          >
            <SignIn size={32} />
            {isSubmitting ? "Carregando..." : "Acessar"}
          </button>
        </form>
        <NavLink to="/cadastro" className="text-right">
          <p className="text-slate-500 hover:text-slate-700 text-sm">
            Cadastre-se como voluntário
          </p>
        </NavLink>
      </div>
      <div className="mb-9 mt-5 flex flex-row">
        <GithubLogo size={32} color="#334155" className="cursor-pointer mr-2" />
        <Link size={32} color="#334155" className="cursor-pointer ml-2" />
      </div>
    </div>
  );
}
