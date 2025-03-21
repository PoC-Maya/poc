'use server'

/**
 * @description Update the status of an experience (admin only)
 * @category Experiences
 * @inputModel {
 *   "experience_id": "123e4567-e89b-12d3-a456-426614174000",
 *   "status": "published", // Options: "draft", "in-revision", "published", "reproved"
 *   "rejection_reason": "The description is too short and lacks detail." // Required if status is "reproved"
 * }
 */

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/withAuth";

// Schema for validation
const schema = z.object({
  experience_id: z.string().uuid(),
  status: z.enum(['draft', 'in-revision', 'published', 'reproved']),
  rejection_reason: z.string().min(10).optional()
}).refine(data => {
  // If status is "reproved", rejection_reason is required
  if (data.status === 'reproved') {
    return !!data.rejection_reason;
  }
  return true;
}, {
  message: "Rejection reason is required when status is 'reproved'",
  path: ["rejection_reason"]
});

export async function updateExperienceStatus(prevState, formData) {
  try {
    // Extract data from FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Received data:', rawData);

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
    
    // Check if user is admin
    if (profile.user_type !== 'admin') {
      return {
        success: false,
        errors: {
          _form: "Only administrators can update experience status",
        },
      };
    }
    
    // Check if experience exists
    const { data: experience, error: experienceError } = await supabase
      .from('experiences')
      .select('id, title, created_by, status')
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
    
    // Prepare update data
    const updateData = {
      status: data.status,
      updated_at: new Date().toISOString()
    };
    
    // Add rejection reason if status is "reproved"
    if (data.status === 'reproved') {
      updateData.rejection_reason = data.rejection_reason;
    } else {
      // Clear rejection reason if status is not "reproved"
      updateData.rejection_reason = null;
    }
    
    // Update experience status
    const { error: updateError } = await supabase
      .from('experiences')
      .update(updateData)
      .eq('id', data.experience_id);
    
    if (updateError) {
      console.error("Error updating experience status:", updateError);
      return {
        success: false,
        errors: {
          _form: "Error updating experience status: " + updateError.message,
        },
      };
    }
    
    // Get guide information for notification purposes
    const { data: guide, error: guideError } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .eq('id', experience.created_by)
      .single();
    
    if (!guideError && guide) {
      // TODO: Send notification to guide about status change
      // This could be implemented later with a notification system
      console.log(`Status of experience "${experience.title}" changed to "${data.status}" for guide ${guide.full_name}`);
    }
    
    // Revalidate paths to update UI
    revalidatePath('/admin/experiences');
    revalidatePath(`/admin/experiences/${data.experience_id}`);
    revalidatePath('/guide/experiences');
    revalidatePath(`/guide/experiences/${data.experience_id}`);
    revalidatePath('/experiences');
    
    // Return success response
    return { 
      success: true,
      message: `Experience status updated to ${data.status}`,
      data: {
        id: data.experience_id,
        status: data.status
      }
    };
  } catch (error) {
    console.error("updateExperienceStatus error:", error);
    return {
      success: false,
      errors: {
        _form: "Error updating experience status. Please try again.",
      },
    };
  }
}