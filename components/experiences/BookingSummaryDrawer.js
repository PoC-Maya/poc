"use client"

import { Clock, Users, User, Pencil, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function BookingSummaryDrawer({
  isOpen,
  onClose,
  onConfirm,
  booking,
  onEditDate,
  onEditParticipants,
  onEditGuide,
}) {
  if (!isOpen || !booking) return null

  const { experience, date, participants, guide, timeSlot } = booking

  // Formatar a data para exibição
  const formattedDate = date ? format(date, "EEEE, d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR }) : ""

  // Calcular o preço total
  const adultPrice = 1800 // R$ 1.800 por adulto
  const teenPrice = 1200 // R$ 1.200 por adolescente
  const childPrice = 0 // Crianças não pagam

  const adultTotal = participants.adults * adultPrice
  const teenTotal = participants.teens * teenPrice
  const childTotal = participants.children * childPrice
  const totalPrice = adultTotal + teenTotal + childTotal

  // Formatar valores para exibição
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <button onClick={onClose} className="text-2xl">
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold">Resumo da reserva</h2>
        <div className="w-6"></div> {/* Espaçador para centralizar o título */}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-8">
          {/* Data e Horário */}
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <Clock className="w-6 h-6 mr-4 mt-1 text-black" />
              <div>
                <p className="text-xl font-bold">Data e Horário</p>
                <p className="text-gray-600 text-lg mt-1">{formattedDate}</p>
              </div>
            </div>
            <button onClick={onEditDate} className="text-gray-500">
              <Pencil className="h-5 w-5" />
            </button>
          </div>

          {/* Participantes */}
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <Users className="w-6 h-6 mr-4 mt-1 text-black" />
              <div className="flex-1">
                <p className="text-xl font-bold">Participantes</p>
                <div className="mt-1 space-y-1 w-full">
                  {participants.adults > 0 && (
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">
                        {participants.adults} {participants.adults === 1 ? "adulto" : "adultos"}
                      </span>
                      <span className="text-gray-600">{formatCurrency(adultTotal)}</span>
                    </div>
                  )}
                  {participants.teens > 0 && (
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">
                        {participants.teens} {participants.teens === 1 ? "adolescente" : "adolescentes"}
                      </span>
                      <span className="text-gray-600">{formatCurrency(teenTotal)}</span>
                    </div>
                  )}
                  {participants.children > 0 && (
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">
                        {participants.children} {participants.children === 1 ? "criança" : "crianças"}
                      </span>
                      <span className="text-gray-600">Gratis</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button onClick={onEditParticipants} className="text-gray-500">
              <Pencil className="h-5 w-5" />
            </button>
          </div>

          {/* Guia */}
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <User className="w-6 h-6 mr-4 mt-1 text-black" />
              <div>
                <p className="text-xl font-bold">Guia</p>
                <div className="flex items-center mt-1">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-200">
                    <Image
                      src={guide?.image || "/placeholder.svg?height=100&width=100"}
                      alt={guide?.name || "Guia"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-600 text-lg">{guide?.name}</p>
                </div>
              </div>
            </div>
            <button onClick={onEditGuide} className="text-gray-500">
              <Pencil className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="border-t my-8 pt-6 flex justify-between items-center">
          <span className="text-2xl font-bold">Total</span>
          <span className="text-2xl font-bold">{formatCurrency(totalPrice)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Button
          className="w-full bg-black text-white hover:bg-black/90 py-6 text-lg"
          onClick={() => {
            // Chamar onConfirm (que vai redirecionar para checkout/summary)
            onConfirm()
          }}
        >
          Prosseguir para reserva
        </Button>
      </div>
    </div>
  )
}

