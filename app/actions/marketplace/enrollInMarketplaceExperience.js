'use server'

/**
* @description Inscrever um guia em uma experiência do marketplace
* @category Experiences
* @supabaseInfos {
*   dbTables: guide_experience_enrollments(INSERT), guide_experience_working_hours(INSERT), experiences(SELECT),
*   dbProcedures: begin_transaction, commit_transaction, rollback_transaction,
*   dbRelations: guide_experience_enrollments->experiences, guide_experience_working_hours->experiences
* }
* @inputModel {
*   // ID da experiência do marketplace em que o guia deseja se inscrever (obrigatório)
*   "experience_id": "uuid-da-experiencia",
*   
*   // Capacidade máxima que o guia pode atender (obrigatório)
*   "max_adults": 5,
*   "max_teens": 3,
*   "max_children": 2,
*   
*   // Aceitação dos termos (todos obrigatórios e devem ser true)
*   "terms_itinerary_accepted": true,
*   "terms_schedule_accepted": true,
*   "terms_conditions_accepted": true,
*   
*   // Horários de trabalho do guia (obrigatório, pelo menos um dia)
*   "working_hours": [
*     {
*       "day_of_week": 0, // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
*       "start_time": "09:00:00",
*       "end_time": "17:00:00"
*     },
*     {
*       "day_of_week": 1,
*       "start_time": "09:00:00",
*       "end_time": "17:00:00"
*     },
*     {
*       "day_of_week": 5,
*       "start_time": "10:00:00",
*       "end_time": "18:00:00"
*     }
*   ]
* }
*/

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/withAuth";

// Esquema de validação para horários de trabalho
const workingHourSchema = z.object({
  day_of_week: z.number().int().min(0).max(6),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: "Formato de hora inválido. Use o formato HH:MM:SS ou HH:MM"
  }),
  end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: "Formato de hora inválido. Use o formato HH:MM:SS ou HH:MM"
  })
}).refine(data => {
  // Verificar se o horário de término é posterior ao horário de início
  const start = new Date(`1970-01-01T${data.start_time}`);
  const end = new Date(`1970-01-01T${data.end_time}`);
  return end > start;
}, {
  message: "O horário de término deve ser posterior ao horário de início",
  path: ["end_time"]
});

// Esquema principal
const schema = z.object({
  // ID da experiência
  experience_id: z.string().uuid(),
  
  // Capacidade máxima
  max_adults: z.number().int().min(0),
  max_teens: z.number().int().min(0),
  max_children: z.number().int().min(0),
  
  // Aceitação dos termos
  terms_itinerary_accepted: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos do itinerário"
  }),
  terms_schedule_accepted: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos de horário"
  }),
  terms_conditions_accepted: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos e condições"
  }),
  
  // Horários de trabalho
  working_hours: z.array(workingHourSchema).min(1, {
    message: "Você deve fornecer pelo menos um horário de trabalho"
  })
}).refine(data => {
  // Verificar se pelo menos um dos valores máximos é maior que zero
  return data.max_adults > 0 || data.max_teens > 0 || data.max_children > 0;
}, {
  message: "Você deve aceitar pelo menos um tipo de participante (adultos, adolescentes ou crianças)",
  path: ["max_adults"]
}).refine(data => {
  // Verificar se não há dias da semana duplicados
  const days = data.working_hours.map(wh => wh.day_of_week);
  return new Set(days).size === days.length;
}, {
  message: "Não é permitido ter horários duplicados para o mesmo dia da semana",
  path: ["working_hours"]
});

export async function enrollInMarketplaceExperience(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Dados recebidos:', rawData);

    // Processar arrays e objetos JSON
    const processedData = { ...rawData };
    
    // Processar working_hours se for uma string JSON
    if (rawData.working_hours && typeof rawData.working_hours === 'string') {
      try {
        processedData.working_hours = JSON.parse(rawData.working_hours);
      } catch (e) {
        console.error("Erro ao processar working_hours:", e);
      }
    }

    // Processar campos numéricos
    const numericFields = ['max_adults', 'max_teens', 'max_children'];
    numericFields.forEach(field => {
      if (rawData[field]) {
        processedData[field] = Number(rawData[field]);
      }
    });

    // Processar campos booleanos
    const booleanFields = ['terms_itinerary_accepted', 'terms_schedule_accepted', 'terms_conditions_accepted'];
    booleanFields.forEach(field => {
      if (rawData[field]) {
        processedData[field] = rawData[field] === 'true' || rawData[field] === true;
      }
    });

    // Log para debug
    console.log('Dados processados:', processedData);

    // Validação dos dados processados
    const validation = schema.safeParse(processedData);

    // Se houver erro de validação, retorna imediatamente com os erros
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Dados validados
    const data = validation.data;
    
    // Pega o usuário autenticado e o cliente Supabase
    const { user, profile, supabase } = await requireAuth();
    
    // Verificar se o usuário é um guia
    if (profile.user_type !== 'guide') {
      return {
        success: false,
        errors: {
          _form: "Apenas guias podem se inscrever em experiências do marketplace",
        },
      };
    }
    
    // Verificar se a experiência existe e é do marketplace
    const { data: experience, error: experienceError } = await supabase
      .from('experiences')
      .select('id, title, marketplace, max_guides')
      .eq('id', data.experience_id)
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
    
    // Verificar se o guia já está inscrito nesta experiência
    const { data: existingEnrollment, error: enrollmentError } = await supabase
      .from('guide_experience_enrollments')
      .select('id')
      .eq('guide_id', user.id)
      .eq('experience_id', data.experience_id)
      .maybeSingle();
    
    if (existingEnrollment) {
      return {
        success: false,
        errors: {
          _form: "Você já está inscrito nesta experiência",
        },
      };
    }
    
    // Verificar se o número máximo de guias já foi atingido
    const { count, error: countError } = await supabase
      .from('guide_experience_enrollments')
      .select('id', { count: 'exact', head: true })
      .eq('experience_id', data.experience_id);
    
    if (!countError && count >= experience.max_guides) {
      return {
        success: false,
        errors: {
          _form: "O número máximo de guias para esta experiência já foi atingido",
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
      // PASSO 1: Criar a inscrição do guia
      const enrollmentData = {
        guide_id: user.id,
        experience_id: data.experience_id,
        max_adults: data.max_adults,
        max_teens: data.max_teens,
        max_children: data.max_children,
        terms_itinerary_accepted: data.terms_itinerary_accepted,
        terms_schedule_accepted: data.terms_schedule_accepted,
        terms_conditions_accepted: data.terms_conditions_accepted,
        is_validated: false // Por padrão, a inscrição não está validada
      };
      
      const { data: enrollment, error: insertEnrollmentError } = await supabase
        .from('guide_experience_enrollments')
        .insert(enrollmentData)
        .select('id')
        .single();
      
      if (insertEnrollmentError) {
        throw new Error("Erro ao criar inscrição: " + insertEnrollmentError.message);
      }
      
      // PASSO 2: Inserir os horários de trabalho
      const workingHoursToInsert = data.working_hours.map(wh => ({
        guide_id: user.id,
        experience_id: data.experience_id,
        day_of_week: wh.day_of_week,
        start_time: wh.start_time,
        end_time: wh.end_time
      }));
      
      const { error: insertWorkingHoursError } = await supabase
        .from('guide_experience_working_hours')
        .insert(workingHoursToInsert);
      
      if (insertWorkingHoursError) {
        throw new Error("Erro ao inserir horários de trabalho: " + insertWorkingHoursError.message);
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
        message: `Inscrição na experiência "${experience.title}" realizada com sucesso! Aguarde a validação por um administrador.`,
        data: {
          enrollment_id: enrollment.id
        }
      };
    } catch (error) {
      // Reverter a transação em caso de erro
      await supabase.rpc('rollback_transaction');
      
      console.error("enrollInMarketplaceExperience error:", error);
      return {
        success: false,
        errors: {
          _form: error.message || "Erro ao se inscrever na experiência. Tente novamente.",
        },
      };
    }
  } catch (error) {
    console.error("enrollInMarketplaceExperience error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao se inscrever na experiência. Tente novamente.",
      },
    };
  }
}