'use server'

/**
 * @description Atualizar avatar do perfil do usuário
 * @category user
 * @inputModel {
 *   "avatar": [File] ou "avatar": "https://res.cloudinary.com/..."
 * }
 */

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/withAuth";

// Schema para validação
const schema = z.object({
  avatar: z.string().url("URL de avatar inválida")
});

export async function updateProfileAvatar(prevState, formData) {
  try {
    // Extrair o avatar do FormData
    const avatar = formData.get('avatar');
    console.log('Avatar recebido:', avatar ? (typeof avatar === 'string' ? avatar : `${avatar.name} (${avatar.size} bytes)`) : 'Nenhum avatar');

    if (!avatar) {
      return {
        success: false,
        errors: {
          avatar: "Nenhum avatar fornecido",
        },
      };
    }

    // Verificar se o avatar é uma URL do Cloudinary ou um arquivo
    let avatarUrl = null;
    
    if (typeof avatar === 'string' && avatar.startsWith('http')) {
      // É uma URL do Cloudinary
      avatarUrl = avatar;
      console.log("URL de avatar detectada:", avatarUrl);
    } else if (avatar instanceof File) {
      // É um arquivo, mas não temos a URL do Cloudinary ainda
      // A URL deve ser fornecida pelo frontend após o upload para o Cloudinary
      return {
        success: false,
        errors: {
          avatar: "O upload de arquivos deve ser feito diretamente para o Cloudinary pelo frontend",
        },
      };
    } else {
      return {
        success: false,
        errors: {
          avatar: "Formato de avatar inválido",
        },
      };
    }

    // Validação da URL
    const validation = schema.safeParse({ avatar: avatarUrl });

    // Se houver erro de validação, retorna imediatamente com os erros
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }
    
    // Pega o usuário autenticado e o cliente Supabase e usa o que precisar
    const { user, profile, supabase } = await requireAuth();
    
    // Atualizar o perfil com a nova URL do avatar
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id);
    
    if (updateError) {
      console.error("Erro ao atualizar perfil com novo avatar:", updateError);
      return {
        success: false,
        errors: {
          _form: "Erro ao atualizar perfil: " + updateError.message,
        },
      };
    }
    
    // Revalidar o caminho para atualizar os dados na UI
    revalidatePath('/me/perfil');
    
    return { 
      success: true,
      message: "Avatar atualizado com sucesso!",
      data: {
        avatarUrl: avatarUrl
      }
    };

  } catch (error) {
    console.error("updateProfileAvatar error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao atualizar avatar. Tente novamente.",
      },
    };
  }
}