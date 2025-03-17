// Vamos verificar a implementação da função generateSlug

"use server"

import { createClient } from "@/lib/supabase/server"

/**
 * Gera um slug único baseado no título
 * @param {string} title - Título para gerar o slug
 * @param {string} type - Tipo de conteúdo (blog, experience, etc)
 * @returns {Promise<string>} - Slug único
 */
export async function generateSlug(title, type = "blog") {
  if (!title) return ""

  // Converter para minúsculas e remover caracteres especiais
  const slug = title
    .toLowerCase()
    .normalize("NFD") // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .trim() // Remove espaços no início e fim

  // Verificar se o slug já existe no banco de dados
  const supabase = createClient()

  let table
  switch (type) {
    case "blog":
      table = "blog_posts"
      break
    case "experience":
      table = "experiences"
      break
    default:
      table = "blog_posts"
  }

  let isUnique = false
  let counter = 0
  let uniqueSlug = slug

  while (!isUnique) {
    const { data, error } = await supabase.from(table).select("slug").eq("slug", uniqueSlug).single()

    if (error || !data) {
      // Slug não existe, podemos usá-lo
      isUnique = true
    } else {
      // Slug existe, adicionar contador
      counter++
      uniqueSlug = `${slug}-${counter}`
    }
  }

  return uniqueSlug
}

