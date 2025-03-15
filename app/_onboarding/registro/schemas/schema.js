import { z } from "zod";

export const leadSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(10, "Whatsapp inválido"),
  status: z.string().default("paso1")
});

export const userSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(10, "Whatsapp inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  aceitaTermos: z.boolean().refine(val => val === true, "Você precisa aceitar os termos")
});