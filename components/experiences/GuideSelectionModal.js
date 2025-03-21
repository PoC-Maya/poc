"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Users, ChevronDown } from "lucide-react"

export function GuideSelectionModal({ isOpen, onClose, onSelect, guides = [], selectedDate }) {
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)

  if (!isOpen) return null

  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide)
    setSelectedTimeSlot(null) // Resetar o horário selecionado ao trocar de guia
  }

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot)
  }

  const handleConfirm = () => {
    if (selectedGuide && selectedTimeSlot) {
      onSelect(selectedGuide, selectedTimeSlot)
    }
  }

  // Formatar a data para exibição
  const formattedDate = selectedDate ? "16 abril" : "Selecione uma data"

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <button onClick={onClose} className="text-2xl">
          &times;
        </button>
        <h2 className="text-xl font-semibold">Disponibilidad</h2>
        <div className="w-6"></div> {/* Espaçador para centralizar o título */}
      </div>

      {/* Filtros */}
      <div className="p-4 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Button variant="outline" className="flex justify-between w-full md:w-auto">
            <span className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {formattedDate}
            </span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>

          <Button variant="outline" className="flex justify-between w-full md:w-auto">
            <span className="flex items-center">
              <Users className="mr-2 h-4 w-4" />4 viajantes
            </span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Lista de guias */}
      <div className="flex-1 overflow-auto p-4">
        <h3 className="text-xl font-bold mb-4">12 guias disponibles</h3>

        <div className="space-y-6">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className={`bg-gray-100 rounded-lg overflow-hidden border ${
                selectedGuide?.id === guide.id ? "border-black" : "border-transparent"
              }`}
              onClick={() => handleGuideSelect(guide)}
            >
              <div className="relative h-48 w-full bg-gray-200">
                <Image src={guide.image || "/placeholder.svg"} alt={guide.name} fill className="object-cover" />
                <Badge className="absolute top-2 right-2 bg-white text-black">Verificado</Badge>
              </div>

              <div className="p-4">
                <h4 className="text-xl font-bold">{guide.name}</h4>

                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1">{guide.rating}</span>
                  <span className="text-gray-500 ml-1">({guide.reviewCount} avaliações)</span>
                </div>

                <p className="text-gray-600 mt-2 line-clamp-2">{guide.description}</p>

                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Idiomas: {guide.languages.join(", ")}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {guide.timeSlots.map((timeSlot, index) => (
                      <Button
                        key={`${guide.id}-${timeSlot}-${index}`}
                        variant={
                          selectedTimeSlot === timeSlot && selectedGuide?.id === guide.id ? "default" : "outline"
                        }
                        size="sm"
                        className={
                          selectedTimeSlot === timeSlot && selectedGuide?.id === guide.id ? "bg-black text-white" : ""
                        }
                        onClick={(e) => {
                          e.stopPropagation()
                          handleGuideSelect(guide)
                          handleTimeSlotSelect(timeSlot)
                        }}
                      >
                        {timeSlot}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Button
          className="w-full bg-black text-white hover:bg-black/90"
          onClick={handleConfirm}
          disabled={!selectedGuide || !selectedTimeSlot}
        >
          Seleccionar
        </Button>

        {/* Indicador de progresso */}
        <div className="w-1/3 h-1 bg-black mx-auto mt-4 rounded-full"></div>
      </div>
    </div>
  )
}

