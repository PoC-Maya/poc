'use server'

/**
 * @description Salvar preferências de consentimento do usuário
 * @category user
 * @inputModel {
 *   "marketing": true,
 *   "analytics": true,
 *   "thirdParty": false
 * }
 */

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/withAuth";

// Schema para validação
const schema = z.object({
  marketing: z.boolean().default(false),
  analytics: z.boolean().default(false),
  thirdParty: z.boolean().default(false),
});

export async function saveConsent(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    
    // Converter strings "true"/"false" para booleanos
    const parsedData = {
      marketing: rawData.marketing === "true",
      analytics: rawData.analytics === "true",
      thirdParty: rawData.thirdParty === "true",
    };
    
    console.log('Dados recebidos:', parsedData);

    // Validação dos dados do formulário  
    const validation = schema.safeParse(parsedData);

    // Se houver erro de validação, retorna imediatamente com os erros
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Dados validados
    const data = validation.data;
    
    // Pega o usuário autenticado e o cliente Supabase e usa o que precisar
    const { user, profile, supabase } = await requireAuth();
    
    // Atualizar as preferências de consentimento no perfil do usuário
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        consent_marketing: data.marketing,
        consent_analytics: data.analytics,
        consent_third_party: data.thirdParty,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id);
    
    if (updateError) {
      console.error("Erro ao atualizar preferências de consentimento:", updateError);
      return {
        success: false,
        errors: {
          _form: "Erro ao salvar preferências de consentimento: " + updateError.message,
        },
      };
    }
    
    // Revalidar o caminho para atualizar os dados na UI
    revalidatePath('/me/perfil');
    
    return { 
      success: true,
      message: "Preferências de consentimento salvas com sucesso!",
    };

  } catch (error) {
    console.error("saveConsent error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao salvar preferências de consentimento. Tente novamente.",
      },
    };
  }
}