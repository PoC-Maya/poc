'use server'

/**
 * @description Solicitar redefinição de senha
 * @category auth
 * @inputModel {
 *   "email": "usuario@exemplo.com"
 * }
 */

import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/emailService";
import { z } from "zod";

// Schema para validação
const schema = z.object({
  email: z.string().email("Email inválido"),
});

// Controle de limite de taxa
const rateLimits = new Map();

export async function resetPassword(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Dados recebidos:', rawData);

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
    const email = data.email;
    
    // Verificar limite de taxa
    const now = Date.now();
    const lastRequest = rateLimits.get(email);
    
    if (lastRequest && (now - lastRequest) < 20000) { // 20 segundos
      return {
        success: false,
        errors: {
          _form: "Por motivos de segurança, você só pode solicitar uma redefinição de senha a cada 20 segundos. Por favor, aguarde um momento e tente novamente.",
        },
      };
    }
    
    // Atualizar timestamp do último pedido
    rateLimits.set(email, now);
    
    // Criar cliente Supabase
    const supabase = await createClient();
    
    // Usar a API padrão em vez da API de admin
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/confirm`,
    });
    
    if (error) {
      // Tratamento específico para erro de limite de taxa
      if (error.status === 429 || error.code === 'over_email_send_rate_limit') {
        console.log("Erro de limite de taxa:", error);
        return {
          success: false,
          errors: {
            _form: "Por motivos de segurança, você só pode solicitar uma redefinição de senha a cada 20 segundos. Por favor, aguarde um momento e tente novamente.",
          },
        };
      }
      
      console.error("Erro ao solicitar redefinição:", error);
      return {
        success: false,
        errors: {
          _form: "Erro ao solicitar redefinição de senha: " + error.message,
        },
      };
    }
    
    // Se chegou até aqui, o Supabase enviou o email padrão
    // Podemos enviar um email personalizado adicional se quisermos
    // Mas para evitar confusão, vamos apenas retornar sucesso
    
    return { 
      success: true,
      message: "Se o email estiver cadastrado, você receberá um link para redefinir sua senha.",
    };

  } catch (error) {
    console.error("resetPassword error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao solicitar redefinição de senha. Tente novamente.",
      },
    };
  }
}