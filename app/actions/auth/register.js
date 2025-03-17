"use server";

/**
 * @description Register a new user
 * @category auth
 * @inputModel {
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "fullName": "Nome Completo",
  "userType": "tourist"
}
 */

import { createServerClient } from "@supabase/ssr";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Schema for validation
const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  fullName: z.string().min(3, "O nome completo deve ter pelo menos 3 caracteres"),
  userType: z.enum(["guide", "tourist"], {
    errorMap: () => ({ message: "O tipo de usuário deve ser 'guide' ou 'tourist'" })
  }),
});

export async function register(prevState, formData) {
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
      fullName: rawData.fullName,
      userType: rawData.userType,
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

    // Verificar se o email já está em uso
    const { data: existingUser, error: existingUserError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", data.email)
      .single();

    if (existingUser) {
      return {
        success: false,
        errors: {
          email: ["Este email já está em uso"],
        },
      };
    }

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          user_type: data.userType,
        },
      },
    });

    if (authError) {
      console.error("Auth error:", authError);
      return {
        success: false,
        errors: {
          _form: `Erro ao criar usuário: ${authError.message}`,
        },
      };
    }

    if (!authData.user) {
      return {
        success: false,
        errors: {
          _form: "Erro ao criar usuário. Por favor, tente novamente.",
        },
      };
    }

    // Criar perfil do usuário
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: authData.user.id,
        email: data.email,
        full_name: data.fullName,
        user_type: data.userType,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error("Profile error:", profileError);
      
      // Tentar excluir o usuário Auth se falhar ao criar o perfil
      try {
        // Não podemos excluir o usuário diretamente, mas podemos desativá-lo
        await supabase.auth.admin.updateUserById(authData.user.id, {
          banned: true,
        });
      } catch (deleteError) {
        console.error("Error disabling user after profile creation failure:", deleteError);
      }
      
      return {
        success: false,
        errors: {
          _form: `Erro ao criar perfil: ${profileError.message}`,
        },
      };
    }

    // Revalidate relevant paths
    revalidatePath("/login");
    revalidatePath("/register");

    return {
      success: true,
      user: {
        id: authData.user.id,
        email: data.email,
        fullName: data.fullName,
        userType: data.userType,
      },
      message: "Usuário registrado com sucesso!",
    };
  } catch (error) {
    console.error("register error:", error);
    return {
      success: false,
      errors: {
        _form: error.message || "Erro ao registrar usuário. Por favor, tente novamente.",
      },
    };
  }
}