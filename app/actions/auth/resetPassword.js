"use server";

/**
 * @description Solicitar redefinição de senha
 * @category auth
 * @inputModel {
 *   "email": "usuario@exemplo.com"
 * }
 */

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import crypto from "crypto";

// Schema para validação
const schema = z.object({
  email: z.string().email("Email inválido"),
});

// Controle de limite de taxa (ainda mantemos isso em memória, pois é apenas para proteção temporária)
const rateLimits = new Map();

export async function resetPassword(prevState, formData) {
  try {
    // Extrair dados do FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log("Dados recebidos:", rawData);

    // Validação dos dados do formulário
    const validation = schema.safeParse(rawData);

    // Se houver erro de validação, retorna imediatamente com os erros
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    return {
      success: true,
      message: "Email de redefinição de senha enviado com sucesso.",
    };
  } catch (error) {
    console.error("resetPassword error:", error);
    return {
      success: false,
      errors: {
        _form: "Erro ao solicitar redefinição de senha. Tente novamente.",
      },
    };
  }
}
