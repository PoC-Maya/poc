"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Plus, Minus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CriarCotacaoForm({ onSubmit, onCancel, cotacaoExistente = null }) {
  // Se existir uma cotação, preencher os campos com os valores dela
  const [date, setDate] = useState(cotacaoExistente ? new Date(cotacaoExistente.data) : new Date())
  const [titulo, setTitulo] = useState(cotacaoExistente?.titulo || "")
  const [descricao, setDescricao] = useState(cotacaoExistente?.descricao || "")
  const [itinerario, setItinerario] = useState(cotacaoExistente?.itinerario || "")
  const [duracao, setDuracao] = useState(cotacaoExistente?.duracao || 4)
  const [pessoas, setPessoas] = useState(cotacaoExistente?.pessoas || 2)
  const [valor, setValor] = useState(cotacaoExistente?.valor || 150)
  const [pontoEncontro, setPontoEncontro] = useState(cotacaoExistente?.pontoEncontro || "Lobby do hotel do cliente")
  const [inclui, setInclui] = useState(cotacaoExistente?.inclui || ["Guia local", "Transporte", "Água"])
  const [naoInclui, setNaoInclui] = useState(cotacaoExistente?.naoInclui || ["Alimentação", "Ingressos para atrações"])
  const [novoItem, setNovoItem] = useState("")
  const [novoItemNaoInclui, setNovoItemNaoInclui] = useState("")
  const [activeTab, setActiveTab] = useState("basic")

  const isEditing = !!cotacaoExistente

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({
      id: cotacaoExistente?.id || `cot-${Date.now()}`,
      titulo,
      descricao,
      itinerario,
      data: date.toISOString(),
      duracao,
      pessoas,
      valor,
      pontoEncontro,
      inclui,
      naoInclui,
      criadoEm: cotacaoExistente?.criadoEm || new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    })
  }

  const adicionarItem = () => {
    if (novoItem.trim()) {
      setInclui([...inclui, novoItem])
      setNovoItem("")
    }
  }

  const removerItem = (index) => {
    setInclui(inclui.filter((_, i) => i !== index))
  }

  const adicionarItemNaoInclui = () => {
    if (novoItemNaoInclui.trim()) {
      setNaoInclui([...naoInclui, novoItemNaoInclui])
      setNovoItemNaoInclui("")
    }
  }

  const removerItemNaoInclui = (index) => {
    setNaoInclui(naoInclui.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerário</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusões</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="space-y-1">
            <Label htmlFor="titulo">Título da Cotação</Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Tour Personalizado em Cenotes"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva a experiência personalizada..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ptBR} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1">
              <Label htmlFor="duracao">Duração (horas)</Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setDuracao(Math.max(1, duracao - 0.5))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="duracao"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={duracao}
                  onChange={(e) => setDuracao(Number.parseFloat(e.target.value))}
                  className="h-10 rounded-none text-center"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setDuracao(duracao + 0.5)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="pessoas">Número de Pessoas</Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setPessoas(Math.max(1, pessoas - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="pessoas"
                  type="number"
                  min="1"
                  value={pessoas}
                  onChange={(e) => setPessoas(Number.parseInt(e.target.value))}
                  className="h-10 rounded-none text-center"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setPessoas(pessoas + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="valor">Preço Total (USD)</Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setValor(Math.max(10, valor - 10))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="valor"
                  type="number"
                  min="10"
                  value={valor}
                  onChange={(e) => setValor(Number.parseInt(e.target.value))}
                  className="h-10 rounded-none text-center"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setValor(valor + 10)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="pontoEncontro">Local de Encontro</Label>
            <Input
              id="pontoEncontro"
              value={pontoEncontro}
              onChange={(e) => setPontoEncontro(e.target.value)}
              placeholder="Ex: Lobby do hotel do cliente"
              required
            />
          </div>
        </TabsContent>

        <TabsContent value="itinerary" className="space-y-4 pt-4">
          <div className="space-y-1">
            <Label htmlFor="itinerario">Itinerário Detalhado</Label>
            <Textarea
              id="itinerario"
              value={itinerario}
              onChange={(e) => setItinerario(e.target.value)}
              placeholder="Descreva o itinerário detalhado da experiência, incluindo horários e atividades..."
              className="min-h-[200px]"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Detalhe o passo a passo da experiência, incluindo horários aproximados e o que será feito em cada momento.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="inclusions" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>O que está incluído</Label>
            <div className="space-y-2">
              {inclui.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-md px-3 py-2 text-sm flex justify-between items-center">
                    <span>{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => removerItem(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={novoItem}
                onChange={(e) => setNovoItem(e.target.value)}
                placeholder="Adicionar item incluído..."
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={adicionarItem}>
                Adicionar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>O que não está incluído</Label>
            <div className="space-y-2">
              {naoInclui.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-md px-3 py-2 text-sm flex justify-between items-center">
                    <span>{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => removerItemNaoInclui(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={novoItemNaoInclui}
                onChange={(e) => setNovoItemNaoInclui(e.target.value)}
                placeholder="Adicionar item não incluído..."
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={adicionarItemNaoInclui}>
                Adicionar
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{isEditing ? "Atualizar Cotação" : "Enviar Cotação"}</Button>
      </div>
    </form>
  )
}

