"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function CustomTourRequestForm({ open, onOpenChange, onSubmit, initialData = {} }) {
  const [date, setDate] = useState(initialData.date ? new Date(initialData.date) : undefined)
  const [duration, setDuration] = useState(initialData.duration || "")
  const [participants, setParticipants] = useState(initialData.participants || "")
  const [location, setLocation] = useState(initialData.location || "")
  const [description, setDescription] = useState(initialData.description || "")
  const [preferences, setPreferences] = useState(initialData.preferences || "")

  const handleSubmit = () => {
    const requestData = {
      date,
      duration,
      participants,
      location,
      description,
      preferences,
    }

    onSubmit(requestData)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-1">
          <SheetTitle>Solicitar Tour Personalizado</SheetTitle>
          <SheetDescription>Preencha os detalhes para solicitar um tour personalizado com o guia.</SheetDescription>
        </SheetHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date">Data (opcional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ptBR} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duração (opcional)</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a duração" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 horas</SelectItem>
                <SelectItem value="6">6 horas</SelectItem>
                <SelectItem value="8">8 horas</SelectItem>
                <SelectItem value="10">10 horas</SelectItem>
                <SelectItem value="12">12 horas</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">Número de Participantes (opcional)</Label>
            <Select value={participants} onValueChange={setParticipants}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o número de pessoas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 pessoa</SelectItem>
                <SelectItem value="2">2 pessoas</SelectItem>
                <SelectItem value="3">3 pessoas</SelectItem>
                <SelectItem value="4">4 pessoas</SelectItem>
                <SelectItem value="5">5 pessoas</SelectItem>
                <SelectItem value="6">6 pessoas</SelectItem>
                <SelectItem value="7-10">7-10 pessoas</SelectItem>
                <SelectItem value="11+">11+ pessoas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Local de Interesse (opcional)</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o local" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cancún">Cancún</SelectItem>
                <SelectItem value="Tulum">Tulum</SelectItem>
                <SelectItem value="Playa del Carmen">Playa del Carmen</SelectItem>
                <SelectItem value="Isla Mujeres">Isla Mujeres</SelectItem>
                <SelectItem value="Chichen Itza">Chichen Itza</SelectItem>
                <SelectItem value="Coba">Coba</SelectItem>
                <SelectItem value="Cenotes">Cenotes</SelectItem>
                <SelectItem value="Outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição do Tour</Label>
            <Textarea
              id="description"
              placeholder="Descreva o tipo de tour que você está procurando..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences">Preferências Adicionais (opcional)</Label>
            <Textarea
              id="preferences"
              placeholder="Informe quaisquer preferências específicas, restrições alimentares, necessidades de acessibilidade, etc."
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <SheetFooter>
          <Button onClick={handleSubmit}>Enviar Solicitação</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

