"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, MapPin, Star, Users, Heart, Share2, Check, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DisponibilidadModal } from "@/components/experiences/DisponibilidadModal"
import { ImageCarousel } from "@/components/experiences/ImageCarousel"
import { ReviewCard } from "@/components/experiences/ReviewCard"
import { GuidePreviewCard } from "@/components/experiences/GuidePreviewCard"
import { BookingCard } from "@/components/experiences/BookingCard"

// Dados de exemplo da experiência
const tourData = {
  id: "1",
  title: "Chichen Itza, Cenote e Valladolid - Tour Completo",
  description:
    "Explore as ruínas maias de Chichen Itza, uma das Sete Maravilhas do Mundo Moderno, nade em um cenote cristalino e descubra a charmosa cidade colonial de Valladolid neste tour completo saindo de Cancún.",
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  price: 1800.0,
  originalPrice: 2100.0,
  rating: 4.9,
  reviewCount: 4150,
  duration: "12 horas",
  location: "Cancún, México",
  meetingPoint: "Lobby do seu hotel em Cancún ou Riviera Maya",
  meetingPointCoordinates: { lat: 21.161908, lng: -86.8515279 },
  languages: ["Português", "Inglês", "Espanhol"],
  groupSize: "Até 15 pessoas",
  inclusions: [
    "Transporte em van com ar condicionado",
    "Guia bilíngue certificado",
    "Entrada para Chichen Itza",
    "Almoço buffet",
    "Água mineral ilimitada",
    "Tempo para nadar no cenote",
    "Visita guiada a Valladolid",
  ],
  exclusions: [
    "Gorjetas (opcionais)",
    "Bebidas alcoólicas",
    "Souvenirs e despesas pessoais",
    "Taxa de uso de câmera em Chichen Itza (45 pesos)",
  ],
  itinerary: [
    {
      time: "7:00 - 8:00",
      title: "Saída de Cancún",
      description: "Busca no hotel e saída em direção a Chichen Itza.",
    },
    {
      time: "10:30 - 13:00",
      title: "Chichen Itza",
      description:
        "Visita guiada às ruínas de Chichen Itza, incluindo a Pirâmide de Kukulcán, o Observatório, o Templo dos Guerreiros e o campo de jogos de bola.",
    },
    {
      time: "13:30 - 14:30",
      title: "Almoço",
      description: "Almoço buffet com pratos típicos da região.",
    },
    {
      time: "15:00 - 16:00",
      title: "Cenote",
      description: "Visita a um cenote sagrado com tempo para nadar nas águas cristalinas.",
    },
    {
      time: "16:30 - 17:30",
      title: "Valladolid",
      description:
        "Passeio pela cidade colonial de Valladolid, com visita à praça principal e tempo livre para compras.",
    },
    {
      time: "19:00 - 20:00",
      title: "Retorno a Cancún",
      description: "Chegada aos hotéis em Cancún e Riviera Maya.",
    },
  ],
  availableDates: [
    { date: "2023-07-15", available: true },
    { date: "2023-07-16", available: true },
    { date: "2023-07-17", available: true },
    { date: "2023-07-18", available: false },
    { date: "2023-07-19", available: true },
    { date: "2023-07-20", available: true },
    { date: "2023-07-21", available: false },
    { date: "2023-07-22", available: true },
  ],
  guides: [
    {
      id: "1",
      name: "Carlos Rodriguez",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviewCount: 320,
      languages: ["Português", "Inglês", "Espanhol"],
      specialties: ["História Maia", "Arqueologia", "Fotografia"],
      timeSlots: [
        "08:00 a.m.",
        "08:30 a.m.",
        "09:00 a.m.",
        "09:30 a.m.",
        "10:00 a.m.",
        "10:30 a.m.",
        "11:00 a.m.",
        "03:00 p.m.",
        "03:30 p.m.",
        "04:00 p.m.",
      ],
      description:
        "Arqueólogo de formação e guia há 15 anos. Especialista em história maia e conhecedor de todos os detalhes de Chichen Itza e outras ruínas da região.",
    },
    {
      id: "2",
      name: "Maria Gonzalez",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviewCount: 275,
      languages: ["Inglês", "Espanhol"],
      specialties: ["Cultura Local", "Gastronomia", "História"],
      timeSlots: [
        "12:00 p.m.",
        "12:30 p.m.",
        "01:00 p.m.",
        "01:30 p.m.",
        "02:00 p.m.",
        "04:30 p.m.",
        "05:00 p.m.",
        "05:30 p.m.",
        "06:00 p.m.",
        "06:30 p.m.",
      ],
      description:
        "Nascida e criada em Tulum, conheço todos os segredos da região. Adoro compartilhar a cultura maia e mostrar os lugares mais incríveis da península de Yucatán.",
    },
  ],
  reviews: [
    {
      id: "1",
      user: "João Silva",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "Junho 2023",
      comment:
        "Experiência incrível! O guia Carlos foi muito atencioso e conhecedor. Chichen Itza é impressionante e o cenote foi refrescante. Recomendo!",
    },
    {
      id: "2",
      user: "Ana Martins",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      date: "Maio 2023",
      comment: "Tour muito bom, mas achei o tempo em Valladolid um pouco curto. De resto, tudo perfeito!",
    },
    {
      id: "3",
      user: "Pedro Costa",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "Abril 2023",
      comment:
        "Vale cada centavo! A Maria foi uma guia excelente, muito simpática e com um conhecimento impressionante sobre a cultura maia.",
    },
  ],
  cancellationPolicy: {
    freeCancellation: true,
    freeCancellationPeriod: "até 24 horas antes",
    partialRefund: "50% até 12 horas antes",
    noRefund: "menos de 12 horas antes",
  },
  recentBookings: 18,
  recentViews: 42,
  availableSpots: 5,
  paymentOptions: {
    installments: 10,
    acceptedCards: ["Visa", "Mastercard", "American Express"],
  },
}

export default function ExperiencePage({ params }) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  // Estado para controlar o modal de disponibilidade
  const [isDisponibilidadOpen, setIsDisponibilidadOpen] = useState(false)

  // Estados para armazenar as seleções do usuário
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 3, 16)) // 16 de abril de 2025
  const [selectedParticipants, setSelectedParticipants] = useState({
    adults: 2,
    teens: 1,
    children: 1,
  })
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)

  // Verificar se é mobile ou desktop
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Função para iniciar o fluxo de reserva
  const handleStartBooking = () => {
    setIsDisponibilidadOpen(true)
  }

  // Handler para a seleção de guia e horário
  const handleGuideSelection = ({ guide, timeSlot, date, participants }) => {
    setSelectedGuide(guide)
    setSelectedTimeSlot(timeSlot)

    if (date) setSelectedDate(date)
    if (participants) setSelectedParticipants(participants)

    // Redirecionar para a página de checkout/summary
    router.push(`/checkout/summary?experienceId=${tourData.id}`)
  }

  // Calcular desconto
  const discountPercentage = tourData.originalPrice
    ? Math.round(((tourData.originalPrice - tourData.price) / tourData.originalPrice) * 100)
    : 0

  return (
    <div className="pb-24 lg:pb-0">
      {/* Carrossel de imagens */}
      <div className="relative">
        <ImageCarousel images={tourData.images} />

        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white rounded-full"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white rounded-full"
            onClick={() => setIsSharing(!isSharing)}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Layout de duas colunas para desktop */}
      <div className="lg:flex lg:gap-8 lg:px-8 lg:py-8">
        {/* Coluna principal de conteúdo */}
        <div className="lg:w-2/3 px-4 py-6 lg:p-0">
          {/* Cabeçalho */}
          <div className="mb-6">
            {discountPercentage > 0 && <Badge className="bg-red-500 text-white mb-2">{discountPercentage}% OFF</Badge>}

            <h1 className="text-2xl lg:text-3xl font-bold mb-2">{tourData.title}</h1>

            <div className="flex items-center mb-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-medium">{tourData.rating}</span>
              <span className="text-gray-500 ml-1">({tourData.reviewCount} avaliações)</span>
            </div>

            <div className="flex flex-wrap gap-y-2">
              <div className="flex items-center mr-4">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <span>{tourData.duration}</span>
              </div>
              <div className="flex items-center mr-4">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                <span>{tourData.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500 mr-2" />
                <span>{tourData.groupSize}</span>
              </div>
            </div>
          </div>

          {/* Seção: Sobre esta experiência */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Sobre esta experiência</h2>
            <p className="text-gray-700">{tourData.description}</p>
          </section>

          <Separator className="my-6" />

          {/* Seção: Ponto de encontro */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Ponto de encontro</h2>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{tourData.meetingPoint}</p>
            </div>

            {/* Aqui poderia ser adicionado um mapa com as coordenadas */}
            <div className="mt-3 bg-gray-200 rounded-lg h-40 flex items-center justify-center">
              <span className="text-gray-500">Mapa do ponto de encontro</span>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Seção: Idiomas disponíveis */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Idiomas disponíveis</h2>
            <div className="flex flex-wrap gap-2">
              {tourData.languages.map((language, index) => (
                <Badge key={index} variant="outline" className="bg-gray-100 px-3 py-1">
                  {language}
                </Badge>
              ))}
            </div>
          </section>

          <Separator className="my-6" />

          {/* Seção: O que está incluído/não incluído */}
          <section className="mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">O que está incluído</h2>
              <ul className="space-y-2">
                {tourData.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">O que não está incluído</h2>
              <ul className="space-y-2">
                {tourData.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <XIcon className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Seção: Itinerário */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Itinerário do tour</h2>
            <div className="space-y-6">
              {tourData.itinerary.map((item, index) => (
                <div key={index} className="relative pl-8 pb-6">
                  {/* Linha vertical conectando os itens */}
                  {index < tourData.itinerary.length - 1 && (
                    <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-gray-200"></div>
                  )}

                  {/* Círculo marcador */}
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white">
                    {index + 1}
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">{item.time}</div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-6" />

          {/* Seção: Guias disponíveis */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Guias disponíveis</h2>
            <div className="space-y-4">
              {tourData.guides.map((guide) => (
                <GuidePreviewCard key={guide.id} guide={guide} />
              ))}
            </div>
          </section>

          <Separator className="my-6" />

          {/* Seção: Avaliações */}
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Avaliações</h2>
              <div className="flex items-center">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="text-2xl font-bold mr-2">{tourData.rating}</span>
                <span className="text-gray-500">({tourData.reviewCount} avaliações)</span>
              </div>
            </div>

            <div className="space-y-4">
              {tourData.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}

              <Button variant="outline" className="w-full">
                Ver todas as avaliações
              </Button>
            </div>
          </section>
        </div>

        {/* Coluna lateral com o box de reserva (apenas desktop) */}
        <div className="hidden lg:block lg:w-1/3">
          <div className="sticky top-8">
            <BookingCard tour={tourData} onBookNow={handleStartBooking} />
          </div>
        </div>
      </div>

      {/* Botão fixo na parte inferior (apenas mobile) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-between items-center z-20">
          <div>
            {tourData.originalPrice && (
              <p className="text-sm text-gray-500 line-through">R$ {tourData.originalPrice.toFixed(2)}</p>
            )}
            <div className="flex items-center">
              <p className="text-2xl font-bold mr-2">R$ {tourData.price.toFixed(2)}</p>
              <span className="text-sm text-gray-500">por pessoa</span>
            </div>
          </div>
          <Button className="bg-black text-white hover:bg-black/90 px-6 py-6" onClick={handleStartBooking}>
            Ver disponibilidade
          </Button>
        </div>
      )}

      {/* Modal de disponibilidade */}
      <DisponibilidadModal
        isOpen={isDisponibilidadOpen}
        onClose={() => setIsDisponibilidadOpen(false)}
        onSelect={handleGuideSelection}
        guides={tourData.guides}
        selectedDate={selectedDate}
        participants={selectedParticipants}
        experience={tourData}
      />
    </div>
  )
}

