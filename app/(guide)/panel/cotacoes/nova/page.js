"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CriarCotacaoForm } from "@/components/cotacoes/criar-cotacao-form"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function NovaCotacaoPage() {
  const [activeTab, setActiveTab] = useState("cliente")
  const [clienteData, setClienteData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  })
  const [cotacaoData, setCotacaoData] = useState(null)
  const router = useRouter()

  const handleClienteChange = (e) => {
    const { name, value } = e.target
    setClienteData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClienteSubmit = (e) => {
    e.preventDefault()
    // Validar dados do cliente
    if (!clienteData.nome || !clienteData.email) {
      alert("Por favor, preencha os campos obrigatórios.")
      return
    }

    // Avançar para a próxima etapa
    setActiveTab("cotacao")
  }

  const handleCotacaoSubmit = (data) => {
    // Aqui você implementaria a lógica para salvar a cotação
    console.log("Dados do cliente:", clienteData)
    console.log("Dados da cotação:", data)

    // Simular sucesso e redirecionar
    alert("Cotação criada com sucesso!")
    router.push("/panel/cotacoes")
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/panel/cotacoes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Nova Cotação</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cliente">Dados do Cliente</TabsTrigger>
          <TabsTrigger value="cotacao" disabled={!clienteData.nome || !clienteData.email}>
            Detalhes da Cotação
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cliente" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Cliente</CardTitle>
              <CardDescription>Preencha os dados do cliente para quem você está criando esta cotação.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleClienteSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome">
                      Nome do Cliente <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={clienteData.nome}
                      onChange={handleClienteChange}
                      placeholder="Nome completo do cliente"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={clienteData.email}
                      onChange={handleClienteChange}
                      placeholder="email@exemplo.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={clienteData.telefone}
                    onChange={handleClienteChange}
                    placeholder="+55 (00) 00000-0000"
                  />
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem Inicial do Cliente</Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    value={clienteData.mensagem}
                    onChange={handleClienteChange}
                    placeholder="Descreva o que o cliente está buscando..."
                    rows={5}
                  />
                  <p className="text-sm text-muted-foreground">
                    Esta mensagem será usada para iniciar a conversa com o cliente.
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Próximo Passo</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cotacao" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Cotação</CardTitle>
              <CardDescription>Crie uma cotação personalizada para {clienteData.nome}.</CardDescription>
            </CardHeader>
            <CardContent>
              <CriarCotacaoForm onSubmit={handleCotacaoSubmit} onCancel={() => setActiveTab("cliente")} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

