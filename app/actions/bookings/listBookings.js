'use server'

/**
 * @description Listar reservas (turista ou guia)
 * @category bookings
 * @inputModel {
  userId: 'user_123',
  userType: 'guide', // ou 'tourist'
  status: 'confirmed', // 'pending', 'confirmed', 'completed', 'cancelled'
  startDate: '2023-06-01',
  endDate: '2023-06-30',
  page: 1,
  limit: 10
}
 */

import { requireAuth } from "@/lib/withAuth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema para validação
const schema = z.object({
  // Defina aqui o schema de validação específico para esta action
  // Exemplo:
  // name: z.string().min(3, "Nome muito curto").max(100),
  // email: z.string().email("Email inválido"),
});

export async function listBookings(prevState, formData) {
  try {
    // Pega o usuário autenticado e o perfil do usuário
    const { user, profile, supabase } = await requireAuth();

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

    // Implementar lógica específica da action aqui
    // Exemplo:
    // const { error } = await supabase
    //   .from("tabela")
    //   .update({
    //     campo1: data.campo1,
    //     campo2: data.campo2,
    //     updated_at: new Date().toISOString(),
    //   })
    //   .eq("id", algumId);
    //
    // if (error) throw error;

    // Revalidar caminhos relevantes
    // revalidatePath('/caminho-relevante');
    
    return { 
      success: true,
      message: "listBookings executado com sucesso",
      // Dados adicionais que você queira retornar
    };

  } catch (error) {
    console.error("listBookings error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao executar listBookings. Tente novamente.",
      },
    };
  }
}
