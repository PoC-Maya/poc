"use client"

import { useState, useEffect } from "react"
import { Star, Shield, CreditCard, Calendar, Users, Clock, AlertCircle, Eye, TrendingUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export function BookingCard({ tour, onBookNow }) {
  // Estado para contador de visualizações (simulando aumento em tempo real)
  const [viewCount, setViewCount] = useState(tour.recentViews || 42)

  // Simular aumento de visualizações a cada 30-60 segundos
  useEffect(() => {
    const interval = setInterval(
      () => {
        setViewCount((prev) => prev + 1)
      },
      Math.random() * 30000 + 30000,
    ) // Entre 30 e 60 segundos

    return () => clearInterval(interval)
  }, [])

  // Formatar preço
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Calcular valor da parcela
  const installmentValue = tour.price / (tour.paymentOptions?.installments || 1)

  // Calcular desconto
  const discountPercentage = tour.originalPrice
    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
    : 0

  // Calcular ocupação (para barra de progresso)
  const occupancyPercentage = 100 - (tour.availableSpots / 15) * 100

  return (
    <div className="border rounded-xl shadow-lg overflow-hidden bg-white">
      {/* Cabeçalho com preço */}
      <div className="p-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium opacity-90">a partir de</h3>
            <div className="flex items-baseline">
              {tour.originalPrice && (
                <span className="text-lg line-through opacity-75 mr-2">{formatCurrency(tour.originalPrice)}</span>
              )}
              <span className="text-3xl font-bold">{formatCurrency(tour.price)}</span>
            </div>
            <p className="text-sm mt-1">por pessoa</p>
          </div>

          {discountPercentage > 0 && (
            <Badge className="bg-white text-teal-600 text-sm px-3 py-1">{discountPercentage}% OFF</Badge>
          )}
        </div>

        {tour.paymentOptions?.installments > 1 && (
          <p className="mt-2 text-sm bg-white/20 rounded-lg p-2 text-center">
            ou {tour.paymentOptions.installments}x de {formatCurrency(installmentValue)} sem juros
          </p>
        )}
      </div>

      {/* Corpo do card */}
      <div className="p-6">
        {/* Avaliações */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-medium">{tour.rating}</span>
            <span className="text-gray-500 ml-1">({tour.reviewCount})</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Eye className="w-4 h-4 mr-1" />
            <span>{viewCount} visualizações hoje</span>
          </div>
        </div>

        {/* Informações rápidas */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-3" />
            <span>Disponível todos os dias</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-500 mr-3" />
            <span>Duração: {tour.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 text-gray-500 mr-3" />
            <span>{tour.groupSize}</span>
          </div>
        </div>

        {/* Alerta de disponibilidade */}
        {tour.availableSpots <= 10 && (
          <div className="mb-6">
            <div className="flex items-center text-amber-600 mb-2">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">Últimas {tour.availableSpots} vagas disponíveis!</span>
            </div>
            <Progress value={occupancyPercentage} className="h-2" indicatorclassname="bg-amber-500" />
          </div>
        )}

        {/* Reservas recentes */}
        {tour.recentBookings > 0 && (
          <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-lg mb-6">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span>{tour.recentBookings} pessoas reservaram esta experiência nas últimas 24 horas</span>
          </div>
        )}

        {/* Botão de reserva */}
        <Button className="w-full bg-black text-white hover:bg-black/90 py-6 text-lg mb-4" onClick={onBookNow}>
          Ver disponibilidade
        </Button>

        {/* Política de cancelamento */}
        {tour.cancellationPolicy && (
          <div className="text-sm text-gray-600 mb-4">
            {tour.cancellationPolicy.freeCancellation && (
              <div className="flex items-start mb-2">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Cancelamento gratuito {tour.cancellationPolicy.freeCancellationPeriod}</span>
              </div>
            )}
            <div className="flex items-start text-xs text-gray-500">
              <AlertCircle className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                {tour.cancellationPolicy.partialRefund && `Reembolso de ${tour.cancellationPolicy.partialRefund}. `}
                Sem reembolso {tour.cancellationPolicy.noRefund}.
              </span>
            </div>
          </div>
        )}

        <Separator className="my-4" />

        {/* Garantias */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Shield className="w-4 h-4 text-teal-500 mr-2" />
            <span>Garantia de melhor preço</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CreditCard className="w-4 h-4 text-teal-500 mr-2" />
            <span>Pagamento seguro e criptografado</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 text-teal-500 mr-2" />
            <span>Guias locais certificados</span>
          </div>
        </div>
      </div>
    </div>
  )
}

