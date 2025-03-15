import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Calendar } from "lucide-react"

export default function OnboardingThanks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white py-12 px-4">
      <div className="container max-w-md mx-auto text-center">
        <div className="flex justify-center mb-8">
          <Image src="/logo.svg" alt="XploraCancun" width={150} height={40} className="h-10 w-auto" />
        </div>

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Cadastro realizado com sucesso!</h1>
        <p className="text-muted-foreground mb-8">
          Obrigado por se cadastrar como guia na XploraCancun. Estamos ansiosos para ter você em nossa plataforma!
        </p>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Próximos passos</h2>
            <div className="text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-600 font-medium text-sm">1</span>
                </div>
                <div>
                  <p className="text-sm">Nossa equipe irá revisar suas informações em até 48 horas úteis.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-600 font-medium text-sm">2</span>
                </div>
                <div>
                  <p className="text-sm">Você receberá um email de confirmação quando sua conta for aprovada.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-600 font-medium text-sm">3</span>
                </div>
                <div>
                  <p className="text-sm">
                    Após a aprovação, você poderá acessar o painel de guia e começar a criar suas experiências.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Link href="/agendar-entrevista">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Agende sua entrevista <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/">
            <Button className="w-full" variant="outline">
              Voltar para a página inicial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground">
            Tem alguma dúvida?{" "}
            <Link href="/contato" className="text-primary hover:underline">
              Entre em contato
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

