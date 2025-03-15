"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Calendar, Languages, ChevronRight, Share2, CheckCircle, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ExperienceCard } from "@/components/experiences/experience-card"

// Dados de exemplo
const guideData = {
  id: "1",
  name: "Carlos Rodriguez",
  image: "/placeholder.svg?height=400&width=400",
  coverImage: "/placeholder.svg?height=600&width=1200",
  location: "Cancún",
  rating: 4.9,
  reviewCount: 320,
  languages: ["Português", "Inglês", "Espanhol"],
  specialties: ["História Maia", "Arqueologia", "Fotografia", "Cenotes", "Gastronomia"],
  bio: "Guia certificado com mais de 10 anos de experiência em Cancún e região. Especialista em história maia e arqueologia. Nascido e criado na península de Yucatán, tenho um profundo conhecimento da cultura, história e natureza locais. Formado em História pela Universidade Nacional Autônoma do México, com especialização em civilizações pré-colombianas.",
  experienceYears: 10,
  verified: true,
  certifications: [
    "Guia de Turismo Certificado pelo Governo Mexicano",
    "Primeiros Socorros e RCP",
    "Mergulho PADI Open Water",
  ],
  responseRate: 98,
  responseTime: "Em até 2 horas",
  experiences: [
    {
      id: "1",
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
      title: "Tour Privado pelas Ruínas de Tulum",
      image: "/placeholder.svg?height=400&width=600",
      price: 1450.0,
      rating: 4.6,
      reviewCount: 320,
      duration: "4 horas",
      location: "Tulum, México",
      isPrivate: true,
    },
  ],
  reviews: [
    {
      id: "1",
      user: "João Silva",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "Junho 2023",
      comment:
        "Carlos é um guia excepcional! Seu conhecimento sobre a história maia é impressionante e ele sabe como tornar a experiência divertida e educativa ao mesmo tempo. Recomendo fortemente!",
    },
    {
      id: "2",
      user: "Ana Martins",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "Maio 2023",
      comment:
        "Fizemos o tour de Chichen Itza com Carlos e foi incrível! Ele é muito atencioso, paciente e tem um conhecimento profundo sobre a cultura maia. Além disso, fala português perfeitamente!",
    },
    {
      id: "3",
      user: "Pedro Costa",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      date: "Abril 2023",
      comment:
        "Ótima experiência! Carlos é muito profissional e conhecedor. O único ponto negativo foi o tempo um pouco curto em Valladolid, mas no geral foi excelente.",
    },
    {
      id: "4",
      user: "Maria Souza",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "Março 2023",
      comment:
        "Carlos tornou nossa visita a Cancún inesquecível! Seu conhecimento, simpatia e profissionalismo são incomparáveis. Já estamos planejando voltar e fazer outros tours com ele!",
    },
  ],
  availability: [
    { date: "2023-07-15", available: true },
    { date: "2023-07-16", available: true },
    { date: "2023-07-17", available: true },
    { date: "2023-07-18", available: false },
    { date: "2023-07-19", available: true },
    { date: "2023-07-20", available: true },
    { date: "2023-07-21", available: false },
    { date: "2023-07-22", available: true },
  ],
}

export default function GuideDetailPage({ params }) {
  const [activeTab, setActiveTab] = useState("about")

  return (
    <div>
      {/* Cover Image */}
      <div className="relative h-[30vh] md:h-[40vh]">
        <Image
          src={guideData.coverImage || "/placeholder.svg"}
          alt={`${guideData.name} - Cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="container w-full mx-auto py-6 md:py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-4">
          <Link href="/" className="text-muted-foreground hover:text-brand-500">
            Início
          </Link>
          <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
          <Link href="/guides" className="text-muted-foreground hover:text-brand-500">
            Guias
          </Link>
          <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
          <span className="text-foreground truncate max-w-[200px]">{guideData.name}</span>
        </div>

        {/* Perfil do Guia */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image src={guideData.image || "/placeholder.svg"} alt={guideData.name} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{guideData.name}</h1>
                  {guideData.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verificado
                    </Badge>
                  )}
                </div>

                <div className="flex items-center mt-1 mb-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{guideData.rating}</span>
                  <span className="text-muted-foreground ml-1">({guideData.reviewCount} avaliações)</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1 text-brand-500" />
                    <span>{guideData.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Languages className="w-4 h-4 mr-1 text-brand-500" />
                    <span>{guideData.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-1 text-brand-500" />
                    <span>{guideData.experienceYears} anos de experiência</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 md:self-start">
                <Button variant="outline" size="icon" className="hover:text-brand-500">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button className="bg-brand-500 hover:bg-brand-600">Contatar</Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">Sobre</TabsTrigger>
                <TabsTrigger value="experiences">Experiências</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Sobre {guideData.name}</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{guideData.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {guideData.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-brand-100 text-brand-700 hover:bg-brand-200"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Certificações</h3>
                    <ul className="space-y-2">
                      {guideData.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 mr-2 text-brand-500 mt-0.5" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Taxa de Resposta</h4>
                      <p className="text-2xl font-bold text-brand-500">{guideData.responseRate}%</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Tempo de Resposta</h4>
                      <p className="text-2xl font-bold text-brand-500">{guideData.responseTime}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="experiences" className="mt-4">
                <h3 className="text-lg font-semibold mb-4">Experiências oferecidas por {guideData.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {guideData.experiences.map((experience) => (
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
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-2xl font-bold">{guideData.rating}</span>
                  </div>
                  <div className="text-muted-foreground">{guideData.reviewCount} avaliações</div>
                </div>

                <div className="space-y-6">
                  {guideData.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="grid grid-cols-12 items-start">
                        <div className="relative w-10 h-10 col-span-1 rounded-full overflow-hidden mr-3">
                          <Image
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.user}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="col-span-11">
                          <div className="flex items-center">
                            <h4 className="font-medium">{review.user}</h4>
                            <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="mt-4 w-full hover:bg-brand-50 hover:text-brand-600">
                  Ver todas as avaliações
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Card de Contato */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-4 sticky top-20">
              <h3 className="text-lg font-semibold mb-4">Contatar {guideData.name}</h3>

              <div className="space-y-4 mb-4">
                <p className="text-sm text-muted-foreground">
                  Entre em contato com {guideData.name} para tirar dúvidas ou solicitar um tour personalizado.
                </p>

                <div className="flex items-center justify-between p-3 bg-brand-50 rounded-md">
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-brand-500" />
                    <div>
                      <p className="font-medium">Tempo de resposta</p>
                      <p className="text-sm text-muted-foreground">{guideData.responseTime}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-brand-100 text-brand-700">
                    {guideData.responseRate}%
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-brand-500 hover:bg-brand-600"
                  onClick={() => (window.location.href = `/chat/${guideData.id}?type=custom`)}
                >
                  Solicitar Tour Personalizado
                </Button>

                <Button
                  variant="outline"
                  className="w-full hover:bg-brand-50 hover:text-brand-600"
                  onClick={() => (window.location.href = `/chat/${guideData.id}`)}
                >
                  Enviar Mensagem
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Ao solicitar um tour personalizado, o guia receberá detalhes sobre suas preferências.
              </p>
            </div>
          </div>
        </div>

        {/* Guias Similares */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Outros guias em {guideData.location}</h2>
          <ScrollArea className="w-full pb-4">
            <div className="flex space-x-4">
              <GuideCard
                id="2"
                name="Maria Gonzalez"
                image="/placeholder.svg?height=200&width=200"
                location="Tulum"
                rating={4.8}
                reviewCount={275}
                specialties={["Arqueologia", "Cultura Local", "Gastronomia"]}
              />

              <GuideCard
                id="3"
                name="Juan Perez"
                image="/placeholder.svg?height=200&width=200"
                location="Playa del Carmen"
                rating={4.7}
                reviewCount={190}
                specialties={["Mergulho", "Vida Marinha", "Aventura"]}
              />

              <GuideCard
                id="4"
                name="Sofia Martinez"
                image="/placeholder.svg?height=200&width=200"
                location="Isla Mujeres"
                rating={4.9}
                reviewCount={210}
                specialties={["Passeios de Barco", "Snorkeling", "Pôr do Sol"]}
              />

              <GuideCard
                id="5"
                name="Miguel Torres"
                image="/placeholder.svg?height=200&width=200"
                location="Cancún"
                rating={4.6}
                reviewCount={150}
                specialties={["Vida Noturna", "Gastronomia", "Compras"]}
              />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

// Componente para cards de guias
function GuideCard({ id, name, image, location, rating, reviewCount, specialties }) {
  return (
    <div className="flex-shrink-0 w-64 border rounded-lg overflow-hidden bg-white">
      <div className="relative h-40 w-full">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
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
            <Badge key={index} variant="secondary" className="text-xs bg-brand-100 text-brand-700">
              {specialty}
            </Badge>
          ))}
        </div>
        <Link href={`/guides/${id}`}>
          <Button variant="outline" size="sm" className="w-full hover:bg-brand-50 hover:text-brand-600">
            Ver perfil
          </Button>
        </Link>
      </div>
    </div>
  )
}

