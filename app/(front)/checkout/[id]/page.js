"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Calendar,
  Clock,
  Users,
  MapPin,
  CreditCard,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Dados de exemplo
const bookingData = {
  id: "checkout-123",
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
    children: 1,
    infants: 0,
  },
  meetingPoint: "Lobby do seu hotel em Cancún ou Riviera Maya",
  priceDetails: {
    basePrice: 1800.0,
    adults: 2,
    adultPrice: 1800.0,
    children: 1,
    childPrice: 900.0,
    infants: 0,
    infantPrice: 0,
    subtotal: 4500.0,
    discount: 450.0,
    total: 4050.0,
  },
}

export default function CheckoutPage({ params }) {
  const [step, setStep] = useState(1)
  const [showPriceDetails, setShowPriceDetails] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Redirecionar para a página de confirmação
      window.location.href = `/checkout/${params.id}/confirmation`
    }
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
          href={`/experiences/${bookingData.experience.id}`}
          className="text-muted-foreground hover:text-foreground truncate max-w-[200px]"
        >
          {bookingData.experience.title}
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
        <span className="text-foreground">Checkout</span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-6">Finalizar Reserva</h1>

      {/* Progresso */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2 z-0"></div>

        <div className="flex flex-col items-center relative z-10">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            1
          </div>
          <span className="text-sm mt-1">Detalhes</span>
        </div>

        <div className="flex flex-col items-center relative z-10">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            2
          </div>
          <span className="text-sm mt-1">Participantes</span>
        </div>

        <div className="flex flex-col items-center relative z-10">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            3
          </div>
          <span className="text-sm mt-1">Pagamento</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Etapa 1: Detalhes da Reserva */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Detalhes da Experiência</h2>

                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={bookingData.experience.image || "/placeholder.svg"}
                      alt={bookingData.experience.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{bookingData.experience.title}</h3>

                    <div className="flex flex-col gap-1 mt-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{bookingData.date}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>
                          {bookingData.time} • {bookingData.experience.duration}
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{bookingData.experience.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={bookingData.guide.image || "/placeholder.svg"}
                      alt={bookingData.guide.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-medium">Guia: {bookingData.guide.name}</h3>
                    <Link href={`/guides/${bookingData.guide.id}`} className="text-sm text-primary">
                      Ver perfil do guia
                    </Link>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Ponto de Encontro</h2>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p>{bookingData.meetingPoint}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      O guia entrará em contato para confirmar o horário exato de busca.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Informações de Contato</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome completo" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="+55 (00) 00000-0000" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="hotel">Hotel (opcional)</Label>
                    <Input id="hotel" placeholder="Nome do seu hotel" className="mt-1" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Etapa 2: Participantes */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Participantes</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Adultos</h3>
                      <p className="text-sm text-muted-foreground">A partir de 13 anos</p>
                    </div>

                    <div className="flex items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        -
                      </Button>
                      <span className="mx-3 min-w-[20px] text-center">{bookingData.participants.adults}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        +
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Crianças</h3>
                      <p className="text-sm text-muted-foreground">De 3 a 12 anos</p>
                    </div>

                    <div className="flex items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        -
                      </Button>
                      <span className="mx-3 min-w-[20px] text-center">{bookingData.participants.children}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        +
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Bebês</h3>
                      <p className="text-sm text-muted-foreground">Menores de 3 anos</p>
                    </div>

                    <div className="flex items-center">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        -
                      </Button>
                      <span className="mx-3 min-w-[20px] text-center">{bookingData.participants.infants}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Informações Adicionais</h2>

                <div>
                  <Label htmlFor="special-requests">Requisitos Especiais (opcional)</Label>
                  <textarea
                    id="special-requests"
                    className="w-full min-h-[100px] p-3 border rounded-md mt-1"
                    placeholder="Informe quaisquer necessidades especiais, restrições alimentares ou outras informações importantes."
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Etapa 3: Pagamento */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Método de Pagamento</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Cartão de Crédito
                    </Label>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <div className="pl-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="card-name">Nome no Cartão</Label>
                          <Input id="card-name" placeholder="Nome como aparece no cartão" className="mt-1" />
                        </div>

                        <div>
                          <Label htmlFor="card-number">Número do Cartão</Label>
                          <Input id="card-number" placeholder="0000 0000 0000 0000" className="mt-1" />
                        </div>

                        <div>
                          <Label htmlFor="expiry">Data de Validade</Label>
                          <Input id="expiry" placeholder="MM/AA" className="mt-1" />
                        </div>

                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 mt-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix">PIX</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Política de Cancelamento</h2>
                <p className="text-muted-foreground">
                  Cancelamento gratuito até 48 horas antes. Após esse período, será cobrada uma taxa de 50% do valor
                  total. Não comparecimento ou cancelamento no dia da experiência não terá reembolso.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <input type="checkbox" id="terms" className="mr-2" />
                  <label htmlFor="terms">
                    Concordo com os{" "}
                    <Link href="/terms" className="text-primary">
                      Termos de Serviço
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacy" className="text-primary">
                      Política de Privacidade
                    </Link>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Voltar
              </Button>
            )}

            <Button onClick={handleContinue} className={step === 1 ? "ml-auto" : ""}>
              {step < 3 ? "Continuar" : "Finalizar Pagamento"}
            </Button>
          </div>
        </div>

        {/* Resumo da Reserva */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-4 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Resumo da Reserva</h2>

            <div className="flex gap-4 mb-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={bookingData.experience.image || "/placeholder.svg"}
                  alt={bookingData.experience.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-medium line-clamp-2">{bookingData.experience.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {bookingData.date} • {bookingData.time}
                </p>
              </div>
            </div>

            <Separator className="mb-4" />

            <div className="space-y-2 mb-4">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-primary" />
                <span>
                  {bookingData.participants.adults} adultos, {bookingData.participants.children} crianças,{" "}
                  {bookingData.participants.infants} bebês
                </span>
              </div>

              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span>{bookingData.experience.duration}</span>
              </div>

              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>{bookingData.experience.location}</span>
              </div>
            </div>

            <Separator className="mb-4" />

            <div>
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
                      R$ {bookingData.priceDetails.adultPrice.toLocaleString("pt-BR")} x{" "}
                      {bookingData.priceDetails.adults} adultos
                    </span>
                    <span>
                      R${" "}
                      {(bookingData.priceDetails.adultPrice * bookingData.priceDetails.adults).toLocaleString("pt-BR")}
                    </span>
                  </div>

                  {bookingData.priceDetails.children > 0 && (
                    <div className="flex justify-between">
                      <span>
                        R$ {bookingData.priceDetails.childPrice.toLocaleString("pt-BR")} x{" "}
                        {bookingData.priceDetails.children} crianças
                      </span>
                      <span>
                        R${" "}
                        {(bookingData.priceDetails.childPrice * bookingData.priceDetails.children).toLocaleString(
                          "pt-BR",
                        )}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span>R$ {bookingData.priceDetails.subtotal.toLocaleString("pt-BR")}</span>
                  </div>

                  {bookingData.priceDetails.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto (10%)</span>
                      <span>-R$ {bookingData.priceDetails.discount.toLocaleString("pt-BR")}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>R$ {bookingData.priceDetails.total.toLocaleString("pt-BR")}</span>
              </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}

