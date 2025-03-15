import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CotacaoCard } from "@/components/cotacoes/cotacao-card"

// Função para formatar hora
function formatarHora(dataString) {
  const data = new Date(dataString)
  return format(data, "HH:mm", { locale: ptBR })
}

export function Mensagem({ mensagem, guiaNome = "Guia" }) {
  const isGuia = mensagem.remetente === "guia"

  return (
    <div className={cn("flex gap-2", isGuia ? "flex-row" : "flex-row-reverse")}>
      {isGuia ? (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt={guiaNome} />
          <AvatarFallback>{guiaNome ? guiaNome.charAt(0) : "G"}</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="Turista" />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col max-w-[80%]">
        <div
          className={cn(
            "rounded-lg px-3 py-2 text-sm",
            isGuia ? "bg-muted text-foreground" : "bg-primary text-primary-foreground ml-auto",
          )}
        >
          {mensagem.texto}

          {mensagem.cotacao && (
            <div className="mt-2">
              <CotacaoCard cotacao={mensagem.cotacao} />
            </div>
          )}
        </div>
        <span className="text-xs text-muted-foreground mt-1">{formatarHora(mensagem.data)}</span>
      </div>
    </div>
  )
}

