'use server'

/**
* @description Criar uma nova experiência do marketplace (apenas para administradores)
* @category Experiences
* @inputModel {
*   // Informações Básicas
*   "title": "Título da Experiência",
*   "description": "Descrição detalhada da experiência",
*   "marketplace_message": "Mensagem para guias que se inscreverem",
*   "max_guides": 10,
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
*   // Mídia (URLs do Cloudinary)
*   "cover_image": "https://res.cloudinary.com/example/image/upload/v1234567890/cover.jpg",
*   "gallery_images": ["https://res.cloudinary.com/example/image/upload/v1234567890/gallery1.jpg"],
*   
*   // Arquivos (URLs do Cloudinary)
*   "training_files": [
*     {"title": "Manual de Treinamento", "description": "Guia completo para guias", "file": "https://res.cloudinary.com/example/image/upload/v1234567890/manual.pdf"}
*   ],
*   "support_files": [
*     {"title": "Mapa do Percurso", "description": "Mapa detalhado com pontos de interesse", "file": "https://res.cloudinary.com/example/image/upload/v1234567890/map.pdf"}
*   ],
*   
*   // Questionário
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
  marketplace_message: z.string().min(10),
  max_guides: z.number().int().min(1).max(20),
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
  
  // Mídia
  cover_image: z.string().url(),
  gallery_images: z.array(z.string().url()).min(1),
  
  // Arquivos
  training_files: z.array(fileSchema).min(1),
  support_files: z.array(fileSchema).min(1),
  
  // Questionário
  quiz_questions: z.array(quizQuestionSchema).min(1),
  
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

export async function createMarketplaceExperience(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Dados recebidos:', rawData);

    // Processar arrays e objetos JSON
    const processedData = { ...rawData };
    
    // Processar campos que podem ser arrays ou objetos JSON
    const jsonFields = [
      'itinerary', 'price_tiers', 'gallery_images',
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
    
    // Verificar se o usuário é admin
    if (profile.user_type !== 'admin') {
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
        marketplace: true, // Sempre true para experiências do marketplace
        marketplace_message: data.marketplace_message,
        max_guides: data.max_guides,
        itinerary: data.itinerary,
        duration_minutes: data.duration_minutes,
        min_participants: data.min_participants,
        max_participants: data.max_participants,
        max_adults: data.max_adults,
        max_teens: data.max_teens,
        max_children: data.max_children,
        cover_image: data.cover_image,
        gallery_images: data.gallery_images,
        training_files: data.training_files,
        support_files: data.support_files,
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
      
      // PASSO 3: Inserir as perguntas do quiz
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
      
      // Confirmar a transação
      const { error: commitError } = await supabase.rpc('commit_transaction');
      
      if (commitError) {
        throw new Error("Erro ao confirmar transação: " + commitError.message);
      }
      
      // Revalidar o caminho para atualizar os dados na UI
      revalidatePath('/admin/experiences');
      revalidatePath('/experiences/marketplace');
      
      return { 
        success: true,
        message: "Experiência do marketplace criada com sucesso!",
        data: {
          id: experience.id
        }
      };
    } catch (error) {
      // Reverter a transação em caso de erro
      await supabase.rpc('rollback_transaction');
      
      console.error("createMarketplaceExperience error:", error);
      return {
        success: false,
        errors: {
          _form: error.message || "Erro ao criar experiência do marketplace. Tente novamente.",
        },
      };
    }
  } catch (error) {
    console.error("createMarketplaceExperience error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao criar experiência do marketplace. Tente novamente.",
      },
    };
  }
}