import { GithubLogo, Link, UserCirclePlus } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cadastrarVoluntario } from "../services/voluntarioService";

const schema = z.object({
  nome: z
    .string()
    .trim()
    .min(10, "Nome precisa ter no mínimo 10 caracteres")
    .max(50, "Nome precisa ter no máximo 50 caracteres"),
  cpf: z
    .string()
    .trim()
    .regex(/^\d{11}$/, "CPF precisa ter 11 caracteres numéricos"),
  senha: z
    .string()
    .trim()
    .min(6, "Senha precisa ter no mínimo 6 caracteres")
    .max(30, "Senha precisa ter no máximo 30 caracteres"),
});

type FormProps = z.infer<typeof schema>;

export default function CadastroVoluntario() {
  const nav = useNavigate();

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

  const handleErrorInputRing = (message?: string): string => {
    if (message) {
      return "border-2 border-red-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent";
    }
    return "border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent";
  };

  const handleFormSubmit = async (data: FormProps) => {
    const response = await cadastrarVoluntario({
      nome: data.nome,
      cpf: data.cpf,
      senha: data.senha,
    });

    if (response.status === 201) {
      const { admin } = response.data.voluntario;
      if (admin) {
        toast.success(
          "Administrador cadastrado com sucesso! Redirecionando..."
        );
      } else {
        toast.success("Voluntário cadastrado com sucesso! Redirecionando...");
      }
      setTimeout(() => {
        nav("/login");
      }, 2500);
      reset();
      return;
    }

    toast.error(`Erro! ${response.data.mensagem}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="rounded hover:shadow-xl bg-white p-7 mt-4 max-w-sm border-y-4 border-teal-500">
        <div className="w-full mb-8">
          <img src="/Logo.svg" alt="Logo" className="mx-auto" />
        </div>
        <h1 className="text-4xl text-center mb-8 text-slate-700">
          Cadastrar Voluntário
        </h1>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleFormSubmit)}
          autoComplete="off"
        >
          <div className="flex flex-col py-1 h-fit">
            <input
              type="text"
              placeholder="Nome Completo"
              {...register("nome")}
              className={handleErrorInputRing(errors.nome?.message)}
            />
            <span className="text-red-500 text-sm pl-2 pt-1">
              {errors.nome?.message}
            </span>
          </div>

          <div className="flex flex-col py-1 h-fit">
            <input
              type="text"
              placeholder="CPF"
              {...register("cpf")}
              className={handleErrorInputRing(errors.cpf?.message)}
            />
            <span className="text-red-500 text-sm pl-2 pt-1">
              {errors.cpf?.message}
            </span>
          </div>

          <div className="flex flex-col py-1 h-fit">
            <input
              type="password"
              placeholder="Senha"
              {...register("senha")}
              className={handleErrorInputRing(errors.senha?.message)}
            />
            <span className="text-red-500 text-sm pl-2 pt-1">
              {errors.senha?.message}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-4 rounded mb-6 mt-7 shadow-md flex flex-row justify-center items-center"
          >
            <UserCirclePlus size={32} />
            {isSubmitting ? "Carregando..." : "Registrar"}
          </button>
        </form>
        <NavLink to="/login" className="text-right">
          <p className="text-slate-500 hover:text-slate-700 text-sm">
            Já possuí cadastro? Logar.
          </p>
        </NavLink>
      </div>
      <div className="mb-2 mt-5 flex flex-row">
        <GithubLogo size={32} color="#334155" className="cursor-pointer mr-2" />
        <Link size={32} color="#334155" className="cursor-pointer ml-2" />
      </div>
    </div>
  );
}
