"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function ExperienceCard({
  id,
  title,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  duration,
  location,
  isPlatform = false,
  isPrivate = false,
}) {
  const [isFavorite, setIsFavorite] = useState(false)

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <div className="group relative border rounded-lg overflow-hidden bg-white transition-all hover:shadow-md">
      {/* Badge para experiências da plataforma ou particulares */}
      {(isPlatform || isPrivate) && (
        <Badge className="absolute top-2 left-2 z-10">{isPlatform ? "Plataforma" : "Particular"}</Badge>
      )}

      {/* Desconto */}
      {discount > 0 && (
        <Badge variant="destructive" className="absolute top-2 right-12 z-10">
          -{discount}%
        </Badge>
      )}

      {/* Botão de favorito */}
      <button
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center transition-colors hover:bg-white"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsFavorite(!isFavorite)
        }}
      >
        <Heart
          className={cn("w-5 h-5 transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-gray-500")}
        />
      </button>

      {/* Imagem */}
      <Link href={`/experiences/${id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Conteúdo */}
      <div className="p-4">
        <Link href={`/experiences/${id}`} className="block">
          <h3 className="font-medium text-base mb-1 line-clamp-2 hover:text-primary transition-colors">{title}</h3>
        </Link>

        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm ml-1">{rating}</span>
          <span className="text-xs text-muted-foreground ml-1">({reviewCount} avaliações)</span>
        </div>

        <div className="flex flex-col gap-1 mb-3 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-baseline">
          {originalPrice && (
            <span className="text-sm line-through text-muted-foreground mr-2">
              R$ {originalPrice.toLocaleString("pt-BR")}
            </span>
          )}
          <span className="text-lg font-semibold">R$ {price.toLocaleString("pt-BR")}</span>
        </div>
      </div>
    </div>
  )
}

