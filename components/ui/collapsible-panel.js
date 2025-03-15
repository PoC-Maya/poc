"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function CollapsiblePanel({ title, children, defaultOpen = true, className }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <button
        type="button"
        className="flex items-center justify-between w-full p-4 text-left font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      <div
        className={cn(
          "transition-all duration-200 ease-in-out",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden",
        )}
      >
        <div className="p-4 pt-0 border-t">{children}</div>
      </div>
    </div>
  )
}

