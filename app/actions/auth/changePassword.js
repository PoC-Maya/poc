'use server'

/**
 * @description Alterar senha do usuário
 * @category auth
 * @inputModel {
 *   "currentPassword": "senhaAtual",
 *   "newPassword": "novaSenha",
 *   "confirmPassword": "novaSenha"
 * }
 */

import { requireAuth } from "@/lib/withAuth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema para validação
const schema = z.object({
  currentPassword: z.string().min(6, "A senha atual deve ter pelo menos 6 caracteres"),
  newPassword: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A confirmação da senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export async function changePassword(prevState, formData) {
  try {
    // Pega o usuário autenticado e o cliente Supabase
    const { user, supabase } = await requireAuth();

    if (!user) {
      return {
        success: false,
        errors: {
          _form: "Usuário não autenticado. Faça login para alterar a senha.",
        },
      };
    }

    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    
    // Log seguro: substitui os valores reais das senhas por asteriscos para não expor dados sensíveis nos logs
    console.log('Dados recebidos (senhas ocultadas):', { 
      ...rawData, 
      currentPassword: '***', 
      newPassword: '***', 
      confirmPassword: '***' 
    });

    // Validação dos dados do formulário  
    const validation = schema.safeParse(rawData);

    // Se houver erro de validação, retorna imediatamente com os erros
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Dados validados
    const data = validation.data;

    // Verificar a senha atual usando o método de login
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: data.currentPassword,
    });

    if (verifyError) {
      return {
        success: false,
        errors: {
          currentPassword: "Senha atual incorreta",
          _form: "Não foi possível verificar a senha atual",
        },
      };
    }

    // Atualizar a senha
    const { error: updateError } = await supabase.auth.updateUser({
      password: data.newPassword,
    });

    if (updateError) {
      console.error("Erro ao atualizar senha:", updateError);
      return {
        success: false,
        errors: {
          _form: "Erro ao atualizar senha: " + updateError.message,
        },
      };
    }

    // Revalidar caminhos relevantes - corrigido para /me/perfil
    revalidatePath('/me/perfil');
    
    return { 
      success: true,
      message: "Senha alterada com sucesso",
    };

  } catch (error) {
    console.error("changePassword error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao alterar senha. Tente novamente.",
      },
    };
  }
}