"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react"

export default function OnboardingStep2() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    languages: [],
    specialties: [],
    experience: "",
    availability: [],
  })

  // Opções para os campos
  const languageOptions = ["Português", "Inglês", "Espanhol", "Francês", "Alemão", "Italiano", "Mandarim", "Japonês"]

  const specialtyOptions = [
    "História Maia",
    "Praias",
    "Cenotes",
    "Gastronomia",
    "Vida Noturna",
    "Arqueologia",
    "Ecoturismo",
    "Aventura",
    "Fotografia",
    "Mergulho",
    "Snorkeling",
    "Cultura Local",
    "Compras",
    "Natureza",
  ]

  const experienceOptions = ["Menos de 1 ano", "1-3 anos", "3-5 anos", "Mais de 5 anos", "Sou iniciante"]

  const availabilityOptions = ["Dias úteis", "Finais de semana", "Manhãs", "Tardes", "Noites", "Tempo integral"]

  useEffect(() => {
    // Recuperar dados do passo anterior
    const step1Data = localStorage.getItem("onboarding_step1")
    if (!step1Data) {
      router.push("/onboarding/passo-1")
    }
  }, [router])

  const handleLanguageToggle = (language) => {
    setFormData((prev) => {
      const languages = prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language]
      return { ...prev, languages }
    })
  }

  const handleSpecialtyToggle = (specialty) => {
    setFormData((prev) => {
      const specialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty]
      return { ...prev, specialties }
    })
  }

  const handleExperienceChange = (experience) => {
    setFormData((prev) => ({ ...prev, experience }))
  }

  const handleAvailabilityToggle = (availability) => {
    setFormData((prev) => {
      const availabilities = prev.availability.includes(availability)
        ? prev.availability.filter((a) => a !== availability)
        : [...prev.availability, availability]
      return { ...prev, availability: availabilities }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validação básica
    if (formData.languages.length === 0) {
      setError("Selecione pelo menos um idioma")
      setIsLoading(false)
      return
    }

    if (formData.specialties.length === 0) {
      setError("Selecione pelo menos uma especialidade")
      setIsLoading(false)
      return
    }

    if (!formData.experience) {
      setError("Selecione seu nível de experiência")
      setIsLoading(false)
      return
    }

    if (formData.availability.length === 0) {
      setError("Selecione pelo menos uma disponibilidade")
      setIsLoading(false)
      return
    }

    try {
      // Simulação de envio - substitua por sua lógica real
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Armazenar dados no localStorage para uso no próximo passo
      localStorage.setItem("onboarding_step2", JSON.stringify(formData))

      // Avançar para o próximo passo
      router.push("/onboarding/passo-3")
    } catch (err) {
      setError("Ocorreu um erro. Tente novamente mais tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <Image src="/logo.svg" alt="XploraCancun" width={150} height={40} className="h-10 w-auto" />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Link href="/onboarding/passo-1">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">Passo 2 de 3</div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
            <div className="bg-brand-500 h-2 rounded-full" style={{ width: "66.66%" }}></div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sobre você</CardTitle>
            <CardDescription>Conte-nos mais sobre suas habilidades e experiências como guia</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Quais idiomas você fala?</h3>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((language) => (
                    <Badge
                      key={language}
                      variant={formData.languages.includes(language) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleLanguageToggle(language)}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Quais são suas especialidades?</h3>
                <div className="flex flex-wrap gap-2">
                  {specialtyOptions.map((specialty) => (
                    <Badge
                      key={specialty}
                      variant={formData.specialties.includes(specialty) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleSpecialtyToggle(specialty)}
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Qual é o seu nível de experiência como guia?</h3>
                <div className="space-y-2">
                  {experienceOptions.map((experience) => (
                    <div key={experience} className="flex items-center space-x-2">
                      <Checkbox
                        id={`experience-${experience}`}
                        checked={formData.experience === experience}
                        onCheckedChange={() => handleExperienceChange(experience)}
                      />
                      <Label htmlFor={`experience-${experience}`}>{experience}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Qual é a sua disponibilidade?</h3>
                <div className="grid grid-cols-2 gap-2">
                  {availabilityOptions.map((availability) => (
                    <div key={availability} className="flex items-center space-x-2">
                      <Checkbox
                        id={`availability-${availability}`}
                        checked={formData.availability.includes(availability)}
                        onCheckedChange={() => handleAvailabilityToggle(availability)}
                      />
                      <Label htmlFor={`availability-${availability}`}>{availability}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
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
        </Card>
      </div>
    </div>
  )
}

