"use client"

import { useState } from "react"
import { Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ExperienceCard } from "@/components/experiences/experience-card"
import { MobileFilters } from "@/components/filters/mobile-filters"

// Dados de exemplo
const experiences = [
  {
    id: "1",
    title: "Atenas: Cabo Sounion e Templo de Poseidon ao pôr do sol - viagem de 1 dia",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a.png-8ScDvrUnANvqANlWRP6LIcAOa5pnWm.jpeg",
    price: 1953.87,
    originalPrice: 2570.88,
    rating: 4.8,
    reviewCount: 5420,
    duration: "5.5 horas",
    location: "Atenas, Grécia",
    isPlatform: true,
  },
  {
    id: "2",
    title: "Passeio de Catamarã em Isla Mujeres com Snorkeling",
    image: "/placeholder.svg?height=400&width=600",
    price: 1250.0,
    originalPrice: 1500.0,
    rating: 4.7,
    reviewCount: 3210,
    duration: "8 horas",
    location: "Cancún, México",
    isPlatform: true,
  },
  {
    id: "3",
    title: "Chichen Itza, Cenote e Valladolid - Tour Completo",
    image: "/placeholder.svg?height=400&width=600",
    price: 1800.0,
    originalPrice: 2100.0,
    rating: 4.9,
    reviewCount: 4150,
    duration: "12 horas",
    location: "Cancún, México",
    isPlatform: true,
  },
  {
    id: "4",
    title: "Tour Privado pelas Ruínas de Tulum",
    image: "/placeholder.svg?height=400&width=600",
    price: 1450.0,
    rating: 4.6,
    reviewCount: 320,
    duration: "4 horas",
    location: "Tulum, México",
    isPrivate: true,
  },
  {
    id: "5",
    title: "Mergulho em Cenotes Secretos",
    image: "/placeholder.svg?height=400&width=600",
    price: 1750.0,
    originalPrice: 2000.0,
    rating: 4.9,
    reviewCount: 178,
    duration: "6 horas",
    location: "Riviera Maya, México",
    isPrivate: true,
  },
  {
    id: "6",
    title: "Pacote Completo: Xcaret + Xplor + Xel-Há",
    image: "/placeholder.svg?height=400&width=600",
    price: 3500.0,
    originalPrice: 4200.0,
    rating: 4.8,
    reviewCount: 2340,
    duration: "3 dias",
    location: "Riviera Maya, México",
    isPlatform: true,
  },
  {
    id: "7",
    title: "Tour VIP às Ruínas de Coba e Cenote",
    image: "/placeholder.svg?height=400&width=600",
    price: 1650.0,
    rating: 4.7,
    reviewCount: 890,
    duration: "8 horas",
    location: "Cancún, México",
    isPlatform: true,
  },
  {
    id: "8",
    title: "Fotografia Profissional em Praias de Cancún",
    image: "/placeholder.svg?height=400&width=600",
    price: 1200.0,
    rating: 4.9,
    reviewCount: 156,
    duration: "2 horas",
    location: "Cancún, México",
    isPrivate: true,
  },
]

export default function ExperiencesPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [openFilters, setOpenFilters] = useState(false)
  const [sortBy, setSortBy] = useState("recommended")

  // Filtrar experiências com base no filtro ativo
  const filteredExperiences = experiences.filter((exp) => {
    if (activeFilter === "all") return true
    if (activeFilter === "platform") return exp.isPlatform
    if (activeFilter === "private") return exp.isPrivate
    return true
  })

  return (
    <div className="container py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Experiências em Cancún</h1>

      {/* Filtros e Ordenação */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={activeFilter === "all" ? "default" : "outline"}
            className="cursor-pointer px-4 py-2"
            onClick={() => setActiveFilter("all")}
          >
            Todas
          </Badge>
          <Badge
            variant={activeFilter === "platform" ? "default" : "outline"}
            className="cursor-pointer px-4 py-2"
            onClick={() => setActiveFilter("platform")}
          >
            Experiências da Plataforma
          </Badge>
          <Badge
            variant={activeFilter === "private" ? "default" : "outline"}
            className="cursor-pointer px-4 py-2"
            onClick={() => setActiveFilter("private")}
          >
            Experiências Particulares
          </Badge>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Sheet open={openFilters} onOpenChange={setOpenFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center" onClick={() => setOpenFilters(true)}>
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <h2 className="text-xl font-bold mb-4">Filtros</h2>
              <MobileFilters />
            </SheetContent>
          </Sheet>

          <div className="relative flex-1 md:flex-initial">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center justify-between w-full md:w-auto min-w-[180px]"
            >
              {sortBy === "recommended" && "Recomendados"}
              {sortBy === "price-asc" && "Preço: Menor para Maior"}
              {sortBy === "price-desc" && "Preço: Maior para Menor"}
              {sortBy === "rating" && "Melhor Avaliados"}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            {/* Dropdown para ordenação */}
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredExperiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            id={experience.id}
            title={experience.title}
            image={experience.image}
            price={experience.price}
            originalPrice={experience.originalPrice}
            rating={experience.rating}
            reviewCount={experience.reviewCount}
            duration={experience.duration}
            location={experience.location}
            isPlatform={experience.isPlatform}
            isPrivate={experience.isPrivate}
          />
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="mx-1">
          1
        </Button>
        <Button variant="outline" className="mx-1">
          2
        </Button>
        <Button variant="outline" className="mx-1">
          3
        </Button>
        <Button variant="outline" className="mx-1">
          ...
        </Button>
        <Button variant="outline" className="mx-1">
          10
        </Button>
      </div>
    </div>
  )
}

