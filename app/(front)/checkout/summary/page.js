"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// Dados de exemplo para a página de resumo
const bookingSummary = {
  id: "booking-123",
  experience: {
    id: "1",
    title: "Chichen Itza, Cenote e Valladolid - Tour Completo",
    image: "/placeholder.svg?height=400&width=600",
    price: 1800.0,
    duration: "12 horas",
    location: "Cancún, México",
  },
  guide: {
    id: "1",
    name: "Carlos Rodriguez",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviewCount: 320,
  },
  date: "15 de julho de 2023",
  time: "07:00",
  participants: {
    adults: 2,
    teens: 1,
    children: 0,
  },
  meetingPoint: "Lobby do seu hotel em Cancún ou Riviera Maya",
  priceDetails: {
    basePrice: 1800.0,
    adults: 2,
    adultPrice: 1800.0,
    teens: 1,
    teenPrice: 1350.0,
    children: 0,
    childPrice: 900.0,
    subtotal: 4950.0,
    discount: 495.0,
    total: 4455.0,
  },
}

export default function CheckoutSummaryPage() {
  const [showPriceDetails, setShowPriceDetails] = useState(false)
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulação de processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Redirecionar para a página de confirmação após o pagamento bem-sucedido
      setTimeout(() => {
        window.location.href = `/checkout/confirmation/${bookingSummary.id}`
      }, 2000)
    }, 3000)
  }

  return (
    <div className="container py-6 md:py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-4">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Início
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
        <Link href="/experiences" className="text-muted-foreground hover:text-foreground">
          Experiências
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
        <Link
          href={`/experiences/${bookingSummary.experience.id}`}
          className="text-muted-foreground hover:text-foreground truncate max-w-[200px]"
        >
          {bookingSummary.experience.title}
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
        <span className="text-foreground">Resumo da Compra</span>
      </div>

      <div className="flex items-center mb-6">
        <Link href={`/experiences/${bookingSummary.experience.id}`} className="mr-2">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Resumo da Reserva</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Detalhes da Experiência */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Detalhes da Experiência</h2>

            <div className="flex gap-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <Image
                  src={bookingSummary.experience.image || "/placeholder.svg"}
                  alt={bookingSummary.experience.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{bookingSummary.experience.title}</h3>

                <div className="flex flex-col gap-1 mt-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{bookingSummary.date}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>
                      {bookingSummary.time} • {bookingSummary.experience.duration}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{bookingSummary.experience.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={bookingSummary.guide.image || "/placeholder.svg"}
                  alt={bookingSummary.guide.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-medium">Guia: {bookingSummary.guide.name}</h3>
                <Link href={`/guides/${bookingSummary.guide.id}`} className="text-sm text-primary">
                  Ver perfil do guia
                </Link>
              </div>
            </div>
          </div>

          {/* Participantes */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Participantes</h2>

            <div className="space-y-3">
              {bookingSummary.participants.adults > 0 && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      {bookingSummary.participants.adults}
                    </Badge>
                    <span>Adultos</span>
                  </div>
                  <span className="font-medium">
                    R${" "}
                    {(bookingSummary.priceDetails.adultPrice * bookingSummary.participants.adults).toLocaleString(
                      "pt-BR",
                    )}
                  </span>
                </div>
              )}

              {bookingSummary.participants.teens > 0 && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      {bookingSummary.participants.teens}
                    </Badge>
                    <span>Adolescentes</span>
                  </div>
                  <span className="font-medium">
                    R${" "}
                    {(bookingSummary.priceDetails.teenPrice * bookingSummary.participants.teens).toLocaleString(
                      "pt-BR",
                    )}
                  </span>
                </div>
              )}

              {bookingSummary.participants.children > 0 && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      {bookingSummary.participants.children}
                    </Badge>
                    <span>Crianças</span>
                  </div>
                  <span className="font-medium">
                    R${" "}
                    {(bookingSummary.priceDetails.childPrice * bookingSummary.participants.children).toLocaleString(
                      "pt-BR",
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Ponto de Encontro */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Ponto de Encontro</h2>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 text-primary mt-0.5" />
              <div>
                <p>{bookingSummary.meetingPoint}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  O guia entrará em contato para confirmar o horário exato de busca.
                </p>
              </div>
            </div>
          </div>

          {/* Política de Cancelamento */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Política de Cancelamento</h2>
            <p className="text-muted-foreground">
              Cancelamento gratuito até 48 horas antes. Após esse período, será cobrada uma taxa de 50% do valor total.
              Não comparecimento ou cancelamento no dia da experiência não terá reembolso.
            </p>
          </div>

          {/* Botão de Pagamento */}
          <Button size="lg" className="w-full" onClick={() => setIsPaymentDrawerOpen(true)}>
            Finalizar Pagamento
          </Button>
        </div>

        {/* Resumo de Preços */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-4 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Resumo de Preços</h2>

            <button
              className="flex items-center justify-between w-full text-left mb-4"
              onClick={() => setShowPriceDetails(!showPriceDetails)}
            >
              <span className="font-medium">Detalhes do Preço</span>
              {showPriceDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {showPriceDetails && (
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span>
                    R$ {bookingSummary.priceDetails.adultPrice.toLocaleString("pt-BR")} x{" "}
                    {bookingSummary.participants.adults} adultos
                  </span>
                  <span>
                    R${" "}
                    {(bookingSummary.priceDetails.adultPrice * bookingSummary.participants.adults).toLocaleString(
                      "pt-BR",
                    )}
                  </span>
                </div>

                {bookingSummary.participants.teens > 0 && (
                  <div className="flex justify-between">
                    <span>
                      R$ {bookingSummary.priceDetails.teenPrice.toLocaleString("pt-BR")} x{" "}
                      {bookingSummary.participants.teens} adolescentes
                    </span>
                    <span>
                      R${" "}
                      {(bookingSummary.priceDetails.teenPrice * bookingSummary.participants.teens).toLocaleString(
                        "pt-BR",
                      )}
                    </span>
                  </div>
                )}

                {bookingSummary.participants.children > 0 && (
                  <div className="flex justify-between">
                    <span>
                      R$ {bookingSummary.priceDetails.childPrice.toLocaleString("pt-BR")} x{" "}
                      {bookingSummary.participants.children} crianças
                    </span>
                    <span>
                      R${" "}
                      {(bookingSummary.priceDetails.childPrice * bookingSummary.participants.children).toLocaleString(
                        "pt-BR",
                      )}
                    </span>
                  </div>
                )}

                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Subtotal</span>
                  <span>R$ {bookingSummary.priceDetails.subtotal.toLocaleString("pt-BR")}</span>
                </div>

                {bookingSummary.priceDetails.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto (10%)</span>
                    <span>-R$ {bookingSummary.priceDetails.discount.toLocaleString("pt-BR")}</span>
                  </div>
                )}
              </div>
            )}

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>R$ {bookingSummary.priceDetails.total.toLocaleString("pt-BR")}</span>
            </div>

            <div className="mt-4 bg-muted p-3 rounded-md">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 mt-0.5" />
                <p className="text-xs">
                  Você não será cobrado agora. O pagamento será processado apenas após a confirmação da reserva pelo
                  guia.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Métodos de Pagamento Aceitos</h3>
              <div className="flex space-x-2">
                <div className="border rounded p-2 w-12 h-8 flex items-center justify-center bg-white">
                  <Image src="/placeholder.svg?height=30&width=40&text=Visa" alt="Visa" width={40} height={30} />
                </div>
                <div className="border rounded p-2 w-12 h-8 flex items-center justify-center bg-white">
                  <Image src="/placeholder.svg?height=30&width=40&text=MC" alt="Mastercard" width={40} height={30} />
                </div>
                <div className="border rounded p-2 w-12 h-8 flex items-center justify-center bg-white">
                  <Image
                    src="/placeholder.svg?height=30&width=40&text=Amex"
                    alt="American Express"
                    width={40}
                    height={30}
                  />
                </div>
                <div className="border rounded p-2 w-12 h-8 flex items-center justify-center bg-white">
                  <Image src="/placeholder.svg?height=30&width=40&text=PIX" alt="PIX" width={40} height={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer de Pagamento */}
      <Sheet open={isPaymentDrawerOpen} onOpenChange={setIsPaymentDrawerOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Finalizar Pagamento</SheetTitle>
          </SheetHeader>

          <div className="py-6">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Selecione o método de pagamento</h3>

              <div className="space-y-3">
                <div
                  className={`border rounded-lg p-3 cursor-pointer ${paymentMethod === "credit-card" ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => setPaymentMethod("credit-card")}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border flex items-center justify-center mr-2">
                      {paymentMethod === "credit-card" && <div className="w-3 h-3 rounded-full bg-primary" />}
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      <span>Cartão de Crédito</span>
                    </div>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Número do Cartão</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-2 border rounded-md" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Validade</label>
                          <input type="text" placeholder="MM/AA" className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">CVV</label>
                          <input type="text" placeholder="123" className="w-full p-2 border rounded-md" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Nome no Cartão</label>
                        <input
                          type="text"
                          placeholder="Nome como aparece no cartão"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Parcelas</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>
                            1x de R$ {bookingSummary.priceDetails.total.toLocaleString("pt-BR")} (sem juros)
                          </option>
                          <option>
                            2x de R$ {(bookingSummary.priceDetails.total / 2).toLocaleString("pt-BR")} (sem juros)
                          </option>
                          <option>
                            3x de R$ {(bookingSummary.priceDetails.total / 3).toLocaleString("pt-BR")} (sem juros)
                          </option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={`border rounded-lg p-3 cursor-pointer ${paymentMethod === "pix" ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => setPaymentMethod("pix")}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border flex items-center justify-center mr-2">
                      {paymentMethod === "pix" && <div className="w-3 h-3 rounded-full bg-primary" />}
                    </div>
                    <span>PIX</span>
                  </div>

                  {paymentMethod === "pix" && (
                    <div className="mt-4 flex flex-col items-center">
                      <div className="border rounded-lg p-2 bg-white mb-3">
                        <Image
                          src="/placeholder.svg?height=200&width=200&text=QR+Code"
                          alt="QR Code PIX"
                          width={200}
                          height={200}
                        />
                      </div>
                      <p className="text-sm text-center text-muted-foreground mb-2">
                        Escaneie o QR Code com o aplicativo do seu banco
                      </p>
                      <Button variant="outline" size="sm">
                        Copiar código PIX
                      </Button>
                    </div>
                  )}
                </div>

                <div
                  className={`border rounded-lg p-3 cursor-pointer ${paymentMethod === "paypal" ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border flex items-center justify-center mr-2">
                      {paymentMethod === "paypal" && <div className="w-3 h-3 rounded-full bg-primary" />}
                    </div>
                    <span>PayPal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Total a pagar:</span>
                <span className="font-bold">R$ {bookingSummary.priceDetails.total.toLocaleString("pt-BR")}</span>
              </div>

              <Button className="w-full" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? "Processando..." : isSuccess ? "Pagamento Aprovado!" : "Pagar Agora"}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-3">
                Ao finalizar o pagamento, você concorda com nossos Termos de Serviço e Política de Privacidade.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

