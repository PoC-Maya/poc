import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function EnrollSuccessPage({ params }) {
  return (
    <div className="container max-w-md mx-auto py-12">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Inscrição Enviada!</CardTitle>
          <CardDescription>Sua inscrição para a experiência foi enviada com sucesso.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Nossa equipe irá analisar sua inscrição e você receberá uma notificação em até 24 horas.
          </p>
          <p className="text-sm text-muted-foreground">
            Enquanto isso, você pode baixar o material de treinamento e se preparar para a experiência.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/panel/me/experiences/my-portfolio">Ir para Meu Portfólio</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/panel/me/experiences/marketplace">Explorar Mais Experiências</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

