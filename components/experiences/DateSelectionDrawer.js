"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, addMonths, subMonths, isSameDay } from "date-fns"
import { ptBR } from "date-fns/locale"

export function DateSelectionDrawer({ isOpen, onClose, onSelect, availableDates = [] }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2)) // Março 2025

  if (!isOpen) return null

  // Função para navegar para o mês anterior
  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => subMonths(prevMonth, 1))
  }

  // Função para navegar para o próximo mês
  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1))
  }

  // Determinar o primeiro dia do mês e o número de dias
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  // Dias da semana
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"]

  // Determinar o nome do mês
  const monthName = format(currentMonth, "MMMM yyyy", { locale: ptBR })

  // Próximo mês
  const nextMonth = addMonths(currentMonth, 1)
  const nextMonthName = format(nextMonth, "MMMM yyyy", { locale: ptBR })

  // Simular dias disponíveis
  const availableDaysCurrentMonth = [28]
  const availableDaysNextMonth = [16]

  // Simular dias desabilitados (por exemplo, dias passados ou sem disponibilidade)
  const disabledDays = Array.from({ length: 20 }, (_, i) => i + 1)

  const handleDateClick = (day, month) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + month, day)
    setSelectedDate(newDate)
  }

  const handleConfirm = () => {
    if (selectedDate) {
      onSelect(selectedDate)
      onClose()
    }
  }

  // Verificar se uma data está disponível
  const isDateAvailable = (day, monthOffset) => {
    if (monthOffset === 0) {
      return availableDaysCurrentMonth.includes(day)
    } else {
      return availableDaysNextMonth.includes(day)
    }
  }

  // Verificar se uma data está selecionada
  const isDateSelected = (day, monthOffset) => {
    if (!selectedDate) return false

    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day)

    return isSameDay(selectedDate, dateToCheck)
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <button onClick={onClose} className="text-2xl">
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold">Seleccione una fecha</h2>
        <div className="w-6"></div> {/* Espaçador para centralizar o título */}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-auto p-4">
        {/* Dias da semana */}
        <div className="grid grid-cols-7 text-center mb-4 bg-gray-50 py-4">
          {weekDays.map((day, index) => (
            <div key={index} className="text-gray-500 font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Navegação do mês atual */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{monthName}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendário do mês atual */}
        <div className="grid grid-cols-7 gap-4 mb-8">
          {/* Espaços vazios para alinhar com o dia da semana */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-10 w-10"></div>
          ))}

          {/* Dias do mês */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1
            const isAvailable = isDateAvailable(day, 0)
            const isDisabled = disabledDays.includes(day) && !isAvailable
            const isSelected = isDateSelected(day, 0)

            return (
              <button
                key={`current-${day}`}
                className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto
                  ${isDisabled ? "text-gray-300" : ""}
                  ${isSelected ? "bg-black text-white" : ""}
                  ${isAvailable && !isSelected ? "bg-teal-600 text-white" : ""}
                `}
                disabled={isDisabled && !isAvailable}
                onClick={() => handleDateClick(day, 0)}
              >
                {day}
              </button>
            )
          })}
        </div>

        {/* Próximo mês */}
        <h3 className="text-2xl font-bold mb-4">{nextMonthName}</h3>

        {/* Calendário do próximo mês */}
        <div className="grid grid-cols-7 gap-4">
          {/* Calcular o primeiro dia do próximo mês */}
          {Array.from({ length: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1).getDay() }).map(
            (_, index) => (
              <div key={`empty-next-${index}`} className="h-10 w-10"></div>
            ),
          )}

          {/* Primeiros dias do próximo mês */}
          {Array.from({ length: 19 }).map((_, index) => {
            const day = index + 1
            const isAvailable = isDateAvailable(day, 1)
            const isSelected = isDateSelected(day, 1)

            return (
              <button
                key={`next-${day}`}
                className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto
                  ${isSelected ? "bg-black text-white" : ""}
                  ${isAvailable && !isSelected ? "bg-teal-600 text-white" : ""}
                `}
                onClick={() => handleDateClick(day, 1)}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Button
          className="w-full bg-black text-white hover:bg-black/90 py-6"
          onClick={handleConfirm}
          disabled={!selectedDate}
        >
          Continuar
        </Button>

        {/* Indicador de progresso */}
        <div className="w-1/3 h-1 bg-black mx-auto mt-4 rounded-full"></div>
      </div>
    </div>
  )
}

