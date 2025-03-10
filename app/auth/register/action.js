// /app/auth/register/action.js
"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { validateWithSchema } from "@/lib/validations";
import { registerSchema } from "./schema";
import { serverSetAuthSession } from "@/lib/auth/auth-utils";

export async function registerUser(formData) {
  // Validar os dados
  const validation = validateWithSchema(registerSchema, formData);

  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  try {
    const { email, password, fullName, phone } = validation.data;
    
    // 1. Criar o usuário no Auth do Supabase
    const { data: authData, error: authError } = await supabaseServer.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "tourist",
        },
      }
    });

    if (authError) throw authError;
    
    const userId = authData.user.id;

    // 2. Criar o perfil no banco de dados
    const { error: profileError } = await supabaseServer
      .from('profiles')
      .insert({
        user_id: userId,
        full_name: fullName,
        phone: phone || null,
        role: "tourist",
      });
    
    if (profileError) {
      // Se falhar ao criar o perfil, tentar limpar o usuário criado
      console.error("Erro ao criar perfil, tentando reverter criação do usuário:", profileError);
      await supabaseServer.auth.admin.deleteUser(userId);
      throw profileError;
    }
    
    // 3. Se tudo der certo, definir a sessão
    if (authData.session) {
      await serverSetAuthSession(authData.session);
    }
    
    return { success: true, user: authData.user };
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return {
      success: false,
      errors: { _form: error.message || 'Falha ao registrar usuário' }
    };
  }
}