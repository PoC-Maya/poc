import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AvaliacoesPage() {
  // Dados simulados de avaliações
  const avaliacoes = [
    {
      id: "rev-001",
      experiencia: {
        id: "exp-001",
        titulo: "Tour pelas Ruínas Maias de Tulum",
        imagem: "/placeholder.svg?height=60&width=60",
      },
      data: "10 de Maio, 2023",
      avaliacao: 5,
      comentario:
        "Experiência incrível! O guia Carlos foi muito atencioso e conhecedor da história maia. As ruínas são impressionantes e a vista para o mar é de tirar o fôlego. Recomendo fortemente!",
      guia: {
        nome: "Carlos Mendez",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "CM",
      },
    },
    {
      id: "rev-002",
      experiencia: {
        id: "exp-002",
        titulo: "Mergulho em Cenotes",
        imagem: "/placeholder.svg?height=60&width=60",
      },
      data: "15 de Maio, 2023",
      avaliacao: 4,
      comentario:
        "O mergulho foi uma experiência única! A água cristalina dos cenotes é algo que nunca tinha visto antes. A Maria explicou muito bem sobre a formação geológica dos cenotes. Só não dou 5 estrelas porque o transporte atrasou um pouco.",
      guia: {
        nome: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "MR",
      },
    },
    {
      id: "rev-003",
      experiencia: {
        id: "exp-003",
        titulo: "Passeio de Catamarã em Isla Mujeres",
        imagem: "/placeholder.svg?height=60&width=60",
      },
      data: "20 de Maio, 2023",
      avaliacao: 5,
      comentario:
        "Dia perfeito! O passeio de catamarã foi maravilhoso, com paradas para snorkel em pontos incríveis. O almoço no barco foi delicioso e o Juan é um guia muito divertido. As praias de Isla Mujeres são paradisíacas!",
      guia: {
        nome: "Juan Perez",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "JP",
      },
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Minhas Avaliações</h1>
        <Button variant="outline" asChild>
          <Link href="/me">Voltar ao Dashboard</Link>
        </Button>
      </div>

      <div className="space-y-6">
        {avaliacoes.map((avaliacao) => (
          <Card key={avaliacao.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={avaliacao.experiencia.imagem || "/placeholder.svg"}
                    alt={avaliacao.experiencia.titulo}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg">{avaliacao.experiencia.titulo}</CardTitle>
                    <p className="text-sm text-muted-foreground">{avaliacao.data}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={i < avaliacao.avaliacao ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-5 w-5 ${i < avaliacao.avaliacao ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{avaliacao.comentario}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avaliacao.guia.avatar} alt={avaliacao.guia.nome} />
                    <AvatarFallback>{avaliacao.guia.iniciais}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">
                    Guia: <span className="font-medium">{avaliacao.guia.nome}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    Excluir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

