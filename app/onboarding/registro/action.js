"use server";

import { createClient } from "@/lib/supabase/server";
import { validateWithSchema } from "@/lib/validations";
import { leadSchema, userSchema } from "./schemas/schema";

export async function createLead(prevState, formData) {
  const supabase = await createClient();

  // Validar os dados
  const validation = validateWithSchema(leadSchema, formData);

  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  try {
    // Simular delay para ver o loading (remover em produção!)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { email, nome, whatsapp, status } = validation.data;

    // Verificar apenas na tabela pre_signup
    const { data: existingLead } = await supabase
      .from("pre_signup")
      .select()
      .eq("email", email)
      .single();

    if (existingLead) {
      // Atualizar lead existente
      const { error: updateError } = await supabase
        .from("pre_signup")
        .update({
          nome,
          whatsapp,
          status,
        })
        .eq("email", email);

      if (updateError) throw updateError;
      return {
        success: true,
        lead: { ...existingLead, nome, whatsapp, status },
      };
    }

    // Criar novo lead
    const { data: lead, error } = await supabase
      .from("pre_signup")
      .insert({
        email,
        nome,
        whatsapp,
        status,
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, lead };
  } catch (error) {
    console.error("Lead creation error:", {
      error,
      timestamp: new Date().toISOString(),
      data: formData,
    });

    return {
      success: false,
      errors: { _form: "Falha ao salvar dados" },
    };
  }
}

// No action.js
export async function updatePreferences(prevState, formData) {
  const supabase = await createClient();

  try {
    const email = formData.get("email");
    const preferences = JSON.parse(formData.get("preferences"));

    console.log("Action - Email received:", email); // Debug
    console.log("Action - Preferences:", preferences); // Debug

    // Primeiro verificar se o registro existe
    const { data: existingData, error: checkError } = await supabase
      .from("pre_signup")
      .select()
      .eq("email", email)
      .single();

    if (checkError || !existingData) {
      console.log("Action - No record found for email:", email); // Debug
      return {
        success: false,
        errors: { _form: "Email não encontrado" },
      };
    }

    // Atualizar o registro
    const { data, error } = await supabase
      .from("pre_signup")
      .update({
        preferences: preferences,
        status: "paso2",
      })
      .eq("email", email)
      .select()
      .single();

    if (error) {
      console.log("Action - Update error:", error); // Debug
      return {
        success: false,
        errors: { _form: error.message },
      };
    }

    console.log("Action - Success data:", data); // Debug
    return { success: true, data };
  } catch (error) {
    console.log("Action - Catch error:", error); // Debug
    return {
      success: false,
      errors: { _form: "Erro ao atualizar preferências" },
    };
  }
}

// action.js

export async function createUser(prevState, formData) {
  const supabase = await createClient();

  try {
    const email = formData.get("email");
    const senha = formData.get("senha");
    const nome = formData.get("nome");
    const whatsapp = formData.get("whatsapp");
    const preferences = formData.get("preferences");

    // 1. Criar o usuário no Auth do Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          full_name: nome,
          role: "guide",
        },
      },
    });

    if (authError) {
      // Tratar especificamente o erro de usuário já existente
      if (
        authError.status === 422 &&
        authError.code === "user_already_exists"
      ) {
        return {
          success: false,
          errors: {
            _form:
              "Este email já está registrado. Por favor, use outro email ou faça login.",
          },
        };
      }
      throw authError;
    }

    const userId = authData.user.id;
    console.log("User created with ID:", userId); // Debug

    // 2. Criar o perfil no banco de dados com todos os campos necessários
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: userId,
      full_name: nome,
      phone: whatsapp,
      role: "guide",
      preferences: JSON.parse(preferences || "{}"), // Usar as preferências do paso-2
      bio: "", // Campo opcional
      location: "", // Campo opcional
      avatar: "", // Campo opcional
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (profileError) {
      console.error("Profile error:", profileError);
      // Reverter criação do usuário em caso de erro
      await supabase.auth.admin.deleteUser(userId);
      throw profileError;
    }

    console.log("Profile created successfully"); // Debug
    return { success: true, user: authData.user };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      errors: { _form: error.message || "Falha ao registrar usuário" },
    };
  }
}
