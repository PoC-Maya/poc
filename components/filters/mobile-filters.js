"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function MobileFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000])

  const categories = [
    { id: "day-trips", label: "Day Trips", count: 1339 },
    { id: "archaeology", label: "Archaeology Tours", count: 522 },
    { id: "theme-parks", label: "Theme Parks", count: 9 },
    { id: "snorkeling", label: "Snorkeling", count: 204 },
    { id: "catamaran", label: "Catamaran Cruises", count: 280 },
    { id: "nature", label: "Nature and Wildlife Tours", count: 651 },
  ]

  const cities = [
    { id: "cancun", label: "Cancún" },
    { id: "tulum", label: "Tulum" },
    { id: "playa", label: "Playa del Carmen" },
    { id: "isla-mujeres", label: "Isla Mujeres" },
    { id: "cozumel", label: "Cozumel" },
  ]

  const durations = [
    { id: "half-day", label: "Meio dia (até 4h)", count: 352 },
    { id: "full-day", label: "Dia inteiro (4-8h)", count: 1181 },
    { id: "multi-day", label: "Múltiplos dias", count: 245 },
  ]

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger>Categorias</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category.id}`} />
                  <Label htmlFor={`category-${category.id}`} className="flex-1 cursor-pointer">
                    {category.label}
                  </Label>
                  <span className="text-xs text-muted-foreground">({category.count})</span>
                </div>
              ))}
              <Button variant="link" size="sm" className="mt-2 h-auto p-0">
                Ver mais categorias
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cities">
          <AccordionTrigger>Cidades</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {cities.map((city) => (
                <div key={city.id} className="flex items-center space-x-2">
                  <Checkbox id={`city-${city.id}`} />
                  <Label htmlFor={`city-${city.id}`} className="cursor-pointer">
                    {city.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration">
          <AccordionTrigger>Duração</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {durations.map((duration) => (
                <div key={duration.id} className="flex items-center space-x-2">
                  <Checkbox id={`duration-${duration.id}`} />
                  <Label htmlFor={`duration-${duration.id}`} className="flex-1 cursor-pointer">
                    {duration.label}
                  </Label>
                  <span className="text-xs text-muted-foreground">({duration.count})</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Preço</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="pt-4">
                <Slider
                  defaultValue={[0, 5000]}
                  max={5000}
                  step={100}
                  onValueChange={(value) => setPriceRange(value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>R$ {priceRange[0]}</span>
                <span>R$ {priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex space-x-2 pt-2">
        <Button variant="outline" className="flex-1">
          Limpar
        </Button>
        <Button className="flex-1">Aplicar Filtros</Button>
      </div>
    </div>
  )
}

