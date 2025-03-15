"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { PublicProfileView } from "@/components/profile/public-profile-view"
import { EditProfileForm } from "@/components/profile/edit-profile-form"

// Dados de exemplo para o perfil
const profileData = {
  name: "Carlos Mendes",
  avatar: "/placeholder.svg?height=128&width=128",
  coverPhoto: "/placeholder.svg?height=400&width=800",
  location: "Cancún, México",
  rating: 4.8,
  reviewCount: 127,
  shortDescription: "Guia especializado em história maia e mergulho.",
  fullDescription:
    "Olá! Sou Carlos, guia turístico em Cancún há mais de 10 anos. Sou especializado em história maia e mergulho, com certificação PADI. Conheço todos os cenotes e ruínas da região. Falo português, espanhol e inglês fluentemente. Estou aqui para tornar sua experiência no México inesquecível!",
  languages: [
    { name: "Português", level: "Nativo", progress: 100 },
    { name: "Espanhol", level: "Fluente", progress: 95 },
    { name: "Inglês", level: "Avançado", progress: 85 },
    { name: "Francês", level: "Básico", progress: 40 },
  ],
  specialties: ["História Maia", "Mergulho", "Cenotes", "Gastronomia Local", "Fotografia", "Ecoturismo"],
  certifications: [
    {
      name: "Certificação PADI Divemaster",
      year: "2018",
      verified: true,
    },
    {
      name: "Guia Turístico Certificado - SECTUR",
      year: "2015",
      verified: true,
    },
    {
      name: "Primeiros Socorros e RCP",
      year: "2022",
      verified: true,
    },
  ],
  gallery: [
    {
      url: "/placeholder.svg?height=300&width=500",
      title: "Tour nas ruínas de Tulum",
    },
    {
      url: "/placeholder.svg?height=300&width=500",
      title: "Mergulho no Cenote Dos Ojos",
    },
    {
      url: "/placeholder.svg?height=300&width=500",
      title: "Passeio de barco em Isla Mujeres",
    },
    {
      url: "/placeholder.svg?height=300&width=500",
      title: "Visita a Chichen Itzá",
    },
    {
      url: "/placeholder.svg?height=300&width=500",
      title: "Snorkeling no recife de Cozumel",
    },
    {
      url: "/placeholder.svg?height=300&width=500",
      title: "Tour gastronômico em Playa del Carmen",
    },
  ],
  education: [
    {
      degree: "Bacharelado em Turismo",
      institution: "Universidad de Quintana Roo",
      year: "2010-2014",
    },
    {
      degree: "Especialização em História Mesoamericana",
      institution: "UNAM",
      year: "2015-2016",
    },
  ],
  experience: [
    {
      position: "Guia Turístico Sênior",
      company: "Cancún Adventures",
      period: "2018-Presente",
    },
    {
      position: "Instrutor de Mergulho",
      company: "Dive Cancún",
      period: "2016-2018",
    },
    {
      position: "Guia Turístico",
      company: "Maya Explorer",
      period: "2014-2016",
    },
  ],
}

export default function GuideProfilePage() {
  const [activeTab, setActiveTab] = useState("public")
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Botão de voltar */}
      <div className="container mx-auto p-4">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <Tabs defaultValue="public" value={activeTab} onValueChange={setActiveTab} className="container mx-auto">
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="public">Visualização Pública</TabsTrigger>
            <TabsTrigger value="edit">Editar Perfil</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="public">
          <PublicProfileView profile={profileData} />
        </TabsContent>
        <TabsContent value="edit">
          <EditProfileForm profile={profileData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

