// lib/hooks/useUser.js
import { cache } from 'react';
import { createClient } from "@/lib/supabase/server";

export const getUser = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !data?.user) {
    return { user: null, profile: null };
  }
  
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", data.user.id)
    .single();
    
  return { user: data.user, profile: profileData };
});