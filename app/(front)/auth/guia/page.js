import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function GuideAuthPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span>Voltar</span>
        </Button>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Image src="/logo.svg" alt="XploraCancun" width={150} height={40} className="mx-auto h-10 w-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">Área de Guias</h1>
          <p className="text-sm text-muted-foreground">Acesse sua conta ou cadastre-se como guia na XploraCancun</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Guias Turísticos</CardTitle>
            <CardDescription>Escolha uma das opções abaixo</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/auth/login">
              <Button className="w-full">Já sou guia - Fazer login</Button>
            </Link>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Ou</span>
              </div>
            </div>

            <Link href="/onboarding">
              <Button variant="outline" className="w-full">
                Quero me tornar um guia <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Ao se cadastrar, você concorda com nossos{" "}
              <Link href="/termos" className="text-primary underline-offset-4 hover:underline">
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link href="/privacidade" className="text-primary underline-offset-4 hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

