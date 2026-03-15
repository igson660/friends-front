import { z } from "zod";

export const personSchema = z.object({
  name: z.string().min(3),
  cpf: z.string().min(11),
  birth_date: z.string(),

  status: z.string(),

  email: z.string().email(),
  phone: z.string().optional().nullable(),
  parent: z.string(),

  address: z.object({
    zip_code: z.string(),
    address: z.string(),
    address_number: z.string(),
    address_complement: z.string().optional(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
  }),
});
