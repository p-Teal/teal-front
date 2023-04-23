import moment from "moment";
import { z } from "zod";


const doacaoSchema = z.object({
  remetente: z.string().trim().min(5, "Remetente precisa ter no mínimo 5 caracteres").max(50, "Remetente precisa ter no máximo 50 caracteres"),
  contato: z.string().trim().min(5, "Contato precisa ter no mínimo 5 caracteres").max(50, "Contato precisa ter no máximo 50 caracteres"),
  item: z.string().trim().min(3, "Item precisa ter no mínimo 3 caracteres").max(50, "Item precisa ter no máximo 50 caracteres"),
  quantidade: z.string().trim().min(1, "Quantidade precisa ter no mínimo 1 caracteres").max(20, "Quantidade precisa ter no máximo 20 caracteres"),
  data: z
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
  descricao: z
    .optional(
      z.string().max(500, "Descrição precisa ter no máximo 500 caracteres")
    )
    .or(z.literal("")),
});

export default doacaoSchema;