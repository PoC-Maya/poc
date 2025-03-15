"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ConversaItem } from "@/components/cotacoes/conversa-item"

// Dados simulados de conversas
const conversas = [
  {
    id: "conv1",
    turista: {
      id: "tur1",
      nome: "Carlos Silva",
      avatar: "/placeholder.svg",
      email: "carlos@example.com",
    },
    ultimaMensagem: {
      texto: "Obrigado pela cotação! Vou analisar e retorno em breve.",
      data: "2023-07-15T14:30:00Z",
      lida: true,
      remetente: "turista",
    },
    status: "pendente",
    cotacao: {
      id: "cot1",
      titulo: "Tour Personalizado em Cenotes",
      valor: 150,
      data: "2023-07-25",
      pessoas: 2,
    },
    dataCriacao: "2023-07-14T10:15:00Z",
  },
  {
    id: "conv2",
    turista: {
      id: "tur2",
      nome: "Ana Pereira",
      avatar: "/placeholder.svg",
      email: "ana@example.com",
    },
    ultimaMensagem: {
      texto: "Quando podemos começar o tour?",
      data: "2023-07-16T09:45:00Z",
      lida: false,
      remetente: "turista",
    },
    status: "aprovada",
    cotacao: {
      id: "cot2",
      titulo: "Passeio de Barco em Isla Mujeres",
      valor: 200,
      data: "2023-07-28",
      pessoas: 4,
    },
    dataCriacao: "2023-07-13T16:20:00Z",
  },
  {
    id: "conv3",
    turista: {
      id: "tur3",
      nome: "Roberto Gomes",
      avatar: "/placeholder.svg",
      email: "roberto@example.com",
    },
    ultimaMensagem: {
      texto: "Poderia me enviar uma cotação para um tour em Chichen Itza?",
      data: "2023-07-14T11:20:00Z",
      lida: true,
      remetente: "turista",
    },
    status: "aguardando_cotacao",
    cotacao: null,
    dataCriacao: "2023-07-14T11:20:00Z",
  },
  {
    id: "conv4",
    turista: {
      id: "tur4",
      nome: "Juliana Costa",
      avatar: "/placeholder.svg",
      email: "juliana@example.com",
    },
    ultimaMensagem: {
      texto: "Infelizmente não poderei fazer o tour nessa data. Podemos reagendar?",
      data: "2023-07-12T15:10:00Z",
      lida: true,
      remetente: "turista",
    },
    status: "rejeitada",
    cotacao: {
      id: "cot4",
      titulo: "Tour Gastronômico em Mérida",
      valor: 120,
      data: "2023-07-20",
      pessoas: 2,
    },
    dataCriacao: "2023-07-10T09:30:00Z",
  },
  {
    id: "conv5",
    turista: {
      id: "tur5",
      nome: "Fernando Melo",
      avatar: "/placeholder.svg",
      email: "fernando@example.com",
    },
    ultimaMensagem: {
      texto: "Acabei de fazer o pagamento. Estou ansioso pelo tour!",
      data: "2023-07-15T16:40:00Z",
      lida: false,
      remetente: "turista",
    },
    status: "paga",
    cotacao: {
      id: "cot5",
      titulo: "Mergulho em Recifes de Cozumel",
      valor: 180,
      data: "2023-07-30",
      pessoas: 2,
    },
    dataCriacao: "2023-07-12T14:25:00Z",
  },
]

// Função para formatar data
function formatarData(dataString) {
  const data = new Date(dataString)
  const hoje = new Date()
  const ontem = new Date(hoje)
  ontem.setDate(hoje.getDate() - 1)

  if (data.toDateString() === hoje.toDateString()) {
    return format(data, "'Hoje,' HH:mm", { locale: ptBR })
  } else if (data.toDateString() === ontem.toDateString()) {
    return format(data, "'Ontem,' HH:mm", { locale: ptBR })
  } else {
    return format(data, "dd 'de' MMMM, HH:mm", { locale: ptBR })
  }
}

// Função para obter a cor do badge de status
function getStatusColor(status) {
  switch (status) {
    case "pendente":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "aprovada":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "rejeitada":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "paga":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "aguardando_cotacao":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

// Função para traduzir o status
function traduzirStatus(status) {
  switch (status) {
    case "pendente":
      return "Cotação Pendente"
    case "aprovada":
      return "Cotação Aprovada"
    case "rejeitada":
      return "Cotação Rejeitada"
    case "paga":
      return "Pagamento Realizado"
    case "aguardando_cotacao":
      return "Aguardando Cotação"
    default:
      return status
  }
}

export default function CotacoesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todas")
  const [activeTab, setActiveTab] = useState("todas")

  // Filtrar conversas
  const conversasFiltradas = conversas.filter((conversa) => {
    // Filtro de status
    if (statusFilter !== "todas" && conversa.status !== statusFilter) {
      return false
    }

    // Filtro de busca
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        conversa.turista.nome.toLowerCase().includes(searchLower) ||
        conversa.turista.email.toLowerCase().includes(searchLower) ||
        (conversa.cotacao?.titulo && conversa.cotacao.titulo.toLowerCase().includes(searchLower))
      )
    }

    return true
  })

  // Filtrar conversas por tab
  const getConversasByTab = (tab) => {
    switch (tab) {
      case "nao_lidas":
        return conversasFiltradas.filter((conversa) => !conversa.ultimaMensagem.lida)
      case "aguardando_cotacao":
        return conversasFiltradas.filter((conversa) => conversa.status === "aguardando_cotacao")
      case "pendentes":
        return conversasFiltradas.filter((conversa) => conversa.status === "pendente")
      case "aprovadas":
        return conversasFiltradas.filter((conversa) => ["aprovada", "paga"].includes(conversa.status))
      default:
        return conversasFiltradas
    }
  }

  const conversasExibidas = getConversasByTab(activeTab)

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Cotações</h2>
        <Button asChild>
          <Link href="/panel/cotacoes/nova">
            <Plus className="mr-2 h-4 w-4" />
            Nova Cotação
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Gerencie suas conversas e cotações com turistas</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou título..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={statusFilter === "todas" ? "bg-muted" : ""}
              onClick={() => setStatusFilter("todas")}
            >
              Todas
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={statusFilter === "aguardando_cotacao" ? "bg-muted" : ""}
              onClick={() => setStatusFilter("aguardando_cotacao")}
            >
              Aguardando Cotação
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={statusFilter === "pendente" ? "bg-muted" : ""}
              onClick={() => setStatusFilter("pendente")}
            >
              Pendentes
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={statusFilter === "aprovada" ? "bg-muted" : ""}
              onClick={() => setStatusFilter("aprovada")}
            >
              Aprovadas
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="todas" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="nao_lidas">Não Lidas</TabsTrigger>
          <TabsTrigger value="aguardando_cotacao">Aguardando Cotação</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="aprovadas">Aprovadas</TabsTrigger>
        </TabsList>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Mostrando {conversasExibidas.length} conversas</div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {conversasExibidas.length > 0 ? (
              conversasExibidas.map((conversa) => (
                <Link href={`/panel/cotacoes/${conversa.id}`} key={conversa.id}>
                  <ConversaItem conversa={conversa} />
                </Link>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Nenhuma conversa encontrada com os filtros selecionados.</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

