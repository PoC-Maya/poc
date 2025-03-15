"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"

export function MeetingPointMap({ location, coordinates }) {
  const [isLoading, setIsLoading] = useState(true)

  // Coordenadas padrão para Cancún se não forem fornecidas
  const defaultCoordinates = { lat: 21.161908, lng: -86.8515279 }
  const { lat, lng } = coordinates || defaultCoordinates

  // Gera URL do Google Maps Static API
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`

  // URL para abrir no Google Maps
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`

  // Placeholder para demonstração
  const placeholderMapUrl = `/placeholder.svg?height=300&width=600&text=Mapa+do+Ponto+de+Encontro`

  const handleMapClick = () => {
    window.open(googleMapsUrl, "_blank")
  }

  return (
    <div className="relative rounded-lg overflow-hidden border cursor-pointer" onClick={handleMapClick}>
      <div className="relative h-[200px] w-full">
        <Image
          src={placeholderMapUrl || "/placeholder.svg"} // Substitua por mapUrl quando tiver uma chave API
          alt={`Mapa do ponto de encontro: ${location}`}
          fill
          className="object-cover"
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span>Carregando mapa...</span>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-3">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="ml-2">
            <p className="font-medium">{location}</p>
            <p className="text-xs text-muted-foreground">Clique para abrir no Google Maps</p>
          </div>
        </div>
      </div>
    </div>
  )
}

