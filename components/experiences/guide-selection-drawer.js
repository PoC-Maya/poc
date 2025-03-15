"use client"

import { useState } from "react"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Star, Info } from "lucide-react"
import { GuideDetailsDrawer } from "./guide-details-drawer"

export function GuideSelectionDrawer({ isOpen, onClose, onSelect, guides = [] }) {
  const [selectedGuideId, setSelectedGuideId] = useState(guides.length > 0 ? guides[0].id : null)
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false)
  const [selectedGuideForDetails, setSelectedGuideForDetails] = useState(null)

  const handleConfirm = () => {
    const selectedGuide = guides.find((guide) => guide.id === selectedGuideId)
    if (selectedGuide) {
      onSelect(selectedGuide)
      onClose()
    }
  }

  const openGuideDetails = (guide) => {
    setSelectedGuideForDetails(guide)
    setDetailsDrawerOpen(true)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Escolha seu guia</SheetTitle>
          </SheetHeader>

          <div className="py-6">
            <RadioGroup value={selectedGuideId} onValueChange={setSelectedGuideId} className="space-y-4">
              {guides.map((guide) => (
                <div
                  key={guide.id}
                  className="flex items-start space-x-3 border rounded-lg p-3 hover:border-primary cursor-pointer"
                >
                  <RadioGroupItem value={guide.id} id={`guide-${guide.id}`} className="mt-1" />
                  <Label htmlFor={`guide-${guide.id}`} className="flex-1 cursor-pointer">
                    <div className="flex items-start">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden mr-3">
                        <Image
                          src={guide.image || "/placeholder.svg?height=100&width=100"}
                          alt={guide.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{guide.name}</h4>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="text-sm">{guide.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{guide.languages.join(", ")}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {guide.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {guide.specialties.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{guide.specialties.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      openGuideDetails(guide)
                    }}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </RadioGroup>
          </div>

          <SheetFooter>
            <Button onClick={handleConfirm} disabled={!selectedGuideId} className="w-full">
              Confirmar
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <GuideDetailsDrawer
        isOpen={detailsDrawerOpen}
        onClose={() => setDetailsDrawerOpen(false)}
        guide={selectedGuideForDetails}
      />
    </>
  )
}

