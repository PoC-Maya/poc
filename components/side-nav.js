"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Map,
  ShoppingBag,
  Calendar,
  MessageSquare,
  Settings,
  HelpCircle,
  PlusCircle,
} from "lucide-react"

export function SideNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/panel/dashboard",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/panel/me/experiences/my-portfolio",
      icon: Map,
      title: "Minhas Experiências",
    },
    {
      href: "/panel/me/experiences/marketplace",
      icon: ShoppingBag,
      title: "Marketplace",
    },
    {
      href: "/panel/me/experiences/create",
      icon: PlusCircle,
      title: "Criar Experiência",
    },
    {
      href: "/panel/bookings",
      icon: Calendar,
      title: "Reservas",
    },
    {
      href: "/panel/messages",
      icon: MessageSquare,
      title: "Mensagens",
    },
    {
      href: "/panel/settings",
      icon: Settings,
      title: "Configurações",
    },
    {
      href: "/panel/help",
      icon: HelpCircle,
      title: "Ajuda",
    },
  ]

  return (
    <nav className="hidden border-r bg-background md:block w-64">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Menu</h2>
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
      </div>
    </nav>
  )
}

