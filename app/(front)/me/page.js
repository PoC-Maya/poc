import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TouristDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Minha Área</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Ajuda</Button>
          <Button>Personalizar Experiência</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Minhas Reservas</CardTitle>
            <CardDescription>Gerencie suas experiências reservadas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Você tem 2 reservas ativas</p>
            <div className="mt-4">
              <Link href="/me/reservas">
                <Button variant="outline" className="w-full">
                  Ver Reservas
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Meu Perfil</CardTitle>
            <CardDescription>Atualize suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Última atualização: 15 dias atrás</p>
            <div className="mt-4">
              <Link href="/me/perfil">
                <Button variant="outline" className="w-full">
                  Editar Perfil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Conversas</CardTitle>
            <CardDescription>Suas conversas com guias</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Você tem 1 conversa não lida</p>
            <div className="mt-4">
              <Link href="/me/conversas">
                <Button variant="outline" className="w-full">
                  Ver Conversas
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Experiências Favoritas</CardTitle>
            <CardDescription>Experiências que você salvou</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Você tem 5 experiências salvas</p>
            <div className="mt-4">
              <Link href="/me/favoritos">
                <Button variant="outline" className="w-full">
                  Ver Favoritos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Avaliações</CardTitle>
            <CardDescription>Suas avaliações de experiências</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Você escreveu 3 avaliações</p>
            <div className="mt-4">
              <Link href="/me/avaliacoes">
                <Button variant="outline" className="w-full">
                  Ver Avaliações
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

