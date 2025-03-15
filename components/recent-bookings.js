import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentBookings() {
  const bookings = [
    {
      id: "1",
      customer: {
        name: "Carlos Silva",
        email: "carlos@example.com",
        image: "/placeholder.svg",
      },
      experience: "Tour pela Cidade Antiga",
      date: "24 Jul 2023",
      time: "09:00",
      people: 3,
      status: "confirmado",
    },
    {
      id: "2",
      customer: {
        name: "Ana Pereira",
        email: "ana@example.com",
        image: "/placeholder.svg",
      },
      experience: "Mergulho nos Recifes",
      date: "25 Jul 2023",
      time: "10:30",
      people: 2,
      status: "pendente",
    },
    {
      id: "3",
      customer: {
        name: "Roberto Gomes",
        email: "roberto@example.com",
        image: "/placeholder.svg",
      },
      experience: "Passeio de Barco",
      date: "26 Jul 2023",
      time: "14:00",
      people: 4,
      status: "confirmado",
    },
    {
      id: "4",
      customer: {
        name: "Juliana Costa",
        email: "juliana@example.com",
        image: "/placeholder.svg",
      },
      experience: "Tour Gastronômico",
      date: "27 Jul 2023",
      time: "19:00",
      people: 2,
      status: "pendente",
    },
    {
      id: "5",
      customer: {
        name: "Fernando Melo",
        email: "fernando@example.com",
        image: "/placeholder.svg",
      },
      experience: "Caminhada na Selva",
      date: "28 Jul 2023",
      time: "08:00",
      people: 5,
      status: "confirmado",
    },
  ]

  return (
    <div className="space-y-8">
      {bookings.map((booking) => (
        <div key={booking.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={booking.customer.image} alt="Avatar" />
            <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{booking.customer.name}</p>
            <p className="text-sm text-muted-foreground">{booking.experience}</p>
          </div>
          <div className="ml-auto text-sm text-right">
            <p>{booking.date}</p>
            <p className="text-xs text-muted-foreground">
              {booking.time} • {booking.people} pessoas
            </p>
          </div>
          <div className="ml-2">
            <Badge variant={booking.status === "confirmado" ? "default" : "outline"}>{booking.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

