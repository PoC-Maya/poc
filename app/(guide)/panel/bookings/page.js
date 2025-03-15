"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Search, MessageSquare, AlertCircle, Filter } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Dados simulados de reservas
const bookings = [
  {
    id: "b1a2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p",
    created_at: "2023-07-10T14:30:00Z",
    updated_at: "2023-07-10T15:45:00Z",
    booking_date: "2023-07-25",
    booking_time: "09:00:00",
    status: "CONFIRMED",
    product_id: "p1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    product_title: "Mergulho nos Recifes de Cozumel",
    product_slug: "mergulho-recifes-cozumel",
    product_image: "/placeholder.svg?height=80&width=120",
    provider_id: "g1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    guide_name: "Miguel Guia",
    owner_name: "Carlos Silva",
    owner_email: "carlos@example.com",
    owner_phone: "+52 1 987 654 3210",
    adult_count: 2,
    teenager_count: 1,
    child_count: 0,
    adult_price: 95.0,
    teenager_price: 75.0,
    child_price: 0.0,
    average_price: 88.33,
    subtotal: 265.0,
    platform_fee: 7.95,
    total_price: 272.95,
    platform_commission_percentage: 16.0,
    platform_fee_percentage: 3.0,
    platform_commission_amount: 42.4,
    platform_fee_amount: 7.95,
    guide_commission_amount: 222.6,
    stripe_status: "paid",
    stripe_currency: "USD",
    stripe_amount: 272.95,
    stripe_client_email: "carlos@example.com",
    stripe_purchase_date: "2023-07-10T15:45:00Z",
    stripe_transfer_amount: 222.6,
    stripe_session_id: "cs_test_a1b2c3d4e5f6g7h8i9j0",
    stripe_payment_intent: "pi_1a2b3c4d5e6f7g8h9i0j",
    stripe_transfer_id: "tr_1a2b3c4d5e6f7g8h9i0j",
  },
  {
    id: "c2b3d4e5-f6g7-8h9i-0j1k-2l3m4n5o6p7q",
    created_at: "2023-07-12T10:15:00Z",
    updated_at: "2023-07-12T10:15:00Z",
    booking_date: "2023-07-28",
    booking_time: "14:00:00",
    status: "PENDING",
    product_id: "p1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    product_title: "Mergulho nos Recifes de Cozumel",
    product_slug: "mergulho-recifes-cozumel",
    product_image: "/placeholder.svg?height=80&width=120",
    provider_id: "g1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    guide_name: "Miguel Guia",
    owner_name: "Ana Pereira",
    owner_email: "ana@example.com",
    owner_phone: "+52 1 987 123 4567",
    adult_count: 4,
    teenager_count: 0,
    child_count: 2,
    adult_price: 95.0,
    teenager_price: 0.0,
    child_price: 45.0,
    average_price: 78.33,
    subtotal: 470.0,
    platform_fee: 14.1,
    total_price: 484.1,
    platform_commission_percentage: 16.0,
    platform_fee_percentage: 3.0,
    platform_commission_amount: 75.2,
    platform_fee_amount: 14.1,
    guide_commission_amount: 394.8,
    stripe_status: "awaiting_payment",
    stripe_currency: "USD",
    stripe_amount: 0.0,
    stripe_client_email: "",
    stripe_purchase_date: null,
    stripe_transfer_amount: 0.0,
    stripe_session_id: "",
    stripe_payment_intent: "",
    stripe_transfer_id: "",
  },
  {
    id: "d3c4e5f6-g7h8-9i0j-1k2l-3m4n5o6p7q8r",
    created_at: "2023-07-05T09:30:00Z",
    updated_at: "2023-07-06T11:20:00Z",
    booking_date: "2023-07-15",
    booking_time: "10:00:00",
    status: "CANCELLED",
    cancellation_date: "2023-07-06",
    cancellation_time: "11:20:00",
    product_id: "q2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7",
    product_title: "Tour Gastronômico em Mérida",
    product_slug: "tour-gastronomico-merida",
    product_image: "/placeholder.svg?height=80&width=120",
    provider_id: "g1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    guide_name: "Miguel Guia",
    owner_name: "Roberto Gomes",
    owner_email: "roberto@example.com",
    owner_phone: "+52 1 555 123 4567",
    adult_count: 2,
    teenager_count: 0,
    child_count: 0,
    adult_price: 65.0,
    teenager_price: 0.0,
    child_price: 0.0,
    average_price: 65.0,
    subtotal: 130.0,
    platform_fee: 3.9,
    total_price: 133.9,
    platform_commission_percentage: 16.0,
    platform_fee_percentage: 3.0,
    platform_commission_amount: 20.8,
    platform_fee_amount: 3.9,
    guide_commission_amount: 109.2,
    stripe_status: "refunded",
    stripe_currency: "USD",
    stripe_amount: 133.9,
    stripe_client_email: "roberto@example.com",
    stripe_purchase_date: "2023-07-05T09:35:00Z",
    stripe_transfer_amount: 0.0,
    stripe_session_id: "cs_test_d4e5f6g7h8i9j0k1l2m3",
    stripe_payment_intent: "pi_4d5e6f7g8h9i0j1k2l3m",
    stripe_transfer_id: "",
  },
  {
    id: "e4d5f6g7-h8i9-0j1k-2l3m-4n5o6p7q8r9s",
    created_at: "2023-07-08T16:45:00Z",
    updated_at: "2023-07-08T17:30:00Z",
    booking_date: "2023-07-20",
    booking_time: "15:30:00",
    status: "CONFIRMED",
    product_id: "r3c4d5e6-f7g8-h9i0-j1k2-l3m4n5o6p7q8",
    product_title: "Passeio de Bicicleta em Tulum",
    product_slug: "passeio-bicicleta-tulum",
    product_image: "/placeholder.svg?height=80&width=120",
    provider_id: "g1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    guide_name: "Miguel Guia",
    owner_name: "Juliana Costa",
    owner_email: "juliana@example.com",
    owner_phone: "+52 1 777 987 6543",
    adult_count: 2,
    teenager_count: 2,
    child_count: 1,
    adult_price: 35.0,
    teenager_price: 25.0,
    child_price: 15.0,
    average_price: 27.0,
    subtotal: 135.0,
    platform_fee: 4.05,
    total_price: 139.05,
    platform_commission_percentage: 16.0,
    platform_fee_percentage: 3.0,
    platform_commission_amount: 21.6,
    platform_fee_amount: 4.05,
    guide_commission_amount: 113.4,
    stripe_status: "paid",
    stripe_currency: "USD",
    stripe_amount: 139.05,
    stripe_client_email: "juliana@example.com",
    stripe_purchase_date: "2023-07-08T17:30:00Z",
    stripe_transfer_amount: 113.4,
    stripe_session_id: "cs_test_e5f6g7h8i9j0k1l2m3n4",
    stripe_payment_intent: "pi_5e6f7g8h9i0j1k2l3m4n",
    stripe_transfer_id: "tr_2e3f4g5h6i7j8k9l0m1n",
  },
  {
    id: "f5e6g7h8-i9j0-1k2l-3m4n-5o6p7q8r9s0t",
    created_at: "2023-07-15T11:20:00Z",
    updated_at: "2023-07-15T11:20:00Z",
    booking_date: "2023-08-05",
    booking_time: "08:00:00",
    status: "PENDING",
    product_id: "s4d5e6f7-g8h9-i0j1-k2l3-m4n5o6p7q8r9",
    product_title: "Observação de Aves em Bacalar",
    product_slug: "observacao-aves-bacalar",
    product_image: "/placeholder.svg?height=80&width=120",
    provider_id: "g1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    guide_name: "Miguel Guia",
    owner_name: "Fernando Melo",
    owner_email: "fernando@example.com",
    owner_phone: "+52 1 333 456 7890",
    adult_count: 3,
    teenager_count: 1,
    child_count: 0,
    adult_price: 45.0,
    teenager_price: 35.0,
    child_price: 0.0,
    average_price: 42.5,
    subtotal: 170.0,
    platform_fee: 5.1,
    total_price: 175.1,
    platform_commission_percentage: 16.0,
    platform_fee_percentage: 3.0,
    platform_commission_amount: 27.2,
    platform_fee_amount: 5.1,
    guide_commission_amount: 142.8,
    stripe_status: "awaiting_payment",
    stripe_currency: "USD",
    stripe_amount: 0.0,
    stripe_client_email: "",
    stripe_purchase_date: null,
    stripe_transfer_amount: 0.0,
    stripe_session_id: "",
    stripe_payment_intent: "",
    stripe_transfer_id: "",
  },
  {
    id: "g6f7h8i9-j0k1-2l3m-4n5o-6p7q8r9s0t1u",
    created_at: "2023-06-28T13:10:00Z",
    updated_at: "2023-06-28T14:25:00Z",
    booking_date: "2023-07-10",
    booking_time: "09:30:00",
    status: "COMPLETED",
    product_id: "p1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    product_title: "Mergulho nos Recifes de Cozumel",
    product_slug: "mergulho-recifes-cozumel",
    product_image: "/placeholder.svg?height=80&width=120",
    provider_id: "g1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    guide_name: "Miguel Guia",
    owner_name: "Mariana Santos",
    owner_email: "mariana@example.com",
    owner_phone: "+52 1 444 789 0123",
    adult_count: 6,
    teenager_count: 0,
    child_count: 0,
    adult_price: 80.0,
    teenager_price: 0.0,
    child_price: 0.0,
    average_price: 80.0,
    subtotal: 480.0,
    platform_fee: 14.4,
    total_price: 494.4,
    platform_commission_percentage: 16.0,
    platform_fee_percentage: 3.0,
    platform_commission_amount: 76.8,
    platform_fee_amount: 14.4,
    guide_commission_amount: 403.2,
    stripe_status: "paid",
    stripe_currency: "USD",
    stripe_amount: 494.4,
    stripe_client_email: "mariana@example.com",
    stripe_purchase_date: "2023-06-28T14:25:00Z",
    stripe_transfer_amount: 403.2,
    stripe_session_id: "cs_test_f6g7h8i9j0k1l2m3n4o5",
    stripe_payment_intent: "pi_6f7g8h9i0j1k2l3m4n5o",
    stripe_transfer_id: "tr_3f4g5h6i7j8k9l0m1n2o",
  },
]

// Função para formatar a data
function formatDate(dateString) {
  const date = new Date(dateString)
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
}

// Função para formatar a hora
function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":")
  return `${hours}:${minutes}`
}

// Função para obter a cor do badge de status
function getStatusColor(status) {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "CANCELLED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "COMPLETED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

// Função para traduzir o status
function translateStatus(status) {
  switch (status) {
    case "CONFIRMED":
      return "Confirmada"
    case "PENDING":
      return "Pendente"
    case "CANCELLED":
      return "Cancelada"
    case "COMPLETED":
      return "Concluída"
    default:
      return status
  }
}

// Função para traduzir o status do pagamento
function translatePaymentStatus(status) {
  switch (status) {
    case "paid":
      return "Pago"
    case "awaiting_payment":
      return "Aguardando Pagamento"
    case "refunded":
      return "Reembolsado"
    default:
      return status
  }
}

export default function BookingsPage() {
  const [date, setDate] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedReserva, setSelectedReserva] = useState(null)
  const [showReservaDialog, setShowReservaDialog] = useState(false)

  // Adicionar useState para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Converter bookings para o formato esperado pelo CalendarioView
  const reservasForCalendar = bookings.map((booking) => ({
    id: booking.id,
    titulo: booking.product_title,
    data: new Date(booking.booking_date),
    horario: booking.booking_time.substring(0, 5),
    cliente: booking.owner_name,
    pessoas: booking.adult_count + booking.teenager_count + booking.child_count,
    status: booking.status.toLowerCase(),
  }))

  // Filtrar reservas
  const filteredBookings = bookings.filter((booking) => {
    // Filtro de status
    if (statusFilter !== "all" && booking.status !== statusFilter) {
      return false
    }

    // Filtro de data
    if (dateFilter === "upcoming" && new Date(booking.booking_date) < new Date()) {
      return false
    }
    if (dateFilter === "past" && new Date(booking.booking_date) > new Date()) {
      return false
    }
    if (date && booking.booking_date !== format(date, "yyyy-MM-dd")) {
      return false
    }

    // Filtro de busca
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        booking.owner_name.toLowerCase().includes(searchLower) ||
        booking.product_title.toLowerCase().includes(searchLower) ||
        booking.id.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)

  // Calcular os itens da página atual
  const currentItems = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Função para lidar com o clique em uma reserva no calendário
  const handleReservaClick = (reserva) => {
    setSelectedReserva(reserva)
    setShowReservaDialog(true)
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reservas</h2>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Gerencie suas reservas de experiências</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-4">
          <div className="grid gap-2">
            <label
              htmlFor="status"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="CONFIRMED">Confirmadas</SelectItem>
                <SelectItem value="PENDING">Pendentes</SelectItem>
                <SelectItem value="CANCELLED">Canceladas</SelectItem>
                <SelectItem value="COMPLETED">Concluídas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="date-filter"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Período
            </label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger id="date-filter">
                <SelectValue placeholder="Todas as datas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as datas</SelectItem>
                <SelectItem value="upcoming">Próximas</SelectItem>
                <SelectItem value="past">Passadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="date"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Data Específica
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="search"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Nome, tour ou ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <>
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="upcoming">Próximas</TabsTrigger>
            <TabsTrigger value="past">Passadas</TabsTrigger>
          </TabsList>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Mostrando {filteredBookings.length} reservas</div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
          <TabsContent value="all" className="mt-6">
            <div className="space-y-6">
              {currentItems.length > 0 ? (
                currentItems.map((booking) => (
                  <Link href={`/panel/bookings/${booking.id}`} key={booking.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative sm:w-32 bg-muted flex flex-col items-center justify-center p-4 text-center">
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(booking.booking_date), "EEEE", { locale: ptBR })}
                          </span>
                          <span className="text-3xl font-bold my-1">
                            {format(new Date(booking.booking_date), "dd")}
                          </span>
                          <span className="text-lg">{format(new Date(booking.booking_date), "MM")}</span>
                          <span className="text-sm text-muted-foreground mt-1">{formatTime(booking.booking_time)}</span>
                        </div>
                        <div className="flex flex-col flex-1 p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{booking.product_title}</h3>
                              <p className="text-sm text-muted-foreground">ID: {booking.id.substring(0, 8)}...</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={getStatusColor(booking.status)}>
                                {translateStatus(booking.status)}
                              </Badge>
                              <Badge variant="outline">{translatePaymentStatus(booking.stripe_status)}</Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                            <div>
                              <p className="text-sm font-medium">Cliente</p>
                              <p className="text-sm">{booking.owner_name}</p>
                              <p className="text-xs text-muted-foreground">{booking.owner_email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Data e Hora</p>
                              <p className="text-sm">{formatDate(booking.booking_date)}</p>
                              <p className="text-xs text-muted-foreground">{formatTime(booking.booking_time)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Pessoas</p>
                              <p className="text-sm">
                                {booking.adult_count + booking.teenager_count + booking.child_count} total
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking.adult_count > 0 && `${booking.adult_count} adultos`}
                                {booking.teenager_count > 0 && `, ${booking.teenager_count} adolescentes`}
                                {booking.child_count > 0 && `, ${booking.child_count} crianças`}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-4 border-t">
                            <div>
                              <p className="text-sm font-medium">Valor Total</p>
                              <p className="text-lg font-bold">${booking.total_price.toFixed(2)}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Falar com Cliente
                              </Button>
                              <Button size="sm">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Falar com Admin
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">Nenhuma reserva encontrada com os filtros selecionados.</p>
                </Card>
              )}
            </div>

            {filteredBookings.length > itemsPerPage && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1
                      // Mostrar apenas páginas próximas à atual e primeira/última
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              isActive={pageNumber === currentPage}
                              onClick={() => setCurrentPage(pageNumber)}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      }

                      // Mostrar elipses para páginas omitidas
                      if (
                        (pageNumber === 2 && currentPage > 3) ||
                        (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return <PaginationEllipsis key={`ellipsis-${pageNumber}`} />
                      }

                      return null
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </TabsContent>
          <TabsContent value="upcoming" className="mt-6">
            {/* Conteúdo similar ao "all", mas filtrado para próximas reservas */}
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            {/* Conteúdo similar ao "all", mas filtrado para reservas passadas */}
          </TabsContent>
        </Tabs>
      </>

      {/* Dialog para detalhes da reserva */}
      <Dialog open={showReservaDialog} onOpenChange={setShowReservaDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Reserva</DialogTitle>
            <DialogDescription>Informações detalhadas sobre a reserva selecionada.</DialogDescription>
          </DialogHeader>
          {selectedReserva && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{selectedReserva.titulo}</h3>
                  <p className="text-sm text-muted-foreground">ID: {selectedReserva.id.substring(0, 8)}...</p>
                </div>
                <Badge
                  className={
                    selectedReserva.status === "confirmed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : selectedReserva.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        : selectedReserva.status === "cancelled"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  }
                >
                  {selectedReserva.status === "confirmed"
                    ? "Confirmada"
                    : selectedReserva.status === "pending"
                      ? "Pendente"
                      : selectedReserva.status === "cancelled"
                        ? "Cancelada"
                        : "Concluída"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data</p>
                  <p>{format(selectedReserva.data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Horário</p>
                  <p>{selectedReserva.horario}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                  <p>{selectedReserva.cliente}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pessoas</p>
                  <p>{selectedReserva.pessoas}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" asChild>
                  <Link href={`/panel/bookings/${selectedReserva.id}`}>Ver Detalhes Completos</Link>
                </Button>
                <Button>Gerenciar Reserva</Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowReservaDialog(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

