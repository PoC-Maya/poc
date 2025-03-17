'use server'

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

// Referência ao mesmo Map usado em resetPassword.js
// Em produção, use um banco de dados
// Esta é uma solução temporária que não funcionará em ambientes com múltiplas instâncias
import { resetTokens } from '@/app/actions/auth/resetPassword';

// Schema para validação
const schema = z.object({
  token: z.string().min(1, "Token inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export async function completePasswordReset(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    
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
    const { token, password } = data;
    
    // Verificar se o token existe e é válido
    const tokenData = resetTokens.get(token);
    
    if (!tokenData) {
      return {
        success: false,
        errors: {
          _form: "Token inválido ou expirado. Por favor, solicite um novo link de redefinição de senha.",
        },
      };
    }
    
    // Verificar se o token expirou
    const expiresAt = new Date(tokenData.expiresAt);
    if (expiresAt < new Date()) {
      // Remover token expirado
      resetTokens.delete(token);
      
      return {
        success: false,
        errors: {
          _form: "O link de redefinição de senha expirou. Por favor, solicite um novo link.",
        },
      };
    }
    
    // Obter o email associado ao token
    const email = tokenData.email;
    
    // Criar cliente Supabase
    const supabase = await createClient();
    
    // Atualizar a senha do usuário
    const { error } = await supabase.auth.updateUser({
      email,
      password,
    });
    
    if (error) {
      console.error("Erro ao atualizar senha:", error);
      return {
        success: false,
        errors: {
          _form: "Erro ao atualizar senha: " + error.message,
        },
      };
    }
    
    // Remover o token usado
    resetTokens.delete(token);
    
    return { 
      success: true,
      message: "Senha atualizada com sucesso!",
    };

  } catch (error) {
    console.error("completePasswordReset error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao redefinir senha. Tente novamente.",
      },
    };
  }
}