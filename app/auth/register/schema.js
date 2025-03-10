// /app/auth/register/schema.js
import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
    fullName: z
      .string()
      .min(3, "Nome completo deve ter pelo menos 3 caracteres"),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
