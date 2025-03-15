"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Clock, MapPin, Users, DollarSign, Phone, Mail, MessageSquare, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Dados de exemplo
const reservaData = {
  id: "1234",
  status: "confirmada", // pendente, confirmada, concluida, cancelada
  tour: {
    nome: "Tour Chichen Itzá Deluxe",
    imagem: "/placeholder.svg?height=100&width=200",
    descricao: "Visita guiada às ruínas de Chichen Itzá com transporte privativo e almoço incluído.",
  },
  cliente: {
    nome: "Maria Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "maria.silva@exemplo.com",
    telefone: "+55 11 98765-4321",
  },
  data: "2023-08-15",
  horario: "08:00",
  duracao: "10 horas",
  local: "Chichen Itzá, México",
  pontoEncontro: "Lobby do Hotel Riu Peninsula",
  participantes: 4,
  valor: "R$ 1.200,00",
  observacoes:
    "Cliente solicitou guia em português. Família com duas crianças (7 e 10 anos). Um dos participantes tem restrição alimentar (sem glúten).",
  historico: [
    {
      data: "2023-07-01T14:30:00",
      acao: "Reserva criada",
      detalhes: "Reserva criada pelo cliente através do site.",
    },
    {
      data: "2023-07-01T14:35:00",
      acao: "Pagamento recebido",
      detalhes: "Pagamento de 50% do valor total recebido via cartão de crédito.",
    },
    {
      data: "2023-07-02T10:15:00",
      acao: "Reserva confirmada",
      detalhes: "Reserva confirmada pelo guia.",
    },
    {
      data: "2023-07-05T16:20:00",
      acao: "Mensagem enviada",
      detalhes: "Guia enviou mensagem com detalhes adicionais sobre o tour.",
    },
  ],
}

export default function ReservaDetalhesPage({ params }) {
  const [reserva, setReserva] = useState(reservaData)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulando carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [1])

  const getStatusBadge = (status) => {
    const statusMap = {
      pendente: { label: "Pendente", variant: "outline" },
      confirmada: { label: "Confirmada", variant: "success" },
      concluida: { label: "Concluída", variant: "default" },
      cancelada: { label: "Cancelada", variant: "destructive" },
    }

    const statusInfo = statusMap[status] || statusMap.pendente

    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  const getStatusColor = (status) => {
    const statusMap = {
      pendente: "bg-gray-100 text-gray-800",
      confirmada: "bg-green-100 text-green-800",
      concluida: "bg-blue-100 text-blue-800",
      cancelada: "bg-red-100 text-red-800",
    }

    return statusMap[status] || statusMap.pendente
  }

  const translateStatus = (status) => {
    const statusMap = {
      pendente: "Pendente",
      confirmada: "Confirmada",
      concluida: "Concluída",
      cancelada: "Cancelada",
    }

    return statusMap[status] || "Pendente"
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col space-y-4">
          <div className="h-8 w-24 animate-pulse rounded-md bg-muted"></div>
          <div className="h-64 animate-pulse rounded-md bg-muted"></div>
        </div>
      </div>
    )
  }

  const booking = reservaData

  return (
    <div className="container mx-auto p-6">
      {/* Botão de voltar */}
      {/* <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.back()}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button> */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/panel/bookings">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Detalhes da Reserva</h2>
          <Badge className={cn("ml-2", getStatusColor(booking.status))}>{translateStatus(booking.status)}</Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Reserva</CardTitle>
                <CardDescription>Informações sobre a reserva</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(reserva.status)}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Data: <span className="font-medium">{new Date(reserva.data).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Horário: <span className="font-medium">{reserva.horario}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Duração: <span className="font-medium">{reserva.duracao}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Local: <span className="font-medium">{reserva.local}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Ponto de encontro: <span className="font-medium">{reserva.pontoEncontro}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Participantes: <span className="font-medium">{reserva.participantes}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Valor: <span className="font-medium">{reserva.valor}</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={reserva.cliente.avatar} alt={reserva.cliente.nome} />
                    <AvatarFallback>{reserva.cliente.nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{reserva.cliente.nome}</p>
                    <p className="text-sm text-muted-foreground">{reserva.cliente.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{reserva.cliente.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{reserva.cliente.email}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">Confirmar Reserva</Button>
                <Button variant="outline" className="w-full">
                  Reagendar
                </Button>
                <Button variant="secondary" className="w-full">
                  Marcar como Concluída
                </Button>
                <Button variant="destructive" className="w-full">
                  Cancelar Reserva
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="detalhes">
              <TabsList className="mb-4">
                <TabsTrigger value="detalhes">Detalhes do Tour</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
                <TabsTrigger value="observacoes">Observações</TabsTrigger>
              </TabsList>

              <TabsContent value="detalhes">
                <Card>
                  <CardHeader>
                    <CardTitle>{reserva.tour.nome}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="aspect-video overflow-hidden rounded-md bg-muted">
                        <img
                          src={reserva.tour.imagem || "/placeholder.svg"}
                          alt={reserva.tour.nome}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p>{reserva.tour.descricao}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historico">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico da Reserva</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {reserva.historico.map((item, index) => (
                          <div key={index} className="border-l-2 border-muted pl-4 pb-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                              <p className="font-medium">{item.acao}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{new Date(item.data).toLocaleString()}</p>
                            <p className="mt-1 text-sm">{item.detalhes}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="observacoes">
                <Card>
                  <CardHeader>
                    <CardTitle>Observações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{reserva.observacoes}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

