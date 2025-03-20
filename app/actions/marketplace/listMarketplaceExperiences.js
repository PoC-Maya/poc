'use server'

/**
* @description Listar experiências do marketplace disponíveis para inscrição de guias
* @category Experiences
* @supabaseInfos {
*   dbTables: experiences(SELECT), experience_price_tiers(SELECT), guide_experience_enrollments(SELECT),
*   dbRelations: experiences->experience_price_tiers, experiences->guide_experience_enrollments
* }
* @inputModel {
*   // Todos os filtros são opcionais
*   "search": "mergulho",           // Busca por nome/descrição
*   "min_duration": 2,              // Duração mínima em horas
*   "max_duration": 6,              // Duração máxima em horas
*   "enrolled": true,               // Filtrar apenas experiências em que o usuário está inscrito
*   "page": 1,                      // Página atual (para paginação)
*   "limit": 10                     // Itens por página
* }
*/

import { z } from "zod";
import { requireAuth } from "@/lib/withAuth";

// Esquema de validação
const schema = z.object({
  search: z.string().optional(),
  min_duration: z.coerce.number().min(0).optional(),
  max_duration: z.coerce.number().min(0).optional(),
  enrolled: z.coerce.boolean().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10)
});

export async function listMarketplaceExperiences(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Dados recebidos:', rawData);

    // Processar campos numéricos
    const numericFields = ['min_duration', 'max_duration', 'page', 'limit'];
    const processedData = { ...rawData };
    
    numericFields.forEach(field => {
      if (rawData[field]) {
        processedData[field] = Number(rawData[field]);
      }
    });
    
    // Processar campo booleano enrolled
    if (rawData.enrolled !== undefined) {
      processedData.enrolled = rawData.enrolled === 'true' || rawData.enrolled === true;
    }

    // Validação dos dados
    const validation = schema.safeParse(processedData);

    // Se houver erro de validação, retorna imediatamente com os erros
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Dados validados
    const filters = validation.data;
    
    // Calcular offset para paginação
    const offset = (filters.page - 1) * filters.limit;
    
    // Obter informações de autenticação (se disponível)
    const { user, supabase } = await requireAuth();
    
    // Variável para armazenar a consulta
    let query;
    
    // Verificar se o filtro enrolled está ativo
    if (filters.enrolled === true) {
      // Se o usuário não estiver autenticado, não pode filtrar por enrolled
      if (!user) {
        return {
          success: false,
          errors: {
            _form: "Você precisa estar autenticado para ver suas experiências inscritas",
          },
          unauthenticated: true
        };
      }
      
      // Buscar IDs das experiências em que o usuário está inscrito
      const { data: enrolledExperiences, error: enrolledError } = await supabase
        .from('guide_experience_enrollments')
        .select('experience_id')
        .eq('guide_id', user.id);
      
      if (enrolledError) {
        console.error("Erro ao buscar experiências inscritas:", enrolledError);
        return {
          success: false,
          errors: {
            _form: "Erro ao buscar suas experiências inscritas",
          },
        };
      }
      
      // Se o usuário não está inscrito em nenhuma experiência, retornar lista vazia
      if (!enrolledExperiences || enrolledExperiences.length === 0) {
        return {
          success: true,
          data: {
            experiences: [],
            pagination: {
              total: 0,
              page: filters.page,
              limit: filters.limit,
              total_pages: 0
            }
          }
        };
      }
      
      // Armazenar os IDs das experiências inscritas para usar na consulta
      const enrolledIds = enrolledExperiences.map(e => e.experience_id);
      
      // Iniciar a consulta base com filtro de IDs inscritos
      query = supabase
        .from('experiences')
        .select(`
          id, 
          title, 
          description, 
          duration_minutes, 
          min_participants, 
          max_participants, 
          cover_image, 
          max_guides,
          status,
          created_at
        `, { count: 'exact' })
        .eq('marketplace', true)
        .in('id', enrolledIds);
    } else {
      // Iniciar a consulta base normal (sem filtro de inscrição)
      query = supabase
        .from('experiences')
        .select(`
          id, 
          title, 
          description, 
          duration_minutes, 
          min_participants, 
          max_participants, 
          cover_image, 
          max_guides,
          status,
          created_at
        `, { count: 'exact' })
        .eq('marketplace', true)
        .eq('status', 'published');
    }
    
    // Aplicar filtros comuns
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    
    if (filters.min_duration) {
      const minMinutes = filters.min_duration * 60;
      query = query.gte('duration_minutes', minMinutes);
    }
    
    if (filters.max_duration) {
      const maxMinutes = filters.max_duration * 60;
      query = query.lte('duration_minutes', maxMinutes);
    }
    
    // Aplicar paginação
    query = query.range(offset, offset + filters.limit - 1).order('created_at', { ascending: false });
    
    // Executar a consulta
    const { data: experiences, count, error } = await query;
    
    if (error) {
      console.error("Erro ao buscar experiências:", error);
      return {
        success: false,
        errors: {
          _form: "Erro ao buscar experiências do marketplace",
        },
      };
    }
    
    // Se não houver experiências, retornar lista vazia
    if (!experiences || experiences.length === 0) {
      return {
        success: true,
        data: {
          experiences: [],
          pagination: {
            total: 0,
            page: filters.page,
            limit: filters.limit,
            total_pages: 0
          }
        }
      };
    }
    
    // Buscar preços mínimos para cada experiência
    const experienceIds = experiences.map(exp => exp.id);
    
    const { data: priceTiers, error: priceTiersError } = await supabase
      .from('experience_price_tiers')
      .select('experience_id, adult_price, teen_price, child_price')
      .in('experience_id', experienceIds);
    
    if (priceTiersError) {
      console.error("Erro ao buscar preços:", priceTiersError);
    }
    
    // Buscar contagem de inscrições para cada experiência
    let enrollmentCountMap = {};
    
    // Abordagem alternativa sem a função RPC
    const { data: enrollments, error: enrollmentError } = await supabase
      .from('guide_experience_enrollments')
      .select('experience_id')
      .in('experience_id', experienceIds);
    
    if (!enrollmentError && enrollments) {
      // Contar manualmente
      enrollmentCountMap = enrollments.reduce((map, enrollment) => {
        map[enrollment.experience_id] = (map[enrollment.experience_id] || 0) + 1;
        return map;
      }, {});
    } else {
      console.error("Erro ao buscar inscrições:", enrollmentError);
    }
    
    // Verificar se o usuário está inscrito em alguma das experiências
    let userEnrollments = [];
    if (user) {
      const { data: userEnrollmentData, error: userEnrollmentError } = await supabase
        .from('guide_experience_enrollments')
        .select('experience_id')
        .eq('guide_id', user.id)
        .in('experience_id', experienceIds);
      
      if (!userEnrollmentError) {
        userEnrollments = userEnrollmentData || [];
      } else {
        console.error("Erro ao buscar inscrições do usuário:", userEnrollmentError);
      }
    }
    
    const userEnrollmentMap = userEnrollments.reduce((map, enrollment) => {
      map[enrollment.experience_id] = true;
      return map;
    }, {});
    
    // Calcular preço mínimo para cada experiência
    const priceMap = {};
    if (priceTiers) {
      priceTiers.forEach(tier => {
        if (!priceMap[tier.experience_id]) {
          priceMap[tier.experience_id] = {
            adult: tier.adult_price,
            teen: tier.teen_price,
            child: tier.child_price
          };
        } else {
          // Manter o menor preço
          if (tier.adult_price < priceMap[tier.experience_id].adult) {
            priceMap[tier.experience_id].adult = tier.adult_price;
          }
          if (tier.teen_price < priceMap[tier.experience_id].teen) {
            priceMap[tier.experience_id].teen = tier.teen_price;
          }
          if (tier.child_price < priceMap[tier.experience_id].child) {
            priceMap[tier.experience_id].child = tier.child_price;
          }
        }
      });
    }
    
    // Formatar os dados para a resposta
    const formattedExperiences = experiences.map(exp => {
      // Calcular o menor preço entre adulto, adolescente e criança
      let priceFrom = null;
      if (priceMap[exp.id]) {
        const prices = [
          priceMap[exp.id].adult,
          priceMap[exp.id].teen,
          priceMap[exp.id].child
        ].filter(price => price > 0);
        
        if (prices.length > 0) {
          priceFrom = Math.min(...prices);
        }
      }
      
      // Calcular duração em horas
      const durationHours = exp.duration_minutes / 60;
      
      // Verificar se o usuário está inscrito
      const isEnrolled = userEnrollmentMap[exp.id] || false;
      
      // Verificar se o limite de guias foi atingido
      const enrollmentCount = enrollmentCountMap[exp.id] || 0;
      const isFullyBooked = enrollmentCount >= exp.max_guides;
      
      return {
        id: exp.id,
        title: exp.title,
        short_description: exp.description ? exp.description.substring(0, 150) + (exp.description.length > 150 ? '...' : '') : '',
        duration: durationHours,
        duration_minutes: exp.duration_minutes,
        min_capacity: exp.min_participants,
        max_capacity: exp.max_participants,
        cover_image: exp.cover_image,
        price_from: priceFrom,
        max_guides: exp.max_guides,
        current_guides: enrollmentCount,
        is_fully_booked: isFullyBooked,
        user_is_enrolled: isEnrolled
      };
    });
    
    // Calcular total de páginas
    const totalPages = Math.ceil((count || 0) / filters.limit);
    
    // Construir resposta
    return { 
      success: true,
      data: {
        experiences: formattedExperiences,
        pagination: {
          total: count || 0,
          page: filters.page,
          limit: filters.limit,
          total_pages: totalPages
        }
      }
    };
  } catch (error) {
    console.error("listMarketplaceExperiences error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao listar experiências do marketplace. Tente novamente.",
      },
    };
  }
}