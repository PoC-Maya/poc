"use server";

import { validateWithSchema } from "@/lib/validations";
import { loginSchema } from "./schema";
import { createClient } from "@/lib/supabase/server";

export async function login(formData) {
  const supabase = await createClient();

  // Validar os dados
  const validation = validateWithSchema(loginSchema, formData);

  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  try {
    const { email, password } = validation.data;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error
    }
    return { success: true, user: data.user };
    
  } catch (error) {
    return {
      success: false,
      errors: { _form: error.message || "Falha na autenticação" },
    };
  }
}

