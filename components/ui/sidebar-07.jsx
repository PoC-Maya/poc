"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Map,
  ShoppingBag,
  Calendar,
  MessageSquare,
  Settings,
  HelpCircle,
  PlusCircle,
  ChevronRight,
  MapPin,
  User,
  Star,
} from "lucide-react"

// Remover a entrada duplicada do calendário na sidebar
const routes = [
  {
    href: "/panel/dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
  },
  {
    href: "/panel/guide-profile",
    icon: User,
    title: "Meu Perfil",
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
    href: "/panel/cotacoes",
    icon: MessageSquare,
    title: "Cotações",
  },
  {
    href: "/panel/reviews",
    icon: Star,
    title: "Avaliações",
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

export function Sidebar({ isCollapsed, isMobile, setIsCollapsed, setIsMobile }) {
  const pathname = usePathname()

  return (
    <>
      {isMobile && (
        <Sheet open={isMobile} onOpenChange={setIsMobile}>
          <SheetContent side="left" className="w-[240px] p-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
      )}
      <nav className={cn("hidden h-screen border-r bg-background lg:block", isCollapsed ? "w-[80px]" : "w-[240px]")}>
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center space-x-2">
              {!isCollapsed && <span className="font-bold">Xplora</span>}
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsCollapsed(!isCollapsed)}>
              <ChevronRight className={cn("h-4 w-4 transition-transform", isCollapsed ? "rotate-180" : "")} />
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className={cn("flex flex-col gap-2")}>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    isCollapsed ? "justify-center" : "",
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {!isCollapsed && <span>{route.title}</span>}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </nav>
    </>
  )
}

function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2 p-4">
      <Link href="/" className="flex items-center space-x-2 mb-4">
        <span className="font-bold">Xplora</span>
      </Link>
      <div className="flex flex-col gap-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <route.icon className="h-4 w-4" />
            <span>{route.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

