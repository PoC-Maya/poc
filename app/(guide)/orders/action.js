"use server";

import { supabaseServer } from "@/lib/supabase/server";

export async function getOrders() {
  const { data, error } = await supabaseServer.from("orders").select("*");

  if (error) {
    console.error("Erro ao buscar pedidos:", error.message);
    return [];
  }

  return data;
}
