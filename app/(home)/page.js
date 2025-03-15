"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Filter,
  ChevronRight,
  Sun,
  Landmark,
  Droplets,
  Ship,
  TreePalmIcon as PalmTree,
  Zap,
  Building,
  Calendar,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ExperienceCard } from "@/components/experiences/experience-card";
import { MobileFilters } from "@/components/filters/mobile-filters";
import Hero1 from "@/components/home/hero-1";
import { DestinationsSection } from "@/components/destinations/destination-section";

export default function LandingPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full">
        <Hero1 />
      </section>

      {/* destination carousel */}
      <DestinationsSection />

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="container">
          {/* Tabs for Experience Types */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="w-full justify-start pb-2 bg-transparent">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="platform">
                Standard
              </TabsTrigger>
              <TabsTrigger value="private">
                Original
              </TabsTrigger>
            </TabsList>

            {/* Filter Button (Mobile) */}
            <div className="flex justify-between items-center my-4">
              <h2 className="text-xl font-bold">Experiências</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Mobile Filters (Conditional) */}
            {showFilters && (
              <div className="mb-4 p-4 border rounded-lg bg-background">
                <MobileFilters />
              </div>
            )}

            <TabsContent value="all" className="mt-0">
              {/* Featured Experiences */}
              <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Experiências em Destaque
                  </h3>
                  <Link
                    href="/experiences"
                    className="text-sm text-brand-500 flex items-center"
                  >
                    Ver todas <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ExperienceCard
                    id="1"
                    title="Atenas: Cabo Sounion e Templo de Poseidon ao pôr do sol - viagem de 1 dia"
                    image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a.png-8ScDvrUnANvqANlWRP6LIcAOa5pnWm.jpeg"
                    price={1953.87}
                    originalPrice={2570.88}
                    rating={4.8}
                    reviewCount={5420}
                    duration="5.5 horas"
                    location="Atenas, Grécia"
                  />

                  <ExperienceCard
                    id="2"
                    title="Passeio de Catamarã em Isla Mujeres com Snorkeling"
                    image="/placeholder.svg?height=400&width=600"
                    price={1250.0}
                    originalPrice={1500.0}
                    rating={4.7}
                    reviewCount={3210}
                    duration="8 horas"
                    location="Cancún, México"
                  />

                  <ExperienceCard
                    id="3"
                    title="Chichen Itza, Cenote e Valladolid - Tour Completo"
                    image="/placeholder.svg?height=400&width=600"
                    price={1800.0}
                    originalPrice={2100.0}
                    rating={4.9}
                    reviewCount={4150}
                    duration="12 horas"
                    location="Cancún, México"
                  />
                </div>
              </section>

              {/* Popular Categories */}
              <section className="mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  Categorias Populares
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  <CategoryCard title="Day Trips" count={1339} icon="sun" />
                  <CategoryCard
                    title="Archaeology Tours"
                    count={522}
                    icon="landmark"
                  />
                  <CategoryCard
                    title="Snorkeling"
                    count={204}
                    icon="droplets"
                  />
                  <CategoryCard
                    title="Catamaran Cruises"
                    count={280}
                    icon="ship"
                  />
                  <CategoryCard
                    title="Nature Tours"
                    count={651}
                    icon="palm-tree"
                  />
                  <CategoryCard title="Extreme Sports" count={472} icon="zap" />
                  <CategoryCard
                    title="Cultural Tours"
                    count={469}
                    icon="museum"
                  />
                  <CategoryCard
                    title="Full-day Tours"
                    count={1181}
                    icon="calendar"
                  />
                </div>
              </section>

              {/* Recently Added */}
              <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Adicionados Recentemente
                  </h3>
                  <Link
                    href="/experiences/recent"
                    className="text-sm text-brand-500 flex items-center"
                  >
                    Ver todos <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ExperienceCard
                    id="4"
                    title="Tour Privado pelas Ruínas de Tulum"
                    image="/placeholder.svg?height=400&width=600"
                    price={1450.0}
                    rating={4.6}
                    reviewCount={320}
                    duration="4 horas"
                    location="Tulum, México"
                  />

                  <ExperienceCard
                    id="5"
                    title="Mergulho em Cenotes Secretos"
                    image="/placeholder.svg?height=400&width=600"
                    price={1750.0}
                    originalPrice={2000.0}
                    rating={4.9}
                    reviewCount={178}
                    duration="6 horas"
                    location="Riviera Maya, México"
                  />
                </div>
              </section>
            </TabsContent>

            <TabsContent value="platform" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Conteúdo para experiências da plataforma */}
                <ExperienceCard
                  id="6"
                  title="Pacote Completo: Xcaret + Xplor + Xel-Há"
                  image="/placeholder.svg?height=400&width=600"
                  price={3500.0}
                  originalPrice={4200.0}
                  rating={4.8}
                  reviewCount={2340}
                  duration="3 dias"
                  location="Riviera Maya, México"
                  isPlatform={true}
                />

                <ExperienceCard
                  id="7"
                  title="Tour VIP às Ruínas de Coba e Cenote"
                  image="/placeholder.svg?height=400&width=600"
                  price={1650.0}
                  rating={4.7}
                  reviewCount={890}
                  duration="8 horas"
                  location="Cancún, México"
                  isPlatform={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="private" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Conteúdo para experiências particulares */}
                <ExperienceCard
                  id="8"
                  title="Fotografia Profissional em Praias de Cancún"
                  image="/placeholder.svg?height=400&width=600"
                  price={1200.0}
                  rating={4.9}
                  reviewCount={156}
                  duration="2 horas"
                  location="Cancún, México"
                  isPrivate={true}
                />

                <ExperienceCard
                  id="9"
                  title="Tour Gastronômico Privado em Playa del Carmen"
                  image="/placeholder.svg?height=400&width=600"
                  price={1800.0}
                  originalPrice={2100.0}
                  rating={4.8}
                  reviewCount={210}
                  duration="4 horas"
                  location="Playa del Carmen, México"
                  isPrivate={true}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Featured Guides Section */}
      <section className="px-4 py-8 bg-brand-50">
        <div className="container">
          <h2 className="text-xl font-bold mb-6 text-center">
            Guias em Destaque
          </h2>
          <ScrollArea className="w-full pb-4">
            <div className="flex space-x-4">
              <GuideCard
                id="1"
                name="Carlos"
                image="/placeholder.svg?height=200&width=200"
                location="Cancún"
                rating={4.9}
                reviewCount={320}
                specialties={["História Maia", "Cenotes", "Fotografia"]}
              />

              <GuideCard
                id="2"
                name="Maria"
                image="/placeholder.svg?height=200&width=200"
                location="Tulum"
                rating={4.8}
                reviewCount={275}
                specialties={["Arqueologia", "Cultura Local", "Gastronomia"]}
              />

              <GuideCard
                id="3"
                name="Juan"
                image="/placeholder.svg?height=200&width=200"
                location="Playa del Carmen"
                rating={4.7}
                reviewCount={190}
                specialties={["Mergulho", "Vida Marinha", "Aventura"]}
              />

              <GuideCard
                id="4"
                name="Sofia"
                image="/placeholder.svg?height=200&width=200"
                location="Isla Mujeres"
                rating={4.9}
                reviewCount={210}
                specialties={["Passeios de Barco", "Snorkeling", "Pôr do Sol"]}
              />

              <GuideCard
                id="4"
                name="Roberto"
                image="/placeholder.svg?height=200&width=200"
                location="Cancun Night Life"
                rating={4.9}
                reviewCount={210}
                specialties={["Passeios de Barco", "Snorkeling", "Pôr do Sol"]}
              />

              <GuideCard
                id="4"
                name="Alejandro"
                image="/placeholder.svg?height=200&width=200"
                location="Antro Tour"
                rating={4.9}
                reviewCount={210}
                specialties={["Passeios de Barco", "Snorkeling", "Pôr do Sol"]}
              />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <div className="text-center mt-6">
            <Button
              variant="outline"
              className="rounded-full hover:bg-brand-100 hover:text-brand-600"
            >
              Ver todos os guias
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 bg-brand-600 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Não encontrou o que procura?
        </h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Crie uma solicitação personalizada e receba propostas dos melhores
          guias locais.
        </p>
        <Button
          size="lg"
          className="rounded-full bg-white text-brand-600 hover:bg-brand-50"
        >
          Criar Solicitação Personalizada
        </Button>
      </section>
    </div>
  );
}

// Componente para cards de categoria
function CategoryCard({ title, count, icon }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-brand-50 transition-colors cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-2">
        {icon === "sun" && <Sun className="w-6 h-6 text-brand-500" />}
        {icon === "landmark" && <Landmark className="w-6 h-6 text-brand-500" />}
        {icon === "droplets" && <Droplets className="w-6 h-6 text-brand-500" />}
        {icon === "ship" && <Ship className="w-6 h-6 text-brand-500" />}
        {icon === "palm-tree" && (
          <PalmTree className="w-6 h-6 text-brand-500" />
        )}
        {icon === "zap" && <Zap className="w-6 h-6 text-brand-500" />}
        {icon === "museum" && <Building className="w-6 h-6 text-brand-500" />}
        {icon === "calendar" && <Calendar className="w-6 h-6 text-brand-500" />}
      </div>
      <h4 className="font-medium text-center">{title}</h4>
      <p className="text-sm text-muted-foreground">({count})</p>
    </div>
  );
}

// Componente para cards de guias
function GuideCard({
  id,
  name,
  image,
  location,
  rating,
  reviewCount,
  specialties,
}) {
  return (
    <div className="flex-shrink-0 w-64 border rounded-lg overflow-hidden bg-white">
      <div className="relative h-40 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-lg">{name}</h4>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm ml-1">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2 flex items-center">
          <MapPin className="w-3 h-3 mr-1" /> {location}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
        <Link href={`/guides/${id}`}>
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-brand-50 hover:text-brand-600"
          >
            Ver perfil
          </Button>
        </Link>
      </div>
    </div>
  );
}
