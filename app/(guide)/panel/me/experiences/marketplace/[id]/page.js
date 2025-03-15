import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Clock, Users, MapPin, Languages, DollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ExperienceDetailPage({ params }) {
  // Simulando dados da experiência
  const experience = {
    id: params.id,
    title: "Mergulho nos Recifes de Cozumel",
    short_description: "Explore os incríveis recifes de coral em Cozumel com guias experientes",
    full_description:
      "Junte-se a nós para uma experiência incrível de mergulho nos mundialmente famosos recifes de coral de Cozumel. Nossos guias experientes o levarão aos melhores pontos de mergulho, onde você poderá ver uma incrível variedade de vida marinha, incluindo tartarugas, raias e peixes coloridos. Esta experiência é adequada para mergulhadores de todos os níveis, desde iniciantes até avançados.",
    category: "Mergulho e Snorkeling",
    city: "Cozumel",
    duration: 4,
    min_capacity: 2,
    max_capacity: 8,
    cover_image: "/placeholder.svg?height=400&width=800",
    gallery_images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    languages: ["Inglês", "Espanhol"],
    services_included: [
      "Equipamento de mergulho",
      "Lanche",
      "Bebidas",
      "Transporte de/para o hotel",
      "Instrutor certificado",
    ],
    transport_mode: "Barco",
    price_from: 80,
    prices: [
      {
        min_people: 2,
        max_people: 4,
        price_per_person: 95,
      },
      {
        min_people: 5,
        max_people: 8,
        price_per_person: 80,
      },
    ],
    itinerary: [
      {
        title: "Encontro no Porto",
        description: "Encontro no porto de Cozumel para check-in e orientações de segurança",
        duration: "30 minutos",
      },
      {
        title: "Viagem de Barco",
        description: "Viagem de barco até o primeiro ponto de mergulho",
        duration: "20 minutos",
      },
      {
        title: "Primeiro Mergulho",
        description: "Mergulho no recife Palancar, um dos mais belos recifes do mundo",
        duration: "1 hora",
      },
      {
        title: "Intervalo e Lanche",
        description: "Pausa para lanche e descanso no barco",
        duration: "40 minutos",
      },
      {
        title: "Segundo Mergulho",
        description: "Mergulho no recife Colombia, conhecido por suas formações de coral únicas",
        duration: "1 hora",
      },
      {
        title: "Retorno ao Porto",
        description: "Viagem de volta ao porto de Cozumel",
        duration: "30 minutos",
      },
    ],
    working_hours: [
      { day_of_week: 1, start_time: "09:00", end_time: "17:00" },
      { day_of_week: 2, start_time: "09:00", end_time: "17:00" },
      { day_of_week: 3, start_time: "09:00", end_time: "17:00" },
      { day_of_week: 4, start_time: "09:00", end_time: "17:00" },
      { day_of_week: 5, start_time: "09:00", end_time: "17:00" },
    ],
  }

  // Perguntas de múltipla escolha para avaliação do guia
  const questions = [
    {
      id: "q1",
      question: "Qual é o seu nível de experiência com mergulho?",
      options: [
        { id: "q1-a", text: "Sou instrutor certificado com mais de 5 anos de experiência" },
        { id: "q1-b", text: "Sou instrutor certificado com 1-5 anos de experiência" },
        { id: "q1-c", text: "Sou mergulhador avançado, mas não sou instrutor certificado" },
        { id: "q1-d", text: "Tenho experiência básica com mergulho" },
      ],
    },
    {
      id: "q2",
      question: "Você já guiou turistas nos recifes de Cozumel antes?",
      options: [
        { id: "q2-a", text: "Sim, regularmente nos últimos 3+ anos" },
        { id: "q2-b", text: "Sim, ocasionalmente nos últimos 1-3 anos" },
        { id: "q2-c", text: "Sim, algumas vezes no último ano" },
        { id: "q2-d", text: "Não, nunca guiei nesta área específica" },
      ],
    },
    {
      id: "q3",
      question: "Você conhece os procedimentos de segurança e primeiros socorros para atividades de mergulho?",
      options: [
        { id: "q3-a", text: "Sim, sou certificado em primeiros socorros e resgate aquático" },
        { id: "q3-b", text: "Sim, tenho treinamento básico em primeiros socorros" },
        { id: "q3-c", text: "Conheço os procedimentos básicos, mas não tenho certificação formal" },
        { id: "q3-d", text: "Tenho conhecimento limitado sobre procedimentos de segurança" },
      ],
    },
    {
      id: "q4",
      question: "Como você avalia seu conhecimento sobre a vida marinha local e ecologia dos recifes?",
      options: [
        { id: "q4-a", text: "Excelente, tenho formação em biologia marinha ou área relacionada" },
        { id: "q4-b", text: "Muito bom, estudei extensivamente por conta própria" },
        { id: "q4-c", text: "Bom, conheço as espécies mais comuns e informações básicas" },
        { id: "q4-d", text: "Básico, ainda estou aprendendo sobre a vida marinha local" },
      ],
    },
  ]

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/panel/me/experiences/marketplace">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">{experience.title}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="relative h-64 w-full">
              <Image
                src={experience.cover_image || "/placeholder.svg"}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{experience.category}</Badge>
                <Badge variant="outline">
                  <MapPin className="mr-1 h-3 w-3" /> {experience.city}
                </Badge>
                <Badge variant="outline">
                  <Clock className="mr-1 h-3 w-3" /> {experience.duration}h
                </Badge>
                <Badge variant="outline">
                  <Users className="mr-1 h-3 w-3" /> {experience.min_capacity}-{experience.max_capacity} pessoas
                </Badge>
                <Badge variant="outline">
                  <Languages className="mr-1 h-3 w-3" /> {experience.languages.join(", ")}
                </Badge>
                <Badge variant="outline">
                  <DollarSign className="mr-1 h-3 w-3" /> A partir de ${experience.price_from}/pessoa
                </Badge>
              </div>
              <CardDescription className="text-base">{experience.short_description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerário</TabsTrigger>
                  <TabsTrigger value="prices">Preços</TabsTrigger>
                  <TabsTrigger value="gallery">Galeria</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                    <p>{experience.full_description}</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Serviços Incluídos</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {experience.services_included.map((service, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Checkbox id={`service-${index}`} checked disabled />
                          <label htmlFor={`service-${index}`}>{service}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Transporte</h3>
                    <p>Modo de transporte: {experience.transport_mode}</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Horário de Funcionamento</h3>
                    <ul className="space-y-1">
                      {experience.working_hours.map((hours, index) => {
                        const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
                        return (
                          <li key={index}>
                            {days[hours.day_of_week - 1]}: {hours.start_time} - {hours.end_time}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="itinerary" className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold mb-2">Itinerário Detalhado</h3>
                  <div className="space-y-6">
                    {experience.itinerary.map((item, index) => (
                      <div key={index} className="relative pl-6 pb-6 border-l border-muted last:border-0 last:pb-0">
                        <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-primary"></div>
                        <h4 className="text-base font-medium">
                          {item.title} <span className="text-muted-foreground">({item.duration})</span>
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="prices" className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold mb-2">Tabela de Preços</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="px-4 py-2 text-left">Número de Pessoas</th>
                          <th className="px-4 py-2 text-right">Preço por Pessoa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {experience.prices.map((price, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-4 py-2">
                              {price.min_people === price.max_people
                                ? `${price.min_people} pessoas`
                                : `${price.min_people} a ${price.max_people} pessoas`}
                            </td>
                            <td className="px-4 py-2 text-right font-medium">${price.price_per_person}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent value="gallery" className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Galeria de Fotos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {experience.gallery_images.map((image, index) => (
                      <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${experience.title} - Imagem ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inscreva-se nesta Experiência</CardTitle>
              <CardDescription>Complete os passos para se inscrever como guia para esta experiência</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Ao se inscrever nesta experiência, você terá acesso a:</p>
              <ul className="list-disc pl-5 space-y-1 mb-6">
                <li>Material de treinamento completo</li>
                <li>Suporte da equipe de operações</li>
                <li>Reservas de turistas interessados</li>
                <li>Pagamentos semanais das comissões</li>
              </ul>
              <Button asChild className="w-full">
                <Link href={`/panel/me/experiences/marketplace/${experience.id}/enroll`}>Iniciar Inscrição</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações de Comissão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Valor guia:</span>
                  <span className="font-medium">74%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Comissão plataforma:</span>
                  <span className="font-medium">26%</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-sm">IVA do total:</span>
                  <span className="font-medium">16%</span>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Preço base por pessoa:</span>
                    <span className="font-medium">${experience.price_from}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Estimativa de ganho (grupo de 4):</span>
                    <span className="font-medium">${Math.round(experience.price_from * 4 * 0.74)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Estimativa de ganho (grupo de 8):</span>
                    <span className="font-medium">${Math.round(experience.price_from * 8 * 0.74)}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  Os pagamentos são processados semanalmente via transferência bancária.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

