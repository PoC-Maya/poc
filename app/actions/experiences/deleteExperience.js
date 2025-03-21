'use server'

/**
 * @description Delete an experience (guide can delete own experiences, admin can delete any)
 * @category Experiences
 * @inputModel {
 *   "experience_id": "123e4567-e89b-12d3-a456-426614174000",
 *   "force_delete": false // Admin only: force delete (reserved for future use)
 * }
 */

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/withAuth";

// Schema for validation
const schema = z.object({
  experience_id: z.string().uuid(),
  force_delete: z.boolean().optional().default(false)
});

export async function deleteExperience(prevState, formData) {
  try {
    // Extract data from FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Received data:', rawData);

    // Process boolean fields
    if (rawData.force_delete) {
      rawData.force_delete = rawData.force_delete === 'true' || rawData.force_delete === true;
    }

    // Validate data
    const validation = schema.safeParse(rawData);

    // If validation error, return immediately with errors
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Validated data
    const data = validation.data;
    
    // Get authenticated user and Supabase client
    const { user, profile, supabase } = await requireAuth();
    
    // Check if experience exists and get its details
    const { data: experience, error: experienceError } = await supabase
      .from('experiences')
      .select('id, title, created_by, marketplace')
      .eq('id', data.experience_id)
      .single();
    
    if (experienceError || !experience) {
      console.error("Error fetching experience:", experienceError);
      return {
        success: false,
        errors: {
          _form: "Experience not found",
        },
      };
    }
    
    // Check permissions
    const isAdmin = profile.user_type === 'admin';
    const isOwner = experience.created_by === user.id;
    
    if (!isAdmin && !isOwner) {
      return {
        success: false,
        errors: {
          _form: "You don't have permission to delete this experience",
        },
      };
    }
    
    // If it's a marketplace experience, check if there are guides enrolled
    if (experience.marketplace) {
      const { data: enrolledGuides, error: enrolledGuidesError, count } = await supabase
        .from('guide_experience_enrollments')
        .select('guide_id', { count: 'exact' })
        .eq('experience_id', data.experience_id);
      
      if (enrolledGuidesError) {
        console.error("Error checking enrolled guides:", enrolledGuidesError);
        return {
          success: false,
          errors: {
            _form: "Error checking enrolled guides: " + enrolledGuidesError.message,
          },
        };
      }
      
      if (count && count > 0) {
        return {
          success: false,
          errors: {
            _form: "Cannot delete a marketplace experience with enrolled guides. Remove all guides first.",
          },
        };
      }
    }
    
    // Only admins can force delete
    if (data.force_delete && !isAdmin) {
      return {
        success: false,
        errors: {
          _form: "Only administrators can force delete experiences",
        },
      };
    }
    
    // Start a transaction to delete all related data
    try {
      // Delete related data first (foreign key constraints should handle this,
      // but we're being explicit to ensure proper cleanup)
      
      // 1. Delete price tiers
      const { error: priceTiersError } = await supabase
        .from('experience_price_tiers')
        .delete()
        .eq('experience_id', data.experience_id);
      
      if (priceTiersError) {
        throw new Error("Error deleting price tiers: " + priceTiersError.message);
      }
      
      // 2. Delete tags
      const { error: tagsError } = await supabase
        .from('experience_tags')
        .delete()
        .eq('experience_id', data.experience_id);
      
      if (tagsError) {
        throw new Error("Error deleting tags: " + tagsError.message);
      }
      
      // 3. Delete working hours (for guide experiences)
      if (!experience.marketplace) {
        const { error: workingHoursError } = await supabase
          .from('guide_experience_working_hours')
          .delete()
          .eq('experience_id', data.experience_id);
        
        if (workingHoursError) {
          throw new Error("Error deleting working hours: " + workingHoursError.message);
        }
      }
      
      // 4. Delete quiz questions (for marketplace experiences)
      if (experience.marketplace) {
        const { error: quizQuestionsError } = await supabase
          .from('experience_quiz_questions')
          .delete()
          .eq('experience_id', data.experience_id);
        
        if (quizQuestionsError) {
          throw new Error("Error deleting quiz questions: " + quizQuestionsError.message);
        }
      }
      
      // 5. Finally, delete the experience
      const { error: deleteExperienceError } = await supabase
        .from('experiences')
        .delete()
        .eq('id', data.experience_id);
      
      if (deleteExperienceError) {
        throw new Error("Error deleting experience: " + deleteExperienceError.message);
      }
      
      // Revalidate paths to update UI
      revalidatePath('/admin/experiences');
      revalidatePath('/guide/experiences');
      revalidatePath('/experiences');
      
      // Return success response
      return { 
        success: true,
        message: "Experience deleted successfully",
        data: {
          id: data.experience_id
        }
      };
    } catch (error) {
      console.error("Transaction error:", error);
      return {
        success: false,
        errors: {
          _form: error.message || "Error deleting experience. Please try again.",
        },
      };
    }
  } catch (error) {
    console.error("deleteExperience error:", error);
    return {
      success: false,
      errors: {
        _form: "Error deleting experience. Please try again.",
      },
    };
  }
}