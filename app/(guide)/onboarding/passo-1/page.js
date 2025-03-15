"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react"

export default function OnboardingStep1() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulação de envio - substitua por sua lógica real
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Armazenar dados no localStorage para uso nos próximos passos
      localStorage.setItem("onboarding_step1", JSON.stringify(formData))

      // Avançar para o próximo passo
      router.push("/onboarding/passo-2")
    } catch (err) {
      setError("Ocorreu um erro. Tente novamente mais tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white py-12 px-4">
      <div className="container max-w-md mx-auto">
        <div className="flex justify-center mb-8">
          <Image src="/logo.svg" alt="XploraCancun" width={150} height={40} className="h-10 w-auto" />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Link href="/onboarding">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">Passo 1 de 3</div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
            <div className="bg-brand-500 h-2 rounded-full" style={{ width: "33.33%" }}></div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Vamos começar</CardTitle>
            <CardDescription>Informe seus dados básicos para iniciar o cadastro</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  placeholder="+52 998 123 4567"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">Informe o número com código do país e DDD</p>
              </div>

              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading ? (
                  "Enviando..."
                ) : (
                  <>
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

