"use client"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Calendar, Clock, Users, MapPin, Share2, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Dados de exemplo
const confirmationData = {
  id: "XPC-12345",
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
    phone: "+52 998 123 4567",
    email: "carlos@xploracancun.com",
  },
  date: "15 de julho de 2023",
  time: "07:00",
  participants: {
    adults: 2,
    children: 1,
    infants: 0,
  },
  meetingPoint: "Lobby do seu hotel em Cancún ou Riviera Maya",
  total: 4050.0,
  paymentMethod: "Cartão de Crédito",
  bookingDate: "10 de julho de 2023",
}

export default function ConfirmationPage({ params }) {
  return (
    <div className="container py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Reserva Confirmada!</h1>
          <p className="text-muted-foreground">Sua reserva foi confirmada e o guia entrará em contato em breve.</p>
        </div>

        <div className="border rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold">Detalhes da Reserva</h2>
            <span className="text-sm text-muted-foreground">Código: {confirmationData.id}</span>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <Image
                src={confirmationData.experience.image || "/placeholder.svg"}
                alt={confirmationData.experience.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-medium">{confirmationData.experience.title}</h3>

              <div className="flex flex-col gap-1 mt-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{confirmationData.date}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>
                    {confirmationData.time} • {confirmationData.experience.duration}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{confirmationData.experience.location}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Ponto de Encontro</h3>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-primary mt-0.5" />
                <div>
                  <p>{confirmationData.meetingPoint}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    O guia entrará em contato para confirmar o horário exato de busca.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Participantes</h3>
              <div className="flex items-start">
                <Users className="w-5 h-5 mr-2 text-primary mt-0.5" />
                <div>
                  <p>
                    {confirmationData.participants.adults} adultos, {confirmationData.participants.children} crianças,{" "}
                    {confirmationData.participants.infants} bebês
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Informações do Guia</h3>
              <div className="flex gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={confirmationData.guide.image || "/placeholder.svg"}
                    alt={confirmationData.guide.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-medium">{confirmationData.guide.name}</p>
                  <p className="text-sm text-muted-foreground">{confirmationData.guide.phone}</p>
                  <p className="text-sm text-muted-foreground">{confirmationData.guide.email}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Pagamento</h3>
              <p>
                Total: <span className="font-bold">R$ {confirmationData.total.toLocaleString("pt-BR")}</span>
              </p>
              <p className="text-sm text-muted-foreground">Método: {confirmationData.paymentMethod}</p>
              <p className="text-sm text-muted-foreground">Data: {confirmationData.bookingDate}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Baixar Comprovante
          </Button>

          <Button variant="outline" className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Enviar por Email
          </Button>

          <Button variant="outline" className="flex items-center">
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>

        <div className="mt-8 text-center">
          <h3 className="font-medium mb-2">O que fazer agora?</h3>
          <p className="text-muted-foreground mb-4">
            Você receberá um email com todos os detalhes da sua reserva. O guia entrará em contato em breve para
            confirmar os detalhes.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
            <Link href="/">
              <Button variant="outline">Voltar para a Página Inicial</Button>
            </Link>

            <Link href="/experiences">
              <Button>Explorar Mais Experiências</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

