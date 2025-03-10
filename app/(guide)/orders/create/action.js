"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { validateWithSchema } from "@/lib/validations";
import { orderSchema } from "./schema";
import { withAuth } from "@/lib/auth/auth-utils";

export async function createOrder(formData) {
  // Middleware para verificar autenticação
  return withAuth(async (user) => {

    console.log("User ID:", user.id); 


    // Validar os dados
    const validation = validateWithSchema(orderSchema, formData);

    if (!validation.success) {
      return { success: false, errors: validation.errors };
    }

    try {
      // Processar dados validados
      const { content } = validation.data;
      const parsedContent = JSON.parse(content);


      // Inserir no banco
      const { data, error } = await supabaseServer.from("orders").insert([
        {
          content: parsedContent,
          created_at: new Date(),
        },
      ]);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      return {
        success: false,
        errors: { _form: error.message },
      };
    }
  });
}
