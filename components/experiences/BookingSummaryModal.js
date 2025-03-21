"use client"

import { Clock, User, Users, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function BookingSummaryModal({ isOpen, onClose, onConfirm, booking }) {
  if (!isOpen || !booking) return null

  const { experience, date, participants, guide, timeSlot } = booking

  // Calcular o total de participantes
  const totalParticipants = participants.adults + participants.teens + participants.children

  // Calcular o preço total (exemplo simples)
  const adultPrice = experience.price
  const teenPrice = experience.price * 0.7 // 70% do preço de adulto
  const childPrice = 0 // Crianças não pagam

  const totalPrice =
    participants.adults * adultPrice + participants.teens * teenPrice + participants.children * childPrice

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <button onClick={onClose} className="text-2xl">
          &times;
        </button>
        <h2 className="text-xl font-semibold">Resumo da reserva</h2>
        <div className="w-6"></div> {/* Espaçador para centralizar o título */}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6 mb-6">
          {/* Data e Horário */}
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <Clock className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Data e Horário</p>
                <p className="text-gray-600">
                  {date ? date.toLocaleDateString("pt-BR") : "Data não selecionada"} às{" "}
                  {timeSlot || "Horário não selecionado"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onClose()}>
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Participantes */}
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <Users className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Participantes</p>
                <div className="text-gray-600">
                  <div className="flex justify-between">
                    <span>{participants.adults} adultos</span>
                    <span className="ml-auto">R$ {(participants.adults * adultPrice).toFixed(2)}</span>
                  </div>
                  {participants.teens > 0 && (
                    <div className="flex justify-between">
                      <span>{participants.teens} adolescentes</span>
                      <span className="ml-auto">R$ {(participants.teens * teenPrice).toFixed(2)}</span>
                    </div>
                  )}
                  {participants.children > 0 && (
                    <div className="flex justify-between">
                      <span>{participants.children} crianças</span>
                      <span className="ml-auto">Gratis</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onClose()}>
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Guia */}
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <User className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Guia</p>
                <div className="flex items-center">
                  <div className="relative h-6 w-6 rounded-full overflow-hidden mr-2 bg-gray-200">
                    <Image
                      src={guide?.image || "/placeholder.svg?height=100&width=100"}
                      alt={guide?.name || "Guia"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-600">{guide?.name || "Guia não selecionado"}</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onClose()}>
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center font-bold text-xl mb-6">
          <span>Total</span>
          <span>R$ {totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Button className="w-full bg-black text-white hover:bg-black/90" onClick={onConfirm}>
          Prosseguir para reserva
        </Button>
      </div>
    </div>
  )
}

