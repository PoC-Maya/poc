'use server'

/**
 * @description Encerrar sessão do usuário
 * @category auth
 * @inputModel {}
 */

import { requireAuth } from "@/lib/withAuth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema para validação - vazio pois não há dados de entrada
const schema = z.object({});

export async function logout(prevState, formData) {
  try {
    // Pega o usuário autenticado e o perfil do usuário
    const { user, profile, supabase } = await requireAuth();

    // Extrair dados do FormData (vazio neste caso)
    const rawData = Object.fromEntries(formData.entries());
    console.log('Dados recebidos:', rawData);

    // Validação dos dados do formulário (vazio neste caso)
    const validation = schema.safeParse(rawData);

    // Se houver erro de validação, retorna imediatamente com os erros
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Realizar o logout no Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;

    // Revalidar caminhos relevantes
    revalidatePath('/');
    revalidatePath('/login');
    
    return { 
      success: true,
      message: "Logout realizado com sucesso",
    };

  } catch (error) {
    console.error("logout error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao realizar logout. Tente novamente.",
      },
    };
  }
}