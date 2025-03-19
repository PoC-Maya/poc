'use server'

/**
* @description Atualizar uma experiência existente do marketplace (apenas para administradores)
* @category Experiences
* @supabaseInfos {
*   dbTables: experiences(UPDATE), experience_price_tiers(DELETE, INSERT), experience_quiz_questions(DELETE, INSERT),
*   dbProcedures: begin_transaction, commit_transaction, rollback_transaction,
*   dbRelations: experiences->experience_price_tiers, experiences->experience_quiz_questions
* }
* @inputModel {
*   // ID da experiência a ser atualizada (obrigatório)
*   "id": "uuid-da-experiencia",
*   
*   // Informações Básicas (todos opcionais para atualização parcial)
*   "title": "Título Atualizado da Experiência",
*   "description": "Descrição atualizada detalhada da experiência",
*   "marketplace_message": "Mensagem atualizada para guias que se inscreverem",
*   "max_guides": 15,
*   "duration_minutes": 240,
*   "min_participants": 2,
*   "max_participants": 12,
*   "max_adults": 8,
*   "max_teens": 3,
*   "max_children": 3,
*   
*   // Itinerário (opcional - se fornecido, substitui completamente o anterior)
*   "itinerary": [
*     {"order": 1, "title": "Novo ponto de encontro", "description": "Encontro no local Z", "duration_minutes": 20},
*     {"order": 2, "title": "Visita ao local W", "description": "Exploração do local W", "duration_minutes": 90}
*   ],
*   
*   // Preços (opcional - se fornecido, substitui completamente os anteriores)
*   "price_tiers": [
*     {"min_people": 1, "max_people": 3, "adult_price": 120, "teen_price": 100, "child_price": 90},
*     {"min_people": 4, "max_people": 6, "adult_price": 100, "teen_price": 80, "child_price": 70},
*     {"min_people": 7, "max_people": 12, "adult_price": 80, "teen_price": 60, "child_price": 0}
*   ],
*   
*   // Mídia (opcional)
*   "cover_image": "https://res.cloudinary.com/example/image/upload/v1234567890/new-cover.jpg",
*   "gallery_images": ["https://res.cloudinary.com/example/image/upload/v1234567890/new-gallery1.jpg"],
*   
*   // Arquivos (opcional - se fornecido, substitui completamente os anteriores)
*   "training_files": [
*     {"title": "Manual de Treinamento Atualizado", "description": "Guia atualizado para guias", "file": "https://res.cloudinary.com/example/image/upload/v1234567890/new-manual.pdf"}
*   ],
*   "support_files": [
*     {"title": "Mapa Atualizado do Percurso", "description": "Mapa atualizado com pontos de interesse", "file": "https://res.cloudinary.com/example/image/upload/v1234567890/new-map.pdf"}
*   ],
*   
*   // Questionário (opcional - se fornecido, substitui completamente o anterior)
*   "quiz_questions": [
*     {
*       "question": "Qual é o novo ponto de encontro?",
*       "options": ["Local Z", "Local Y", "Local X", "Local W"],
*       "correct_option": 0,
*       "order_index": 1,
*       "is_active": true
*     }
*   ],
*   
*   // Status (opcional)
*   "status": "published" // ou "draft"
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

// Esquema principal para atualização (todos os campos são opcionais exceto o ID)
const updateSchema = z.object({
  // ID da experiência (obrigatório)
  id: z.string().uuid(),
  
  // Informações Básicas (opcionais)
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(10).optional(),
  marketplace_message: z.string().min(10).optional(),
  max_guides: z.number().int().min(1).max(20).optional(),
  duration_minutes: z.number().int().min(30).optional(),
  min_participants: z.number().int().min(1).optional(),
  max_participants: z.number().int().min(1).optional(),
  max_adults: z.number().int().min(0).optional(),
  max_teens: z.number().int().min(0).optional(),
  max_children: z.number().int().min(0).optional(),
  
  // Itinerário (opcional)
  itinerary: z.array(itineraryItemSchema).min(1).max(20).optional(),
  
  // Preços (opcional)
  price_tiers: z.array(priceTierSchema).min(1).optional(),
  
  // Mídia (opcional)
  cover_image: z.string().url().optional(),
  gallery_images: z.array(z.string().url()).min(1).optional(),
  
  // Arquivos (opcionais)
  training_files: z.array(fileSchema).min(1).optional(),
  support_files: z.array(fileSchema).min(1).optional(),
  
  // Questionário (opcional)
  quiz_questions: z.array(quizQuestionSchema).min(1).optional(),
  
  // Status (opcional)
  status: z.enum(['draft', 'published']).optional()
}).refine(data => {
  // Se ambos min_participants e max_participants estiverem presentes, verificar a relação
  if (data.min_participants && data.max_participants) {
    return data.min_participants <= data.max_participants;
  }
  return true;
}, {
  message: "O número mínimo de participantes deve ser menor ou igual ao máximo",
  path: ["min_participants"]
}).refine(data => {
  // Verificar a relação entre max_adults, max_teens, max_children, min_participants e max_participants
  // apenas se todos estiverem presentes
  if (data.max_adults !== undefined && 
      data.max_teens !== undefined && 
      data.max_children !== undefined && 
      data.min_participants !== undefined && 
      data.max_participants !== undefined) {
    
    const totalMax = data.max_adults + data.max_teens + data.max_children;
    return totalMax >= data.min_participants && totalMax <= data.max_participants;
  }
  return true;
}, {
  message: "A soma dos máximos de adultos, adolescentes e crianças deve estar entre o mínimo e o máximo de participantes",
  path: ["max_adults"]
}).refine(data => {
  // Verificar as faixas de preço apenas se price_tiers, min_participants e max_participants estiverem presentes
  if (data.price_tiers && data.min_participants && data.max_participants) {
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
  }
  return true;
}, {
  message: "As faixas de preço devem cobrir todo o intervalo de participantes sem lacunas",
  path: ["price_tiers"]
});

export async function updateMarketplaceExperience(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Dados recebidos para atualização:', rawData);

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
    console.log('Dados processados para atualização:', processedData);

    // Validação dos dados processados
    const validation = updateSchema.safeParse(processedData);

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
          _form: "Apenas administradores podem atualizar experiências do marketplace",
        },
      };
    }
    
    // Verificar se a experiência existe e é do marketplace
    const { data: existingExperience, error: fetchError } = await supabase
      .from('experiences')
      .select('id, marketplace')
      .eq('id', data.id)
      .single();
    
    if (fetchError || !existingExperience) {
      return {
        success: false,
        errors: {
          _form: "Experiência não encontrada",
        },
      };
    }
    
    if (!existingExperience.marketplace) {
      return {
        success: false,
        errors: {
          _form: "Esta experiência não pertence ao marketplace",
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
      // PASSO 1: Atualizar a experiência
      // Extrair o ID e os campos relacionais do objeto de dados
      const { 
        id, 
        price_tiers, 
        quiz_questions,
        ...updateData 
      } = data;
      
      // Atualizar apenas os campos que pertencem à tabela experiences
      const { error: updateError } = await supabase
        .from('experiences')
        .update(updateData)
        .eq('id', id);
      
      if (updateError) {
        throw new Error("Erro ao atualizar experiência: " + updateError.message);
      }
      
      // PASSO 2: Atualizar as faixas de preço (se fornecidas)
      if (price_tiers) {
        // Primeiro, excluir todas as faixas de preço existentes
        const { error: deletePriceTiersError } = await supabase
          .from('experience_price_tiers')
          .delete()
          .eq('experience_id', id);
        
        if (deletePriceTiersError) {
          throw new Error("Erro ao excluir faixas de preço existentes: " + deletePriceTiersError.message);
        }
        
        // Depois, inserir as novas faixas de preço
        const priceTiersToInsert = price_tiers.map(tier => ({
          experience_id: id,
          min_people: tier.min_people,
          max_people: tier.max_people,
          adult_price: tier.adult_price,
          teen_price: tier.teen_price,
          child_price: tier.child_price
        }));
        
        const { error: insertPriceTiersError } = await supabase
          .from('experience_price_tiers')
          .insert(priceTiersToInsert);
        
        if (insertPriceTiersError) {
          throw new Error("Erro ao inserir novas faixas de preço: " + insertPriceTiersError.message);
        }
      }
      
      // PASSO 3: Atualizar as perguntas do quiz (se fornecidas)
      if (quiz_questions) {
        // Primeiro, excluir todas as perguntas existentes
        const { error: deleteQuestionsError } = await supabase
          .from('experience_quiz_questions')
          .delete()
          .eq('experience_id', id);
        
        if (deleteQuestionsError) {
          throw new Error("Erro ao excluir perguntas existentes: " + deleteQuestionsError.message);
        }
        
        // Depois, inserir as novas perguntas
        const quizQuestionsToInsert = quiz_questions.map(question => ({
          experience_id: id,
          question: question.question,
          options: question.options,
          correct_option: question.correct_option,
          order_index: question.order_index,
          is_active: question.is_active
        }));
        
        const { error: insertQuestionsError } = await supabase
          .from('experience_quiz_questions')
          .insert(quizQuestionsToInsert);
        
        if (insertQuestionsError) {
          throw new Error("Erro ao inserir novas perguntas: " + insertQuestionsError.message);
        }
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
        message: "Experiência do marketplace atualizada com sucesso!",
        data: {
          id: id
        }
      };
    } catch (error) {
      // Reverter a transação em caso de erro
      await supabase.rpc('rollback_transaction');
      
      console.error("updateMarketplaceExperience error:", error);
      return {
        success: false,
        errors: {
          _form: error.message || "Erro ao atualizar experiência do marketplace. Tente novamente.",
        },
      };
    }
  } catch (error) {
    console.error("updateMarketplaceExperience error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao atualizar experiência do marketplace. Tente novamente.",
      },
    };
  }
}