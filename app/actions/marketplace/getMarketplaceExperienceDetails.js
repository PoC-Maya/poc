"use server";

/**
 * @description Obter detalhes completos de uma experiência do marketplace
 * @category Experiences
 * @supabaseInfos {
 *   dbTables: experiences(SELECT), experience_price_tiers(SELECT), experience_quiz_questions(SELECT), guide_experience_enrollments(SELECT),
 *   dbRelations: experiences->experience_price_tiers, experiences->experience_quiz_questions, experiences->guide_experience_enrollments
 * }
 * @inputModel {
 *   "id": "uuid-da-experiencia"
 * }
 */

import { z } from "zod";
import { requireAuth } from "@/lib/withAuth";

// Esquema de validação
const schema = z.object({
  id: z.string().uuid({
    message: "ID da experiência inválido",
  }),
});

export async function getMarketplaceExperienceDetails(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log("Dados recebidos:", rawData);

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
    const { id } = validation.data;

    // Obter informações de autenticação (se disponível)
    const { user, profile, supabase } = await requireAuth();

    // Verificar se a experiência existe e é do marketplace
    const { data: experience, error: experienceError } = await supabase
      .from("experiences")
      .select("*")
      .eq("id", id)
      .eq("marketplace", true)
      .single();

    if (experienceError || !experience) {
      return {
        success: false,
        errors: {
          _form: "Experiência do marketplace não encontrada",
        },
      };
    }

    // Buscar faixas de preço
    const { data: priceTiers, error: priceTiersError } = await supabase
      .from("experience_price_tiers")
      .select("*")
      .eq("experience_id", id)
      .order("min_people", { ascending: true });

    if (priceTiersError) {
      console.error("Erro ao buscar faixas de preço:", priceTiersError);
    }

    // Buscar perguntas do quiz
    const { data: quizQuestions, error: quizQuestionsError } = await supabase
      .from("experience_quiz_questions")
      .select("*")
      .eq("experience_id", id)
      .order("order_index", { ascending: true });

    if (quizQuestionsError) {
      console.error("Erro ao buscar perguntas do quiz:", quizQuestionsError);
    }

    // Verificar se o usuário está autenticado e é um guia
    let userEnrollment = null;
    let isEnrolled = false;
    let enrollmentCount = 0;

    // Buscar contagem de inscrições
    const { count, error: countError } = await supabase
      .from("guide_experience_enrollments")
      .select("id", { count: "exact", head: true })
      .eq("experience_id", id);

    if (!countError) {
      enrollmentCount = count;
    }

    // Se o usuário estiver autenticado, verificar se já está inscrito
    // Se o usuário estiver autenticado, verificar se já está inscrito
    if (user) {
      console.log(
        "Verificando inscrição para o usuário:",
        user.id,
        "na experiência:",
        id
      );

      // Primeiro, vamos fazer uma consulta direta para verificar se o registro existe
      const { data: enrollmentCheck, error: checkError } = await supabase
        .from("guide_experience_enrollments")
        .select("id")
        .eq("guide_id", user.id)
        .eq("experience_id", id);

      console.log(
        "Resultado da verificação direta:",
        enrollmentCheck,
        checkError
      );

      // Agora, buscar os detalhes completos se existir
      if (enrollmentCheck && enrollmentCheck.length > 0) {
        // Buscar detalhes da inscrição
        const { data: enrollment, error: enrollmentError } = await supabase
          .from("guide_experience_enrollments")
          .select("*")
          .eq("id", enrollmentCheck[0].id)
          .single();

        console.log("Detalhes da inscrição:", enrollment, enrollmentError);

        // Buscar horários de trabalho separadamente
        const { data: workingHours, error: workingHoursError } = await supabase
          .from("guide_experience_working_hours")
          .select("*")
          .eq("guide_id", user.id)
          .eq("experience_id", id);

        console.log("Horários de trabalho:", workingHours, workingHoursError);

        if (!enrollmentError && enrollment) {
          userEnrollment = {
            ...enrollment,
            working_hours: workingHours || [],
          };
          isEnrolled = true;
        }
      }
    }

    // Construir resposta
    return {
      success: true,
      data: {
        experience,
        price_tiers: priceTiers || [],
        quiz_questions: quizQuestions || [],
        enrollment_count: enrollmentCount,
        max_guides_reached: enrollmentCount >= experience.max_guides,
        user_info: user
          ? {
              is_enrolled: isEnrolled,
              enrollment: userEnrollment,
              can_enroll:
                profile?.user_type === "guide" &&
                !isEnrolled &&
                enrollmentCount < experience.max_guides,
            }
          : null,
      },
    };
  } catch (error) {
    console.error("getMarketplaceExperienceDetails error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao obter detalhes da experiência. Tente novamente.",
      },
    };
  }
}
