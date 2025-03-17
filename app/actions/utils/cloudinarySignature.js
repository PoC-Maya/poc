// app/actions/cloudinary.js
'use server'

/**
 * @description Gerar assinatura para upload direto no Cloudinary
 * @category Utilitários
 * @inputModel {
  "folder": "blog"
}
 */

import { requireAuth } from "@/lib/withAuth";
import { generateUploadSignature } from "@/lib/cloudinary";
import { z } from "zod";

// Schema para validação
const schema = z.object({
  folder: z.string().optional().default('uploads')
});

export async function cloudinarySignature(prevState, formData) {
  try {
    // Autenticar usuário
    const { user } = await requireAuth();
    
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    
    // Validação dos dados do formulário
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
    
    // Gerar assinatura
    const signatureData = generateUploadSignature({
      folder: data.folder
    });
    
    return {
      success: true,
      ...signatureData
    };
  } catch (error) {
    console.error("getCloudinarySignature error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao gerar assinatura. Tente novamente."
      }
    };
  }
}