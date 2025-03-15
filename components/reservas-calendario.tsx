"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ptBR } from "date-fns/locale"
import { format, isSameDay } from "date-fns"
import { CalendarX, Info } from "lucide-react"

// Tipo para as reservas
type Reserva = {
  id: string
  titulo: string
  data: Date
  horario: string
  cliente: string
  pessoas: number
  status: "confirmada" | "pendente" | "cancelada" | "concluida"
}

// Tipo para os dias bloqueados
type DiaBloqueado = {
  id: string
  data: Date
  motivo: string
  recorrente: boolean
}

export function ReservasCalendario() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [blockReason, setBlockReason] = useState("")
  const [blockRecurrent, setBlockRecurrent] = useState("false")
  const [showReservasDialog, setShowReservasDialog] = useState(false)

  // Dados de exemplo - em produção viriam da API
  const reservas: Reserva[] = [
    {
      id: "1",
      titulo: "Tour em Cenotes",
      data: new Date(2023, 6, 15),
      horario: "09:00",
      cliente: "Carlos Silva",
      pessoas: 2,
      status: "confirmada",
    },
    {
      id: "2",
      titulo: "Passeio de Barco",
      data: new Date(2023, 6, 20),
      horario: "10:30",
      cliente: "Ana Pereira",
      pessoas: 4,
      status: "pendente",
    },
    {
      id: "3",
      titulo: "Tour Gastronômico",
      data: new Date(2023, 6, 25),
      horario: "19:00",
      cliente: "Roberto Gomes",
      pessoas: 3,
      status: "confirmada",
    },
    {
      id: "4",
      titulo: "Mergulho em Recifes",
      data: new Date(),
      horario: "08:00",
      cliente: "Juliana Costa",
      pessoas: 2,
      status: "confirmada",
    },
  ]

  const diasBloqueados: DiaBloqueado[] = [
    {
      id: "1",
      data: new Date(2023, 11, 25), // Natal
      motivo: "Natal",
      recorrente: true,
    },
    {
      id: "2",
      data: new Date(2023, 11, 31), // Ano Novo
      motivo: "Ano Novo",
      recorrente: true,
    },
    {
      id: "3",
      data: new Date(2023, 6, 10), // Aniversário
      motivo: "Aniversário",
      recorrente: true,
    },
  ]

  // Função para verificar se uma data tem reservas
  const hasReservas = (date: Date) => {
    return reservas.some((reserva) => isSameDay(reserva.data, date))
  }

  // Função para verificar se uma data está bloqueada
  const isBloqueado = (date: Date) => {
    return diasBloqueados.some((dia) => isSameDay(dia.data, date))
  }

  // Função para obter as reservas de uma data específica
  const getReservasByDate = (date: Date) => {
    return reservas.filter((reserva) => isSameDay(reserva.data, date))
  }

  // Função para obter o motivo do bloqueio de uma data
  const getBlockReason = (date: Date) => {
    const dia = diasBloqueados.find((dia) => isSameDay(dia.data, date))
    return dia ? dia.motivo : ""
  }

  // Função para adicionar um novo dia bloqueado
  const handleAddBlockedDay = () => {
    if (!date || !blockReason) return

    console.log("Dia bloqueado:", {
      data: date,
      motivo: blockReason,
      recorrente: blockRecurrent === "true",
    })

    // Aqui você implementaria a lógica para salvar o dia bloqueado
    setShowBlockDialog(false)
    setBlockReason("")
    setBlockRecurrent("false")
  }

  // Renderização personalizada dos dias do calendário
  const renderDay = (day: Date) => {
    const isReserva = hasReservas(day)
    const isBloqueadoDay = isBloqueado(day)

    return (
      <div className="relative w-full h-full">
        <div className={`w-full h-full flex items-center justify-center ${isReserva ? "font-bold" : ""}`}>
          {format(day, "d")}
        </div>
        {isReserva && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="h-1 w-1 rounded-full bg-primary"></div>
          </div>
        )}
        {isBloqueadoDay && (
          <div className="absolute top-1 right-1">
            <CalendarX className="h-3 w-3 text-destructive" />
          </div>
        )}
      </div>
    )
  }

  // Função para lidar com o clique em um dia
  const handleDayClick = (date: Date) => {
    setDate(date)
    if (hasReservas(date)) {
      setShowReservasDialog(true)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Calendário de Reservas</h2>
        <Button onClick={() => setShowBlockDialog(true)}>Bloquear Data</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && handleDayClick(date)}
              className="rounded-md border"
              locale={ptBR}
              components={{
                Day: ({ date }) => renderDay(date),
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Dia</CardTitle>
            <CardDescription>
              {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione uma data"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {date && (
              <div className="space-y-4">
                {isBloqueado(date) && (
                  <div className="rounded-md bg-destructive/10 p-3 text-destructive">
                    <div className="flex items-center gap-2">
                      <CalendarX className="h-4 w-4" />
                      <span className="font-medium">Data Bloqueada</span>
                    </div>
                    <p className="text-sm mt-1">Motivo: {getBlockReason(date)}</p>
                  </div>
                )}

                {hasReservas(date) ? (
                  <div className="space-y-3">
                    <h3 className="font-medium">Reservas para este dia:</h3>
                    {getReservasByDate(date).map((reserva) => (
                      <div key={reserva.id} className="rounded-md border p-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{reserva.titulo}</h4>
                          <Badge
                            variant={
                              reserva.status === "confirmada"
                                ? "default"
                                : reserva.status === "pendente"
                                  ? "outline"
                                  : reserva.status === "cancelada"
                                    ? "destructive"
                                    : "secondary"
                            }
                          >
                            {reserva.status}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">Horário: {reserva.horario}</p>
                        <p className="text-sm">Cliente: {reserva.cliente}</p>
                        <p className="text-sm">Pessoas: {reserva.pessoas}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={() => setShowReservasDialog(true)}>
                      Ver Todas as Reservas
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>Nenhuma reserva para este dia</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog para bloquear data */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bloquear Data</DialogTitle>
            <DialogDescription>
              Bloqueie esta data para todos os tours. Datas bloqueadas não estarão disponíveis para reservas.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <div className="p-2 border rounded-md">
                {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione uma data"}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo</Label>
              <Input
                id="reason"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Ex: Feriado, Aniversário, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recurrent">Recorrente</Label>
              <Select value={blockRecurrent} onValueChange={setBlockRecurrent}>
                <SelectTrigger id="recurrent">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sim, todo ano</SelectItem>
                  <SelectItem value="false">Não, apenas este ano</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Datas recorrentes serão bloqueadas automaticamente todos os anos.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddBlockedDay}>Bloquear Data</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para ver todas as reservas do dia */}
      <Dialog open={showReservasDialog} onOpenChange={setShowReservasDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Reservas para {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ""}
            </DialogTitle>
            <DialogDescription>Visualize e gerencie todas as reservas para esta data.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {date && hasReservas(date) ? (
              <div className="space-y-4">
                {getReservasByDate(date).map((reserva) => (
                  <Card key={reserva.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{reserva.titulo}</CardTitle>
                        <Badge
                          variant={
                            reserva.status === "confirmada"
                              ? "default"
                              : reserva.status === "pendente"
                                ? "outline"
                                : reserva.status === "cancelada"
                                  ? "destructive"
                                  : "secondary"
                          }
                        >
                          {reserva.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Horário</p>
                          <p>{reserva.horario}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                          <p>{reserva.cliente}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Pessoas</p>
                          <p>{reserva.pessoas}</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                        <Button size="sm">Gerenciar</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma reserva encontrada para esta data.</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowReservasDialog(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

