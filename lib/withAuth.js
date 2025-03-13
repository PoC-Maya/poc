// lib/withAuth.ts
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/hooks/useUserProfile";

export async function requireAuth() {
  const { user, profile } = await getUser();
  
  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }
  
  const supabase = await createClient();
  
  return { user, profile, supabase };
}
