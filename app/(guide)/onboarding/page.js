import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, MapPin, Users, Calendar, Star, ArrowRight } from "lucide-react"

export default function OnboardingIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <div className="container max-w-5xl py-12 px-4">
        <div className="flex justify-center mb-8">
          <Image src="/logo.svg" alt="XploraCancun" width={180} height={50} className="h-12 w-auto" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Torne-se um Guia na XploraCancun</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compartilhe sua paixão por Cancún e região, conecte-se com viajantes do mundo todo e aumente sua renda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compartilhe Experiências Únicas</h3>
              <p className="text-muted-foreground">
                Crie e ofereça experiências autênticas que mostrem o melhor da região de Cancún.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conecte-se com Viajantes</h3>
              <p className="text-muted-foreground">
                Conheça pessoas de todo o mundo e crie conexões significativas através do turismo.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexibilidade Total</h3>
              <p className="text-muted-foreground">
                Defina sua própria agenda, preços e tipos de experiências que deseja oferecer.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-6 mb-12 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Como funciona</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Cadastre-se como guia</h3>
                <p className="text-sm text-muted-foreground">
                  Complete seu perfil com suas informações, especialidades e experiência.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Passe pela verificação</h3>
                <p className="text-sm text-muted-foreground">
                  Nossa equipe revisará seu perfil para garantir a qualidade da plataforma.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Crie suas experiências</h3>
                <p className="text-sm text-muted-foreground">
                  Desenvolva passeios e atividades únicas para oferecer aos viajantes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Comece a receber reservas</h3>
                <p className="text-sm text-muted-foreground">
                  Gerencie seu calendário, aceite reservas e receba pagamentos pela plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-50 rounded-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-lg italic mb-4">
                "Tornar-me guia na XploraCancun foi a melhor decisão que tomei. Agora posso compartilhar meu amor por
                esta região incrível e conhecer pessoas de todo o mundo."
              </p>
              <p className="font-medium">Carlos Mendez</p>
              <p className="text-sm text-muted-foreground">Guia em Cancún há 3 anos</p>
            </div>
            <div className="w-24 h-24 rounded-full overflow-hidden relative">
              <Image src="/placeholder.svg?height=200&width=200" alt="Carlos Mendez" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/onboarding/passo-1">
            <Button size="lg" className="rounded-full px-8">
              Quero me tornar um guia <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

