"use client"

import { useState, useEffect } from "react"
import { Calendar, ChevronDown, X, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DateSelectionDrawer } from "./DateSelectionDrawer"
import { TravelersSelectionDrawer } from "./TravelersSelectionDrawer"
import { BookingSummaryDrawer } from "./BookingSummaryDrawer"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Importar o novo componente GuideCard
import { GuideCard } from "./GuideCard"

export function DisponibilidadModal({
  isOpen,
  onClose,
  onSelect,
  guides = [],
  selectedDate: initialDate,
  participants: initialParticipants,
  experience,
}) {
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date(2025, 3, 16))
  const [participants, setParticipants] = useState(initialParticipants || { adults: 2, teens: 1, children: 1 })

  // Estados para controlar os drawers
  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false)
  const [isTravelersDrawerOpen, setIsTravelersDrawerOpen] = useState(false)
  const [isBookingSummaryOpen, setIsBookingSummaryOpen] = useState(false)

  // Resetar seleções quando o modal é fechado
  useEffect(() => {
    if (!isOpen) {
      setSelectedGuide(null)
      setSelectedTimeSlot(null)
      setIsBookingSummaryOpen(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleTimeSlotSelect = (guide, timeSlot) => {
    setSelectedGuide(guide)
    setSelectedTimeSlot(timeSlot)
    // Não mostrar o resumo automaticamente, apenas armazenar a seleção
  }

  const handleShowSummary = () => {
    // Mostrar o resumo da reserva quando o usuário clicar no botão "Selecionar"
    if (selectedGuide && selectedTimeSlot) {
      setIsBookingSummaryOpen(true)
    }
  }

  const handleConfirm = () => {
    if (selectedGuide && selectedTimeSlot) {
      onSelect({
        guide: selectedGuide,
        timeSlot: selectedTimeSlot,
        date: selectedDate,
        participants: participants,
      })
      onClose()
    }
  }

  // Formatar a data para exibição
  const formattedDate = selectedDate
    ? format(selectedDate, "d MMMM", { locale: ptBR }).replace(" de ", " ")
    : "16 abril"

  // Calcular o total de participantes
  const totalParticipants = participants ? participants.adults + participants.teens + participants.children : 4

  // Criar objeto de reserva para o resumo
  const bookingData = {
    experience,
    date: new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      Number.parseInt(selectedTimeSlot?.split(":")[0]) || 0,
      Number.parseInt(selectedTimeSlot?.split(":")[1]) || 0,
    ),
    participants,
    guide: selectedGuide,
    timeSlot: selectedTimeSlot,
  }

  // Handlers para edição no resumo
  const handleEditDate = () => {
    setIsBookingSummaryOpen(false)
    setIsDateDrawerOpen(true)
  }

  const handleEditParticipants = () => {
    setIsBookingSummaryOpen(false)
    setIsTravelersDrawerOpen(true)
  }

  const handleEditGuide = () => {
    setIsBookingSummaryOpen(false)
  }

  // Se o resumo da reserva estiver aberto, mostrar apenas ele
  if (isBookingSummaryOpen) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="w-full md:w-1/3 h-full">
          <BookingSummaryDrawer
            isOpen={isBookingSummaryOpen}
            onClose={() => setIsBookingSummaryOpen(false)}
            onConfirm={handleConfirm}
            booking={bookingData}
            onEditDate={handleEditDate}
            onEditParticipants={handleEditParticipants}
            onEditGuide={handleEditGuide}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="bg-black/20 absolute inset-0" onClick={onClose}></div>
      <div className="w-full md:w-1/3 h-full bg-white flex flex-col relative z-10">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <button onClick={onClose} className="text-2xl">
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold">Disponibilidad</h2>
          <div className="w-6"></div> {/* Espaçador para centralizar o título */}
        </div>

        {/* Filtros fixos */}
        <div className="p-4 flex gap-4">
          <button
            className="flex-1 border-2 rounded-full h-[50px] flex items-center justify-between px-4"
            onClick={() => setIsDateDrawerOpen(true)}
          >
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-gray-500" />
              <span className="text-lg">{formattedDate}</span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </button>

          <button
            className="flex-1 border-2 rounded-full h-[50px] flex items-center justify-between px-4"
            onClick={() => setIsTravelersDrawerOpen(true)}
          >
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-3 text-gray-500" />
              <span className="text-lg">{totalParticipants} viajantes</span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Lista de guias com scroll */}
        <div className="flex-1 overflow-auto p-4">
          <h3 className="text-xl font-bold mb-4">{guides.length} guias disponibles</h3>

          <div className="space-y-6">
            {guides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                selectedTimeSlot={selectedGuide?.id === guide.id ? selectedTimeSlot : null}
                onSelectTimeSlot={(timeSlot) => handleTimeSlotSelect(guide, timeSlot)}
              />
            ))}
          </div>
        </div>

        {/* Footer fixo */}
        <div className="border-t p-4 bg-white">
          <Button
            className="w-full bg-black text-white hover:bg-black/90 py-6"
            onClick={handleShowSummary}
            disabled={!selectedGuide || !selectedTimeSlot}
          >
            Seleccionar
          </Button>

          {/* Indicador de progresso */}
          <div className="w-1/3 h-1 bg-black mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      {/* Drawers */}
      {isDateDrawerOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="bg-black/20 absolute inset-0" onClick={() => setIsDateDrawerOpen(false)}></div>
          <div className="w-full md:w-1/3 h-full relative z-10">
            <DateSelectionDrawer
              isOpen={isDateDrawerOpen}
              onClose={() => setIsDateDrawerOpen(false)}
              onSelect={(date) => setSelectedDate(date)}
            />
          </div>
        </div>
      )}

      {isTravelersDrawerOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="bg-black/20 absolute inset-0" onClick={() => setIsTravelersDrawerOpen(false)}></div>
          <div className="w-full md:w-1/3 h-full relative z-10">
            <TravelersSelectionDrawer
              isOpen={isTravelersDrawerOpen}
              onClose={() => setIsTravelersDrawerOpen(false)}
              onSelect={(newParticipants) => setParticipants(newParticipants)}
              initialValues={participants}
            />
          </div>
        </div>
      )}
    </div>
  )
}

