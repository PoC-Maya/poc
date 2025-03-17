// lib/hooks/useUser.js
import { cache } from 'react';
import { createClient } from "@/lib/supabase/server";

export const getUser = cache(async () => {
  // Create Supabase client using your existing function
  const supabase = await createClient();

  // Get current user
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !data?.user) {
    return { user: null, profile: null };
  }
  
  // Get user profile
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)  // Using 'id' instead of 'user_id'
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
  }

  // Format user data to be consistent with register/login actions
  const formattedUser = {
    id: data.user.id,
    email: data.user.email,
    fullName: profileData?.full_name || data.user.user_metadata?.full_name,
    userType: profileData?.user_type || data.user.user_metadata?.user_type,
    avatarUrl: profileData?.avatar_url,
  };
    
  return { 
    user: formattedUser, 
    profile: profileData,
    isGuide: formattedUser.userType === 'guide',
    isTourist: formattedUser.userType === 'tourist',
  };
});
