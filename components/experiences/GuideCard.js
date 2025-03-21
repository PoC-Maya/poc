"use client"
import Image from "next/image"
import { Star, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"

export function GuideCard({ guide, selectedTimeSlot, onSelectTimeSlot }) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  })

  return (
    <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-200">
      {/* Imagem do guia */}
      <div className="relative h-48 w-full bg-gray-200">
        <Image src={guide.image || "/placeholder.svg"} alt={guide.name} fill className="object-cover" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-white text-black font-medium px-4 py-1 rounded-full">Verificado</Badge>
        </div>
        <div className="absolute bottom-4 right-4">
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-white shadow-md">
            <Eye className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Informações do guia */}
      <div className="p-5">
        <h3 className="text-2xl font-bold">{guide.name}</h3>

        <div className="flex items-center mt-1">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-medium text-lg">{guide.rating}</span>
          <span className="text-gray-500 ml-1">({guide.reviewCount} avaliações)</span>
        </div>

        <p className="text-gray-600 mt-3 line-clamp-2">{guide.description}</p>

        {/* Horários disponíveis */}
        <div className="mt-4 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-2">
            {guide.timeSlots.map((timeSlot, index) => (
              <Button
                key={`${guide.id}-${timeSlot}-${index}`}
                variant={selectedTimeSlot === timeSlot ? "default" : "outline"}
                className={`flex-shrink-0 rounded-full px-5 ${
                  selectedTimeSlot === timeSlot ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => onSelectTimeSlot(timeSlot)}
              >
                {timeSlot}
              </Button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-gray-500">Idiomas: {guide.languages.join(", ")}</p>
      </div>
    </div>
  )
}

