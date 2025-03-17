"use server";

/**
 * @description Delete a blog post and its associated images
 * @category blog
 * @inputModel {
  id: "a58733bb-4cc3-46a7-a83b-b155dcf6a61e",
  deleteImages: true
}
 */

import { requireAuth } from "@/lib/withAuth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { deleteCloudinaryImages } from "@/lib/cloudinary";

// Schema for validation
const schema = z.object({
  id: z.string().min(1, "Post ID is required"),
  deleteImages: z.preprocess(
    // Convert string to boolean
    (val) => val === "true" || val === true,
    z.boolean().default(true)
  ),
});

export async function deletePost(prevState, formData) {
  try {
    // Get authenticated user and profile
    const { user, profile, supabase } = await requireAuth();

    // Extract data from FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log("Received data:", rawData);

    // Tentar encontrar o ID em diferentes lugares
    let postIdRaw = null;
    
    // Verificar no FormData
    if (rawData.id) {
      postIdRaw = rawData.id;
    } 
    // Verificar nomes alternativos no FormData
    else if (rawData.postId) {
      postIdRaw = rawData.postId;
    } 
    else if (rawData.post_id) {
      postIdRaw = rawData.post_id;
    }
    // Verificar no prevState
    else if (prevState && prevState.id) {
      postIdRaw = prevState.id;
    }
    // Verificar em qualquer campo que contenha 'id' no nome
    else {
      for (const [key, value] of Object.entries(rawData)) {
        if (key.toLowerCase().includes('id') && value) {
          postIdRaw = value;
          break;
        }
      }
      
      // Verificar se há algum parâmetro JSON no FormData
      if (!postIdRaw) {
        for (const [key, value] of Object.entries(rawData)) {
          try {
            const parsedValue = JSON.parse(value);
            
            if (parsedValue && parsedValue.id) {
              postIdRaw = parsedValue.id;
              break;
            }
          } catch (e) {
            // Não é JSON, ignorar
          }
        }
      }
    }
    
    // Se não encontramos um ID, retornar erro
    if (!postIdRaw) {
      return {
        success: false,
        errors: {
          id: ["Post ID is required"],
        },
      };
    }
    
    // Preparar dados para validação
    const dataToValidate = {
      id: String(postIdRaw), // Converter para string para garantir compatibilidade com o schema
      deleteImages: rawData.deleteImages,
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

    // Fetch the post to get image URLs before deletion
    const { data: post, error: fetchError } = await supabase
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

    if (!post) {
      return {
        success: false,
        errors: {
          _form: "Post not found",
        },
      };
    }

    // Delete images from Cloudinary if requested
    let imageResults = null;
    
    if (data.deleteImages) {
      const imagesToDelete = [];
      
      // Add cover image if exists
      if (post.cover_image) {
        imagesToDelete.push(post.cover_image);
      }
      
      // Add gallery images if exist
      if (post.gallery_images && post.gallery_images.length > 0) {
        imagesToDelete.push(...post.gallery_images);
      }
      
      if (imagesToDelete.length > 0) {
        console.log("Imagens para excluir:", imagesToDelete);
        
        // Tentar excluir as imagens
        imageResults = await deleteCloudinaryImages(imagesToDelete);
        console.log("Resultado da exclusão de imagens:", imageResults);
        
        // Se falhar, tentar com os public_ids diretos
        if (imageResults.deleted === 0 && imageResults.failed > 0) {
          console.log("Tentando excluir com public_ids diretos");
          
          const directPublicIds = [];
          
          // Adicionar cover_image
          if (post.cover_image) {
            // Extrair o nome do arquivo da URL
            const coverFilename = post.cover_image.split('/').pop().split('.')[0];
            directPublicIds.push(`blog/${coverFilename}`);
          }
          
          // Adicionar gallery_images
          if (post.gallery_images && post.gallery_images.length > 0) {
            post.gallery_images.forEach(url => {
              const galleryFilename = url.split('/').pop().split('.')[0];
              directPublicIds.push(`blog-gallery/${galleryFilename}`);
            });
          }
          
          console.log("Public IDs diretos:", directPublicIds);
          
          // Tentar excluir com os public_ids diretos
          imageResults = await deleteCloudinaryImages(directPublicIds);
          console.log("Resultado da exclusão com public_ids diretos:", imageResults);
        }
      }
    }

    // Delete post tags associations
    const { error: tagsDeleteError } = await supabase
      .from("blog_post_tags")
      .delete()
      .eq("post_id", data.id);

    if (tagsDeleteError) {
      console.error("Error deleting post tags:", tagsDeleteError);
    }

    // Delete the post
    const { error: deleteError } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", data.id);

    if (deleteError) {
      console.error("Error deleting post:", deleteError);
      return {
        success: false,
        errors: {
          _form: `Failed to delete post: ${deleteError.message}`,
        },
      };
    }

    // Revalidate relevant paths
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/blog");

    return {
      success: true,
      message: `Post ${data.id} excluído com sucesso.`,
      softDelete: false,
      imageResults,
    };
  } catch (error) {
    console.error("deletePost error:", error);
    return {
      success: false,
      errors: {
        _form: error.message || "Error deleting post. Please try again.",
      },
    };
  }
}