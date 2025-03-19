'use server'

/**
 * @description Atualizar perfil de guia
 * @category Guides
 * @inputModel {
 *   // Informações Pessoais
 *   "avatar": "[File]",
 *   "fullName": "Nome Completo",
 *   "city": "Cancun",
 *   "state": "Quintana Roo",
 *   "shortDescription": "Descrição curta do guia",
 *   "fullDescription": "Descrição completa e detalhada do guia",
 *   
 *   // Informações Profissionais
 *   "languages": [{"language": "Português", "proficiency": "native"}],
 *   "specialties": ["Mergulho", "Fotografia", "História"],
 *   "certifications": [{"name": "PADI Open Water", "startYear": 2018, "endYear": 2023}],
 *   "education": [{"institution": "UNAM", "course": "Turismo", "startYear": 2010, "endYear": 2014}],
 *   "workExperience": [{"role": "Guia de Mergulho", "company": "Dive Cancun", "startDate": "2015-01", "endDate": "2020-12"}],
 *   "academicExperience": {"title": "Professor de História", "place": "Universidade de Cancun", "date": "2016-2018"},
 *   
 *   // Mídia
 *   "photos": ["[File]"],
 *   "youtubeVideos": ["https://youtube.com/watch?v=abc123"],
 *   
 *   // Configurações da Conta
 *   "phone": "+5219981234567",
 *   "stripeAccount": "acct_123456",
 *   
 *   // Preferências de Notificação
 *   "emailNotifications": {"newBookings": true, "newMessages": true, "paymentsReceived": true, "marketingPromotions": true},
 *   "smsNotifications": {"newBookings": true, "newMessages": true, "paymentsReceived": true},
 *   
 *   // Configurações de Privacidade
 *   "profileVisibility": "public",
 *   "dataSharing": true,
 *   
 *   // Preferências da Plataforma
 *   "language": "en-US",
 *   "currency": "USD",
 *   "dateFormat": "DD/MM/YYYY"
 * }
 */

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/withAuth";
import { extractYoutubeVideoId } from "../utils/extractYoutubeVideoId";

// Helper para converter string para boolean
const booleanPreprocess = (val) => {
  if (val === "true" || val === true) return true;
  if (val === "false" || val === false) return false;
  return val; // Deixa o Zod lidar com valores inválidos
};

// Schemas para validação
const languageSchema = z.object({
  language: z
    .string()
    .min(2, "Nome do idioma deve ter pelo menos 2 caracteres"),
  proficiency: z.enum(["native", "fluent", "intermediate", "basic"], {
    errorMap: () => ({ message: "Nível de proficiência inválido" }),
  }),
});

const certificationSchema = z.object({
  name: z
    .string()
    .min(2, "Nome da certificação deve ter pelo menos 2 caracteres"),
  startYear: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().int().min(1900).max(new Date().getFullYear())
  ),
  endYear: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().int().min(1900).max(new Date().getFullYear() + 10).optional()
  ),
});

const educationSchema = z.object({
  institution: z
    .string()
    .min(2, "Nome da instituição deve ter pelo menos 2 caracteres"),
  course: z.string().min(2, "Nome do curso deve ter pelo menos 2 caracteres"),
  startYear: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().int().min(1900).max(new Date().getFullYear())
  ),
  endYear: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().int().min(1900).max(new Date().getFullYear() + 10).optional()
  ),
});

const workExperienceSchema = z.object({
  role: z.string().min(2, "Função deve ter pelo menos 2 caracteres"),
  company: z.string().min(2, "Empresa deve ter pelo menos 2 caracteres"),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Data deve estar no formato YYYY-MM"),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Data deve estar no formato YYYY-MM")
    .optional(),
});

const academicExperienceSchema = z.object({
  title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
  place: z.string().min(2, "Local deve ter pelo menos 2 caracteres"),
  date: z.string().min(4, "Data deve ter pelo menos 4 caracteres"),
});

const emailNotificationsSchema = z.object({
  newBookings: z.preprocess(booleanPreprocess, z.boolean().default(true)),
  newMessages: z.preprocess(booleanPreprocess, z.boolean().default(true)),
  paymentsReceived: z.preprocess(booleanPreprocess, z.boolean().default(true)),
  marketingPromotions: z.preprocess(booleanPreprocess, z.boolean().default(false)),
});

const smsNotificationsSchema = z.object({
  newBookings: z.preprocess(booleanPreprocess, z.boolean().default(true)),
  newMessages: z.preprocess(booleanPreprocess, z.boolean().default(true)),
  paymentsReceived: z.preprocess(booleanPreprocess, z.boolean().default(true)),
});

// Schema principal - TODOS OS CAMPOS OPCIONAIS para permitir atualizações parciais
const schema = z.object({
  // Informações Pessoais
  avatar: z.string().optional(),
  fullName: z
    .string()
    .min(3, "Nome completo deve ter pelo menos 3 caracteres")
    .max(100)
    .optional(), // Agora é opcional
  city: z
    .string()
    .min(2, "Cidade deve ter pelo menos 2 caracteres")
    .optional(), // Agora é opcional
  state: z
    .string()
    .min(2, "Estado deve ter pelo menos 2 caracteres")
    .optional(), // Agora é opcional
  shortDescription: z
    .string()
    .max(200, "Descrição curta deve ter no máximo 200 caracteres")
    .optional(),
  fullDescription: z
    .string()
    .max(2000, "Descrição completa deve ter no máximo 2000 caracteres")
    .optional(),

  // Informações Profissionais
  languages: z.array(languageSchema).optional(),
  specialties: z.array(z.string()).optional(),
  certifications: z.array(certificationSchema).optional(),
  education: z.array(educationSchema).optional(),
  workExperience: z.array(workExperienceSchema).optional(),
  academicExperience: academicExperienceSchema.optional(),

  // Mídia
  photos: z.array(z.string()).optional(),
  youtubeVideos: z.array(z.string().url("URL de vídeo inválida")).optional(),

  // Configurações da Conta
  phone: z
    .string()
    .min(8, "Telefone deve ter pelo menos 8 caracteres")
    .max(20)
    .optional(),
  stripeAccount: z.string().optional(),
  
  // Preferências de Notificação
  emailNotifications: emailNotificationsSchema.optional(),
  smsNotifications: smsNotificationsSchema.optional(),

  // Configurações de Privacidade
  profileVisibility: z
    .enum(["public", "private"], {
      errorMap: () => ({
        message: "Visibilidade deve ser 'public' ou 'private'",
      }),
    })
    .optional(),
  dataSharing: z.preprocess(booleanPreprocess, z.boolean().optional()),

  // Preferências da Plataforma
  language: z
    .string()
    .min(2, "Idioma deve ter pelo menos 2 caracteres")
    .max(10)
    .optional(),
  currency: z
    .string()
    .min(3, "Moeda deve ter pelo menos 3 caracteres")
    .max(3)
    .optional(),
  dateFormat: z
    .string()
    .min(8, "Formato de data deve ter pelo menos 8 caracteres")
    .max(10)
    .optional(),
});

export async function updateGuideProfile(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log('Dados recebidos:', rawData);

    // Remover commissionRate se presente - apenas admin pode alterar
    delete rawData.commissionRate;

    // Processar arrays e objetos JSON
    const processedData = { ...rawData };
    
    // Processar campos que podem ser arrays ou objetos JSON
    const jsonFields = [
      'languages', 'specialties', 'certifications', 'education', 
      'workExperience', 'academicExperience', 'photos', 'youtubeVideos',
      'emailNotifications', 'smsNotifications'
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

    // Processar avatar e fotos
    let avatarUrl = null;
    let photoUrls = [];

    // Verificar se avatar é uma URL ou um arquivo
    const avatar = formData.get("avatar");
    if (avatar && typeof avatar === "string") {
      if (avatar.startsWith("http")) {
        avatarUrl = avatar;
        processedData.avatar = avatarUrl;
      }
    }

    // Verificar se photos são URLs ou arquivos
    const photos = formData.get("photos");
    if (photos && typeof photos === "string") {
      try {
        // Tentar analisar como JSON array de URLs
        if (photos.startsWith("[") && photos.endsWith("]")) {
          const parsed = JSON.parse(photos);
          if (Array.isArray(parsed)) {
            photoUrls = parsed.filter((url) => typeof url === "string" && url.startsWith("http"));
            processedData.photos = photoUrls;
          }
        } else if (photos.startsWith("http")) {
          // URL única
          photoUrls = [photos];
          processedData.photos = photoUrls;
        }
      } catch (e) {
        console.error("Erro ao processar photos:", e);
      }
    }

    // Processar vídeos do YouTube para extrair IDs
    if (processedData.youtubeVideos && Array.isArray(processedData.youtubeVideos)) {
      const videoIds = processedData.youtubeVideos.map(url => {
        const id = extractYoutubeVideoId(url);
        return id ? { url, id } : null;
      }).filter(Boolean);
      
      processedData.youtubeVideos = videoIds.map(video => video.url);
      processedData.youtubeVideoIds = videoIds.map(video => video.id);
    }

    // Log para debug
    console.log('Dados processados para languages:', processedData.languages);
    console.log('Dados processados para specialties:', processedData.specialties);
    console.log('Dados processados para smsNotifications:', processedData.smsNotifications);

    // Validação dos dados processados
    const validation = schema.safeParse(processedData);

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
    
    // Verificar se o usuário é um guia
    const { data: guideProfile, error: guideProfileError } = await supabase
      .from('guide_profiles')
      .select('*')
      .eq('id', profile.id)
      .single();
    
    if (guideProfileError && guideProfileError.code !== 'PGRST116') {
      console.error("Erro ao verificar perfil de guia:", guideProfileError);
      return {
        success: false,
        errors: {
          _form: "Erro ao verificar perfil de guia: " + guideProfileError.message,
        },
      };
    }
    
    // Se o perfil de guia não existir, retornar erro
    if (!guideProfile) {
      return {
        success: false,
        errors: {
          _form: "Usuário não é um guia.",
        },
      };
    }
    
    // PASSO 1: Atualizar o nome completo na tabela profiles (se fornecido)
    if (data.fullName) {
      const { error: updateProfileError } = await supabase
        .from('profiles')
        .update({
          full_name: data.fullName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);
      
      if (updateProfileError) {
        console.error("Erro ao atualizar nome completo:", updateProfileError);
        return {
          success: false,
          errors: {
            _form: "Erro ao atualizar nome completo: " + updateProfileError.message,
          },
        };
      }
    }
    
    // PASSO 2: Preparar dados para atualização do perfil de guia
    const updateData = {
      updated_at: new Date().toISOString(),
    };
    
    // Adicionar campos específicos do guia (exceto fullName que já foi tratado)
    if (data.avatar) updateData.avatar = data.avatar;
    if (data.city || data.state) {
      updateData.location = {
        city: data.city || (guideProfile.location?.city || ''),
        state: data.state || (guideProfile.location?.state || '')
      };
    }
    if (data.shortDescription) updateData.short_description = data.shortDescription;
    if (data.fullDescription) updateData.full_description = data.fullDescription;
    
    // Adicionar campos profissionais se fornecidos
    if (data.languages) updateData.languages = data.languages;
    if (data.specialties) updateData.specialties = data.specialties;
    if (data.certifications) updateData.certifications = data.certifications;
    if (data.education) updateData.education = data.education;
    if (data.workExperience) updateData.work_experience = data.workExperience;
    if (data.academicExperience) updateData.academic_experience = data.academicExperience;
    
    // Adicionar campos de mídia se fornecidos
    if (data.photos) updateData.gallery_photos = data.photos;
    if (data.youtubeVideos) updateData.youtube_videos = data.youtubeVideos;
    if (processedData.youtubeVideoIds) updateData.youtube_video_ids = processedData.youtubeVideoIds;
    
    // Adicionar campos de conta se fornecidos
    if (data.phone) {
      // Atualizar phone na tabela profiles
      const { error: updatePhoneError } = await supabase
        .from('profiles')
        .update({
          phone: data.phone,
        })
        .eq('id', profile.id);
      
      if (updatePhoneError) {
        console.error("Erro ao atualizar telefone:", updatePhoneError);
        return {
          success: false,
          errors: {
            _form: "Erro ao atualizar telefone: " + updatePhoneError.message,
          },
        };
      }
    }
    
    if (data.stripeAccount) updateData.stripe_account = data.stripeAccount;
    
    // Adicionar preferências de notificação se fornecidas
    if (data.emailNotifications || data.smsNotifications) {
      updateData.notification_preferences = {
        email: data.emailNotifications || guideProfile.notification_preferences?.email || {},
        sms: data.smsNotifications || guideProfile.notification_preferences?.sms || {}
      };
    }
    
    // Adicionar configurações de privacidade se fornecidas
    if (data.profileVisibility || data.dataSharing !== undefined) {
      updateData.privacy_settings = {
        profileVisibility: data.profileVisibility || guideProfile.privacy_settings?.profileVisibility || 'public',
        dataSharing: data.dataSharing !== undefined ? data.dataSharing : (guideProfile.privacy_settings?.dataSharing || true)
      };
    }
    
    // Adicionar preferências da plataforma se fornecidas
    if (data.language || data.currency || data.dateFormat) {
      updateData.platform_preferences = {
        language: data.language || guideProfile.platform_preferences?.language || 'en-US',
        currency: data.currency || guideProfile.platform_preferences?.currency || 'USD',
        dateFormat: data.dateFormat || guideProfile.platform_preferences?.dateFormat || 'DD/MM/YYYY'
      };
    }
    
    // Verificar se há campos para atualizar no perfil de guia
    if (Object.keys(updateData).length > 1) { // > 1 porque já temos updated_at
      // PASSO 3: Atualizar perfil de guia no banco de dados
      const { error: updateGuideProfileError } = await supabase
        .from('guide_profiles')
        .update(updateData)
        .eq('id', profile.id);
      
      if (updateGuideProfileError) {
        console.error("Erro ao atualizar perfil de guia:", updateGuideProfileError);
        return {
          success: false,
          errors: {
            _form: "Erro ao atualizar perfil de guia: " + updateGuideProfileError.message,
          },
        };
      }
    }
    
    // Revalidar o caminho para atualizar os dados na UI
    revalidatePath('/me/perfil');
    revalidatePath('/guides');
    
    return { 
      success: true,
      message: "Perfil de guia atualizado com sucesso!",
    };

  } catch (error) {
    console.error("updateGuideProfile error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao atualizar perfil de guia. Tente novamente.",
      },
    };
  }
}