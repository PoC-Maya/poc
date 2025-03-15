"use client"

import { Sidebar } from "@/components/ui/sidebar-07"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        setIsCollapsed={setIsCollapsed}
        setIsMobile={setIsMobile}
      />

      {/* Main Content */}
      <div className="flex-1">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <Button
              variant="ghost"
              className="mr-2 px-2 hover:bg-transparent lg:hidden"
              onClick={() => setIsMobile(!isMobile)}
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <MainNav />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}

