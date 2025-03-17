// lib/withAuth.ts
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/hooks/useUserProfile";

export async function requireAuth() {
  // Usar a função getUser atualizada que agora retorna isGuide e isTourist
  const { user, profile, isGuide, isTourist } = await getUser();
  
  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }
  
  const supabase = await createClient();
  
  // Retornar os mesmos dados, incluindo isGuide e isTourist
  return { 
    user, 
    profile, 
    supabase,
    isGuide,
    isTourist
  };
}