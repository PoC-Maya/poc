'use server'

/**
 * @description Listar guias com filtros opcionais
 * @category guides
 * @inputModel {
 *   "location": "São Paulo",
 *   "specialty": "História",
 *   "language": "Inglês",
 *   "page": 1,
 *   "limit": 10
 * }
 */

import { z } from "zod";
import { requireAuth } from "@/lib/withAuth";

// Schema para validação
const schema = z.object({
  location: z.string().optional(),
  specialty: z.string().optional(),
  language: z.string().optional(),
  page: z.preprocess(
    (val) => (val === "" || val === undefined) ? 1 : Number(val),
    z.number().int().positive().default(1)
  ),
  limit: z.preprocess(
    (val) => (val === "" || val === undefined) ? 10 : Number(val),
    z.number().int().positive().max(50).default(10)
  )
});

export async function listGuides(prevState, formData) {
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
    const data = validation.data;
    
    // Calcular offset para paginação
    const offset = (data.page - 1) * data.limit;
    
    // Pega o cliente Supabase (não precisa estar autenticado para listar guias)
    const { supabase } = await requireAuth({ redirectTo: null });
    
    // Iniciar a query base
    let query = supabase
      .from('guide_profiles')
      .select(`
        id, 
        avatar, 
        location, 
        short_description, 
        languages, 
        specialties, 
        is_verified, 
        years_of_experience,
        profiles!inner(id, full_name, avatar_url)
      `, { count: 'exact' });
    
    // Adicionar filtro para mostrar apenas perfis públicos
    query = query.or('privacy_settings->>profileVisibility.eq.public,privacy_settings.is.null');
    
    // Aplicar filtros se fornecidos
    if (data.location) {
      query = query.or(`location->>city.ilike.%${data.location}%,location->>state.ilike.%${data.location}%`);
    }
    
    if (data.specialty) {
      query = query.contains('specialties', [data.specialty]);
    }
    
    // Abordagem corrigida para filtrar por idioma
    if (data.language) {
      // Usando uma função SQL personalizada para buscar em arrays de objetos JSONB
      // Esta é uma abordagem mais segura que não depende da estrutura exata do JSON
      const rpcResponse = await supabase.rpc('search_guides_by_language', {
        search_language: data.language
      });
      
      if (rpcResponse.error) {
        console.error("Erro ao buscar guias por idioma:", rpcResponse.error);
        return {
          success: false,
          errors: {
            _form: "Erro ao buscar guias por idioma: " + rpcResponse.error.message,
          },
        };
      }
      
      // Se não houver resultados da RPC, retornar lista vazia
      if (!rpcResponse.data || rpcResponse.data.length === 0) {
        return {
          success: true,
          data: {
            guides: [],
            pagination: {
              total: 0,
              page: data.page,
              limit: data.limit,
              totalPages: 0
            }
          }
        };
      }
      
      // Filtrar a query principal pelos IDs retornados da RPC
      const guideIds = rpcResponse.data.map(guide => guide.id);
      query = query.in('id', guideIds);
    }
    
    // Aplicar paginação
    query = query.range(offset, offset + data.limit - 1);
    
    // Ordenar por verificação (verificados primeiro) e depois por experiência
    query = query.order('is_verified', { ascending: false })
                .order('years_of_experience', { ascending: false });
    
    // Executar a query
    const { data: guides, error, count } = await query;
    
    if (error) {
      console.error("Erro ao listar guias:", error);
      return {
        success: false,
        errors: {
          _form: "Erro ao listar guias: " + error.message,
        },
      };
    }
    
    // Processar os resultados para o formato desejado
    const formattedGuides = guides ? guides.map(guide => ({
      id: guide.id,
      fullName: guide.profiles.full_name,
      avatarUrl: guide.profiles.avatar_url || guide.avatar,
      location: guide.location,
      shortDescription: guide.short_description,
      languages: guide.languages,
      specialties: guide.specialties,
      isVerified: guide.is_verified,
      yearsOfExperience: guide.years_of_experience
    })) : [];
    
    return { 
      success: true,
      data: {
        guides: formattedGuides,
        pagination: {
          total: count || 0,
          page: data.page,
          limit: data.limit,
          totalPages: Math.ceil((count || 0) / data.limit)
        }
      }
    };

  } catch (error) {
    console.error("listGuides error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao listar guias. Tente novamente.",
      },
    };
  }
}