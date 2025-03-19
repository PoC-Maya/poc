'use server'

/**
 * @description Atualizar perfil do usuário
 * @category user
 * @inputModel {
 *   "fullName": "Nome Atualizado",
 *   "phone": "11999999999",
 *   "bio": "Breve descrição sobre mim",
 *   "nationality": "Brazilian",
 *   "language": "en-US"
 * }
 */

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/withAuth";

// Schema para validação
const schema = z.object({
  fullName: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres").max(100),
  phone: z.string().min(8, "Telefone deve ter pelo menos 8 caracteres").max(20).optional(),
  bio: z.string().max(500, "Biografia deve ter no máximo 500 caracteres").optional(),
  nationality: z.string().min(2, "Nacionalidade deve ter pelo menos 2 caracteres").max(50).optional(),
  language: z.string().min(2, "Idioma deve ter pelo menos 2 caracteres").max(10).default("en-US"),
});

export async function updateProfile(prevState, formData) {
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
    
    // Pega o usuário autenticado e o cliente Supabase e usa o que precisar
    const { user, profile, supabase } = await requireAuth();
    
    // Atualizar perfil no banco de dados
    const { error: updateProfileError } = await supabase
      .from('profiles')
      .update({
        full_name: data.fullName,
        phone: data.phone || null,
        bio: data.bio || null,
        nationality: data.nationality || null,
        language: data.language,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id);
    
    if (updateProfileError) {
      console.error("Erro ao atualizar perfil:", updateProfileError);
      return {
        success: false,
        errors: {
          _form: "Erro ao atualizar perfil: " + updateProfileError.message,
        },
      };
    }
    
    // Revalidar o caminho para atualizar os dados na UI
    revalidatePath('/me/perfil');
    
    return { 
      success: true,
      message: "Perfil atualizado com sucesso!",
    };

  } catch (error) {
    console.error("updateProfile error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao atualizar perfil. Tente novamente.",
      },
    };
  }
}