// /app/(toursit)/profile/action.js
"use server";

import { createClient } from "@/lib/supabase/server";
import { validateWithSchema } from "@/lib/validations";
import { profileFormSchema } from "./schema";
import { getUser } from "@/hooks/useUserProfile";

export async function updateProfile(formData) {
  const supabase = await createClient();
  const { user, profile } = await getUser();

  console.log("User ID:", user.id);

  // Validar os dados
  const validation = validateWithSchema(profileFormSchema, formData);

  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  try {
    const { fullName, phone, bio } = validation.data;

    const { data: profileUpdatedData, error: profileUpdatedError } =
      await supabase
        .from("profiles")
        .update({ full_name: fullName, phone, bio })
        .eq("user_id", user.id)
        .select();

    if (profileUpdatedError) throw profileUpdatedError;

    return { success: true, profile: profileUpdatedData };
  } catch (error) {
    console.error("Error on updated Profile data:", error);
    return {
      success: false,
      errors: { _form: error.message || "Fail on update profile data" },
    };
  }
}
