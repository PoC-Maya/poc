"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ParticipantsSelectionModal({
  isOpen,
  onClose,
  onSelect,
  initialValues = { adults: 2, teens: 1, children: 1 },
}) {
  const [participants, setParticipants] = useState(initialValues)

  if (!isOpen) return null

  const handleParticipantChange = (type, increment) => {
    setParticipants((prev) => {
      const newValue = prev[type] + increment

      // Garantir que adultos sempre tenha pelo menos 1
      if (type === "adults" && newValue < 1) return prev

      // Garantir que teens e children não sejam negativos
      if (newValue < 0) return prev

      return {
        ...prev,
        [type]: newValue,
      }
    })
  }

  const handleSave = () => {
    onSelect(participants)
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <button onClick={onClose} className="text-2xl">
          &times;
        </button>
        <h2 className="text-xl font-semibold">Viajeros</h2>
        <div className="w-6"></div> {/* Espaçador para centralizar o título */}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-auto p-6">
        <p className="text-center text-gray-500 mb-8">Esta actividad permite un máximo de 15 viajeros.</p>

        <div className="space-y-8">
          {/* Adultos */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-medium">Adulto</p>
              <p className="text-gray-500">De 18 a 99 años</p>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => handleParticipantChange("adults", -1)}
                disabled={participants.adults <= 1}
              >
                -
              </Button>
              <span className="w-10 text-center text-xl">{participants.adults}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => handleParticipantChange("adults", 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Adolescentes */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-medium">Adolescente</p>
              <p className="text-gray-500">De 12 a 17 años</p>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => handleParticipantChange("teens", -1)}
                disabled={participants.teens <= 0}
              >
                -
              </Button>
              <span className="w-10 text-center text-xl">{participants.teens}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => handleParticipantChange("teens", 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Niño */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-medium">Niño</p>
              <p className="text-gray-500">De 4 a 11 años</p>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => handleParticipantChange("children", -1)}
                disabled={participants.children <= 0}
              >
                -
              </Button>
              <span className="w-10 text-center text-xl">{participants.children}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => handleParticipantChange("children", 1)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Button className="w-full bg-black text-white hover:bg-black/90" onClick={handleSave}>
          Guardar y continuar
        </Button>

        {/* Indicador de progresso */}
        <div className="w-1/3 h-1 bg-black mx-auto mt-4 rounded-full"></div>
      </div>
    </div>
  )
}

