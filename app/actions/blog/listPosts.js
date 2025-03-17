"use server";

/**
 * @description List blog posts with filtering, pagination and sorting options
 * @category blog
 * @inputModel {
  "category": "Dicas de Viagem",
  "tag": "viagem",
  "published": true,
  "page": 1,
  "limit": 10,
  "sortBy": "date",
  "sortOrder": "desc"
}
 */

import { requireAuth } from "@/lib/withAuth";
import { z } from "zod";

// Schema for validation
const schema = z.object({
  category: z.string().optional(),
  tag: z.string().optional(),
  published: z.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  sortBy: z.enum(["date", "title", "views"]).default("date"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export async function listPosts(prevState, formData) {
  try {
    // Get Supabase client from requireAuth
    const { supabase } = await requireAuth({ redirectTo: null });

    // Extract data from FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log("Received data:", rawData);

    // Processar os dados para validação
    const dataToValidate = {
      category: rawData.category || undefined,
      tag: rawData.tag || undefined,
      published: rawData.published === "true" ? true : 
                rawData.published === "false" ? false : undefined,
      page: rawData.page || 1,
      limit: rawData.limit || 10,
      sortBy: rawData.sortBy || "date",
      sortOrder: rawData.sortOrder || "desc",
    };

    // Verificar se há algum parâmetro JSON no FormData
    for (const [key, value] of Object.entries(rawData)) {
      try {
        const parsedValue = JSON.parse(value);
        
        if (parsedValue && typeof parsedValue === 'object') {
          // Mesclar os valores do JSON com dataToValidate
          dataToValidate.category = parsedValue.category || dataToValidate.category;
          dataToValidate.tag = parsedValue.tag || dataToValidate.tag;
          dataToValidate.published = parsedValue.published !== undefined ? 
                                    parsedValue.published : dataToValidate.published;
          dataToValidate.page = parsedValue.page || dataToValidate.page;
          dataToValidate.limit = parsedValue.limit || dataToValidate.limit;
          dataToValidate.sortBy = parsedValue.sortBy || dataToValidate.sortBy;
          dataToValidate.sortOrder = parsedValue.sortOrder || dataToValidate.sortOrder;
          break;
        }
      } catch (e) {
        // Não é JSON, ignorar
      }
    }
    
    // Validar com Zod
    const validation = schema.safeParse(dataToValidate);
    
    // Se a validação falhar, retornar erros
    if (!validation.success) {
      console.error("Validation error:", validation.error.flatten());
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }
    
    // Dados validados
    const data = validation.data;
    console.log("Validated data:", data);

    // Calcular o offset para paginação
    const offset = (data.page - 1) * data.limit;

    // Iniciar a consulta base
    let query = supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, cover_image, created_at, updated_at", { count: "exact" });

    // Aplicar filtros se fornecidos
    if (data.published !== undefined) {
      query = query.eq("published", data.published);
    }

    // Mapear sortBy para o nome da coluna real no banco de dados
    const sortByMap = {
      date: "created_at", // Usando created_at em vez de published_at
      title: "title",
      views: "views" // Isso pode precisar ser ajustado se views não existir
    };
    
    const sortByColumn = sortByMap[data.sortBy] || "created_at";

    // Aplicar ordenação
    query = query.order(sortByColumn, { ascending: data.sortOrder === "asc" });

    // Aplicar paginação
    query = query.range(offset, offset + data.limit - 1);

    // Executar a consulta
    const { data: posts, error: postsError, count } = await query;

    if (postsError) {
      console.error("Error fetching posts:", postsError);
      return {
        success: false,
        errors: {
          _form: `Failed to fetch posts: ${postsError.message}`,
        },
      };
    }

    // Se tiver filtro de categoria ou tag, precisamos filtrar os resultados
    let filteredPosts = posts;
    
    // Filtrar por categoria se fornecida
    if (data.category) {
      // Buscar posts por categoria
      const { data: categoryPosts, error: categoryError } = await supabase
        .from("blog_categories")
        .select("post_id")
        .eq("category_name", data.category);
      
      if (categoryError) {
        console.error("Error fetching category posts:", categoryError);
      } else if (categoryPosts) {
        const categoryPostIds = categoryPosts.map(item => item.post_id);
        filteredPosts = filteredPosts.filter(post => categoryPostIds.includes(post.id));
      }
    }
    
    // Filtrar por tag se fornecida
    if (data.tag) {
      // Buscar posts por tag
      const { data: tagPosts, error: tagError } = await supabase
        .from("blog_post_tags")
        .select("post_id, blog_tags!inner(name)")
        .eq("blog_tags.name", data.tag);
      
      if (tagError) {
        console.error("Error fetching tag posts:", tagError);
      } else if (tagPosts) {
        const tagPostIds = tagPosts.map(item => item.post_id);
        filteredPosts = filteredPosts.filter(post => tagPostIds.includes(post.id));
      }
    }

    // Calcular informações de paginação
    const totalItems = count || filteredPosts.length;
    const totalPages = Math.ceil(totalItems / data.limit);
    
    return {
      success: true,
      posts: filteredPosts,
      pagination: {
        page: data.page,
        limit: data.limit,
        totalItems,
        totalPages,
        hasNextPage: data.page < totalPages,
        hasPrevPage: data.page > 1
      }
    };
  } catch (error) {
    console.error("listPosts error:", error);
    return {
      success: false,
      errors: {
        _form: error.message || "Error listing posts. Please try again.",
      },
    };
  }
}