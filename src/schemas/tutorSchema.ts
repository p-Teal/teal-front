import { z } from "zod";
import moment from "moment";

const tutorSchema = z.object({
  cpf: z.string().trim().min(11, 'CPF precisa ter 11 caracteres').max(11, 'CPF precisa ter 11 caracteres'),
  nome: z
    .string()
    .trim()
    .min(10, "Nome precisa ter no mínimo 10 caracteres")
    .max(50, "Nome precisa ter no máximo 50 caracteres"),
  telefone: z
    .string()
    .trim()
    .min(2, "Telefone precisa ter no mínimo 10 caracteres")
    .max(20, "Telefone precisa ter no máximo 11 caracteres"),
  email: z
    .optional(
      z.string().trim().email("Email precisa ser válido")
    )
    .or(z.literal("")),
  endereco: z
    .string()
    .trim()
    .min(10, "Endereço precisa ter no mínimo 10 caracteres")
    .max(100, "Endereço precisa ter no máximo 100 caracteres"),
  cidade: z
    .string()
    .trim()
    .min(3, "Cidade precisa ter no mínimo 3 caracteres")
    .max(50, "Cidade precisa ter no máximo 50 caracteres"),
  estado: z
    .string()
    .trim()
    .min(2, "Estado precisa ter no mínimo 2 caracteres")
    .max(2, "Estado precisa ter no máximo 2 caracteres"),
  tipoMoradia: z
    .string()
    .refine(
      (value) => ["casa", "apartamento", "rural", "outro"].includes(value),
      "Selecione uma opção válida"
    ),
  tamanhoFamilia: z
    .number()
    .min(1, "Tamanho da família precisa ser maior que 0"),
  profissao: z
    .string()
    .trim()
    .min(3, "Profissão precisa ter no mínimo 3 caracteres")
    .max(50, "Profissão precisa ter no máximo 50 caracteres"),
  numCriancas: z
    .number()
    .min(0, "Número de crianças precisa ser maior ou igual a 0"),
  numAnimais: z
    .number()
    .min(0, "Número de animais precisa ser maior ou igual a 0"),
  dataNascimento: z
    .optional(
      z
        .string()
        .refine(
          (value) => value.length === 10,
          "Data precisa ter o formato dd/mm/aaaa"
        )
    )
    .refine((value) => {
      if (!value) return true;
      const dataAmanha = moment().add(1, "days");
      const [ano, mes, dia] = value.split("/");
      const dataNascimento = moment(`${ano}-${mes}-${dia}`, "YYYY-MM-DD");
      return dataNascimento.isBefore(dataAmanha, "day");
    }, "Data precisa ser anterior ou igual a data de hoje")
    .or(z.literal("")),
  descricao: z
    .optional(
      z.string().max(500, "Descrição precisa ter no máximo 500 caracteres")
    )
    .or(z.literal("")),
});

export default tutorSchema;