"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function DisponibilidadeDrawer({ isOpen, onClose, experienceId, experienceName }) {
  // Estado para armazenar a disponibilidade por dia da semana
  const [disponibilidade, setDisponibilidade] = useState([
    { dia: "Segunda", ativo: true, horaInicio: "09:00", horaFim: "17:00" },
    { dia: "Terça", ativo: true, horaInicio: "09:00", horaFim: "17:00" },
    { dia: "Quarta", ativo: true, horaInicio: "09:00", horaFim: "17:00" },
    { dia: "Quinta", ativo: true, horaInicio: "09:00", horaFim: "17:00" },
    { dia: "Sexta", ativo: true, horaInicio: "09:00", horaFim: "17:00" },
    { dia: "Sábado", ativo: false, horaInicio: "10:00", horaFim: "15:00" },
    { dia: "Domingo", ativo: false, horaInicio: "10:00", horaFim: "15:00" },
  ])

  // Função para atualizar o estado de ativo de um dia
  const toggleDiaAtivo = (index) => {
    const novaDisponibilidade = [...disponibilidade]
    novaDisponibilidade[index].ativo = !novaDisponibilidade[index].ativo
    setDisponibilidade(novaDisponibilidade)
  }

  // Função para atualizar a hora de início de um dia
  const atualizarHoraInicio = (index, valor) => {
    const novaDisponibilidade = [...disponibilidade]
    novaDisponibilidade[index].horaInicio = valor
    setDisponibilidade(novaDisponibilidade)
  }

  // Função para atualizar a hora de fim de um dia
  const atualizarHoraFim = (index, valor) => {
    const novaDisponibilidade = [...disponibilidade]
    novaDisponibilidade[index].horaFim = valor
    setDisponibilidade(novaDisponibilidade)
  }

  // Função para salvar as alterações
  const salvarDisponibilidade = () => {
    // Aqui você implementaria a lógica para salvar no backend
    console.log("Disponibilidade salva:", disponibilidade)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Gerenciar Disponibilidade</SheetTitle>
          <SheetDescription>
            Configure os dias e horários em que você está disponível para guiar {experienceName}.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Horário de Funcionamento</h3>

            <div className="space-y-4">
              {disponibilidade.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr_auto_1fr_1fr] gap-2 items-center">
                  <div className="flex items-center space-x-2">
                    <Switch id={`day-${index}`} checked={item.ativo} onCheckedChange={() => toggleDiaAtivo(index)} />
                    <Label htmlFor={`day-${index}`}>{item.dia}</Label>
                  </div>
                  <span className="text-center">Das</span>
                  <Select
                    value={item.horaInicio}
                    onValueChange={(valor) => atualizarHoraInicio(index, valor)}
                    disabled={!item.ativo}
                  >
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
                  <Select
                    value={item.horaFim}
                    onValueChange={(valor) => atualizarHoraFim(index, valor)}
                    disabled={!item.ativo}
                  >
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
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={salvarDisponibilidade}>Salvar alterações</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

