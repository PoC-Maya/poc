"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const cities = [
  { value: "cancun", label: "Cancún" },
  { value: "tulum", label: "Tulum" },
  { value: "playa-del-carmen", label: "Playa del Carmen" },
  { value: "isla-mujeres", label: "Isla Mujeres" },
  { value: "cozumel", label: "Cozumel" },
  { value: "chichen-itza", label: "Chichen Itza" },
  { value: "holbox", label: "Holbox" },
  { value: "akumal", label: "Akumal" },
  { value: "puerto-morelos", label: "Puerto Morelos" },
  { value: "bacalar", label: "Bacalar" },
]

export function CityFilter() {
  const [open, setOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full md:w-[200px]">
          {selectedCity ? cities.find((city) => city.value === selectedCity)?.label : "Selecione a cidade"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cidade..." />
          <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  onSelect={(currentValue) => {
                    setSelectedCity(currentValue === selectedCity ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={`mr-2 h-4 w-4 ${selectedCity === city.value ? "opacity-100" : "opacity-0"}`} />
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

