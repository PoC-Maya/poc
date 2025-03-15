"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, Calendar, Users, DollarSign, MapPin, CheckCircle, AlertCircle, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function CustomTourDetails({ open, onOpenChange, proposal, onEdit, onRequestChanges }) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [requestMessage, setRequestMessage] = useState("")
  const formattedDate = format(new Date(proposal.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })

  const handleRequestChanges = () => {
    if (onRequestChanges) {
      onRequestChanges(requestMessage)
    }
    setShowConfirmDialog(false)
    onOpenChange(false)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <SheetTitle>{proposal.title}</SheetTitle>
              <Badge variant="outline">Personalizado</Badge>
            </div>
            <SheetDescription>Proposta válida por 48 horas</SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="details" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerário</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-muted-foreground">Data</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    {formattedDate}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-muted-foreground">Duração</div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    {proposal.duration} horas
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-muted-foreground">Pessoas</div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    {proposal.people} pessoas
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-muted-foreground">Preço Total</div>
                  <div className="flex items-center font-medium">
                    <DollarSign className="h-4 w-4 mr-2 text-primary" />${proposal.price}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Descrição</h3>
                <p className="text-sm">{proposal.description}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Local de Encontro</h3>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{proposal.meetingPoint}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">O que está incluído</h3>
                <ul className="space-y-2">
                  {proposal.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {proposal.exclusions && proposal.exclusions.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">O que não está incluído</h3>
                  <ul className="space-y-2">
                    {proposal.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-medium mb-2">Política de Cancelamento</h3>
                <p className="text-sm">
                  Cancelamento gratuito até 24 horas antes. Após esse período, será cobrada uma taxa de 50% do valor
                  total.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="space-y-6 mt-4">
              <div>
                <h3 className="font-medium mb-2">Itinerário Detalhado</h3>
                <div className="bg-muted/30 rounded-md p-4">
                  <div className="whitespace-pre-line text-sm">{proposal.itinerary}</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <SheetFooter className="mt-6 flex-col sm:flex-row gap-3">
            <Button variant="outline" className="sm:flex-1" onClick={() => setShowConfirmDialog(true)}>
              Solicitar Alterações
            </Button>
            <Button className="sm:flex-1">Aprovar e Pagar</Button>
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-14"
                onClick={() => {
                  onOpenChange(false)
                  onEdit(proposal)
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Alterações</DialogTitle>
            <DialogDescription>Informe ao guia quais alterações você gostaria na proposta.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <textarea
              className="w-full min-h-[100px] p-3 border rounded-md"
              placeholder="Descreva as alterações que você gostaria..."
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleRequestChanges}>Enviar Solicitação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

