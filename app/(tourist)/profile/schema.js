import { z } from "zod";

//  app/(tourist)/profile/components/profile-form.js
export const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "Nome completo deve ter pelo menos 2 caracteres.",
    })
    .max(50),
  phone: z.string().optional(),
  bio: z.string().max(500).optional(),
});

// app/(tourist)/profile/components/change-password-dialog.js
export const passwordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "A senha atual é obrigatória.",
  }),
  newPassword: z.string().min(6, {
    message: "A nova senha deve ter pelo menos 6 caracteres.",
  }),
  confirmPassword: z.string().min(6, {
    message: "A confirmação da senha é obrigatória.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});