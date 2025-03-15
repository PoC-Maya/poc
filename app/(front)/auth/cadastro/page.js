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
import { AlertCircle, Check, Info } from "lucide-react"

export default function CadastroPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)

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
      // Simulação de cadastro - substitua por sua lógica real
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirecionar para login após cadastro bem-sucedido
      router.push("/auth/login?cadastro=sucesso")
    } catch (err) {
      setError("Falha no cadastro. Tente novamente mais tarde.")
    } finally {
      setIsLoading(false)
    }
  }

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

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <Image src="/logo.svg" alt="XploraCancun" width={150} height={40} className="mx-auto h-10 w-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">Crie sua conta</h1>
          <p className="text-sm text-muted-foreground">Preencha os dados abaixo para se cadastrar</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Cadastro</CardTitle>
            <CardDescription>Informe seus dados para criar uma conta</CardDescription>
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
                {isLoading ? "Cadastrando..." : "Criar conta"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/auth/login" className="text-primary underline-offset-4 hover:underline">
                Faça login
              </Link>
            </p>
            <div className="mt-4 text-center text-xs text-muted-foreground">
              <Link href="/auth/guia" className="hover:text-primary">
                Quero me cadastrar como guia
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

