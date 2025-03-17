"use server";

/**
 * @description Login de usuário
 * @category auth
 * @inputModel {
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
 */

import { createServerClient } from "@supabase/ssr";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Schema for validation
const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export async function login(prevState, formData) {
  try {
    // Create Supabase client
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name, options) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    // Extract data from FormData
    const rawData = Object.fromEntries(formData.entries());
    console.log("Received data:", rawData);

    // Processar os dados para validação
    const dataToValidate = {
      email: rawData.email,
      password: rawData.password,
    };

    // Verificar se há algum parâmetro JSON no FormData
    for (const [key, value] of Object.entries(rawData)) {
      try {
        const parsedValue = JSON.parse(value);
        
        if (parsedValue && typeof parsedValue === 'object') {
          // Mesclar os valores do JSON com dataToValidate
          Object.keys(parsedValue).forEach(field => {
            dataToValidate[field] = parsedValue[field];
          });
          break;
        }
      } catch (e) {
        // Não é JSON, ignorar
      }
    }
    
    // Validar com Zod
    const validation = schema.safeParse(dataToValidate);
    
    // Se a validação falhar, retornar erros
    if (!validation.success) {
      console.error("Validation error:", validation.error.flatten());
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }
    
    // Dados validados
    const data = validation.data;
    console.log("Validated data:", data);

    // Tentar fazer login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      console.error("Auth error:", authError);
      
      // Verificar o tipo de erro para retornar mensagem apropriada
      if (authError.message.includes("Invalid login credentials")) {
        return {
          success: false,
          errors: {
            _form: "Email ou senha incorretos",
          },
        };
      }
      
      return {
        success: false,
        errors: {
          _form: `Erro ao fazer login: ${authError.message}`,
        },
      };
    }

    if (!authData.user) {
      return {
        success: false,
        errors: {
          _form: "Erro ao fazer login. Por favor, tente novamente.",
        },
      };
    }

    // Buscar informações do perfil
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      console.error("Profile error:", profileError);
      // Não retornar erro, apenas continuar sem as informações do perfil
    }

    // Revalidate relevant paths
    revalidatePath("/login");
    revalidatePath("/dashboard");
    revalidatePath("/profile");

    return {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        fullName: profile?.full_name || authData.user.user_metadata?.full_name,
        userType: profile?.user_type || authData.user.user_metadata?.user_type,
        avatarUrl: profile?.avatar_url,
      },
      // session: {
      //   accessToken: authData.session.access_token,
      //   refreshToken: authData.session.refresh_token,
      //   expiresAt: authData.session.expires_at,
      // },
      message: "Login realizado com sucesso!",
    };
  } catch (error) {
    console.error("login error:", error);
    return {
      success: false,
      errors: {
        _form: error.message || "Erro ao fazer login. Por favor, tente novamente.",
      },
    };
  }
}