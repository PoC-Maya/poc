"use client"

import Image from "next/image"
import { Star, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function GuidePreviewCard({ guide }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 sm:h-auto sm:w-1/3 bg-gray-200">
          <Image src={guide.image || "/placeholder.svg"} alt={guide.name} fill className="object-cover" />
        </div>

        <div className="p-4 sm:w-2/3">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{guide.name}</h3>
            <Badge className="bg-teal-500 text-white">Verificado</Badge>
          </div>

          <div className="flex items-center mt-1 mb-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-medium">{guide.rating}</span>
            <span className="text-gray-500 ml-1">({guide.reviewCount} avaliações)</span>
          </div>

          <p className="text-gray-700 mb-3 line-clamp-2">{guide.description}</p>

          <div className="mb-2">
            <h4 className="text-sm font-medium mb-1">Idiomas:</h4>
            <div className="flex flex-wrap gap-1">
              {guide.languages.map((language, index) => (
                <Badge key={index} variant="outline" className="bg-gray-100 text-xs">
                  {language}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Especialidades:</h4>
            <div className="flex flex-wrap gap-1">
              {guide.specialties.map((specialty, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600 mr-2">
                  <Award className="w-3 h-3 mr-1" />
                  <span>{specialty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

