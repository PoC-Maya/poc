'use server'

/**
 * @description Obter informações do usuário atual
 * @category auth
 * @inputModel {}
 */

import { getUser } from "@/hooks/useUserProfile";

export async function getUserInfo() {
  try {
    // Obter dados do usuário usando a função existente
    const userData = await getUser();
    
    return { 
      success: true,
      ...userData
    };
  } catch (error) {
    console.error("getUserInfo error:", error);
    return {
      success: false,
      error: "Erro ao obter informações do usuário."
    };
  }
}