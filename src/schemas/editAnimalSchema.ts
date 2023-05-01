import { z } from "zod";
import moment from "moment";

const editAnimalSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Nome precisa ter no mínimo 2 caracteres")
    .max(50, "Nome precisa ter no máximo 50 caracteres"),
  apelido: z
    .string()
    .trim()
    .min(2, "Apelido precisa ter no mínimo 2 caracteres")
    .max(20, "Apelido precisa ter no máximo 20 caracteres"),
  tipo: z
    .string()
    .refine(
      (value) => ["cachorro", "gato", "outro"].includes(value),
      "Selecione uma opção válida"
    ),
  sexo: z
    .string()
    .refine(
      (value) => ["M", "F"].includes(value),
      "Selecione uma opção válida"
    ),
  raca: z
    .string()
    .trim()
    .min(3, "Raça precisa ter no mínimo 3 caracteres")
    .max(50, "Raça precisa ter no máximo 50 caracteres"),
  porte: z
    .string()
    .refine(
      (value) => ["pequeno", "médio", "grande"].includes(value),
      "Selecione uma opção válida"
    ),
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
  dataEntrada: z
    .string()
    .refine(
      (value) => value.length === 10,
      "Data obrigatória e precisa ter o formato dd/mm/aaaa"
    )
    .refine((value) => {
      if (!value) return true;
      const dataAmanha = moment().add(1, "days");
      const [ano, mes, dia] = value.split("/");
      const dataNascimento = moment(`${ano}-${mes}-${dia}`, "YYYY-MM-DD");
      return dataNascimento.isBefore(dataAmanha, "day");
    }, "Data precisa ser anterior ou igual a data de hoje"),
  castrado: z.boolean(),
  descricao: z
    .optional(
      z.string().max(500, "Descrição precisa ter no máximo 500 caracteres")
    )
    .or(z.literal("")),
  status: z
    .string()
    .refine(
      (value) => ["em tratamento", "disponível", "não disponível"].includes(value),
      "Selecione uma opção válida"
    ),
});

export default editAnimalSchema;
