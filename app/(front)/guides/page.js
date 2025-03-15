"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

// Dados de exemplo
const guides = [
  {
    id: "1",
    name: "Carlos Rodriguez",
    image: "/placeholder.svg?height=300&width=300",
    location: "Cancún",
    rating: 4.9,
    reviewCount: 320,
    languages: ["Português", "Inglês", "Espanhol"],
    specialties: ["História Maia", "Arqueologia", "Fotografia"],
    bio: "Guia certificado com mais de 10 anos de experiência em Cancún e região. Especialista em história maia e arqueologia.",
    experienceYears: 10,
    verified: true,
  },
  {
    id: "2",
    name: "Maria Gonzalez",
    image: "/placeholder.svg?height=300&width=300",
    location: "Tulum",
    rating: 4.8,
    reviewCount: 275,
    languages: ["Inglês", "Espanhol"],
    specialties: ["Cultura Local", "Gastronomia", "História"],
    bio: "Nascida e criada em Tulum, conheço todos os segredos da região. Adoro compartilhar a cultura local e gastronomia mexicana.",
    experienceYears: 7,
    verified: true,
  },
  {
    id: "3",
    name: "Juan Perez",
    image: "/placeholder.svg?height=300&width=300",
    location: "Playa del Carmen",
    rating: 4.7,
    reviewCount: 190,
    languages: ["Inglês", "Espanhol", "Francês"],
    specialties: ["Mergulho", "Vida Marinha", "Aventura"],
    bio: "Instrutor de mergulho certificado e guia de aventuras. Especializado em exploração de cenotes e recifes de coral.",
    experienceYears: 5,
    verified: true,
  },
  {
    id: "4",
    name: "Sofia Martinez",
    image: "/placeholder.svg?height=300&width=300",
    location: "Isla Mujeres",
    rating: 4.9,
    reviewCount: 210,
    languages: ["Inglês", "Espanhol", "Italiano"],
    specialties: ["Passeios de Barco", "Snorkeling", "Pôr do Sol"],
    bio: "Apaixonada pelo mar e pela natureza. Especialista em passeios de barco e atividades aquáticas em Isla Mujeres.",
    experienceYears: 8,
    verified: true,
  },
  {
    id: "5",
    name: "Miguel Torres",
    image: "/placeholder.svg?height=300&width=300",
    location: "Cancún",
    rating: 4.6,
    reviewCount: 150,
    languages: ["Inglês", "Espanhol"],
    specialties: ["Vida Noturna", "Gastronomia", "Compras"],
    bio: "Conheço os melhores lugares para comer, beber e se divertir em Cancún. Guia especializado em experiências urbanas.",
    experienceYears: 4,
    verified: false,
  },
  {
    id: "6",
    name: "Ana Lopez",
    image: "/placeholder.svg?height=300&width=300",
    location: "Cozumel",
    rating: 4.8,
    reviewCount: 180,
    languages: ["Inglês", "Espanhol", "Alemão"],
    specialties: ["Mergulho", "História", "Ecoturismo"],
    bio: "Bióloga marinha e guia de mergulho. Especialista nos recifes de Cozumel e na história da ilha.",
    experienceYears: 9,
    verified: true,
  },
  {
    id: "7",
    name: "Roberto Diaz",
    image: "/placeholder.svg?height=300&width=300",
    location: "Chichen Itza",
    rating: 4.9,
    reviewCount: 290,
    languages: ["Português", "Inglês", "Espanhol", "Francês"],
    specialties: ["Arqueologia", "História Maia", "Astronomia"],
    bio: "Arqueólogo e guia especializado em Chichen Itza e outras ruínas maias. Conhecimento profundo sobre astronomia maia.",
    experienceYears: 12,
    verified: true,
  },
  {
    id: "8",
    name: "Gabriela Sanchez",
    image: "/placeholder.svg?height=300&width=300",
    location: "Holbox",
    rating: 4.7,
    reviewCount: 160,
    languages: ["Inglês", "Espanhol"],
    specialties: ["Ecoturismo", "Observação de Aves", "Fotografia"],
    bio: "Guia de natureza especializada na ilha de Holbox. Conhecedora da fauna local e ótima fotógrafa.",
    experienceYears: 6,
    verified: true,
  },
];

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFilters, setOpenFilters] = useState(false);

  // Filtrar guias com base na pesquisa
  const filteredGuides = guides.filter(
    (guide) =>
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.specialties.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      guide.languages.some((l) =>
        l.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="container py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Guias em Cancún e Região
      </h1>

      {/* Barra de Pesquisa e Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome, local, especialidade ou idioma..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Drawer open={openFilters} onOpenChange={setOpenFilters} direction="left">
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => setOpenFilters(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-[300px] sm:w-[400px]">
            <DrawerHeader className="sticky top-0 z-20 bg-background border-b">
              <DrawerTitle className="text-xl font-bold">Filtros</DrawerTitle>
            </DrawerHeader>

            <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
              <div>
                <h3 className="text-sm font-medium mb-2">Localização</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="location-cancun"
                      className="mr-2"
                    />
                    <label htmlFor="location-cancun">Cancún</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="location-tulum"
                      className="mr-2"
                    />
                    <label htmlFor="location-tulum">Tulum</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="location-playa"
                      className="mr-2"
                    />
                    <label htmlFor="location-playa">Playa del Carmen</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="location-isla"
                      className="mr-2"
                    />
                    <label htmlFor="location-isla">Isla Mujeres</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="location-cozumel"
                      className="mr-2"
                    />
                    <label htmlFor="location-cozumel">Cozumel</label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Especialidades</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="specialty-history"
                      className="mr-2"
                    />
                    <label htmlFor="specialty-history">História</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="specialty-diving"
                      className="mr-2"
                    />
                    <label htmlFor="specialty-diving">Mergulho</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="specialty-gastronomy"
                      className="mr-2"
                    />
                    <label htmlFor="specialty-gastronomy">Gastronomia</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="specialty-archaeology"
                      className="mr-2"
                    />
                    <label htmlFor="specialty-archaeology">Arqueologia</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="specialty-adventure"
                      className="mr-2"
                    />
                    <label htmlFor="specialty-adventure">Aventura</label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Idiomas</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="language-portuguese"
                      className="mr-2"
                    />
                    <label htmlFor="language-portuguese">Português</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="language-english"
                      className="mr-2"
                    />
                    <label htmlFor="language-english">Inglês</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="language-spanish"
                      className="mr-2"
                    />
                    <label htmlFor="language-spanish">Espanhol</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="language-french"
                      className="mr-2"
                    />
                    <label htmlFor="language-french">Francês</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="language-german"
                      className="mr-2"
                    />
                    <label htmlFor="language-german">Alemão</label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Avaliação</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      id="rating-any"
                      className="mr-2"
                    />
                    <label htmlFor="rating-any">Qualquer avaliação</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      id="rating-4plus"
                      className="mr-2"
                    />
                    <label htmlFor="rating-4plus">4.0+ estrelas</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      id="rating-45plus"
                      className="mr-2"
                    />
                    <label htmlFor="rating-45plus">4.5+ estrelas</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      id="rating-48plus"
                      className="mr-2"
                    />
                    <label htmlFor="rating-48plus">4.8+ estrelas</label>
                  </div>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">
                  Limpar
                </Button>
                <Button className="flex-1">Aplicar</Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGuides.map((guide) => (
          <Link href={`/guides/${guide.id}`} key={guide.id} className="block">
            <div className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{guide.name}</h3>
                  {guide.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verificado
                    </Badge>
                  )}
                </div>

                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-sm">{guide.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({guide.reviewCount} avaliações)
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-2 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" /> {guide.location}
                </p>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {guide.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-2">
                  {guide.specialties.slice(0, 3).map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">
                  Idiomas: {guide.languages.join(", ")}
                </p>
              </div>
            </div>
          </Link>
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
  );
}
