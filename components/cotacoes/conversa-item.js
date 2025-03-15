import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, Users, DollarSign } from "lucide-react"

// Função para formatar data
function formatarData(dataString) {
  const data = new Date(dataString)
  const hoje = new Date()
  const ontem = new Date(hoje)
  ontem.setDate(hoje.getDate() - 1)

  if (data.toDateString() === hoje.toDateString()) {
    return format(data, "'Hoje,' HH:mm", { locale: ptBR })
  } else if (data.toDateString() === ontem.toDateString()) {
    return format(data, "'Ontem,' HH:mm", { locale: ptBR })
  } else {
    return format(data, "dd 'de' MMMM, HH:mm", { locale: ptBR })
  }
}

// Função para obter a cor do badge de status
function getStatusColor(status) {
  switch (status) {
    case "pendente":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "aprovada":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "rejeitada":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "paga":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "aguardando_cotacao":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

// Função para traduzir o status
function traduzirStatus(status) {
  switch (status) {
    case "pendente":
      return "Cotação Pendente"
    case "aprovada":
      return "Cotação Aprovada"
    case "rejeitada":
      return "Cotação Rejeitada"
    case "paga":
      return "Pagamento Realizado"
    case "aguardando_cotacao":
      return "Aguardando Cotação"
    default:
      return status
  }
}

export function ConversaItem({ conversa }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={conversa.turista.avatar} alt={conversa.turista.nome} />
              <AvatarFallback>{conversa.turista.nome.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{conversa.turista.nome}</h3>
              <p className="text-xs text-muted-foreground">{conversa.turista.email}</p>
            </div>
          </div>
          <Badge className={getStatusColor(conversa.status)}>{traduzirStatus(conversa.status)}</Badge>
        </div>

        <div className="mt-4">
          <p
            className={`text-sm ${!conversa.ultimaMensagem.lida && conversa.ultimaMensagem.remetente === "turista" ? "font-medium" : ""}`}
          >
            {conversa.ultimaMensagem.texto}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">{formatarData(conversa.ultimaMensagem.data)}</span>
            {!conversa.ultimaMensagem.lida && conversa.ultimaMensagem.remetente === "turista" && (
              <Badge variant="secondary" className="text-xs">
                Nova mensagem
              </Badge>
            )}
          </div>
        </div>

        {conversa.cotacao && (
          <div className="mt-4 p-3 bg-muted/30 rounded-md">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium">{conversa.cotacao.titulo}</h4>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>{format(new Date(conversa.cotacao.data), "dd/MM/yyyy", { locale: ptBR })}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>{conversa.cotacao.pessoas} pessoas</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>${conversa.cotacao.valor}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

