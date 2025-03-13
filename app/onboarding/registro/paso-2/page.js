"use client";

import { useEffect, useState, useActionState } from "react";
import { HeaderSectionForPage } from "@/components/general/HeaderPage";
import { Progress } from "@/components/ui/progress";
import { Form } from "@/components/ui/form/index";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { Badge } from "@/components/ui/badge";
import { updatePreferences } from "../action";
import { toast } from "sonner";
import FloatingButtons from "../components/FloatingButtons";

const questions = [
  {
    id: "languages",
    pergunta: "Quais idiomas você fala?",
    opcoes: [
      { id: "en", label: "Inglês", icon: "🇺🇸" },
      { id: "es", label: "Espanhol", icon: "🇪🇸" },
      { id: "pt", label: "Português", icon: "🇧🇷" },
      { id: "fr", label: "Francês", icon: "🇫🇷" },
      { id: "it", label: "Italiano", icon: "🇮🇹" },
      { id: "de", label: "Alemão", icon: "🇩�" },
    ],
  },
  {
    id: "tourTypes",
    pergunta: "Que tipos de tour você oferece?",
    opcoes: [
      { id: "adventure", label: "Aventura", icon: "🏃‍♂️" },
      { id: "nightlife", label: "Vida Noturna", icon: "🌙" },
      { id: "culture", label: "Cultural", icon: "🏛️" },
      { id: "food", label: "Gastronomia", icon: "🍽️" },
      { id: "nature", label: "Natureza", icon: "🌳" },
      { id: "shopping", label: "Compras", icon: "🛍️" },
    ],
  },
  {
    id: "locations",
    pergunta: "Em quais áreas você atua?",
    opcoes: [
      { id: "cancun", label: "Cancún", icon: "🏖️" },
      { id: "riviera", label: "Riviera Maya", icon: "🌴" },
      { id: "tulum", label: "Tulum", icon: "🏛️" },
      { id: "playa", label: "Playa del Carmen", icon: "🏊‍♂️" },
      { id: "isla", label: "Isla Mujeres", icon: "🏝️" },
      { id: "cozumel", label: "Cozumel", icon: "🐠" },
    ],
  },
];

export default function Paso2() {
  const router = useRouter();
  const { progress, updateFormData, setCurrentStep, formData } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Verificar se temos os dados do paso1
  useEffect(() => {
    if (!formData?.paso1?.email) {
      router.push("/onboarding/registro");
      return;
    }
  }, [formData, router]);

  // Inicializar seleções com dados do store ou objeto vazio
  const [selections, setSelections] = useState(() => {
    return (
      formData?.paso2?.preferences || {
        languages: [],
        tourTypes: [],
        locations: [],
      }
    );
  });

  // 1. Use action state
  const [state, formAction] = useActionState(updatePreferences, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (state && state !== "pending") {
      if (state.success) {
        updateFormData("paso2", { preferences: selections });
        setCurrentStep(3);
        router.push("/onboarding/registro/paso-3");
      } else if (state.errors?._form) {
        toast.error(state.errors._form || "Erro ao atualizar preferências");
      }
    }
  }, [state, router, updateFormData, setCurrentStep, selections]);

  const isPending = state === "pending";

  const toggleSelection = (questionId, optionId) => {
    setSelections((prev) => ({
      ...prev,
      [questionId]: prev[questionId].includes(optionId)
        ? prev[questionId].filter((id) => id !== optionId)
        : [...prev[questionId], optionId],
    }));
  };

  const handleSubmit = (e) => {
    const isValid = Object.values(selections).every((arr) => arr.length > 0);
    if (!isValid) {
      e.preventDefault(); // Impede o submit do form
      toast.error("Por favor, selecione pelo menos uma opção em cada pergunta");
      return;
    }
    setIsSubmitting(true);
    document.getElementById("paso2Form").requestSubmit();

  };

  const isLoading = isSubmitting || state === "pending";


  return (
    <div className="font-sans bg-gray-100 min-h-screen pb-62 safe-area-inset-bottom">
      <HeaderSectionForPage
        title="Paso 2: Suas Preferências"
        bgColor="bg-black text-white"
      />

      <section className="py-6 bg-green-50 px-6 lg:px-0">
        <div className="max-w-lg mx-auto">
          <Progress value={progress} />
        </div>
      </section>

      <section className="mt-6">
        <div className="container max-w-lg mx-auto p-6">
          <Form
            id="paso2Form"
            action={formAction}
            onSubmit={handleSubmit}
            className="space-y-12"
          >
            <input
              type="hidden"
              name="email"
              value={formData?.paso1?.email || ""}
            />
            <input
              type="hidden"
              name="preferences"
              value={JSON.stringify(selections)}
            />

            {questions.map((question) => (
              <div key={question.id} className="space-y-4">
                <h2 className="text-xl font-semibold">{question.pergunta}</h2>
                <div className="flex flex-wrap gap-2">
                  {question.opcoes.map((option) => (
                    <Badge
                      key={option.id}
                      variant={
                        selections[question.id].includes(option.id)
                          ? "default"
                          : "outline"
                      }
                      className="px-4 py-2 cursor-pointer hover:bg-primary/90 transition-colors"
                      onClick={() => toggleSelection(question.id, option.id)}
                    >
                      <span className="mr-2">{option.icon}</span>
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </Form>
        </div>
      </section>

      <FloatingButtons
        step={2}
        onNext={handleSubmit}
        onBack={() => router.push("/onboarding/registro/paso-1")}
        nextText={isLoading ? "Guardando..." : "Continuar"}
        title="¿Has seleccionado tus preferencias?"
        description="Confirma tus selecciones antes de continuar"
        disabled={isLoading}
      />
    </div>
  );
}
