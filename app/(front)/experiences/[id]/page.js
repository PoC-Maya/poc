"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Star,
  Users,
  Calendar,
  ChevronRight,
  Heart,
  Share2,
  CheckCircle,
  XCircle,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PhotoGalleryModal } from "@/components/experiences/photo-gallery-modal";
import { DateSelectionDrawer } from "@/components/experiences/date-selection-drawer";
import { ParticipantsSelectionDrawer } from "@/components/experiences/participants-selection-drawer";
import { GuideSelectionDrawer } from "@/components/experiences/guide-selection-drawer";
import { MeetingPointMap } from "@/components/experiences/meeting-point-map";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { useRouter } from "next/navigation";
// Dados de exemplo
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
      description:
        "Visita a um cenote sagrado com tempo para nadar nas águas cristalinas.",
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
    },
    {
      id: "2",
      name: "Maria Gonzalez",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviewCount: 275,
      languages: ["Inglês", "Espanhol"],
      specialties: ["Cultura Local", "Gastronomia", "História"],
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
      comment:
        "Tour muito bom, mas achei o tempo em Valladolid um pouco curto. De resto, tudo perfeito!",
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
};

const ExperienceCard = ({
  id,
  title,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  duration,
  location,
}) => (
  <Link
    href={`/experiences/${id}`}
    className="block border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
  >
    <div className="relative h-48 w-full">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="flex items-center mb-2">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
        <span className="text-sm font-medium">{rating}</span>
        <span className="text-xs text-muted-foreground ml-1">
          ({reviewCount})
        </span>
      </div>
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Clock className="w-4 h-4 mr-1" />
        <span>{duration}</span>
        <MapPin className="w-4 h-4 mx-2" />
        <span>{location}</span>
      </div>
      <div className="flex items-baseline">
        {originalPrice && (
          <span className="text-sm line-through text-muted-foreground mr-2">
            R$ {originalPrice.toLocaleString("pt-BR")}
          </span>
        )}
        <span className="text-xl font-bold">
          R$ {price.toLocaleString("pt-BR")}
        </span>
      </div>
    </div>
  </Link>
);

export default function ExperienceDetailPage({ params }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Estados para os drawers
  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const [isParticipantsDrawerOpen, setIsParticipantsDrawerOpen] =
    useState(false);
  const [isGuideDrawerOpen, setIsGuideDrawerOpen] = useState(false);

  // Estados para os dados selecionados
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState({
    adults: 1,
    teens: 0,
    children: 0,
  });
  const [selectedGuide, setSelectedGuide] = useState(null);

  const handleDateSelect = ({ date, time }) => {
    if (date && time) {
      setSelectedDate(date);
      setSelectedTime(time);
      console.log("Data selecionada:", date, "Horário:", time);
    }
  };

  const handleParticipantsSelect = (participants) => {
    setSelectedParticipants(participants);
  };

  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide);
  };

  const handleReservation = () => {
    // Aqui você pode redirecionar para a página de checkout com os dados selecionados
    const checkoutData = {
      tourId: tourData.id,
      date: selectedDate,
      time: selectedTime,
      participants: selectedParticipants,
      guideId: selectedGuide?.id,
    };

    console.log("Checkout data:", checkoutData);
    // Redirecionar para a página de checkout
    // router.push(`/checkout/${tourData.id}?data=${encodeURIComponent(JSON.stringify(checkoutData))}`)
    router.push(`/checkout/${tourData.id}`);
  };

  const isReservationComplete = selectedDate && selectedTime && selectedGuide;

  return (
    <div className="container py-6 md:py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-4">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Início
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
        <Link
          href="/experiences"
          className="text-muted-foreground hover:text-foreground"
        >
          Experiências
        </Link>
        <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
        <span className="text-foreground truncate max-w-[200px]">
          {tourData.title}
        </span>
      </div>

      {/* Título e Avaliações */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{tourData.title}</h1>
        <div className="flex items-center mt-2 md:mt-0">
          <div className="flex items-center mr-4">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-medium">{tourData.rating}</span>
            <span className="text-muted-foreground ml-1">
              ({tourData.reviewCount})
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Galeria de Imagens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          className="md:col-span-2 relative rounded-lg overflow-hidden h-[300px] md:h-[400px] cursor-pointer"
          onClick={() => setIsGalleryOpen(true)}
        >
          <Image
            src={tourData.images[selectedImage] || "/placeholder.svg"}
            alt={tourData.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="secondary">Ver todas as fotos</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {tourData.images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden h-[145px] md:h-[195px] cursor-pointer"
              onClick={() => {
                setSelectedImage(index);
                setIsGalleryOpen(true);
              }}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${tourData.title} - Imagem ${index + 1}`}
                fill
                className={`object-cover transition-opacity ${
                  selectedImage === index ? "opacity-100" : "opacity-80"
                }`}
              />
              {index === 3 && tourData.images.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                  +{tourData.images.length - 4} fotos
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Informações Principais e Reserva */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          {/* Informações Básicas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Duração</span>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 mr-1 text-primary" />
                <span>{tourData.duration}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Idiomas</span>
              <div className="flex items-center mt-1">
                <MessageSquare className="w-4 h-4 mr-1 text-primary" />
                <span>{tourData.languages.join(", ")}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">
                Tamanho do Grupo
              </span>
              <div className="flex items-center mt-1">
                <Users className="w-4 h-4 mr-1 text-primary" />
                <span>{tourData.groupSize}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Local</span>
              <div className="flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1 text-primary" />
                <span>{tourData.location}</span>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <CollapsiblePanel title="Sobre esta experiência" className="mb-6">
            <p className="text-muted-foreground">{tourData.description}</p>

            <h3 className="text-lg font-semibold mt-6 mb-3">
              Ponto de Encontro
            </h3>
            <MeetingPointMap
              location={tourData.meetingPoint}
              coordinates={tourData.meetingPointCoordinates}
            />
          </CollapsiblePanel>

          {/* Itinerário */}
          <CollapsiblePanel title="Itinerário Detalhado" className="mb-6">
            <div className="space-y-6">
              {tourData.itinerary.map((item, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 text-right min-w-[100px]">
                    <span className="text-sm font-medium">{item.time}</span>
                  </div>
                  <div className="relative pl-6 pb-6 border-l border-primary/30">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsiblePanel>

          {/* Inclusões */}
          <CollapsiblePanel title="O que está incluído" className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  O que está incluído
                </h3>
                <ul className="space-y-2">
                  {tourData.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  O que não está incluído
                </h3>
                <ul className="space-y-2">
                  {tourData.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <XCircle className="w-5 h-5 mr-2 text-red-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CollapsiblePanel>

          {/* Avaliações */}
          <CollapsiblePanel title="Avaliações" className="mb-6">
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="text-2xl font-bold">{tourData.rating}</span>
              </div>
              <div className="text-muted-foreground">
                {tourData.reviewCount} avaliações
              </div>
            </div>

            <div className="space-y-6">
              {tourData.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-start">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.user}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{review.user}</h4>
                        <span className="text-xs text-muted-foreground ml-2">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-4 w-full">
              Ver todas as avaliações
            </Button>
          </CollapsiblePanel>

          {/* Guias */}
          <CollapsiblePanel title="Guias Disponíveis" className="mb-6">
            <ScrollArea className="w-full pb-4">
              <div className="flex space-x-4">
                {tourData.guides.map((guide) => (
                  <div
                    key={guide.id}
                    className="flex-shrink-0 w-64 border rounded-lg overflow-hidden bg-white"
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={guide.image || "/placeholder.svg"}
                        alt={guide.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{guide.name}</h4>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm ml-1">{guide.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Idiomas: {guide.languages.join(", ")}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {guide.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/guides/${guide.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Ver perfil
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CollapsiblePanel>
        </div>

        {/* Card de Reserva */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-4 sticky top-20">
            <div className="flex items-baseline mb-4">
              {tourData.originalPrice && (
                <span className="text-sm line-through text-muted-foreground mr-2">
                  R$ {tourData.originalPrice.toLocaleString("pt-BR")}
                </span>
              )}
              <span className="text-2xl font-bold">
                R$ {tourData.price.toLocaleString("pt-BR")}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                por pessoa
              </span>
            </div>

            <Separator className="mb-4" />

            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Data e Horário
                </label>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setIsDateDrawerOpen(true)}
                >
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {selectedDate && selectedTime
                        ? `${selectedDate.toLocaleDateString(
                            "pt-BR"
                          )} às ${selectedTime}`
                        : "Selecione uma data e horário"}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Participantes
                </label>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setIsParticipantsDrawerOpen(true)}
                >
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {selectedParticipants.adults +
                        selectedParticipants.teens +
                        selectedParticipants.children >
                      0
                        ? `${
                            selectedParticipants.adults +
                            selectedParticipants.teens +
                            selectedParticipants.children
                          } participantes`
                        : "Adicionar participantes"}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Guia</label>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setIsGuideDrawerOpen(true)}
                >
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span>
                      {selectedGuide ? selectedGuide.name : "Escolha seu guia"}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              className="w-full mb-4"
              disabled={!isReservationComplete}
              onClick={handleReservation}
            >
              Reservar agora
            </Button>

            <p className="text-xs text-center text-muted-foreground mb-4">
              Você não será cobrado ainda. O pagamento será feito após a
              confirmação.
            </p>

            <div className="bg-muted p-3 rounded-md">
              <h4 className="font-medium mb-2">Política de Cancelamento</h4>
              <p className="text-xs text-muted-foreground">
                Cancelamento gratuito até 48 horas antes. Após esse período,
                será cobrada uma taxa de 50% do valor total. Não comparecimento
                ou cancelamento no dia da experiência não terá reembolso.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Experiências Relacionadas */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Você também pode gostar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ExperienceCard
            id="2"
            title="Passeio de Catamarã em Isla Mujeres com Snorkeling"
            image="/placeholder.svg?height=400&width=600"
            price={1250.0}
            originalPrice={1500.0}
            rating={4.7}
            reviewCount={3210}
            duration="8 horas"
            location="Cancún, México"
          />

          <ExperienceCard
            id="4"
            title="Tour Privado pelas Ruínas de Tulum"
            image="/placeholder.svg?height=400&width=600"
            price={1450.0}
            rating={4.6}
            reviewCount={320}
            duration="4 horas"
            location="Tulum, México"
          />

          <ExperienceCard
            id="5"
            title="Mergulho em Cenotes Secretos"
            image="/placeholder.svg?height=400&width=600"
            price={1750.0}
            originalPrice={2000.0}
            rating={4.9}
            reviewCount={178}
            duration="6 horas"
            location="Riviera Maya, México"
          />

          <ExperienceCard
            id="7"
            title="Tour VIP às Ruínas de Coba e Cenote"
            image="/placeholder.svg?height=400&width=600"
            price={1650.0}
            rating={4.7}
            reviewCount={890}
            duration="8 horas"
            location="Cancún, México"
          />
        </div>
      </div>

      {/* Modais e Drawers */}
      <PhotoGalleryModal
        images={tourData.images}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={selectedImage}
      />

      <DateSelectionDrawer
        isOpen={isDateDrawerOpen}
        onClose={() => setIsDateDrawerOpen(false)}
        onSelect={handleDateSelect}
        availableDates={tourData.availableDates || []}
        availableTimes={[
          { id: "1", time: "08:00", label: "08:00" },
          { id: "2", time: "09:00", label: "09:00" },
          { id: "3", time: "10:00", label: "10:00" },
          { id: "4", time: "13:00", label: "13:00" },
          { id: "5", time: "14:00", label: "14:00" },
        ]}
      />

      <ParticipantsSelectionDrawer
        isOpen={isParticipantsDrawerOpen}
        onClose={() => setIsParticipantsDrawerOpen(false)}
        onSelect={handleParticipantsSelect}
        initialValues={selectedParticipants}
      />

      <GuideSelectionDrawer
        isOpen={isGuideDrawerOpen}
        onClose={() => setIsGuideDrawerOpen(false)}
        onSelect={handleGuideSelect}
        guides={tourData.guides}
      />
    </div>
  );
}
