import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function ConversaDetalhesPage({ params }) {
  const { id } = params

  // Dados simulados da conversa
  const conversa = {
    id,
    guia: {
      nome: "Carlos Mendez",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciais: "CM",
    },
    experiencia: "Tour pelas Ruínas Maias de Tulum",
    mensagens: [
      {
        id: "msg-001",
        remetente: "guia",
        texto:
          "Olá! Obrigado por escolher o Tour pelas Ruínas Maias de Tulum. Estou à disposição para responder qualquer dúvida que você tenha sobre o passeio.",
        data: "Ontem, 10:15",
      },
      {
        id: "msg-002",
        remetente: "turista",
        texto: "Olá Carlos! Gostaria de saber se o tour inclui transporte do hotel?",
        data: "Ontem, 11:30",
      },
      {
        id: "msg-003",
        remetente: "guia",
        texto:
          "Sim, incluímos transporte de ida e volta do seu hotel em Cancún ou Playa del Carmen. Nosso veículo é confortável e com ar-condicionado.",
        data: "Ontem, 12:45",
      },
      {
        id: "msg-004",
        remetente: "turista",
        texto: "Perfeito! E quanto ao almoço?",
        data: "Ontem, 14:20",
      },
      {
        id: "msg-005",
        remetente: "guia",
        texto:
          "O almoço não está incluído no pacote básico, mas faremos uma parada em um restaurante local com ótimas opções. Se preferir, posso incluir o almoço no pacote por um adicional de $15 por pessoa.",
        data: "Ontem, 15:10",
      },
      {
        id: "msg-006",
        remetente: "turista",
        texto: "Entendi. Vou ficar com o pacote básico mesmo. Que horas começa o tour?",
        data: "Hoje, 09:30",
      },
      {
        id: "msg-007",
        remetente: "guia",
        texto:
          "Olá! Estou confirmando nosso encontro para amanhã às 9h no ponto de encontro combinado. Passaremos para buscá-lo no hotel por volta das 7h30, pois o trajeto até Tulum leva aproximadamente 1h30.",
        data: "Hoje, 14:30",
      },
    ],
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link href="/me/conversas">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={conversa.guia.avatar} alt={conversa.guia.nome} />
            <AvatarFallback>{conversa.guia.iniciais}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{conversa.guia.nome}</h2>
            <p className="text-xs text-muted-foreground">{conversa.experiencia}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Ver Experiência
          </Button>
          <Button size="sm">Fazer Reserva</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversa.mensagens.map((mensagem) => (
          <div
            key={mensagem.id}
            className={`flex ${mensagem.remetente === "turista" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                mensagem.remetente === "turista" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              <p className="text-sm">{mensagem.texto}</p>
              <p className="mt-1 text-right text-xs opacity-70">{mensagem.data}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input placeholder="Digite sua mensagem..." className="flex-1" />
          <Button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
            <span className="sr-only">Enviar</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

