'use server'

/**
 * @description Criar uma nova experiência
 * @category Experiences
 * @inputModel {
 *   // Informações Básicas
 *   "title": "Título da Experiência",
 *   "description": "Descrição detalhada da experiência",
 *   "marketplace": false,
 *   "marketplace_message": "Mensagem para guias que se inscreverem (apenas para marketplace)",
 *   "max_guides": 10, // Apenas para marketplace
 *   "duration_minutes": 180,
 *   "min_participants": 1,
 *   "max_participants": 10,
 *   "max_adults": 6,
 *   "max_teens": 2,
 *   "max_children": 2,
 *   
 *   // Itinerário
 *   "itinerary": [
 *     {"order": 1, "title": "Ponto de encontro", "description": "Encontro no local X", "duration_minutes": 15},
 *     {"order": 2, "title": "Visita ao local Y", "description": "Exploração do local Y", "duration_minutes": 60}
 *   ],
 *   
 *   // Preços
 *   "price_tiers": [
 *     {"min_people": 1, "max_people": 2, "adult_price": 100, "teen_price": 90, "child_price": 80},
 *     {"min_people": 3, "max_people": 4, "adult_price": 80, "teen_price": 70, "child_price": 60},
 *     {"min_people": 5, "max_people": 10, "adult_price": 60, "teen_price": 50, "child_price": 0}
 *   ],
 *   
 *   // Horários de Trabalho
 *   "working_hours": [
 *     {"day_of_week": 1, "start_time": "09:00", "end_time": "17:00"},
 *     {"day_of_week": 2, "start_time": "09:00", "end_time": "17:00"}
 *   ],
 *   
 *   // Mídia
 *   "cover_image": "[File ou URL]",
 *   "gallery_images": ["[File ou URL]"],
 *   
 *   // Arquivos (apenas para marketplace)
 *   "training_files": [
 *     {"title": "Manual de Treinamento", "description": "Guia completo para guias", "file": "[File ou URL]"}
 *   ],
 *   "support_files": [
 *     {"title": "Mapa do Percurso", "description": "Mapa detalhado com pontos de interesse", "file": "[File ou URL]"}
 *   ],
 *   
 *   // Questionário (apenas para marketplace)
 *   "quiz_questions": [
 *     {
 *       "question": "Qual é o ponto de encontro?",
 *       "options": ["Local A", "Local B", "Local C", "Local D"],
 *       "correct_option": 0,
 *       "order_index": 1,
 *       "is_active": true
 *     }
 *   ],
 *   
 *   // Status
 *   "status": "draft" // ou "published"
 * }
 */

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/withAuth";

// Esquema de validação para itens do itinerário
const itineraryItemSchema = z.object({
  order: z.number().int().min(1),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  duration_minutes: z.number().int().min(1)
});

// Esquema de validação para faixas de preço
const priceTierSchema = z.object({
  min_people: z.number().int().min(1),
  max_people: z.number().int().min(1),
  adult_price: z.number().min(0),
  teen_price: z.number().min(0),
  child_price: z.number().min(0)
}).refine(data => data.min_people <= data.max_people, {
  message: "O número mínimo de pessoas deve ser menor ou igual ao máximo",
  path: ["min_people"]
});

// Esquema de validação para horários de trabalho
const workingHourSchema = z.object({
  day_of_week: z.number().int().min(0).max(6),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
}).refine(data => data.start_time < data.end_time, {
  message: "O horário de início deve ser anterior ao horário de término",
  path: ["start_time"]
});

// Esquema de validação para arquivos
const fileSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  file: z.string().url()
});

// Esquema de validação para perguntas do quiz
const quizQuestionSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string().min(1)).min(2),
  correct_option: z.number().int().min(0),
  order_index: z.number().int().min(1),
  is_active: z.boolean().default(true)
}).refine(data => data.correct_option < data.options.length, {
  message: "A opção correta deve ser um índice válido das opções",
  path: ["correct_option"]
});

// Esquema principal
const schema = z.object({
  // Informações Básicas
  title: z.string().min(3).max(255),
  description: z.string().min(10),
  marketplace: z.boolean().default(false),
  marketplace_message: z.string().optional(),
  max_guides: z.number().int().min(1).max(20).optional(),
  duration_minutes: z.number().int().min(30),
  min_participants: z.number().int().min(1),
  max_participants: z.number().int().min(1),
  max_adults: z.number().int().min(0),
  max_teens: z.number().int().min(0),
  max_children: z.number().int().min(0),
  
  // Itinerário
  itinerary: z.array(itineraryItemSchema).min(1).max(20),
  
  // Preços
  price_tiers: z.array(priceTierSchema).min(1),
  
  // Horários de Trabalho
  working_hours: z.array(workingHourSchema).min(1),
  
  // Mídia
  cover_image: z.string().optional(),
  gallery_images: z.array(z.string()).optional(),
  
  // Arquivos (apenas para marketplace)
  training_files: z.array(fileSchema).optional(),
  support_files: z.array(fileSchema).optional(),
  
  // Questionário (apenas para marketplace)
  quiz_questions: z.array(quizQuestionSchema).optional(),
  
  // Status
  status: z.enum(['draft', 'published']).default('draft')
}).refine(data => data.min_participants <= data.max_participants, {
  message: "O número mínimo de participantes deve ser menor ou igual ao máximo",
  path: ["min_participants"]
}).refine(data => {
  const totalMax = data.max_adults + data.max_teens + data.max_children;
  return totalMax >= data.min_participants && totalMax <= data.max_participants;
}, {
  message: "A soma dos máximos de adultos, adolescentes e crianças deve estar entre o mínimo e o máximo de participantes",
  path: ["max_adults"]
}).refine(data => {
  if (data.marketplace) {
    return !!data.max_guides && !!data.quiz_questions && data.quiz_questions.length >= 1;
  }
  return true;
}, {
  message: "Experiências do marketplace precisam ter max_guides e quiz_questions definidos",
  path: ["marketplace"]
}).refine(data => {
  // Verificar se as faixas de preço cobrem todo o intervalo de participantes
  const sortedTiers = [...data.price_tiers].sort((a, b) => a.min_people - b.min_people);
  
  // Verificar se a primeira faixa começa com o mínimo de participantes
  if (sortedTiers[0].min_people > data.min_participants) {
    return false;
  }
  
  // Verificar se a última faixa termina com o máximo de participantes
  if (sortedTiers[sortedTiers.length - 1].max_people < data.max_participants) {
    return false;
  }
  
  // Verificar se não há lacunas entre as faixas
  for (let i = 0; i < sortedTiers.length - 1; i++) {
    if (sortedTiers[i].max_people + 1 !== sortedTiers[i + 1].min_people) {
      return false;
    }
  }
  
  return true;
}, {
  message: "As faixas de preço devem cobrir todo o intervalo de participantes sem lacunas",
  path: ["price_tiers"]
});

export async function createExperience(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Dados recebidos:', rawData);

    // Processar arrays e objetos JSON
    const processedData = { ...rawData };
    
    // Processar campos que podem ser arrays ou objetos JSON
    const jsonFields = [
      'itinerary', 'price_tiers', 'working_hours', 'gallery_images',
      'training_files', 'support_files', 'quiz_questions'
    ];
    
    jsonFields.forEach(field => {
      if (rawData[field]) {
        try {
          if (typeof rawData[field] === 'string') {
            processedData[field] = JSON.parse(rawData[field]);
          }
        } catch (e) {
          console.error(`Erro ao processar campo ${field}:`, e);
        }
      }
    });

    // Processar campos booleanos
    if (rawData.marketplace) {
      processedData.marketplace = rawData.marketplace === 'true' || rawData.marketplace === true;
    }

    // Processar campos numéricos
    const numericFields = [
      'max_guides', 'duration_minutes', 'min_participants', 'max_participants',
      'max_adults', 'max_teens', 'max_children'
    ];
    
    numericFields.forEach(field => {
      if (rawData[field]) {
        processedData[field] = Number(rawData[field]);
      }
    });

    // Processar cover_image e gallery_images
    let coverImageUrl = null;
    let galleryImageUrls = [];

    // Verificar se cover_image é uma URL ou um arquivo
    const coverImage = formData.get("cover_image");
    if (coverImage && typeof coverImage === "string") {
      if (coverImage.startsWith("http")) {
        coverImageUrl = coverImage;
        processedData.cover_image = coverImageUrl;
      }
    }

    // Verificar se gallery_images são URLs ou arquivos
    const galleryImages = formData.get("gallery_images");
    if (galleryImages && typeof galleryImages === "string") {
      try {
        // Tentar analisar como JSON array de URLs
        if (galleryImages.startsWith("[") && galleryImages.endsWith("]")) {
          const parsed = JSON.parse(galleryImages);
          if (Array.isArray(parsed)) {
            galleryImageUrls = parsed.filter((url) => typeof url === "string" && url.startsWith("http"));
            processedData.gallery_images = galleryImageUrls;
          }
        } else if (galleryImages.startsWith("http")) {
          // URL única
          galleryImageUrls = [galleryImages];
          processedData.gallery_images = galleryImageUrls;
        }
      } catch (e) {
        console.error("Erro ao processar gallery_images:", e);
      }
    }

    // Processar training_files e support_files
    if (processedData.training_files && Array.isArray(processedData.training_files)) {
      processedData.training_files = processedData.training_files.map(file => {
        if (typeof file === 'string') {
          try {
            return JSON.parse(file);
          } catch (e) {
            return file;
          }
        }
        return file;
      });
    }

    if (processedData.support_files && Array.isArray(processedData.support_files)) {
      processedData.support_files = processedData.support_files.map(file => {
        if (typeof file === 'string') {
          try {
            return JSON.parse(file);
          } catch (e) {
            return file;
          }
        }
        return file;
      });
    }

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
    
    // Verificar se o usuário pode criar experiências do marketplace
    if (data.marketplace && profile.user_type !== 'admin') {
      return {
        success: false,
        errors: {
          _form: "Apenas administradores podem criar experiências do marketplace",
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
      // PASSO 1: Criar a experiência
      const experienceData = {
        created_by: user.id,
        title: data.title,
        description: data.description,
        marketplace: data.marketplace,
        marketplace_message: data.marketplace_message,
        max_guides: data.marketplace ? data.max_guides : null,
        itinerary: data.itinerary,
        duration_minutes: data.duration_minutes,
        min_participants: data.min_participants,
        max_participants: data.max_participants,
        max_adults: data.max_adults,
        max_teens: data.max_teens,
        max_children: data.max_children,
        cover_image: data.cover_image,
        gallery_images: data.gallery_images,
        training_files: data.marketplace ? data.training_files : null,
        support_files: data.marketplace ? data.support_files : null,
        status: data.status
      };
      
      const { data: experience, error: experienceError } = await supabase
        .from('experiences')
        .insert(experienceData)
        .select('id')
        .single();
      
      if (experienceError) {
        throw new Error("Erro ao criar experiência: " + experienceError.message);
      }
      
      // PASSO 2: Inserir as faixas de preço
      const priceTiersToInsert = data.price_tiers.map(tier => ({
        experience_id: experience.id,
        min_people: tier.min_people,
        max_people: tier.max_people,
        adult_price: tier.adult_price,
        teen_price: tier.teen_price,
        child_price: tier.child_price
      }));
      
      const { error: priceTiersError } = await supabase
        .from('experience_price_tiers')
        .insert(priceTiersToInsert);
      
      if (priceTiersError) {
        throw new Error("Erro ao inserir faixas de preço: " + priceTiersError.message);
      }
      
      // PASSO 3: Inserir as perguntas do quiz (apenas para marketplace)
      if (data.marketplace && data.quiz_questions && data.quiz_questions.length > 0) {
        const quizQuestionsToInsert = data.quiz_questions.map(question => ({
          experience_id: experience.id,
          question: question.question,
          options: question.options,
          correct_option: question.correct_option,
          order_index: question.order_index,
          is_active: question.is_active
        }));
        
        const { error: quizQuestionsError } = await supabase
          .from('experience_quiz_questions')
          .insert(quizQuestionsToInsert);
        
        if (quizQuestionsError) {
          throw new Error("Erro ao inserir perguntas do quiz: " + quizQuestionsError.message);
        }
      }
      
      // PASSO 4: Inserir os horários de trabalho
      const workingHoursToInsert = data.working_hours.map(wh => ({
        guide_id: user.id,
        experience_id: experience.id,
        day_of_week: wh.day_of_week,
        start_time: wh.start_time,
        end_time: wh.end_time
      }));
      
      const { error: workingHoursError } = await supabase
        .from('guide_experience_working_hours')
        .insert(workingHoursToInsert);
      
      if (workingHoursError) {
        throw new Error("Erro ao inserir horários de trabalho: " + workingHoursError.message);
      }
      
      // Confirmar a transação
      const { error: commitError } = await supabase.rpc('commit_transaction');
      
      if (commitError) {
        throw new Error("Erro ao confirmar transação: " + commitError.message);
      }
      
      // Revalidar o caminho para atualizar os dados na UI
      revalidatePath('/experiences');
      
      return { 
        success: true,
        message: "Experiência criada com sucesso!",
        data: {
          id: experience.id
        }
      };
    } catch (error) {
      // Reverter a transação em caso de erro
      await supabase.rpc('rollback_transaction');
      
      console.error("createExperience error:", error);
      return {
        success: false,
        errors: {
          _form: error.message || "Erro ao criar experiência. Tente novamente.",
        },
      };
    }
  } catch (error) {
    console.error("createExperience error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao criar experiência. Tente novamente.",
      },
    };
  }
}