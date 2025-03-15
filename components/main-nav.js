"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/panel/dashboard",
      label: "Dashboard",
      active: pathname === "/panel/dashboard",
    },
    {
      href: "/panel/me/experiences/my-portfolio",
      label: "Minhas Experiências",
      active: pathname.includes("/panel/me/experiences"),
    },
    {
      href: "/panel/me/experiences/marketplace",
      label: "Marketplace",
      active: pathname === "/panel/me/experiences/marketplace",
    },
  ]

  return (
    <div className="mr-4 hidden md:flex px-8">
      <nav className="flex items-center space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

