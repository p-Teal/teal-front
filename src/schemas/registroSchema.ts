import moment from "moment";
import { z } from "zod";


const registroSchema = z.object({
  titulo: z.string().trim().min(2, "Título precisa ter no mínimo 2 caracteres").max(50, "Título precisa ter no máximo 50 caracteres"),
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
  observacao: z
    .string()
    .trim()
    .min(2, "Observação precisa ter no mínimo 2 caracteres")
    .max(200, "Observação precisa ter no máximo 200 caracteres"),
  tipo: z
    .string()
    .refine(
      (value) => ["veterinário", "vacina", "banho", "tosa", "medicação", "outro"].includes(value),
      "Selecione uma opção válida"
    ),
  anexo: z.any().optional(),
});

export default registroSchema;