import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useUserProfile(userId) {
  const supabase = createClient();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil:", error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    }

    if (userId) fetchProfile();
  }, [userId]);

  return { profile, loading };
}
