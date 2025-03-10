"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

// export async function signup(formData) {
//   const supabase = await createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email"),
//     password: formData.get("password"),
//   };

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     redirect("/error");
//   }

//   revalidatePath("/", "layout");
//   redirect("/");
// }
