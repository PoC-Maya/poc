"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, User, MessageSquare, Heart, Star, Settings, HelpCircle } from "lucide-react"

export function TouristSideNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/me",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/me/reservas",
      icon: Calendar,
      title: "Minhas Reservas",
    },
    {
      href: "/me/perfil",
      icon: User,
      title: "Meu Perfil",
    },
    {
      href: "/me/conversas",
      icon: MessageSquare,
      title: "Mensagens",
    },
    {
      href: "/me/favoritos",
      icon: Heart,
      title: "Favoritos",
    },
    {
      href: "/me/avaliacoes",
      icon: Star,
      title: "Minhas Avaliações",
    },
    {
      href: "/me/configuracoes",
      icon: Settings,
      title: "Configurações",
    },
    {
      href: "/ajuda",
      icon: HelpCircle,
      title: "Ajuda",
    },
  ]

  return (
    <nav className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Área do Turista</h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === route.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <route.icon className="mr-2 h-4 w-4" />
              <span>{route.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

