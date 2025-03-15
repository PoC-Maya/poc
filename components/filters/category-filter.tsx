"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const categories = [
  { value: "day-trips", label: "Day Trips", count: 1339 },
  { value: "archaeology", label: "Archaeology Tours", count: 522 },
  { value: "theme-parks", label: "Theme Parks", count: 9 },
  { value: "snorkeling", label: "Snorkeling", count: 204 },
  { value: "catamaran", label: "Catamaran Cruises", count: 280 },
  { value: "shopping", label: "Shopping Malls", count: 22 },
  { value: "nature", label: "Nature and Wildlife Tours", count: 651 },
  { value: "half-day", label: "Half-day Tours", count: 352 },
  { value: "beaches", label: "Beaches", count: 30 },
  { value: "luxury", label: "Private and Luxury", count: 226 },
  { value: "extreme", label: "Extreme Sports", count: 472 },
  { value: "markets", label: "Flea & Street Markets", count: 4 },
  { value: "ziplining", label: "Ziplining", count: 142 },
  { value: "cultural", label: "Cultural Tours", count: 469 },
  { value: "water-parks", label: "Water Parks", count: 8 },
  { value: "4wd", label: "4WD Tours", count: 209 },
  { value: "full-day", label: "Full-day Tours", count: 1181 },
]

export function CategoryFilter() {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full md:w-[250px]">
          {selectedCategory
            ? categories.find((category) => category.value === selectedCategory)?.label
            : "Selecione a categoria"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Buscar categoria..." />
          <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    setSelectedCategory(currentValue === selectedCategory ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${selectedCategory === category.value ? "opacity-100" : "opacity-0"}`}
                  />
                  <span className="flex-1">{category.label}</span>
                  <span className="text-xs text-muted-foreground">({category.count})</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

