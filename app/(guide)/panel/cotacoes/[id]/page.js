"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, PlusCircle, Paperclip, ImageIcon, FileText } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Mensagem } from "@/components/cotacoes/mensagem"
import { CriarCotacaoForm } from "@/components/cotacoes/criar-cotacao-form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// Dados simulados de conversas (mesmo array do arquivo anterior)
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
    mensagens: [
      {
        id: "msg1",
        texto: "Olá! Gostaria de saber mais sobre tours em cenotes na região de Tulum.",
        data: "2023-07-14T10:15:00Z",
        remetente: "turista",
      },
      {
        id: "msg2",
        texto:
          "Olá Carlos! Claro, posso te ajudar com isso. Temos ótimas opções de cenotes para visitar. Você já tem alguma data em mente?",
        data: "2023-07-14T10:20:00Z",
        remetente: "guia",
      },
      {
        id: "msg3",
        texto: "Estou planejando ir no dia 25 de julho. Seremos eu e minha esposa.",
        data: "2023-07-14T10:25:00Z",
        remetente: "turista",
      },
      {
        id: "msg4",
        texto: "Perfeito! Vou preparar uma cotação para vocês com os melhores cenotes para visitar.",
        data: "2023-07-14T10:30:00Z",
        remetente: "guia",
      },
      {
        id: "msg5",
        texto: "Preparei esta cotação para você:",
        data: "2023-07-14T11:00:00Z",
        remetente: "guia",
        cotacao: {
          id: "cot1",
          titulo: "Tour Personalizado em Cenotes",
          descricao:
            "Um tour exclusivo pelos mais belos cenotes da região de Tulum, incluindo transporte privado, equipamento de snorkel e guia especializado.",
          itinerario: `09:00 - Busca no hotel
10:00 - Cenote Dos Ojos
12:00 - Lanche (incluso)
13:30 - Cenote Calavera
15:30 - Gran Cenote
17:00 - Retorno ao hotel`,
          valor: 150,
          data: "2023-07-25",
          pessoas: 2,
        },
      },
      {
        id: "msg6",
        texto: "Obrigado pela cotação! Vou analisar e retorno em breve.",
        data: "2023-07-15T14:30:00Z",
        remetente: "turista",
      },
    ],
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
    mensagens: [
      {
        id: "msg1",
        texto: "Olá! Estou interessada em fazer um passeio de barco em Isla Mujeres com minha família.",
        data: "2023-07-13T16:20:00Z",
        remetente: "turista",
      },
      {
        id: "msg2",
        texto: "Olá Ana! Será um prazer ajudá-la com esse passeio. Quantas pessoas serão?",
        data: "2023-07-13T16:25:00Z",
        remetente: "guia",
      },
      {
        id: "msg3",
        texto: "Seremos 4 pessoas: eu, meu marido e nossos dois filhos (10 e 12 anos).",
        data: "2023-07-13T16:30:00Z",
        remetente: "turista",
      },
      {
        id: "msg4",
        texto: "Perfeito! Vou preparar uma cotação para vocês.",
        data: "2023-07-13T16:35:00Z",
        remetente: "guia",
      },
      {
        id: "msg5",
        texto: "Aqui está a cotação para o passeio:",
        data: "2023-07-13T17:00:00Z",
        remetente: "guia",
        cotacao: {
          id: "cot2",
          titulo: "Passeio de Barco em Isla Mujeres",
          valor: 200,
          data: "2023-07-28",
          pessoas: 4,
        },
      },
      {
        id: "msg6",
        texto: "Adorei a proposta! Vamos confirmar para o dia 28/07.",
        data: "2023-07-14T10:15:00Z",
        remetente: "turista",
      },
      {
        id: "msg7",
        texto: "Ótimo! Vou enviar o link para pagamento.",
        data: "2023-07-14T10:20:00Z",
        remetente: "guia",
      },
      {
        id: "msg8",
        texto: "Pagamento realizado com sucesso! Aqui está seu voucher: #12345",
        data: "2023-07-14T11:30:00Z",
        remetente: "guia",
      },
      {
        id: "msg9",
        texto: "Quando podemos começar o tour?",
        data: "2023-07-16T09:45:00Z",
        remetente: "turista",
      },
    ],
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
]

// Cotações disponíveis para enviar
const cotacoesDisponiveis = [
  {
    id: "cot1",
    titulo: "Tour Personalizado em Cenotes",
    descricao:
      "Um tour exclusivo pelos mais belos cenotes da região de Tulum, incluindo transporte privado, equipamento de snorkel e guia especializado.",
    itinerario: `09:00 - Busca no hotel
10:00 - Cenote Dos Ojos
12:00 - Lanche (incluso)
13:30 - Cenote Calavera
15:30 - Gran Cenote
17:00 - Retorno ao hotel`,
    valor: 150,
    data: "2023-07-25",
    pessoas: 2,
  },
  {
    id: "cot2",
    titulo: "Passeio de Barco em Isla Mujeres",
    descricao:
      "Um dia incrível navegando pelas águas cristalinas do Caribe até Isla Mujeres, com paradas para snorkel e tempo livre na ilha.",
    itinerario: `09:00 - Encontro na marina
09:30 - Saída do barco
10:30 - Parada para snorkel no recife
12:00 - Chegada a Isla Mujeres
12:00-15:00 - Tempo livre na ilha
15:30 - Retorno a Cancun
16:30 - Chegada à marina`,
    valor: 200,
    data: "2023-07-28",
    pessoas: 4,
  },
  {
    id: "cot3",
    titulo: "Tour Chichen Itzá Premium",
    descricao:
      "Conheça uma das 7 maravilhas do mundo moderno com um guia especializado em história maia. Transporte privado e confortável.",
    itinerario: `07:00 - Busca no hotel
09:30 - Chegada em Chichen Itzá
09:30-12:30 - Tour guiado pelo sítio arqueológico
12:30-13:30 - Almoço típico (incluso)
14:00 - Visita ao cenote Ik Kil
16:00 - Retorno para Cancun
18:30 - Chegada ao hotel`,
    valor: 280,
    data: "2023-08-05",
    pessoas: 2,
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

export default function ConversaPage({ params }) {
  const [inputValue, setInputValue] = useState("")
  const [showCotacaoForm, setShowCotacaoForm] = useState(false)
  const [selectedCotacao, setSelectedCotacao] = useState(null)
  const [showCotacaoDialog, setShowCotacaoDialog] = useState(false)
  const messagesEndRef = useRef(null)

  // Encontrar a conversa pelo ID
  const conversa = conversas.find((c) => c.id === params.id) || conversas[0]

  // Rolar para o final quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversa.mensagens])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    // Aqui você implementaria a lógica para enviar a mensagem
    console.log("Enviando mensagem:", inputValue)
    setInputValue("")
  }

  const handleCreateCotacao = (cotacaoData) => {
    // Aqui você implementaria a lógica para criar a cotação
    console.log("Criando cotação:", cotacaoData)

    // Adicionar uma mensagem simulando o envio da cotação
    console.log("Cotação enviada para o turista:", conversa.turista.nome)

    // Fechar o drawer
    setShowCotacaoForm(false)
  }

  const handleSelectCotacao = (cotacao) => {
    setSelectedCotacao(cotacao)
    setShowCotacaoDialog(true)
  }

  const handleSendCotacao = () => {
    if (!selectedCotacao) return

    // Aqui você implementaria a lógica para enviar a cotação
    console.log("Enviando cotação:", selectedCotacao)

    // Fechar o diálogo
    setShowCotacaoDialog(false)
    setSelectedCotacao(null)
  }

  // Componente para renderizar uma cotação no diálogo
  const CotacaoPreview = ({ cotacao }) => {
    if (!cotacao) return null

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{cotacao.titulo}</h3>
          <p className="text-sm text-muted-foreground">{cotacao.descricao}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Data:</p>
            <p>{new Date(cotacao.data).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-medium">Duração:</p>
            <p>{cotacao.duracao} horas</p>
          </div>
          <div>
            <p className="font-medium">Pessoas:</p>
            <p>{cotacao.pessoas}</p>
          </div>
          <div>
            <p className="font-medium">Valor:</p>
            <p>USD {cotacao.valor}</p>
          </div>
        </div>

        <div>
          <p className="font-medium">Itinerário:</p>
          <p className="whitespace-pre-line text-sm">{cotacao.itinerario}</p>
        </div>

        <div>
          <p className="font-medium">Inclui:</p>
          <ul className="list-disc list-inside text-sm">
            {cotacao.inclui && cotacao.inclui.map ? (
              cotacao.inclui.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <li>Informações não disponíveis</li>
            )}
          </ul>
        </div>
        <div>
          <p className="font-medium">Não inclui:</p>
          <ul className="list-disc list-inside text-sm">
            {cotacao.naoInclui && cotacao.naoInclui.map ? (
              cotacao.naoInclui.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <li>Informações não disponíveis</li>
            )}
          </ul>
        </div>

        <div>
          <p className="font-medium">Ponto de encontro:</p>
          <p className="text-sm">{cotacao.pontoEncontro}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/panel/cotacoes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Conversa com {conversa.turista.nome}</h2>
        <Badge className={getStatusColor(conversa.status)}>{traduzirStatus(conversa.status)}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card className="h-[calc(80vh-120px)] flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversa.turista.avatar} alt={conversa.turista.nome} />
                  <AvatarFallback>{conversa.turista.nome ? conversa.turista.nome.charAt(0) : "T"}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{conversa.turista.nome}</CardTitle>
                  <p className="text-xs text-muted-foreground">{conversa.turista.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversa.mensagens && Array.isArray(conversa.mensagens) ? (
                conversa.mensagens.map((mensagem) => (
                  <Mensagem key={mensagem.id} mensagem={mensagem} guiaNome="Miguel Guia" />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">Nenhuma mensagem disponível</p>
              )}
              <div ref={messagesEndRef} />
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" type="button">
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="start">
                    <div className="grid gap-2">
                      <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-2 px-2"
                        onClick={() => setShowCotacaoForm(true)}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Criar Cotação</span>
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" className="flex items-center justify-start gap-2 px-2">
                            <FileText className="h-4 w-4" />
                            <span>Enviar Cotação</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72" align="start">
                          <div className="space-y-2">
                            <h4 className="font-medium">Selecione uma cotação</h4>
                            <div className="grid gap-2 max-h-[300px] overflow-y-auto">
                              {cotacoesDisponiveis && Array.isArray(cotacoesDisponiveis) ? (
                                cotacoesDisponiveis.map((cotacao) => (
                                  <Button
                                    key={cotacao.id}
                                    variant="outline"
                                    className="justify-start h-auto py-2"
                                    onClick={() => handleSelectCotacao(cotacao)}
                                  >
                                    <div className="text-left">
                                      <p className="font-medium">{cotacao.titulo}</p>
                                      <p className="text-xs text-muted-foreground">
                                        USD {cotacao.valor} • {cotacao.duracao ? cotacao.duracao + "h" : ""}
                                      </p>
                                    </div>
                                  </Button>
                                ))
                              ) : (
                                <p className="text-center text-muted-foreground py-2">Nenhuma cotação disponível</p>
                              )}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" type="button">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" type="button">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    className="pr-10 py-6"
                    placeholder="Digite sua mensagem..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full rounded-l-none"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Turista</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={conversa.turista.avatar} alt={conversa.turista.nome || "Turista"} />
                  <AvatarFallback>{conversa.turista.nome ? conversa.turista.nome.charAt(0) : "T"}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{conversa.turista.nome || "Turista"}</h3>
                  <p className="text-sm text-muted-foreground">{conversa.turista.email || "Email não disponível"}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Conversa iniciada em:</p>
                <p>{formatarData(conversa.dataCriacao)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {conversa.status === "aguardando_cotacao" ? (
                <Button className="w-full" onClick={() => setShowCotacaoForm(true)}>
                  Criar Cotação
                </Button>
              ) : conversa.status === "pendente" ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Cotação enviada em:</p>
                  <p>
                    {conversa.mensagens && conversa.mensagens.find((m) => m.cotacao)?.data
                      ? formatarData(conversa.mensagens.find((m) => m.cotacao)?.data)
                      : "Data não disponível"}
                  </p>
                  <Button className="w-full" variant="outline">
                    Editar Cotação
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Status:</p>
                  <Badge className={getStatusColor(conversa.status)}>{traduzirStatus(conversa.status)}</Badge>
                  {conversa.status === "aprovada" && <Button className="w-full mt-2">Enviar Link de Pagamento</Button>}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Drawer para criar cotação */}
      <Sheet open={showCotacaoForm} onOpenChange={setShowCotacaoForm} side="bottom">
        <SheetContent className="h-[90vh] px-6" side="bottom">
          <SheetHeader className="mb-6">
            <SheetTitle>Criar Nova Cotação</SheetTitle>
            <SheetDescription>Crie uma cotação personalizada para {conversa.turista.nome}</SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(90vh-120px)]">
            <CriarCotacaoForm onSubmit={handleCreateCotacao} onCancel={() => setShowCotacaoForm(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Diálogo para visualizar e enviar a cotação selecionada */}
      <Dialog open={showCotacaoDialog} onOpenChange={setShowCotacaoDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enviar Cotação</DialogTitle>
            <DialogDescription>
              Revise os detalhes da cotação antes de enviar para {conversa.turista.nome}.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <CotacaoPreview cotacao={selectedCotacao} />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCotacaoDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSendCotacao}>Enviar Cotação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

