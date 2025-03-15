import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Plus, Trash2, Upload, X } from "lucide-react"
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

// Idiomas disponíveis
const languages = [
  { id: "en", name: "Inglês" },
  { id: "es", name: "Espanhol" },
  { id: "pt", name: "Português" },
  { id: "fr", name: "Francês" },
  { id: "de", name: "Alemão" },
  { id: "it", name: "Italiano" },
  { id: "zh", name: "Chinês" },
  { id: "ja", name: "Japonês" },
  { id: "ru", name: "Russo" },
]

export default function CreateExperiencePage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/panel/me/experiences/my-portfolio">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Criar Nova Experiência</h2>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerário</TabsTrigger>
          <TabsTrigger value="pricing">Preços</TabsTrigger>
          <TabsTrigger value="media">Mídia</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Forneça as informações básicas sobre sua experiência</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Título da Experiência</Label>
                <Input id="title" placeholder="Ex: Tour Gastronômico em Mérida" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="short-description">Descrição Curta</Label>
                <Textarea
                  id="short-description"
                  placeholder="Uma breve descrição que aparecerá nos resultados de busca (máx. 150 caracteres)"
                  maxLength={150}
                />
                <p className="text-xs text-muted-foreground">
                  Esta descrição aparecerá nos resultados de busca. Seja conciso e atraente.
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="full-description">Descrição Completa</Label>
                <Textarea
                  id="full-description"
                  placeholder="Descreva sua experiência em detalhes..."
                  className="min-h-32"
                />
                <p className="text-xs text-muted-foreground">
                  Descreva sua experiência em detalhes. O que os turistas podem esperar? O que torna sua experiência
                  única?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="city">Cidade</Label>
                  <Select>
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Selecione uma cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="duration">Duração (horas)</Label>
                  <Input id="duration" type="number" min="0.5" step="0.5" placeholder="Ex: 2.5" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="min-capacity">Capacidade Mínima</Label>
                  <Input id="min-capacity" type="number" min="1" placeholder="Ex: 2" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="max-capacity">Capacidade Máxima</Label>
                  <Input id="max-capacity" type="number" min="1" placeholder="Ex: 10" />
                </div>
              </div>

              <div className="grid gap-3">
                <Label>Idiomas Disponíveis</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {languages.map((language) => (
                    <div key={language.id} className="flex items-center space-x-2">
                      <Switch id={`lang-${language.id}`} />
                      <Label htmlFor={`lang-${language.id}`}>{language.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Salvar Rascunho</Button>
              <Button>Próximo: Detalhes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Experiência</CardTitle>
              <CardDescription>Forneça detalhes adicionais sobre sua experiência</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label>Serviços Incluídos</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="service-guide" />
                    <Label htmlFor="service-guide">Guia</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="service-transport" />
                    <Label htmlFor="service-transport">Transporte</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="service-food" />
                    <Label htmlFor="service-food">Alimentação</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="service-drinks" />
                    <Label htmlFor="service-drinks">Bebidas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="service-equipment" />
                    <Label htmlFor="service-equipment">Equipamentos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="service-photos" />
                    <Label htmlFor="service-photos">Fotos/Vídeos</Label>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Input id="service-custom" placeholder="Adicionar outro serviço..." />
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid gap-3">
                <Label htmlFor="transport-mode">Modo de Transporte</Label>
                <RadioGroup defaultValue="walking">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="walking" id="transport-walking" />
                      <Label htmlFor="transport-walking">A pé</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="car" id="transport-car" />
                      <Label htmlFor="transport-car">Carro/Van</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="boat" id="transport-boat" />
                      <Label htmlFor="transport-boat">Barco</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bicycle" id="transport-bicycle" />
                      <Label htmlFor="transport-bicycle">Bicicleta</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="transport-public" />
                      <Label htmlFor="transport-public">Transporte Público</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="transport-other" />
                      <Label htmlFor="transport-other">Outro</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="grid gap-3">
                <Label>Horário de Funcionamento</Label>
                <div className="grid gap-4">
                  {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day, index) => (
                    <div key={index} className="grid grid-cols-[1fr_auto_1fr_1fr] gap-2 items-center">
                      <div className="flex items-center space-x-2">
                        <Switch id={`day-${index}`} />
                        <Label htmlFor={`day-${index}`}>{day}</Label>
                      </div>
                      <span className="text-center">Das</span>
                      <Select>
                        <SelectTrigger id={`start-time-${index}`}>
                          <SelectValue placeholder="Início" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, hour) => (
                            <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                              {hour.toString().padStart(2, "0")}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger id={`end-time-${index}`}>
                          <SelectValue placeholder="Fim" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, hour) => (
                            <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                              {hour.toString().padStart(2, "0")}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Anterior: Básico</Button>
              <Button>Próximo: Itinerário</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="itinerary" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Itinerário</CardTitle>
              <CardDescription>Descreva o itinerário detalhado da sua experiência</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Etapa 1</h3>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="step-1-title">Título</Label>
                    <Input id="step-1-title" placeholder="Ex: Encontro no Ponto de Partida" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="step-1-description">Descrição</Label>
                    <Textarea id="step-1-description" placeholder="Descreva esta etapa do itinerário..." />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="step-1-duration">Duração</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="step-1-duration" placeholder="Ex: 30" type="number" min="5" />
                      <Select defaultValue="minutes">
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutes">Minutos</SelectItem>
                          <SelectItem value="hours">Horas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Etapa 2</h3>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="step-2-title">Título</Label>
                    <Input id="step-2-title" placeholder="Ex: Visita ao Mercado Local" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="step-2-description">Descrição</Label>
                    <Textarea id="step-2-description" placeholder="Descreva esta etapa do itinerário..." />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="step-2-duration">Duração</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="step-2-duration" placeholder="Ex: 1" type="number" min="5" />
                      <Select defaultValue="hours">
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutes">Minutos</SelectItem>
                          <SelectItem value="hours">Horas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Nova Etapa
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Anterior: Detalhes</Button>
              <Button>Próximo: Preços</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preços</CardTitle>
              <CardDescription>Configure os preços da sua experiência</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Faixa de Preço 1</h3>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="price-1-min">Mínimo de Pessoas</Label>
                      <Input id="price-1-min" type="number" min="1" placeholder="Ex: 1" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="price-1-max">Máximo de Pessoas</Label>
                      <Input id="price-1-max" type="number" min="1" placeholder="Ex: 3" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="price-1-amount">Preço por Pessoa (USD)</Label>
                      <Input id="price-1-amount" type="number" min="0" step="0.01" placeholder="Ex: 50.00" />
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Faixa de Preço 2</h3>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="price-2-min">Mínimo de Pessoas</Label>
                      <Input id="price-2-min" type="number" min="1" placeholder="Ex: 4" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="price-2-max">Máximo de Pessoas</Label>
                      <Input id="price-2-max" type="number" min="1" placeholder="Ex: 8" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="price-2-amount">Preço por Pessoa (USD)</Label>
                      <Input id="price-2-amount" type="number" min="0" step="0.01" placeholder="Ex: 40.00" />
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Nova Faixa de Preço
              </Button>

              <Separator />

              <div className="grid gap-3">
                <Label htmlFor="cancellation-policy">Política de Cancelamento</Label>
                <Select>
                  <SelectTrigger id="cancellation-policy">
                    <SelectValue placeholder="Selecione uma política" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">Flexível (até 24h antes)</SelectItem>
                    <SelectItem value="moderate">Moderada (até 3 dias antes)</SelectItem>
                    <SelectItem value="strict">Rigorosa (até 7 dias antes)</SelectItem>
                    <SelectItem value="custom">Personalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="custom-cancellation">Política de Cancelamento Personalizada</Label>
                <Textarea
                  id="custom-cancellation"
                  placeholder="Descreva sua política de cancelamento personalizada..."
                  disabled
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Anterior: Itinerário</Button>
              <Button>Próximo: Mídia</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mídia</CardTitle>
              <CardDescription>Adicione fotos e vídeos para sua experiência</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label>Imagem de Capa</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <div className="relative h-48 w-full max-w-md mb-4">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Imagem de capa"
                      fill
                      className="object-cover rounded-md"
                    />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Alterar Imagem de Capa
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recomendado: 1200 x 800 pixels, formato JPG ou PNG
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-3">
                <Label>Galeria de Imagens</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="relative aspect-video rounded-md overflow-hidden border">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Imagem da galeria 1"
                      fill
                      className="object-cover"
                    />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative aspect-video rounded-md overflow-hidden border">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Imagem da galeria 2"
                      fill
                      className="object-cover"
                    />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="border-2 border-dashed rounded-md aspect-video flex flex-col items-center justify-center">
                    <Button variant="ghost">
                      <Upload className="mr-2 h-4 w-4" />
                      Adicionar Imagem
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Adicione até 10 imagens para mostrar sua experiência. Recomendado: formato JPG ou PNG.
                </p>
              </div>

              <Separator />

              <div className="grid gap-3">
                <Label htmlFor="video-url">URL do Vídeo (opcional)</Label>
                <Input id="video-url" placeholder="Ex: https://youtube.com/watch?v=..." />
                <p className="text-xs text-muted-foreground">
                  Adicione um link do YouTube ou Vimeo para mostrar um vídeo da sua experiência.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Anterior: Preços</Button>
              <div className="space-x-2">
                <Button variant="outline">Salvar Rascunho</Button>
                <Button>Publicar Experiência</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

