"use server";

/**
 * @description Get details of a blog post by slug
 * @category blog
 * @inputModel {
  "slug": "titulo-do-post"
}
 */

import { requireAuth } from "@/lib/withAuth";
import { z } from "zod";

// Schema for validation
const schema = z.object({
  slug: z.string().min(1, "Slug is required"),
});

export async function getPostDetails(prevState, formData) {
  try {
    // Get Supabase client from requireAuth
    // Não precisamos verificar o usuário, apenas precisamos do cliente supabase
    const { supabase } = await requireAuth({ redirectTo: null });

    // Extract data from FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log("Received data:", rawData);

    // Tentar encontrar o slug em diferentes lugares
    let slugRaw = null;
    
    // Verificar no FormData
    if (rawData.slug) {
      slugRaw = rawData.slug;
    } 
    // Verificar nomes alternativos no FormData
    else if (rawData.postSlug) {
      slugRaw = rawData.postSlug;
    } 
    else if (rawData.post_slug) {
      slugRaw = rawData.post_slug;
    }
    // Verificar no prevState
    else if (prevState && prevState.slug) {
      slugRaw = prevState.slug;
    }
    // Verificar se há algum parâmetro JSON no FormData
    else {
      for (const [key, value] of Object.entries(rawData)) {
        try {
          const parsedValue = JSON.parse(value);
          
          if (parsedValue && parsedValue.slug) {
            slugRaw = parsedValue.slug;
            break;
          }
        } catch (e) {
          // Não é JSON, ignorar
        }
      }
    }
    
    // Se não encontramos um slug, retornar erro
    if (!slugRaw) {
      return {
        success: false,
        errors: {
          slug: ["Post slug is required"],
        },
      };
    }
    
    // Preparar dados para validação
    const dataToValidate = {
      slug: String(slugRaw),
    };
    
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

    // Primeiro, buscar apenas o post básico
    const { data: post, error: postError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", data.slug)
      .single();

    if (postError) {
      console.error("Error fetching post:", postError);
      return {
        success: false,
        errors: {
          _form: `Failed to fetch post: ${postError.message}`,
        },
      };
    }

    if (!post) {
      return {
        success: false,
        errors: {
          _form: "Post not found",
        },
      };
    }

    // Agora, buscar as tags separadamente
    const { data: postTags, error: tagsError } = await supabase
      .from("blog_post_tags")
      .select(`
        tag_id,
        blog_tags (id, name)
      `)
      .eq("post_id", post.id);

    if (tagsError) {
      console.error("Error fetching tags:", tagsError);
      // Não retornar erro, apenas continuar sem as tags
    }

    // Processar as tags para um formato mais amigável
    const tags = postTags ? postTags.map(tagRelation => ({
      id: tagRelation.tag_id,
      name: tagRelation.blog_tags ? tagRelation.blog_tags.name : 'Unknown'
    })) : [];

    // Adicionar as tags ao post
    post.tags = tags;

    // Buscar posts relacionados (opcional)
    let relatedPosts = [];
    if (tags.length > 0) {
      // Pegar os IDs das tags
      const tagIds = tags.map(tag => tag.id);
      
      // Buscar posts que compartilham pelo menos uma tag
      const { data: relatedPostsData, error: relatedError } = await supabase
        .from("blog_post_tags")
        .select(`
          post_id
        `)
        .in("tag_id", tagIds)
        .neq("post_id", post.id); // Excluir o post atual
      
      if (!relatedError && relatedPostsData && relatedPostsData.length > 0) {
        // Extrair IDs de posts únicos
        const uniquePostIds = [...new Set(relatedPostsData.map(item => item.post_id))];
        
        // Limitar a 3 IDs
        const limitedPostIds = uniquePostIds.slice(0, 3);
        
        // Buscar os detalhes dos posts relacionados
        const { data: relatedPostsDetails, error: relatedDetailsError } = await supabase
          .from("blog_posts")
          .select("id, title, slug, cover_image, published_at, excerpt")
          .in("id", limitedPostIds)
          .order("published_at", { ascending: false });
        
        if (!relatedDetailsError && relatedPostsDetails) {
          relatedPosts = relatedPostsDetails;
        }
      }
    }

    return {
      success: true,
      post,
      relatedPosts
    };
  } catch (error) {
    console.error("getPostDetails error:", error);
    return {
      success: false,
      errors: {
        _form: error.message || "Error fetching post details. Please try again.",
      },
    };
  }
}