"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Minus, Plus, Users } from "lucide-react"

export function ParticipantsSelectionDrawer({
  isOpen,
  onClose,
  onSelect,
  initialValues = { adults: 1, teens: 0, children: 0 },
}) {
  const [participants, setParticipants] = useState(initialValues)

  const handleIncrement = (type) => {
    setParticipants((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }))
  }

  const handleDecrement = (type) => {
    if (participants[type] > 0) {
      setParticipants((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }))
    }
  }

  const handleConfirm = () => {
    onSelect(participants)
    onClose()
  }

  const totalParticipants = participants.adults + participants.teens + participants.children

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Selecione os participantes</SheetTitle>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-base font-medium">Adultos</Label>
                <p className="text-sm text-muted-foreground">Idade 18+</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement("adults")}
                  disabled={participants.adults <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{participants.adults}</span>
                <Button variant="outline" size="icon" onClick={() => handleIncrement("adults")}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <Label className="text-base font-medium">Adolescentes</Label>
                <p className="text-sm text-muted-foreground">Idade 13-17</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement("teens")}
                  disabled={participants.teens <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{participants.teens}</span>
                <Button variant="outline" size="icon" onClick={() => handleIncrement("teens")}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <Label className="text-base font-medium">Crianças</Label>
                <p className="text-sm text-muted-foreground">Idade 2-12</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement("children")}
                  disabled={participants.children <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{participants.children}</span>
                <Button variant="outline" size="icon" onClick={() => handleIncrement("children")}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">Total de participantes</span>
              </div>
              <span className="font-bold">{totalParticipants}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Crianças menores de 2 anos não pagam e não contam como participantes.
            </p>
          </div>
        </div>

        <SheetFooter>
          <Button onClick={handleConfirm} className="w-full">
            Confirmar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

