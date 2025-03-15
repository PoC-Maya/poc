import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FavoritosPage() {
  // Dados simulados de experiências favoritas
  const favoritos = [
    {
      id: "exp-001",
      titulo: "Tour pelas Ruínas Maias de Tulum",
      imagem: "/placeholder.svg?height=200&width=300",
      preco: "R$ 225,00",
      duracao: "5 horas",
      categoria: "Cultural",
      avaliacao: 4.8,
      guia: "Carlos Mendez",
    },
    {
      id: "exp-002",
      titulo: "Mergulho em Cenotes",
      imagem: "/placeholder.svg?height=200&width=300",
      preco: "R$ 340,00",
      duracao: "6 horas",
      categoria: "Aventura",
      avaliacao: 4.9,
      guia: "Maria Rodriguez",
    },
    {
      id: "exp-003",
      titulo: "Passeio de Catamarã em Isla Mujeres",
      imagem: "/placeholder.svg?height=200&width=300",
      preco: "R$ 280,00",
      duracao: "8 horas",
      categoria: "Náutico",
      avaliacao: 4.7,
      guia: "Juan Perez",
    },
    {
      id: "exp-004",
      titulo: "Tour Gastronômico em Cancún",
      imagem: "/placeholder.svg?height=200&width=300",
      preco: "R$ 190,00",
      duracao: "4 horas",
      categoria: "Gastronomia",
      avaliacao: 4.6,
      guia: "Ana Gomez",
    },
    {
      id: "exp-005",
      titulo: "Visita a Chichen Itzá",
      imagem: "/placeholder.svg?height=200&width=300",
      preco: "R$ 350,00",
      duracao: "10 horas",
      categoria: "Cultural",
      avaliacao: 4.9,
      guia: "Roberto Sanchez",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Experiências Favoritas</h1>
        <Button variant="outline" asChild>
          <Link href="/me">Voltar ao Dashboard</Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favoritos.map((favorito) => (
          <Card key={favorito.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={favorito.imagem || "/placeholder.svg"}
                alt={favorito.titulo}
                className="h-48 w-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 bg-white/80 text-red-500 hover:bg-white/90 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="sr-only">Remover dos favoritos</span>
              </Button>
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{favorito.titulo}</CardTitle>
                <Badge className="bg-brand-100 text-brand-800">{favorito.categoria}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Preço</p>
                  <p className="text-muted-foreground">{favorito.preco}</p>
                </div>
                <div>
                  <p className="font-medium">Duração</p>
                  <p className="text-muted-foreground">{favorito.duracao}</p>
                </div>
                <div>
                  <p className="font-medium">Avaliação</p>
                  <p className="text-muted-foreground">
                    {favorito.avaliacao}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      className="inline-block h-4 w-4 text-yellow-500 ml-1"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </p>
                </div>
                <div>
                  <p className="font-medium">Guia</p>
                  <p className="text-muted-foreground">{favorito.guia}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex w-full gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/front/experiences/${favorito.id}`}>Ver Detalhes</Link>
                </Button>
                <Button className="flex-1">Reservar</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

