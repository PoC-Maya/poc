import { z } from "zod";

//  app/(tourist)/profile/components/profile-form.js
export const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(3, {
      message: "The full name must have at least 3 characters.",
    })
    .max(50),
  phone: z
    .string()
    .min(9, { message: "The phone number must have at least 9 digits." })
    .max(15, { message: "The phone number must have a maximum of 15 digits." })
    .regex(/^\d+$/, { message: "The phone number must only contain numbers." }),
  bio: z
    .string()
    .max(100, { message: "The bio must have a maximum of 100 characters." })
    .optional(),
});

// app/(tourist)/profile/components/change-password-dialog.js
export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "The current password is required.",
    }),
    newPassword: z.string().min(6, {
      message: "The new password must be at least 6 characters long.",
    }),
    confirmPassword: z.string().min(6, {
      message: "The password confirmation is required.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "The passwords do not match.",
    path: ["confirmPassword"],
  });
