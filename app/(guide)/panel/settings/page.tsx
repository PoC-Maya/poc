"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Globe,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Lock,
  Mail,
  Smartphone,
  ChevronLeft,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [stripeConnected, setStripeConnected] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [stripeAccountId, setStripeAccountId] = useState("")
  const [showStripeWarningModal, setShowStripeWarningModal] = useState(false)
  const [newStripeAccountId, setNewStripeAccountId] = useState("")
  const router = useRouter()

  const handleSaveAccount = () => {
    setSaveLoading(true)
    // Simulação de salvamento
    setTimeout(() => {
      setSaveLoading(false)
    }, 1500)
  }

  const handleConnectStripe = () => {
    // Simulação de conexão com Stripe
    setTimeout(() => {
      setStripeConnected(true)
    }, 1500)
  }

  const handleStripeAccountChange = (newAccountId) => {
    setNewStripeAccountId(newAccountId)
    setShowStripeWarningModal(true)
  }

  const confirmStripeAccountChange = () => {
    setStripeAccountId(newStripeAccountId)
    setStripeConnected(true)
    setShowStripeWarningModal(false)
  }

  return (
    <div className="flex-1 space-y-4">
      {/* Botão de voltar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 px-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
        </div>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            Conta
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="h-4 w-4 mr-2" />
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="language">
            <Globe className="h-4 w-4 mr-2" />
            Idioma
          </TabsTrigger>
        </TabsList>

        {/* Aba de Conta */}
        <TabsContent value="account" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
              <CardDescription>Atualize suas informações de conta e como entramos em contato com você</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" defaultValue="Miguel Guia" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de Usuário</Label>
                    <Input id="username" defaultValue="miguelguia" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email">Email</Label>
                    <Badge variant="outline" className="ml-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verificado
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input id="email" defaultValue="miguel@guiatur.com" className="flex-1" />
                    <Button variant="outline">Alterar</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="phone">Telefone</Label>
                    <Badge variant="outline" className="ml-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verificado
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input id="phone" defaultValue="+52 1 987 654 3210" className="flex-1" />
                    <Button variant="outline">Alterar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveAccount} disabled={saveLoading}>
                {saveLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Senha e Segurança</CardTitle>
              <CardDescription>Atualize sua senha e configure opções de segurança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline">Alterar Senha</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Aba de Pagamentos */}
        <TabsContent value="payments" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Integração com Stripe</CardTitle>
              <CardDescription>
                Configure sua conta Stripe para receber pagamentos das suas experiências
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>O que é o Stripe?</AlertTitle>
                <AlertDescription>
                  Stripe é uma plataforma de processamento de pagamentos que permite que você receba pagamentos de forma
                  segura. Ao conectar sua conta Stripe, você poderá receber pagamentos diretamente em sua conta bancária
                  quando os turistas reservarem suas experiências.
                </AlertDescription>
              </Alert>

              {stripeConnected ? (
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Conta Stripe Conectada</h3>
                        <p className="text-sm text-muted-foreground">
                          Sua conta Stripe está conectada e pronta para receber pagamentos
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Gerenciar no Stripe
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="stripe-account-id">ID da Conta Stripe</Label>
                      <div className="flex gap-2">
                        <Input
                          id="stripe-account-id"
                          value={stripeAccountId}
                          onChange={(e) => handleStripeAccountChange(e.target.value)}
                          placeholder="ex: acc_93382838293"
                          className="flex-1"
                        />
                        <Button variant="outline" onClick={() => handleStripeAccountChange("")}>
                          Alterar
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        O ID da sua conta Stripe é usado para processar pagamentos. Alterações podem levar até 24 horas
                        para fazer efeito.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-md border border-dashed p-6 flex flex-col items-center justify-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Conecte sua conta Stripe</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">
                    Para receber pagamentos, você precisa conectar sua conta Stripe. Se você ainda não tem uma conta,
                    será guiado para criar uma durante o processo de conexão.
                  </p>
                  <div className="space-y-4 w-full max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="new-stripe-account-id">ID da Conta Stripe</Label>
                      <Input
                        id="new-stripe-account-id"
                        value={stripeAccountId}
                        onChange={(e) => setStripeAccountId(e.target.value)}
                        placeholder="ex: acc_93382838293"
                      />
                      <p className="text-xs text-muted-foreground">
                        Insira o ID da sua conta Stripe para começar a receber pagamentos.
                      </p>
                    </div>
                    <Button onClick={() => setStripeConnected(true)} disabled={!stripeAccountId} className="w-full">
                      Conectar com Stripe
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-medium">Detalhes de Pagamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bank-account">Conta Bancária</Label>
                    <Input id="bank-account" placeholder="**** **** **** 1234" disabled={!stripeConnected} />
                    <p className="text-xs text-muted-foreground">Gerenciado através da sua conta Stripe</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Identificação Fiscal (CPF/CNPJ)</Label>
                    <Input id="tax-id" placeholder="000.000.000-00" disabled={!stripeConnected} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Comissões e Pagamentos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-md bg-muted p-4">
                    <div className="font-medium mb-2">Comissão da Plataforma</div>
                    <div className="text-2xl font-bold">26%</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Porcentagem retida pela plataforma em cada reserva
                    </p>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="font-medium mb-2">Seu Ganho</div>
                    <div className="text-2xl font-bold">74%</div>
                    <p className="text-sm text-muted-foreground mt-1">Porcentagem que você recebe em cada reserva</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Os pagamentos são processados semanalmente e transferidos para sua conta bancária vinculada ao Stripe.
                  Taxas adicionais do Stripe podem ser aplicadas.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pagamentos</CardTitle>
              <CardDescription>Visualize seus pagamentos recebidos e pendentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-6 text-center">
                <p className="text-muted-foreground">
                  Conecte sua conta Stripe para visualizar seu histórico de pagamentos
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Notificações */}
        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Escolha como e quando deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-bookings">Novas Reservas</Label>
                    </div>
                    <Switch id="email-bookings" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-messages">Novas Mensagens</Label>
                    </div>
                    <Switch id="email-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-payments">Pagamentos Recebidos</Label>
                    </div>
                    <Switch id="email-payments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-marketing">Marketing e Promoções</Label>
                    </div>
                    <Switch id="email-marketing" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">SMS</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="sms-bookings">Novas Reservas</Label>
                    </div>
                    <Switch id="sms-bookings" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="sms-messages">Novas Mensagens</Label>
                    </div>
                    <Switch id="sms-messages" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="sms-payments">Pagamentos Recebidos</Label>
                    </div>
                    <Switch id="sms-payments" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Aba de Segurança */}
        <TabsContent value="security" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>Configure opções adicionais de segurança para sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Autenticação de Dois Fatores</h3>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta</p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dispositivos Conectados</h3>
                    <p className="text-sm text-muted-foreground">Gerencie os dispositivos que têm acesso à sua conta</p>
                  </div>
                  <Button variant="outline">Gerenciar</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Histórico de Atividades</h3>
                    <p className="text-sm text-muted-foreground">Visualize atividades recentes em sua conta</p>
                  </div>
                  <Button variant="outline">Visualizar</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacidade</CardTitle>
              <CardDescription>Gerencie suas configurações de privacidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="profile-visibility">Visibilidade do Perfil</Label>
                </div>
                <Select defaultValue="public">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Público</SelectItem>
                    <SelectItem value="private">Privado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="data-sharing">Compartilhamento de Dados</Label>
                </div>
                <Switch id="data-sharing" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Aba de Idioma */}
        <TabsContent value="language" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Idioma</CardTitle>
              <CardDescription>Configure o idioma da plataforma e outras preferências regionais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-language">Idioma da Plataforma</Label>
                  <Select defaultValue="pt-BR">
                    <SelectTrigger id="platform-language">
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                      <SelectItem value="fr-FR">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Selecione uma moeda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD (US Dollar)</SelectItem>
                      <SelectItem value="BRL">BRL (Real Brasileiro)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      <SelectItem value="MXN">MXN (Peso Mexicano)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-format">Formato de Data</Label>
                  <Select defaultValue="DD/MM/YYYY">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Selecione um formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={showStripeWarningModal} onOpenChange={setShowStripeWarningModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar Conta Stripe</DialogTitle>
            <DialogDescription>
              Alterar sua conta Stripe afetará como você recebe pagamentos. Esta alteração pode levar até 24 horas para
              fazer efeito.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert variant="warning" className="bg-amber-50 text-amber-900 border-amber-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>
                Durante o período de transição, os pagamentos podem ser direcionados para sua conta antiga.
                Certifique-se de que ambas as contas estejam ativas.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStripeWarningModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmStripeAccountChange}>Confirmar Alteração</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

