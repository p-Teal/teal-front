import { z } from "zod";
import moment from "moment";

const animalSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Nome precisa ter no mínimo 2 caracteres")
    .max(50, "Nome precisa ter no máximo 50 caracteres"),
  apelido: z
    .string()
    .trim()
    .min(2, "Apelido precisa ter no mínimo 2 caracteres")
    .max(50, "Apelido precisa ter no máximo 50 caracteres"),
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
    }, "Data de Nascimento precisa ser anterior ou igual a data de hoje")
    .or(z.literal("")),
  dataEntrada: z
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
    }, "Data de Entrada precisa ser anterior ou igual a data de hoje")
    .or(z.literal("")),
  castrado: z.boolean(),
  descricao: z
    .optional(
      z.string().max(500, "Descrição precisa ter no máximo 500 caracteres")
    )
    .or(z.literal("")),
  urlFoto: z.any().refine((value) => {
    if (!value || value.length === 0) return false;
    const [type, extension] = value[0].type.split("/");
    return type === "image" && ["jpeg", "png", "jpg"].includes(extension);
  }, "Selecione uma imagem válida"),
});

export default animalSchema;
