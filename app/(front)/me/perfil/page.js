import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function PerfilPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <Button variant="outline" asChild>
          <Link href="/me">Voltar ao Dashboard</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Atualize seus dados pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" defaultValue="João Silva" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="joao.silva@exemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" defaultValue="+55 11 98765-4321" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nacionalidade">Nacionalidade</Label>
              <Input id="nacionalidade" defaultValue="Brasileira" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idioma">Idioma Preferido</Label>
              <Input id="idioma" defaultValue="Português" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Salvar Alterações</Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências</CardTitle>
              <CardDescription>Configure suas preferências de viagem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interesses">Interesses</Label>
                <Input id="interesses" defaultValue="Cultura, Gastronomia, Aventura" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acomodacao">Tipo de Acomodação Preferida</Label>
                <Input id="acomodacao" defaultValue="Hotel 4-5 estrelas" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Salvar Preferências</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Gerencie sua senha e segurança da conta</CardDescription>
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
              <Button className="ml-auto">Atualizar Senha</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

