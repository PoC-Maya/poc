"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Users, DollarSign } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CotacaoCard({ cotacao }) {
  const [showDetails, setShowDetails] = useState(false)
  const formattedDate = format(new Date(cotacao.data), "dd/MM/yyyy", { locale: ptBR })

  return (
    <>
      <Card
        className="p-3 mt-2 bg-background border cursor-pointer hover:border-primary transition-colors"
        onClick={() => setShowDetails(true)}
      >
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-sm">{cotacao.titulo}</h4>
            <Badge variant="outline" className="text-xs">
              Cotação
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>{cotacao.duracao} horas</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>{cotacao.pessoas} pessoas</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>${cotacao.valor} total</span>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Button size="sm" className="w-full" variant="outline">
              Ver Detalhes
            </Button>
          </div>
        </div>
      </Card>

      <Sheet open={showDetails} onOpenChange={setShowDetails}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{cotacao.titulo}</SheetTitle>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-10rem)] mt-6 pr-4">
            <div className="space-y-6">
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
                    {cotacao.duracao} horas
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-muted-foreground">Pessoas</div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    {cotacao.pessoas} pessoas
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-muted-foreground">Preço Total</div>
                  <div className="flex items-center font-medium">
                    <DollarSign className="h-4 w-4 mr-2 text-primary" />${cotacao.valor}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Descrição</h3>
                <p className="text-sm">{cotacao.descricao}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Itinerário</h3>
                <div className="bg-muted/30 rounded-md p-4">
                  <div className="whitespace-pre-line text-sm">{cotacao.itinerario}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">O que está incluído</h3>
                <ul className="space-y-1">
                  {cotacao.inclui.map((item, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">O que não está incluído</h3>
                <ul className="space-y-1">
                  {cotacao.naoInclui.map((item, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-destructive mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Ponto de Encontro</h3>
                <p className="text-sm">{cotacao.pontoEncontro}</p>
              </div>
            </div>
          </ScrollArea>

          <SheetFooter className="mt-6 flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => setShowDetails(false)} className="sm:flex-1">
              Fechar
            </Button>
            <Button className="sm:flex-1">Aprovar e Pagar</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

