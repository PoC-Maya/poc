"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Languages, Calendar, CheckCircle } from "lucide-react"
import Image from "next/image"

export function GuideDetailsDrawer({ isOpen, onClose, guide }) {
  if (!guide) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Perfil do Guia</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] pr-4 my-6">
          <div className="flex items-center mb-6">
            <div className="relative h-20 w-20 rounded-full overflow-hidden mr-4">
              <Image
                src={guide.image || "/placeholder.svg?height=200&width=200"}
                alt={guide.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{guide.name}</h3>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium">{guide.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">({guide.reviewCount} avaliações)</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Sobre {guide.name}</h4>
              <p className="text-muted-foreground">
                {guide.bio ||
                  `Guia certificado com experiência em ${guide.location}. Especialista em ${guide.specialties.join(", ")}.`}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <span>{guide.location || "Cancún, México"}</span>
              </div>
              <div className="flex items-center">
                <Languages className="w-5 h-5 mr-2 text-primary" />
                <span>Idiomas: {guide.languages.join(", ")}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                <span>{guide.experienceYears || "5+"} anos de experiência</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Especialidades</h4>
              <div className="flex flex-wrap gap-2">
                {guide.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {guide.certifications && (
              <div>
                <h4 className="font-medium mb-2">Certificações</h4>
                <ul className="space-y-2">
                  {guide.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {guide.reviews && guide.reviews.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Avaliações Recentes</h4>
                <div className="space-y-4">
                  {guide.reviews.slice(0, 2).map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center mb-1">
                        <h5 className="font-medium">{review.user}</h5>
                        <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <SheetFooter>
          <Button variant="outline" className="w-full" onClick={() => window.open(`/guides/${guide.id}`, "_blank")}>
            Ver perfil completo
          </Button>
          <Button className="w-full" onClick={onClose}>
            Fechar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

