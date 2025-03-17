import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ConversasPage() {
  // Dados simulados de conversas
  const conversas = [
    {
      id: "conv-001",
      guia: {
        nome: "Carlos Mendez",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "CM",
      },
      ultimaMensagem: "Olá! Estou confirmando nosso encontro para amanhã às 9h no ponto de encontro combinado.",
      data: "Hoje, 14:30",
      lida: false,
      experiencia: "Tour pelas Ruínas Maias de Tulum",
    },
    {
      id: "conv-002",
      guia: {
        nome: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "MR",
      },
      ultimaMensagem: "Perfeito! Vou preparar tudo para o mergulho. Não esqueça de trazer protetor solar!",
      data: "Ontem, 18:45",
      lida: true,
      experiencia: "Mergulho em Cenotes",
    },
    {
      id: "conv-003",
      guia: {
        nome: "Juan Perez",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "JP",
      },
      ultimaMensagem:
        "Obrigado pelo seu interesse! Posso oferecer um desconto de 10% para grupos de 4 ou mais pessoas.",
      data: "23/05/2023",
      lida: true,
      experiencia: "Passeio de Catamarã em Isla Mujeres",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Minhas Conversas</h1>
        <Button variant="outline" asChild>
          <Link href="/me">Voltar ao Dashboard</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {conversas.map((conversa) => (
          <Link href={`/me/conversas/${conversa.id}`} key={conversa.id} className="block">
            <Card
              className={`cursor-pointer transition-colors hover:bg-gray-50 ${!conversa.lida ? "border-l-4 border-l-brand-600" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversa.guia.avatar} alt={conversa.guia.nome} />
                    <AvatarFallback>{conversa.guia.iniciais}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{conversa.guia.nome}</h3>
                      <span className="text-xs text-muted-foreground">{conversa.data}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{conversa.experiencia}</p>
                    <p className={`text-sm ${!conversa.lida ? "font-medium" : ""}`}>{conversa.ultimaMensagem}</p>
                  </div>
                  {!conversa.lida && <Badge className="bg-brand-100 text-brand-800">Nova</Badge>}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

