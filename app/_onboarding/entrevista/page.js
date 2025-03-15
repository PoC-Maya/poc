"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  Video,
  Calendar,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useToast } from "@/components/ui/use-toast";
import OnboardingLayout from "../layout";

export default function EntrevistaPage() {
  const router = useRouter();
  // const { toast } = useToast();
  const [nombre, setNombre] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Obtener el nombre del progreso guardado
    const progress = localStorage.getItem("registrationProgress");
    if (progress) {
      const { nombre } = JSON.parse(progress);
      setNombre(nombre || "");
    }
  }, []);

  // Fechas disponibles (ejemplo)
  const availableDates = [
    { id: "date1", date: "Mañana, 12 de marzo - 10:00 AM" },
    { id: "date2", date: "Mañana, 12 de marzo - 3:00 PM" },
    { id: "date3", date: "Miércoles, 13 de marzo - 11:00 AM" },
    { id: "date4", date: "Jueves, 14 de marzo - 2:00 PM" },
  ];

  const handleScheduleInterview = () => {
    if (!selectedDate) {
      // toast({
      //   title: "Error",
      //   description: "Por favor, selecciona una fecha para tu entrevista.",
      //   variant: "destructive",
      // });
      return;
    }

    setIsSubmitting(true);

    // Simular programación de entrevista
    setTimeout(() => {
      setIsSubmitting(false);
      setIsScheduled(true);

      // Actualizar el progreso
      const progress = JSON.parse(localStorage.getItem("registrationProgress"));
      localStorage.setItem(
        "registrationProgress",
        JSON.stringify({
          ...progress,
          phase: 3,
          completed: 75,
          interviewScheduled: true,
          interviewDate: selectedDate,
        })
      );

      // toast({
      //   title: "Entrevista programada",
      //   description: "Tu entrevista ha sido agendada correctamente.",
      //   status: "success",
      // });
    }, 1500);
  };

  const handleContinue = () => {
    router.push("/onboarding/perfil");
  };

  return (
    <OnboardingLayout progress={75}>
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            {isScheduled ? (
              <CheckCircle className="h-10 w-10 text-green-500" />
            ) : (
              <CalendarDays className="h-10 w-10 text-teal-600" />
            )}
          </div>
          <CardTitle className="text-2xl text-center">
            {isScheduled ? "¡Entrevista Agendada!" : "Programa tu Entrevista"}
          </CardTitle>
          <CardDescription className="text-center">
            {isScheduled
              ? "Tu entrevista ha sido programada correctamente."
              : `Hola ${nombre}, selecciona un horario para tu entrevista.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isScheduled ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <h3 className="font-medium text-green-800 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Detalles de tu entrevista
                </h3>
                <p className="mt-2 text-green-700">
                  Fecha y hora:{" "}
                  <span className="font-medium">{selectedDate}</span>
                </p>
                <p className="mt-1 text-green-700">
                  Plataforma: <span className="font-medium">Google Meet</span>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="font-medium text-blue-800 flex items-center">
                  <Video className="h-5 w-5 mr-2" />
                  Preparación para la entrevista
                </h3>
                <ul className="mt-2 text-blue-700 list-disc list-inside space-y-1">
                  <li>Ten a mano tu identificación oficial</li>
                  <li>Prepara una lista de tus experiencias previas</li>
                  <li>Asegúrate de tener una buena conexión a internet</li>
                  <li>Encuentra un lugar tranquilo y bien iluminado</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground text-center">
                Selecciona una fecha y hora para tu entrevista con nuestro
                equipo.
              </p>

              <RadioGroup value={selectedDate} onValueChange={setSelectedDate}>
                {availableDates.map((date) => (
                  <div
                    key={date.id}
                    className="flex items-center space-x-2 border rounded-md p-3"
                  >
                    <RadioGroupItem value={date.date} id={date.id} />
                    <Label
                      htmlFor={date.id}
                      className="flex-1 cursor-pointer flex items-center"
                    >
                      <Calendar className="h-4 w-4 mr-2 text-teal-600" />
                      {date.date}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          {isScheduled ? (
            <Button
              onClick={handleContinue}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Continuar al Siguiente Paso
            </Button>
          ) : (
            <Button
              onClick={handleScheduleInterview}
              disabled={isSubmitting}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Programando...
                </>
              ) : (
                "Programar Entrevista"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </OnboardingLayout>
  );
}
