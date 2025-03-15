"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, Edit, Eye, MapPin, Plus, Star, Users } from "lucide-react"
import { DisponibilidadeDrawer } from "@/components/experiences/disponibilidade-drawer"

// Dados de exemplo para experiências
const experiencias = [
  {
    id: "1",
    titulo: "Tour Gastronômico em Mérida",
    descricao:
      "Explore os sabores autênticos da culinária yucateca neste tour gastronômico pela cidade histórica de Mérida.",
    imagem: "/placeholder.svg?height=300&width=400",
    cidade: "Mérida",
    duracao: 3.5,
    capacidadeMin: 2,
    capacidadeMax: 8,
    avaliacao: 4.8,
    avaliacoes: 24,
    preco: 45,
    status: "ativa",
  },
  {
    id: "2",
    titulo: "Mergulho em Cenotes Secretos",
    descricao:
      "Descubra cenotes escondidos na selva de Tulum com este tour exclusivo de mergulho em águas cristalinas.",
    imagem: "/placeholder.svg?height=300&width=400",
    cidade: "Tulum",
    duracao: 5,
    capacidadeMin: 1,
    capacidadeMax: 6,
    avaliacao: 4.9,
    avaliacoes: 37,
    preco: 75,
    status: "ativa",
  },
  {
    id: "3",
    titulo: "Fotografia ao Pôr do Sol em Holbox",
    descricao:
      "Aprenda técnicas de fotografia enquanto captura o espetacular pôr do sol na ilha paradisíaca de Holbox.",
    imagem: "/placeholder.svg?height=300&width=400",
    cidade: "Holbox",
    duracao: 2.5,
    capacidadeMin: 1,
    capacidadeMax: 5,
    avaliacao: 4.7,
    avaliacoes: 18,
    preco: 60,
    status: "rascunho",
  },
]

export default function MyPortfolioPage() {
  const [experienciaAtiva, setExperienciaAtiva] = useState(null)
  const [drawerAberto, setDrawerAberto] = useState(false)

  const abrirDrawerDisponibilidade = (experiencia) => {
    setExperienciaAtiva(experiencia)
    setDrawerAberto(true)
  }

  const fecharDrawerDisponibilidade = () => {
    setDrawerAberto(false)
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Minhas Experiências</h2>
        <Button asChild>
          <Link href="/panel/me/experiences/create">
            <Plus className="mr-2 h-4 w-4" />
            Criar Nova Experiência
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="todas" className="w-full">
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="ativas">Ativas</TabsTrigger>
          <TabsTrigger value="rascunhos">Rascunhos</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiencias.map((experiencia) => (
              <Card key={experiencia.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={experiencia.imagem || "/placeholder.svg"}
                    alt={experiencia.titulo}
                    fill
                    className="object-cover"
                  />
                  {experiencia.status === "rascunho" && (
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      Rascunho
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{experiencia.titulo}</CardTitle>
                  <CardDescription>{experiencia.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{experiencia.cidade}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{experiencia.duracao} horas</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>
                        {experiencia.capacidadeMin}-{experiencia.capacidadeMax} pessoas
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="mr-1 h-4 w-4 text-amber-500" />
                      <span>
                        {experiencia.avaliacao} ({experiencia.avaliacoes} avaliações)
                      </span>
                    </div>
                    <div className="text-lg font-bold mt-2">
                      ${experiencia.preco} <span className="text-sm font-normal">por pessoa</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/panel/me/experiences/edit/${experiencia.id}`}>
                        <Edit className="mr-1 h-4 w-4" />
                        Editar
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/guides/${experiencia.id}`}>
                        <Eye className="mr-1 h-4 w-4" />
                        Visualizar
                      </Link>
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => abrirDrawerDisponibilidade(experiencia)}
                  >
                    <CalendarDays className="mr-1 h-4 w-4" />
                    Gerenciar Disponibilidade
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ativas" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiencias
              .filter((exp) => exp.status === "ativa")
              .map((experiencia) => (
                <Card key={experiencia.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={experiencia.imagem || "/placeholder.svg"}
                      alt={experiencia.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{experiencia.titulo}</CardTitle>
                    <CardDescription>{experiencia.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{experiencia.cidade}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{experiencia.duracao} horas</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>
                          {experiencia.capacidadeMin}-{experiencia.capacidadeMax} pessoas
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Star className="mr-1 h-4 w-4 text-amber-500" />
                        <span>
                          {experiencia.avaliacao} ({experiencia.avaliacoes} avaliações)
                        </span>
                      </div>
                      <div className="text-lg font-bold mt-2">
                        ${experiencia.preco} <span className="text-sm font-normal">por pessoa</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/panel/me/experiences/edit/${experiencia.id}`}>
                          <Edit className="mr-1 h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/guides/${experiencia.id}`}>
                          <Eye className="mr-1 h-4 w-4" />
                          Visualizar
                        </Link>
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => abrirDrawerDisponibilidade(experiencia)}
                    >
                      <CalendarDays className="mr-1 h-4 w-4" />
                      Gerenciar Disponibilidade
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="rascunhos" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiencias
              .filter((exp) => exp.status === "rascunho")
              .map((experiencia) => (
                <Card key={experiencia.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={experiencia.imagem || "/placeholder.svg"}
                      alt={experiencia.titulo}
                      fill
                      className="object-cover"
                    />
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      Rascunho
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{experiencia.titulo}</CardTitle>
                    <CardDescription>{experiencia.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{experiencia.cidade}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{experiencia.duracao} horas</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>
                          {experiencia.capacidadeMin}-{experiencia.capacidadeMax} pessoas
                        </span>
                      </div>
                      <div className="text-lg font-bold mt-2">
                        ${experiencia.preco} <span className="text-sm font-normal">por pessoa</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/panel/me/experiences/edit/${experiencia.id}`}>
                          <Edit className="mr-1 h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/guides/${experiencia.id}`}>
                          <Eye className="mr-1 h-4 w-4" />
                          Visualizar
                        </Link>
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => abrirDrawerDisponibilidade(experiencia)}
                    >
                      <CalendarDays className="mr-1 h-4 w-4" />
                      Gerenciar Disponibilidade
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {experienciaAtiva && (
        <DisponibilidadeDrawer
          isOpen={drawerAberto}
          onClose={fecharDrawerDisponibilidade}
          experienceId={experienciaAtiva.id}
          experienceName={experienciaAtiva.titulo}
        />
      )}
    </div>
  )
}

