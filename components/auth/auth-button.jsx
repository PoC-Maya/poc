"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AuthButton() {
  // Aqui você pode adicionar lógica para verificar se o usuário está logado
  const isLoggedIn = false

  if (isLoggedIn) {
    return (
      <Link href="/me">
        <Button size="sm" className="bg-brand-500 hover:bg-brand-600">
          Minha Área
        </Button>
      </Link>
    )
  }

  return (
    <Link href="/auth/login">
      <Button size="sm" className="hidden md:inline-flex bg-brand-500 hover:bg-brand-600">
        Entrar
      </Button>
    </Link>
  )
}

