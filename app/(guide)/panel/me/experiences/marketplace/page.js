import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

// Categorias aleatórias de turismo
const categories = [
  { id: "1", name: "Aventura na Natureza" },
  { id: "2", name: "Mergulho e Snorkeling" },
  { id: "3", name: "Gastronomia Local" },
  { id: "4", name: "História e Cultura" },
  { id: "5", name: "Vida Noturna" },
  { id: "6", name: "Ecoturismo" },
  { id: "7", name: "Relaxamento e Bem-estar" },
  { id: "8", name: "Fotografia e Paisagens" },
  { id: "9", name: "Compras e Artesanato" },
  { id: "10", name: "Esportes Aquáticos" },
]

// Cidades turísticas próximas a Cancun
const cities = [
  { id: "1", name: "Cancun" },
  { id: "2", name: "Tulum" },
  { id: "3", name: "Playa del Carmen" },
  { id: "4", name: "Mérida" },
  { id: "5", name: "Isla Mujeres" },
  { id: "6", name: "Cozumel" },
  { id: "7", name: "Puerto Morelos" },
  { id: "8", name: "Bacalar" },
  { id: "9", name: "Valladolid" },
  { id: "10", name: "Holbox" },
]

// Experiências pré-cadastradas
const experiences = [
  {
    id: "1",
    title: "Mergulho nos Recifes de Cozumel",
    short_description: "Explore os incríveis recifes de coral em Cozumel com guias experientes",
    category_id: "2",
    city_id: "6",
    duration: 4,
    min_capacity: 2,
    max_capacity: 8,
    cover_image: "/placeholder.svg?height=300&width=400",
    languages: ["Inglês", "Espanhol"],
    price_from: 80,
  },
  {
    id: "2",
    title: "Tour Gastronômico em Mérida",
    short_description: "Descubra os sabores autênticos da culinária yucateca em Mérida",
    category_id: "3",
    city_id: "4",
    duration: 3,
    min_capacity: 2,
    max_capacity: 10,
    cover_image: "/placeholder.svg?height=300&width=400",
    languages: ["Inglês", "Espanhol", "Francês"],
    price_from: 65,
  },
  {
    id: "3",
    title: "Ruínas Maias de Tulum",
    short_description: "Visite as impressionantes ruínas maias à beira-mar em Tulum",
    category_id: "4",
    city_id: "2",
    duration: 2.5,
    min_capacity: 1,
    max_capacity: 15,
    cover_image: "/placeholder.svg?height=300&width=400",
    languages: ["Inglês", "Espanhol", "Alemão"],
    price_from: 45,
  },
  {
    id: "4",
    title: "Cenotes Secretos de Valladolid",
    short_description: "Nade em cenotes cristalinos escondidos na selva perto de Valladolid",
    category_id: "1",
    city_id: "9",
    duration: 5,
    min_capacity: 2,
    max_capacity: 12,
    cover_image: "/placeholder.svg?height=300&width=400",
    languages: ["Inglês", "Espanhol"],
    price_from: 75,
  },
  {
    id: "5",
    title: "Observação de Baleias em Holbox",
    short_description: "Observe baleias-jubarte em seu habitat natural nas águas de Holbox",
    category_id: "6",
    city_id: "10",
    duration: 3,
    min_capacity: 4,
    max_capacity: 15,
    cover_image: "/placeholder.svg?height=300&width=400",
    languages: ["Inglês", "Espanhol", "Italiano"],
    price_from: 95,
  },
  {
    id: "6",
    title: "Lagoa dos Sete Tons em Bacalar",
    short_description: "Navegue pelas águas multicoloridas da Lagoa de Bacalar",
    category_id: "8",
    city_id: "8",
    duration: 4,
    min_capacity: 2,
    max_capacity: 10,
    cover_image: "/placeholder.svg?height=300&width=400",
    languages: ["Inglês", "Espanhol"],
    price_from: 60,
  },
]

export default function MarketplacePage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Marketplace de Experiências</h2>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Encontre experiências pré-cadastradas para se inscrever</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid gap-2">
              <label
                htmlFor="category"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Categoria
              </label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="city"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Cidade
              </label>
              <Select>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Selecione uma cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as cidades</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="duration"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Duração
              </label>
              <Select>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Selecione a duração" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Qualquer duração</SelectItem>
                  <SelectItem value="short">Curta (até 2h)</SelectItem>
                  <SelectItem value="medium">Média (2-4h)</SelectItem>
                  <SelectItem value="long">Longa (mais de 4h)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="search"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Buscar
              </label>
              <Input id="search" placeholder="Buscar experiências..." className="h-10" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Aplicar Filtros</Button>
          </CardFooter>
        </Card>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="grid">Grade</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">Mostrando {experiences.length} experiências</div>
          </div>
          <TabsContent value="grid" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {experiences.map((experience) => (
                <Link href={`/panel/me/experiences/marketplace/${experience.id}`} key={experience.id}>
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image
                        src={experience.cover_image || "/placeholder.svg"}
                        alt={experience.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="line-clamp-1">{experience.title}</CardTitle>
                        <Badge>{cities.find((c) => c.id === experience.city_id)?.name}</Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{experience.short_description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">{categories.find((c) => c.id === experience.category_id)?.name}</Badge>
                        <Badge variant="outline">{experience.duration}h</Badge>
                        <Badge variant="outline">
                          {experience.min_capacity}-{experience.max_capacity} pessoas
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {experience.languages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm">
                        A partir de <span className="font-bold">${experience.price_from}</span>/pessoa
                      </div>
                      <Button size="sm">Ver Detalhes</Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="list" className="mt-6">
            <div className="grid gap-4">
              {experiences.map((experience) => (
                <Link href={`/panel/me/experiences/marketplace/${experience.id}`} key={experience.id}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative h-48 sm:h-auto sm:w-48">
                        <Image
                          src={experience.cover_image || "/placeholder.svg"}
                          alt={experience.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle>{experience.title}</CardTitle>
                            <Badge>{cities.find((c) => c.id === experience.city_id)?.name}</Badge>
                          </div>
                          <CardDescription>{experience.short_description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="outline">
                              {categories.find((c) => c.id === experience.category_id)?.name}
                            </Badge>
                            <Badge variant="outline">{experience.duration}h</Badge>
                            <Badge variant="outline">
                              {experience.min_capacity}-{experience.max_capacity} pessoas
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {experience.languages.map((lang) => (
                              <Badge key={lang} variant="secondary" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between mt-auto">
                          <div className="text-sm">
                            A partir de <span className="font-bold">${experience.price_from}</span>/pessoa
                          </div>
                          <Button size="sm">Ver Detalhes</Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

