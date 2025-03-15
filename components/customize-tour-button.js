"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CustomizeTourButton({ guideId, guideName }) {
  const [open, setOpen] = useState(false)
  const [customTourDetails, setCustomTourDetails] = useState({
    interests: "",
    budget: "",
    duration: "",
  })

  const handleChange = (e) => {
    setCustomTourDetails({ ...customTourDetails, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Lógica para enviar os detalhes do tour personalizado
    console.log("Enviando detalhes do tour:", customTourDetails)
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Personalizar Tour</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Personalize sua Experiência com {guideName}</DialogTitle>
            <DialogDescription>
              Informe seus interesses e preferências para criar um tour inesquecível.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="interests" className="text-right">
                Interesses:
              </Label>
              <Input
                id="interests"
                name="interests"
                value={customTourDetails.interests}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="budget" className="text-right">
                Orçamento:
              </Label>
              <Input
                id="budget"
                name="budget"
                value={customTourDetails.budget}
                onChange={handleChange}
                className="col-span-3"
                type="number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duração:
              </Label>
              <Input
                id="duration"
                name="duration"
                value={customTourDetails.duration}
                onChange={handleChange}
                className="col-span-3"
                type="number"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Enviar Solicitação
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

