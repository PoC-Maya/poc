import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e configurações da conta.</p>
      </div>

      <Tabs defaultValue="conta" className="space-y-4">
        <TabsList>
          <TabsTrigger value="conta">Conta</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="privacidade">Privacidade</TabsTrigger>
        </TabsList>

        <TabsContent value="conta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>Atualize suas informações pessoais.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" defaultValue="João Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="joao.silva@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" defaultValue="+55 (11) 98765-4321" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idioma">Idioma Preferido</Label>
                  <select
                    id="idioma"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>Atualize sua senha para manter sua conta segura.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senha-atual">Senha Atual</Label>
                <Input id="senha-atual" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nova-senha">Nova Senha</Label>
                <Input id="nova-senha" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                <Input id="confirmar-senha" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Atualizar Senha</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Escolha como e quando deseja receber notificações.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <p className="font-medium">Notificações por Email</p>
                  <p className="text-sm text-muted-foreground">Receba atualizações sobre suas reservas e promoções.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <p className="font-medium">Notificações por SMS</p>
                  <p className="text-sm text-muted-foreground">Receba lembretes sobre suas próximas experiências.</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <p className="font-medium">Notificações de Marketing</p>
                  <p className="text-sm text-muted-foreground">Receba ofertas especiais e novidades.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacidade" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Privacidade</CardTitle>
              <CardDescription>Controle quem pode ver suas informações e atividades.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <p className="font-medium">Perfil Público</p>
                  <p className="text-sm text-muted-foreground">Permitir que outros usuários vejam seu perfil.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <p className="font-medium">Compartilhar Histórico de Viagens</p>
                  <p className="text-sm text-muted-foreground">
                    Permitir que guias vejam suas experiências anteriores.
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <p className="font-medium">Dados de Localização</p>
                  <p className="text-sm text-muted-foreground">
                    Permitir acesso à sua localização para recomendações personalizadas.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

