"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MapPin } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function CustomTourRequestCard({ request, onEdit }) {
  const formattedDate = request.date
    ? format(new Date(request.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : "Data a definir"

  return (
    <Card className="w-full mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Solicitação de Tour Personalizado</CardTitle>
            <CardDescription>
              Enviado em {format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </CardDescription>
          </div>
          <Badge variant="outline">Personalizado</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {request.date && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm">{formattedDate}</span>
            </div>
          )}

          {request.duration && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm">{request.duration} horas</span>
            </div>
          )}

          {request.participants && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm">{request.participants} pessoas</span>
            </div>
          )}

          {request.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm">{request.location}</span>
            </div>
          )}
        </div>

        {request.description && (
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-1">Descrição</h4>
            <p className="text-sm text-muted-foreground">{request.description}</p>
          </div>
        )}

        {request.preferences && (
          <div>
            <h4 className="text-sm font-medium mb-1">Preferências</h4>
            <p className="text-sm text-muted-foreground">{request.preferences}</p>
          </div>
        )}
      </CardContent>
      {onEdit && (
        <CardFooter className="pt-0">
          <Button variant="outline" size="sm" className="w-full" onClick={onEdit}>
            Editar Solicitação
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

