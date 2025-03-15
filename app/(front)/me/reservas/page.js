import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ReservasPage() {
  // Dados simulados de reservas
  const reservas = [
    {
      id: "res-001",
      experiencia: "Tour pelas Ruínas Maias de Tulum",
      data: "15 de Junho, 2023",
      horario: "09:00 - 14:00",
      participantes: 2,
      status: "confirmada",
      guia: "Carlos Mendez",
      valor: "R$ 450,00",
      imagem: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "res-002",
      experiencia: "Mergulho em Cenotes",
      data: "18 de Junho, 2023",
      horario: "10:30 - 15:30",
      participantes: 2,
      status: "pendente",
      guia: "Maria Rodriguez",
      valor: "R$ 680,00",
      imagem: "/placeholder.svg?height=100&width=200",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Minhas Reservas</h1>
        <Button variant="outline" asChild>
          <Link href="/me">Voltar ao Dashboard</Link>
        </Button>
      </div>

      <div className="space-y-6">
        {reservas.map((reserva) => (
          <Card key={reserva.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4">
                <img
                  src={reserva.imagem || "/placeholder.svg"}
                  alt={reserva.experiencia}
                  className="h-48 w-full object-cover md:h-full"
                />
              </div>
              <div className="flex-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{reserva.experiencia}</CardTitle>
                      <CardDescription>Guia: {reserva.guia}</CardDescription>
                    </div>
                    <Badge
                      className={
                        reserva.status === "confirmada"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {reserva.status === "confirmada" ? "Confirmada" : "Pendente"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Data</p>
                        <p className="text-sm text-muted-foreground">{reserva.data}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Horário</p>
                        <p className="text-sm text-muted-foreground">{reserva.horario}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Participantes</p>
                        <p className="text-sm text-muted-foreground">{reserva.participantes} pessoas</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Valor</p>
                        <p className="text-sm text-muted-foreground">{reserva.valor}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/me/reservas/${reserva.id}`}>Ver Detalhes</Link>
                  </Button>
                  <div className="space-x-2">
                    {reserva.status === "confirmada" && <Button variant="outline">Cancelar Reserva</Button>}
                    <Button>Contatar Guia</Button>
                  </div>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

