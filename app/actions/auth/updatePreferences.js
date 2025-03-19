'use server'

/**
 * @description Atualizar preferências do usuário
 * @category user
 * @inputModel {
 *   "language": "en-US",
 *   "notifications": {
 *     "email": true,
 *     "push": false,
 *     "marketing": true
 *   }
 * }
 */

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/withAuth";

// Schema para validação
const schema = z.object({
  language: z.string().min(2).max(10).default("en-US"),
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(false),
    marketing: z.boolean().default(false),
  }).default({}),
});

export async function updatePreferences(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Raw FormData:', rawData);
    
    // Verificar se notifications está sendo enviado como JSON string
    let parsedData = {};
    
    // Adicionar language
    parsedData.language = rawData.language || 'en-US';
    
    // Processar notifications
    if (rawData.notifications) {
      try {
        // Tentar fazer parse se for uma string JSON
        parsedData.notifications = JSON.parse(rawData.notifications);
      } catch (e) {
        console.error('Erro ao fazer parse de notifications:', e);
        // Fallback para valores padrão
        parsedData.notifications = {
          email: true,
          push: false,
          marketing: false
        };
      }
    } else if (rawData["notifications.email"] !== undefined) {
      // Formato alternativo: campos individuais
      parsedData.notifications = {
        email: rawData["notifications.email"] === "true",
        push: rawData["notifications.push"] === "true",
        marketing: rawData["notifications.marketing"] === "true",
      };
    } else {
      // Valores padrão
      parsedData.notifications = {
        email: true,
        push: false,
        marketing: false
      };
    }
    
    console.log('Dados processados:', parsedData);

    // Validação dos dados do formulário  
    const validation = schema.safeParse(parsedData);

    // Se houver erro de validação, retorna imediatamente com os erros
    if (!validation.success) {
      console.error('Erro de validação:', validation.error);
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Dados validados
    const data = validation.data;
    console.log('Dados validados:', data);
    
    // Pega o usuário autenticado e o cliente Supabase e usa o que precisar
    const { user, profile, supabase } = await requireAuth();
    
    // Atualizar as preferências no perfil do usuário
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        language: data.language,
        notification_email: data.notifications.email,
        notification_push: data.notifications.push,
        notification_marketing: data.notifications.marketing,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id);
    
    if (updateError) {
      console.error("Erro ao atualizar preferências:", updateError);
      return {
        success: false,
        errors: {
          _form: "Erro ao salvar preferências: " + updateError.message,
        },
      };
    }
    
    // Revalidar o caminho para atualizar os dados na UI
    revalidatePath('/me/perfil');
    
    return { 
      success: true,
      message: "Preferências atualizadas com sucesso!",
      data: {
        language: data.language,
        notifications: data.notifications
      }
    };

  } catch (error) {
    console.error("updatePreferences error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao atualizar preferências. Tente novamente.",
      },
    };
  }
}