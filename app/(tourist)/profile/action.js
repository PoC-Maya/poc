'use server'

import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/withAuth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema para atualização de perfil
const profileSchema = z.object({
  fullName: z.string().min(3, "Nome muito curto").max(100),
  phone: z.string().min(8, "Telefone inválido").max(20),
  bio: z.string().max(100, "Bio deve ter no máximo 100 caracteres").optional(),
});

// Schema para mudança de senha
const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Senha atual é obrigatória"),
  newPassword: z.string().min(6, "Nova senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
});

export async function updateProfile(prevState, formData) {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay artificial

    const { user, profile, supabase } = await requireAuth();

    const validation = profileSchema.safeParse({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      bio: formData.get("bio"),
    });

    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: validation.data.fullName,
        phone: validation.data.phone,
        bio: validation.data.bio,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (error) throw error;

    revalidatePath('/profile');
    return { success: true };

  } catch (error) {
    console.error("Profile update error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao atualizar perfil. Tente novamente.",
      },
    };
  }
}

export async function updatePassword(prevState, formData) {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const { user, supabase } = await requireAuth();

    const validation = passwordSchema.safeParse({
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    });

    // Se houver erro de validação, retorna imediatamente
    if (!validation.success) {
      return {
        success: false,
        errors: {
          ...validation.error.flatten().fieldErrors,
          _form: "Verifique os campos e tente novamente."
        }
      };
    }

    // Primeiro, verificar a senha atual
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: validation.data.currentPassword,
    });

    if (signInError) {
      return {
        success: false,
        errors: {
          currentPassword: "Senha atual incorreta",
          _form: "Senha atual incorreta. Por favor, verifique.",
        },
      };
    }

    // Se a senha atual estiver correta, atualiza para a nova
    const { error } = await supabase.auth.updateUser({
      password: validation.data.newPassword
    });

    if (error) {
      return {
        success: false,
        errors: {
          _form: "Erro ao atualizar senha. Tente novamente.",
        },
      };
    }

    return { success: true };

  } catch (error) {
    console.error("Password update error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao atualizar senha. Tente novamente.",
      },
    };
  }
}