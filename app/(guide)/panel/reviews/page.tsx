"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReviewItem, type ReviewItemProps } from "@/components/reviews/review-item"
import { Search, Filter, Star } from "lucide-react"

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [filterExperience, setFilterExperience] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Dados de exemplo - em produção viriam da API
  const reviews: ReviewItemProps[] = [
    {
      id: "1",
      turista: {
        id: "tur1",
        nome: "Carlos Silva",
        avatar: "/placeholder.svg",
      },
      experiencia: {
        id: "exp1",
        titulo: "Tour em Cenotes",
      },
      avaliacao: 5,
      comentario:
        "Experiência incrível! O guia foi muito atencioso e conhecedor. Os cenotes são espetaculares e a organização do tour foi perfeita. Recomendo fortemente!",
      data: "2023-07-15T14:30:00Z",
      curtidas: 3,
      resposta: {
        texto:
          "Obrigado pelo feedback positivo, Carlos! Foi um prazer guiá-los pelos cenotes. Espero vê-los novamente em breve para explorar mais maravilhas naturais da região.",
        data: "2023-07-15T16:45:00Z",
      },
    },
    {
      id: "2",
      turista: {
        id: "tur2",
        nome: "Ana Pereira",
        avatar: "/placeholder.svg",
      },
      experiencia: {
        id: "exp2",
        titulo: "Passeio de Barco em Isla Mujeres",
      },
      avaliacao: 4,
      comentario:
        "Passeio muito bom! A ilha é linda e o snorkel foi incrível. O único ponto negativo foi o tempo livre na ilha que achei um pouco curto. De resto, tudo perfeito!",
      data: "2023-07-10T09:15:00Z",
      curtidas: 2,
    },
    {
      id: "3",
      turista: {
        id: "tur3",
        nome: "Roberto Gomes",
        avatar: "/placeholder.svg",
      },
      experiencia: {
        id: "exp3",
        titulo: "Tour Gastronômico",
      },
      avaliacao: 5,
      comentario:
        "Uma das melhores experiências culinárias que já tive! O guia nos levou a lugares que jamais encontraríamos sozinhos. Cada prato foi uma descoberta incrível. Valeu cada centavo!",
      data: "2023-07-05T20:30:00Z",
      curtidas: 7,
      resposta: {
        texto:
          "Roberto, muito obrigado pelo feedback! Fico feliz que tenha gostado da experiência gastronômica. Estamos sempre buscando os melhores lugares e sabores para nossos clientes.",
        data: "2023-07-06T10:20:00Z",
      },
    },
    {
      id: "4",
      turista: {
        id: "tur4",
        nome: "Juliana Costa",
        avatar: "/placeholder.svg",
      },
      experiencia: {
        id: "exp1",
        titulo: "Tour em Cenotes",
      },
      avaliacao: 3,
      comentario:
        "O passeio foi bom, mas achei que faltou um pouco mais de informação sobre a história dos cenotes. O transporte estava confortável e pontual.",
      data: "2023-07-02T15:45:00Z",
      curtidas: 1,
    },
    {
      id: "5",
      turista: {
        id: "tur5",
        nome: "Fernando Melo",
        avatar: "/placeholder.svg",
      },
      experiencia: {
        id: "exp4",
        titulo: "Mergulho em Recifes",
      },
      avaliacao: 5,
      comentario:
        "Simplesmente fantástico! O guia é um expert em mergulho e nos mostrou lugares incríveis. A vida marinha é exuberante e o equipamento fornecido estava em perfeitas condições.",
      data: "2023-06-28T11:20:00Z",
      curtidas: 5,
    },
  ]

  // Lista de experiências únicas para o filtro
  const experiencias = Array.from(new Set(reviews.map((review) => review.experiencia.titulo))).map((titulo) => {
    const exp = reviews.find((r) => r.experiencia.titulo === titulo)
    return {
      id: exp?.experiencia.id || "",
      titulo,
    }
  })

  // Filtrar reviews
  const filteredReviews = reviews.filter((review) => {
    // Filtro de busca
    if (
      searchTerm &&
      !review.turista.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !review.comentario.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !review.experiencia.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filtro de avaliação
    if (filterRating !== "all" && review.avaliacao !== Number.parseInt(filterRating)) {
      return false
    }

    // Filtro de experiência
    if (filterExperience !== "all" && review.experiencia.id !== filterExperience) {
      return false
    }

    // Filtro por tab
    if (activeTab === "pending" && review.resposta) {
      return false
    }

    if (activeTab === "answered" && !review.resposta) {
      return false
    }

    return true
  })

  // Calcular estatísticas
  const totalReviews = reviews.length
  const averageRating = reviews.reduce((acc, review) => acc + review.avaliacao, 0) / totalReviews
  const pendingReviews = reviews.filter((review) => !review.resposta).length
  const answeredReviews = reviews.filter((review) => review.resposta).length

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Avaliações</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-2">{averageRating.toFixed(1)}</div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(averageRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300 fill-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Respondidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{answeredReviews}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre as avaliações por diferentes critérios</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-3">
          <div className="grid gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, comentário..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por avaliação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as avaliações</SelectItem>
                <SelectItem value="5">5 estrelas</SelectItem>
                <SelectItem value="4">4 estrelas</SelectItem>
                <SelectItem value="3">3 estrelas</SelectItem>
                <SelectItem value="2">2 estrelas</SelectItem>
                <SelectItem value="1">1 estrela</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Select value={filterExperience} onValueChange={setFilterExperience}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por experiência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as experiências</SelectItem>
                {experiencias.map((exp) => (
                  <SelectItem key={exp.id} value={exp.id}>
                    {exp.titulo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="answered">Respondidas</TabsTrigger>
        </TabsList>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Mostrando {filteredReviews.length} avaliações</div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => <ReviewItem key={review.id} review={review} />)
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Nenhuma avaliação encontrada com os filtros selecionados.</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

