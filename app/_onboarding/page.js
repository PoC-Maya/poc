'use client'

import { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Carousel } from "@/components/carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Video, FileText } from "lucide-react"
import OnboardingLayout from './layout'

export default function OnboardingPage() {
  const router = useRouter()
  
  useLayoutEffect(() => {
    // Si el usuario ya está en alguna fase del registro, redirigirlo a la página adecuada
    const currentProgress = localStorage.getItem('registrationProgress')
    if (currentProgress) {
      const phase = JSON.parse(currentProgress).phase
      if (phase > 1) {
        router.push('/onboarding/perfil')
      }
    }
  }, [router])

  const slides = [
    {
      icon: <UserPlus className="h-16 w-16 text-teal-600" />,
      title: "¡Bienvenido a XploraCancun!",
      description: "En este primer paso, solo necesitas proporcionar algunos datos básicos para comenzar. Luego, podrás continuar con tu registro cuando quieras."
    },
    {
      icon: <Video className="h-16 w-16 text-teal-600" />,
      title: "Entrevista Personalizada",
      description: "Después de completar el registro, agendaremos una entrevista para conocerte mejor y aprobar tu perfil."
    },
    {
      icon: <FileText className="h-16 w-16 text-teal-600" />,
      title: "Completa Tu Perfil",
      description: "Cuando seas aprobado, podrás completar tu perfil, elegir el tour que te interesa y registrarte en Stripe para comenzar a trabajar."
    }
  ]

  const handleStart = () => {
    router.push('/onboarding/registro')
  }

  return (
    <OnboardingLayout progress={0}>
      <div className="space-y-6">
        <Carousel slides={slides} />

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center mb-4">Conviértete en Guía de XploraCancun</h1>
            <p className="text-center text-muted-foreground mb-6">
              Nos emociona conocerte. Sigue este proceso sencillo para unirte a nuestro equipo de guías y comenzar a mostrar lo mejor de Cancún a nuestros visitantes.
            </p>
            <Button 
              onClick={handleStart}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Comenzar Registro
            </Button>
          </CardContent>
        </Card>
      </div>
    </OnboardingLayout>
  )
}