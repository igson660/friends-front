import { z } from "zod";

export const personSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),

  mother_name: z.string().min(3, "Nome da mãe deve ter no mínimo 3 caracteres"),

  cpf: z.string().min(11, "CPF inválido"),

  birth_date: z.string().min(10, "Data de nascimento obrigatória"),

  status: z.string(),

  email: z.string().email("Email inválido"),

  phone: z.string().min(10, "Telefone obrigatório"),

  parent: z.string(),

  address: z.object({
    zip_code: z.string().min(8, "CEP obrigatório"),

    address: z.string().min(3, "Endereço obrigatório"),

    address_number: z.string(),

    address_complement: z.string().optional(),

    city: z.string().min(2, "Cidade obrigatória"),

    state: z
      .string()
      .min(2, "Estado obrigatório")
      .max(2, "Use a sigla do estado"),

    country: z.string(),
  }),
});
