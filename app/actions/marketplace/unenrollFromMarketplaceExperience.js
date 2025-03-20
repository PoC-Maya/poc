'use server'

/**
* @description Cancelar a inscrição de um guia em uma experiência do marketplace
* @category Experiences
* @supabaseInfos {
*   dbTables: guide_experience_enrollments(DELETE), guide_experience_working_hours(DELETE),
*   dbProcedures: begin_transaction, commit_transaction, rollback_transaction,
*   dbRelations: guide_experience_enrollments->experiences, guide_experience_working_hours->experiences
* }
* @inputModel {
*   "experience_id": "uuid-da-experiencia"
* }
*/

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/withAuth";

// Esquema de validação
const schema = z.object({
  experience_id: z.string().uuid({
    message: "ID da experiência inválido"
  })
});

export async function unenrollFromMarketplaceExperience(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Dados recebidos:', rawData);

    // Validação dos dados
    const validation = schema.safeParse(rawData);

    // Se houver erro de validação, retorna imediatamente com os erros
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Dados validados
    const { experience_id } = validation.data;
    
    // Pega o usuário autenticado e o cliente Supabase
    const { user, profile, supabase } = await requireAuth();
    
    // Verificar se o usuário é um guia
    if (profile.user_type !== 'guide') {
      return {
        success: false,
        errors: {
          _form: "Apenas guias podem cancelar inscrições em experiências do marketplace",
        },
      };
    }
    
    // Verificar se a experiência existe e é do marketplace
    const { data: experience, error: experienceError } = await supabase
      .from('experiences')
      .select('id, title, marketplace')
      .eq('id', experience_id)
      .eq('marketplace', true)
      .single();
    
    if (experienceError || !experience) {
      return {
        success: false,
        errors: {
          _form: "Experiência do marketplace não encontrada",
        },
      };
    }
    
    // Verificar se o guia está inscrito nesta experiência
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('guide_experience_enrollments')
      .select('id')
      .eq('guide_id', user.id)
      .eq('experience_id', experience_id)
      .single();
    
    if (enrollmentError || !enrollment) {
      return {
        success: false,
        errors: {
          _form: "Você não está inscrito nesta experiência",
        },
      };
    }
    
    // Iniciar uma transação
    const { error: transactionError } = await supabase.rpc('begin_transaction');
    
    if (transactionError) {
      console.error("Erro ao iniciar transação:", transactionError);
      return {
        success: false,
        errors: {
          _form: "Erro ao iniciar transação: " + transactionError.message,
        },
      };
    }
    
    try {
      // PASSO 1: Excluir os horários de trabalho
      const { error: deleteWorkingHoursError } = await supabase
        .from('guide_experience_working_hours')
        .delete()
        .eq('guide_id', user.id)
        .eq('experience_id', experience_id);
      
      if (deleteWorkingHoursError) {
        throw new Error("Erro ao excluir horários de trabalho: " + deleteWorkingHoursError.message);
      }
      
      // PASSO 2: Excluir a inscrição
      const { error: deleteEnrollmentError } = await supabase
        .from('guide_experience_enrollments')
        .delete()
        .eq('id', enrollment.id);
      
      if (deleteEnrollmentError) {
        throw new Error("Erro ao excluir inscrição: " + deleteEnrollmentError.message);
      }
      
      // Confirmar a transação
      const { error: commitError } = await supabase.rpc('commit_transaction');
      
      if (commitError) {
        throw new Error("Erro ao confirmar transação: " + commitError.message);
      }
      
      // Revalidar o caminho para atualizar os dados na UI
      revalidatePath('/guide/experiences');
      revalidatePath('/experiences/marketplace');
      
      return { 
        success: true,
        message: `Inscrição na experiência "${experience.title}" cancelada com sucesso!`,
        data: {
          experience_id: experience_id
        }
      };
    } catch (error) {
      // Reverter a transação em caso de erro
      await supabase.rpc('rollback_transaction');
      
      console.error("unenrollFromMarketplaceExperience error:", error);
      return {
        success: false,
        errors: {
          _form: error.message || "Erro ao cancelar inscrição na experiência. Tente novamente.",
        },
      };
    }
  } catch (error) {
    console.error("unenrollFromMarketplaceExperience error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao cancelar inscrição na experiência. Tente novamente.",
      },
    };
  }
}