import { z } from "zod";

export const addressEmbeddedSchema = z.object({
  zip_code: z.string().min(8, "CEP obrigatório"),
  address: z.string().min(3, "Endereço obrigatório"),
  address_number: z.string().min(1, "Número obrigatório"),
  address_complement: z.string().optional(),
  state: z.string().length(2, "UF inválida"),
  city: z.string().min(2, "Cidade obrigatória"),
  country: z.string().min(2, "País obrigatório"),
});
