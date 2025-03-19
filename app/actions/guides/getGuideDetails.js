'use server'

/**
 * @description Obter detalhes completos de um guia
 * @category guides
 * @inputModel {
 *   "guideId": "guide_123"
 * }
 */

import { z } from "zod";
import { requireAuth } from "@/lib/withAuth";

// Schema para validação
const schema = z.object({
  guideId: z.string().uuid("ID de guia inválido")
});

export async function getGuideDetails(prevState, formData) {
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
    
    // Pega o cliente Supabase (não precisa estar autenticado para ver perfil de guia)
    const { supabase } = await requireAuth({ redirectTo: null });
    
    // Buscar perfil do guia - SELECIONANDO APENAS CAMPOS NECESSÁRIOS
    const { data: guideProfile, error: guideProfileError } = await supabase
      .from('guide_profiles')
      .select(`
        id, 
        professional_license, 
        years_of_experience, 
        languages, 
        specialties, 
        is_verified, 
        verification_date, 
        created_at, 
        updated_at, 
        avatar, 
        location, 
        short_description, 
        full_description, 
        certifications, 
        education, 
        work_experience, 
        academic_experience, 
        gallery_photos, 
        youtube_videos, 
        youtube_video_ids, 
        privacy_settings
      `)
      .eq('id', data.guideId)
      .single();
    
    if (guideProfileError) {
      console.error("Erro ao buscar perfil de guia:", guideProfileError);
      return {
        success: false,
        errors: {
          _form: "Erro ao buscar perfil de guia: " + guideProfileError.message,
        },
      };
    }
    
    // Se o perfil de guia não existir, retornar erro
    if (!guideProfile) {
      return {
        success: false,
        errors: {
          _form: "Guia não encontrado.",
        },
      };
    }
    
    // Buscar informações básicas do perfil - SELECIONANDO APENAS CAMPOS NECESSÁRIOS
    const { data: basicProfile, error: basicProfileError } = await supabase
      .from('profiles')
      .select('id, full_name, email, phone, avatar_url, created_at')
      .eq('id', data.guideId)
      .single();
    
    if (basicProfileError) {
      console.error("Erro ao buscar perfil básico:", basicProfileError);
      return {
        success: false,
        errors: {
          _form: "Erro ao buscar perfil básico: " + basicProfileError.message,
        },
      };
    }
    
    // Combinar os dados do perfil básico e do perfil de guia
    const guideDetails = {
      id: basicProfile.id,
      fullName: basicProfile.full_name,
      email: basicProfile.email,
      phone: basicProfile.phone,
      avatarUrl: basicProfile.avatar_url || guideProfile.avatar,
      memberSince: basicProfile.created_at,
      
      // Informações de localização
      location: guideProfile.location,
      
      // Descrições
      shortDescription: guideProfile.short_description,
      fullDescription: guideProfile.full_description,
      
      // Informações profissionais
      professionalLicense: guideProfile.professional_license,
      yearsOfExperience: guideProfile.years_of_experience,
      languages: guideProfile.languages,
      specialties: guideProfile.specialties,
      certifications: guideProfile.certifications,
      education: guideProfile.education,
      workExperience: guideProfile.work_experience,
      academicExperience: guideProfile.academic_experience,
      
      // Mídia
      galleryPhotos: guideProfile.gallery_photos,
      youtubeVideos: guideProfile.youtube_videos,
      youtubeVideoIds: guideProfile.youtube_video_ids,
      
      // Status de verificação
      isVerified: guideProfile.is_verified,
      verificationDate: guideProfile.verification_date,
      
      // Configurações de privacidade (apenas se o perfil for público)
      privacySettings: guideProfile.privacy_settings?.profileVisibility === 'public' 
        ? { profileVisibility: guideProfile.privacy_settings.profileVisibility }
        : { profileVisibility: 'private' }
    };
    
    // Verificar configurações de privacidade
    const isProfilePublic = guideProfile.privacy_settings?.profileVisibility === 'public';
    
    // Se o perfil for privado, retornar apenas informações básicas
    if (!isProfilePublic) {
      return {
        success: true,
        data: {
          id: guideDetails.id,
          fullName: guideDetails.fullName,
          avatarUrl: guideDetails.avatarUrl,
          isVerified: guideDetails.isVerified,
          privacySettings: { profileVisibility: 'private' },
          message: "Este perfil é privado e tem informações limitadas."
        }
      };
    }
    
    return { 
      success: true,
      data: guideDetails
    };

  } catch (error) {
    console.error("getGuideDetails error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao buscar detalhes do guia. Tente novamente.",
      },
    };
  }
}