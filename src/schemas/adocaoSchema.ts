import { z } from "zod";
import moment from "moment";

const adocaoSchema = z.object({
  cpf: z
    .string()
    .trim()
    .regex(/^\d{11}$/, "CPF precisa ter 11 caracteres numéricos"),
  animalId: z
    .string()
    .trim()
    .refine((value) => value !== "", {
      message: "Selecione um animal para adoção",
    }),
  dataAdocao: z
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
  observacao: z
    .string()
    .trim()
    .min(2, "Observação precisa ter no mínimo 2 caracteres")
    .max(200, "Observação precisa ter no máximo 200 caracteres"),
});

export default adocaoSchema;
