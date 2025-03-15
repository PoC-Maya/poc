'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import OnboardingLayout from '../layout'

export default function ConfirmacionPage() {
  const router = useRouter()
  // const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    // Obtener el correo del progreso guardado
    const progress = localStorage.getItem('registrationProgress')
    if (progress) {
      const { email } = JSON.parse(progress)
      setEmail(email || '')
    }
  }, [])

  const handleConfirmEmail = () => {
    // Simulación de confirmación de correo
    setIsConfirmed(true)
    
    // Actualizar el progreso
    const progress = JSON.parse(localStorage.getItem('registrationProgress'))
    localStorage.setItem('registrationProgress', JSON.stringify({
      ...progress,
      phase: 2,
      completed: 50,
      emailConfirmed: true
    }))
    
    // toast({
    //   title: "¡Correo confirmado!",
    //   description: "Tu correo ha sido verificado correctamente.",
    //   status: "success"
    // })
  }

  const handleResendEmail = () => {
    setIsResending(true)
    
    // Simular envío de correo
    setTimeout(() => {
      setIsResending(false)
      // toast({
      //   title: "Correo reenviado",
      //   description: "Hemos reenviado el correo de confirmación.",
      //   status: "success"
      // })
    }, 1500)
  }

  const handleContinue = () => {
    router.push('/onboarding/entrevista')
  }

  return (
    <OnboardingLayout progress={50}>
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            {isConfirmed ? (
              <CheckCircle className="h-10 w-10 text-green-500" />
            ) : (
              <Mail className="h-10 w-10 text-teal-600" />
            )}
          </div>
          <CardTitle className="text-2xl text-center">
            {isConfirmed ? "¡Correo Confirmado!" : "Confirma tu Correo"}
          </CardTitle>
          <CardDescription className="text-center">
            {isConfirmed 
              ? "Tu dirección de correo ha sido verificada correctamente."
              : `Hemos enviado un enlace de confirmación a ${email || 'tu correo electrónico'}.`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isConfirmed ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
              <p className="text-green-800">
                Tu cuenta ha sido verificada. Ahora podemos agendar una entrevista para conocerte mejor.
              </p>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-center">
              <p className="text-amber-800">
                Por favor, revisa tu bandeja de entrada y haz clic en el enlace de confirmación que te enviamos.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          {isConfirmed ? (
            <Button 
              onClick={handleContinue}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Continuar al Siguiente Paso
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleConfirmEmail}
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                Ya confirmé mi correo
              </Button>
              <Button 
                variant="outline" 
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Reenviando correo...
                  </>
                ) : (
                  "Reenviar correo de confirmación"
                )}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </OnboardingLayout>
  )
}