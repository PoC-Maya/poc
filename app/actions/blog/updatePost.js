"use server";

/**
 * @description Update an existing blog post
 * @category blog
 * @inputModel {
  "id": "a58733bb-4cc3-46a7-a83b-b155dcf6a61e",
  "title": "Post Title",
  "content": "Full post content in markdown or HTML format",
  "excerpt": "Brief summary of the post",
  "coverImage": "https://res.cloudinary.com/example/image/upload/v1234567890/blog/cover_image.jpg",
  "galleryImages": ["https://res.cloudinary.com/example/image/upload/v1234567890/blog-gallery/image1.jpg"],
  "videoUrl": "https://www.youtube.com/watch?v=example123",
  "category": "Travel Tips",
  "tags": ["travel", "tips", "tourism"],
  "published": false,
  "slug": "post-title"
}
 */

import { requireAuth } from "@/lib/withAuth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema for validation
const schema = z.object({
  id: z.string().min(1, "Post ID is required"),
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  coverImage: z.string().url("Invalid cover image URL").optional(),
  galleryImages: z.array(z.string().url("Invalid gallery image URL")).optional(),
  videoUrl: z.string().url("Invalid video URL").optional().nullable(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  slug: z.string().optional(),
});

export async function updatePost(prevState, formData) {
  try {
    // Get authenticated user and profile
    const { user, profile, supabase } = await requireAuth();

    // Extract data from FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log("Received data:", rawData);

    // Processar os dados para validação
    const dataToValidate = {
      id: rawData.id,
      title: rawData.title,
      content: rawData.content,
      excerpt: rawData.excerpt,
      videoUrl: rawData.videoUrl || null,
      category: rawData.category,
      published: rawData.published === "true" ? true : 
                rawData.published === "false" ? false : undefined,
      slug: rawData.slug,
    };

    // Processar coverImage
    if (rawData.coverImage) {
      dataToValidate.coverImage = rawData.coverImage;
    }

    // Processar galleryImages
    let galleryImages = [];
    if (rawData.galleryImages) {
      try {
        galleryImages = JSON.parse(rawData.galleryImages);
      } catch (e) {
        // Se não for JSON, assumir que é uma string única
        galleryImages = [rawData.galleryImages];
      }
    } else {
      // Verificar se há múltiplos campos de galleryImages
      const galleryFields = Object.keys(rawData).filter(key => key.startsWith('galleryImages['));
      if (galleryFields.length > 0) {
        galleryImages = galleryFields.map(key => rawData[key]);
      }
    }
    dataToValidate.galleryImages = galleryImages;

    // Processar tags (podem vir como string JSON ou como múltiplos campos)
    let tags = [];
    if (rawData.tags) {
      try {
        tags = JSON.parse(rawData.tags);
      } catch (e) {
        // Se não for JSON, assumir que é uma string única
        tags = [rawData.tags];
      }
    } else {
      // Verificar se há múltiplos campos de tags
      const tagFields = Object.keys(rawData).filter(key => key.startsWith('tags['));
      if (tagFields.length > 0) {
        tags = tagFields.map(key => rawData[key]);
      }
    }
    dataToValidate.tags = tags;

    // Verificar se há algum parâmetro JSON no FormData
    for (const [key, value] of Object.entries(rawData)) {
      if (!['tags', 'galleryImages'].includes(key)) { // Já tratamos tags e galleryImages separadamente
        try {
          const parsedValue = JSON.parse(value);
          
          if (parsedValue && typeof parsedValue === 'object') {
            // Mesclar os valores do JSON com dataToValidate
            Object.keys(parsedValue).forEach(field => {
              dataToValidate[field] = parsedValue[field];
            });
            break;
          }
        } catch (e) {
          // Não é JSON, ignorar
        }
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

    // Verificar se o post existe
    const { data: existingPost, error: fetchError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", data.id)
      .single();

    if (fetchError) {
      console.error("Error fetching post:", fetchError);
      return {
        success: false,
        errors: {
          _form: `Failed to fetch post: ${fetchError.message}`,
        },
      };
    }

    if (!existingPost) {
      return {
        success: false,
        errors: {
          _form: "Post not found",
        },
      };
    }

    // Preparar dados para atualização
    const updateData = {};
    
    // Adicionar campos que foram fornecidos
    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.videoUrl !== undefined) updateData.video_url = data.videoUrl;
    if (data.published !== undefined) updateData.published = data.published;
    if (data.coverImage !== undefined) updateData.cover_image = data.coverImage;
    if (data.galleryImages !== undefined) updateData.gallery_images = data.galleryImages;
    
    // Usar o slug fornecido se existir (a procedure generate_unique_slug será chamada pelo trigger)
    if (data.slug) {
      updateData.slug = data.slug;
    }

    // Atualizar o post
    const { data: updatedPost, error: updateError } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", data.id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating post:", updateError);
      return {
        success: false,
        errors: {
          _form: `Failed to update post: ${updateError.message}`,
        },
      };
    }

    // Atualizar categoria se fornecida
    if (data.category) {
      // Primeiro, remover categoria existente
      const { error: deleteCategoryError } = await supabase
        .from("blog_categories")
        .delete()
        .eq("post_id", data.id);
      
      if (deleteCategoryError) {
        console.error("Error deleting existing category:", deleteCategoryError);
      }
      
      // Adicionar nova categoria
      const { error: addCategoryError } = await supabase
        .from("blog_categories")
        .insert({
          post_id: data.id,
          category_name: data.category
        });
      
      if (addCategoryError) {
        console.error("Error adding new category:", addCategoryError);
      }
    }

    // Atualizar tags se fornecidas
    if (data.tags && data.tags.length > 0) {
      // Primeiro, remover tags existentes
      const { error: deleteTagsError } = await supabase
        .from("blog_post_tags")
        .delete()
        .eq("post_id", data.id);
      
      if (deleteTagsError) {
        console.error("Error deleting existing tags:", deleteTagsError);
      }
      
      // Para cada tag, verificar se já existe ou criar nova
      for (const tagName of data.tags) {
        // Verificar se a tag já existe
        const { data: existingTag, error: tagFetchError } = await supabase
          .from("blog_tags")
          .select("id")
          .eq("name", tagName)
          .single();
        
        let tagId;
        
        if (tagFetchError && tagFetchError.code !== 'PGRST116') { // PGRST116 = not found
          console.error("Error fetching tag:", tagFetchError);
          continue;
        }
        
        if (existingTag) {
          tagId = existingTag.id;
        } else {
          // Criar nova tag
          const { data: newTag, error: createTagError } = await supabase
            .from("blog_tags")
            .insert({
              name: tagName,
              // A procedure generate_unique_slug será chamada pelo trigger para a tag também
              slug: tagName
            })
            .select("id")
            .single();
          
          if (createTagError) {
            console.error("Error creating tag:", createTagError);
            continue;
          }
          
          tagId = newTag.id;
        }
        
        // Associar tag ao post
        const { error: associateTagError } = await supabase
          .from("blog_post_tags")
          .insert({
            post_id: data.id,
            tag_id: tagId
          });
        
        if (associateTagError) {
          console.error("Error associating tag with post:", associateTagError);
        }
      }
    }

    // Revalidate relevant paths
    revalidatePath("/blog");
    revalidatePath(`/blog/${updatedPost.slug}`);
    revalidatePath("/admin/blog");

    return {
      success: true,
      post: updatedPost,
      message: "Post updated successfully",
    };
  } catch (error) {
    console.error("updatePost error:", error);
    return {
      success: false,
      errors: {
        _form: error.message || "Error updating post. Please try again.",
      },
    };
  }
}