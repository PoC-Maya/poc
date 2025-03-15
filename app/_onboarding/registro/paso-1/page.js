"use client";

import { useEffect, useActionState, useState } from "react";
import { Form, TextField, WhatsappField } from "@/components/ui/form/index";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HeaderSectionForPage } from "@/components/general/HeaderPage";
import { Progress } from "@/components/ui/progress";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { createLead } from "@/app/_onboarding/registro/action";
import FloatingButtons from "../components/FloatingButtons";

export default function Paso1() {
  const router = useRouter();
  const { 
    progress, 
    updateFormData, 
    setCurrentStep, 
    allowedStep1,
    formData 
  } = useOnboardingStore();

  // Adicionar estado local para controlar loading
  const [isSubmitting, setIsSubmitting] = useState(false);


  // protection
  useEffect(() => {
    if (!allowedStep1) {
      router.push("/onboarding/registro");
      return;
    }
  }, [allowedStep1, router]);

  // 1. Use action state
  const [state, formAction] = useActionState(createLead, {
    success: false,
    errors: {},
  });

  // 2. Use effect to handle state changes
  useEffect(() => {
    if (state && state !== "pending") {
      if (state.success) {
        // Usar os dados do lead retornado pelo action
        const { lead } = state;
        updateFormData("paso1", {
          nome: lead.nome,
          email: lead.email,
          whatsapp: lead.whatsapp,
        });
        setCurrentStep(2);
        router.push("/onboarding/registro/paso-2");
      } else if (state.errors?._form) {
        toast.error(state.errors._form || "Verifique os erros no formulário");
      }
    }
  }, [state, router, updateFormData, setCurrentStep]);


  const handleSubmit = async () => {
    setIsSubmitting(true);
    document.getElementById("paso1Form").requestSubmit();
  };

  // Limpar estado de submissão quando a ação terminar
  useEffect(() => {
    if (state && state !== "pending") {
      setIsSubmitting(false);
    }
  }, [state]);

// Combinar os dois estados
  const isLoading = isSubmitting || state === "pending";


  // // 3. If state is pending, isPending is true
  // const isPending = state === "pending";

  // Valores iniciais do formulário baseados no store
  const defaultValues = formData?.paso1 || {};

  return (
    <div className="font-sans bg-gray-100 min-h-screen pb-62 safe-area-inset-bottom">
      <HeaderSectionForPage
        title="Paso 1: Seus Dados"
        bgColor="bg-black text-white"
      />

      <section className="py-6 bg-green-50 px-6 lg:px-0">
        <div className="max-w-lg mx-auto">
          <Progress value={progress} />
        </div>
      </section>

      <section className="mt-6">
        <div className="container max-w-lg mx-auto p-6">
          <Form id="paso1Form" action={formAction} className="space-y-6">
            <TextField
              label="Nome Completo"
              name="nome"
              type="text"
              error={state.errors?.nome}
              required
              placeholder="Seu nome completo"
              defaultValue={defaultValues.nome}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              error={state.errors?.email}
              required
              placeholder="seu@email.com"
              defaultValue={defaultValues.email}
            />

            <WhatsappField
              label="WhatsApp"
              name="whatsapp"
              error={state.errors?.whatsapp}
              required
              defaultValue={defaultValues.whatsapp}
            />

            <input type="hidden" name="status" value="paso1" />
          </Form>
        </div>
      </section>

      <FloatingButtons
        step={1}
        onNext={handleSubmit}
        // onNext={() => document.getElementById("paso1Form").requestSubmit()}
        onBack={() => router.push("/onboarding/registro")}
        nextText={isLoading ? "Procesando..." : "Continuar"}
        title="¿Tus datos están correctos?"
        description="Asegúrate de que tu información de contacto sea correcta"
        disabled={isLoading}
      />
    </div>
  );
}