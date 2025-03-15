"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Check, Info } from "lucide-react"

export default function OnboardingStep3() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    // Recuperar dados dos passos anteriores
    const step1Data = localStorage.getItem("onboarding_step1")
    const step2Data = localStorage.getItem("onboarding_step2")

    if (!step1Data || !step2Data) {
      router.push("/onboarding/passo-1")
    }
  }, [router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "password") {
      // Lógica simples para força da senha
      let strength = 0
      if (value.length >= 8) strength += 1
      if (/[A-Z]/.test(value)) strength += 1
      if (/[0-9]/.test(value)) strength += 1
      if (/[^A-Za-z0-9]/.test(value)) strength += 1
      setPasswordStrength(strength)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validação básica
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    if (passwordStrength < 3) {
      setError("Por favor, use uma senha mais forte")
      setIsLoading(false)
      return
    }

    try {
      // Recuperar dados dos passos anteriores
      const step1Data = JSON.parse(localStorage.getItem("onboarding_step1") || "{}")
      const step2Data = JSON.parse(localStorage.getItem("onboarding_step2") || "{}")

      // Combinar todos os dados
      const completeData = {
        ...step1Data,
        ...step2Data,
        password: formData.password,
      }

      // Simulação de envio - substitua por sua lógica real
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Armazenar dados completos (em produção, isso seria enviado para o servidor)
      localStorage.setItem("onboarding_complete", JSON.stringify(completeData))

      // Limpar dados individuais dos passos
      localStorage.removeItem("onboarding_step1")
      localStorage.removeItem("onboarding_step2")

      // Redirecionar para a página de agradecimento
      router.push("/onboarding/agradecimento")
    } catch (err) {
      setError("Falha no cadastro. Tente novamente mais tarde.")
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
            <Link href="/onboarding/passo-2">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">Passo 3 de 3</div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
            <div className="bg-brand-500 h-2 rounded-full" style={{ width: "100%" }}></div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Crie uma conta</CardTitle>
            <CardDescription>Defina uma senha para acessar sua conta de guia</CardDescription>
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
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />

                {formData.password && (
                  <div className="mt-1">
                    <div className="flex gap-1 mb-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${
                            i < passwordStrength
                              ? passwordStrength >= 3
                                ? "bg-green-500"
                                : passwordStrength >= 2
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Info className="h-3 w-3 mr-1" />
                      Use pelo menos 8 caracteres, incluindo letras maiúsculas, números e símbolos
                    </p>
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />

                {formData.password && formData.confirmPassword && (
                  <div className="flex items-center mt-1">
                    {formData.password === formData.confirmPassword ? (
                      <p className="text-xs text-green-500 flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Senhas coincidem
                      </p>
                    ) : (
                      <p className="text-xs text-red-500 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Senhas não coincidem
                      </p>
                    )}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading ? "Finalizando..." : "Finalizar cadastro"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

