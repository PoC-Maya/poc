//  /orders/create/schema.js
import { z } from "zod";

export const orderSchema = z.object({
  content: z
    .string()
    .min(2, "O conteúdo é obrigatório")
    .refine(
      (val) => {
        try {
          JSON.parse(val);
          return true;
        } catch (e) {
          return false;
        }
      },
      { message: "O conteúdo deve ser um JSON válido" }
    ),
  name: z.string().min(2, "O nome é obrigatório"),
});
