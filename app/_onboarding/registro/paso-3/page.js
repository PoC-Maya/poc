// paso-3/page.js
"use client";

import { useEffect, useActionState, useState } from "react";
import { HeaderSectionForPage } from "@/components/general/HeaderPage";
import { Progress } from "@/components/ui/progress";
import { Form, TextField } from "@/components/ui/form/index";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { createUser } from "../action";
import { toast } from "sonner";
import Link from "next/link";
import { useStepProtection } from "@/hooks/useStepProtection";
import FloatingButtons from "../components/FloatingButtons";

export default function Paso3() {
  const router = useRouter();
  const { progress, updateFormData, setCurrentStep, formData } =
    useOnboardingStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Use action state
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {},
  });

  // 3. Handle state changes
  useEffect(() => {
    if (state && state !== "pending") {
      setIsSubmitting(false);
      if (state.success) {
        updateFormData("paso3", {
          senha: "******", // Por segurança, não salvamos a senha real
          aceitaTermos: true,
        });
        setCurrentStep(3);
        router.push("/onboarding/registro/todo-listo"); // Corrigido o redirecionamento
      } else if (state.errors?._form) {
        toast.error(state.errors._form || "Erro ao criar conta");
      }
    }
  }, [state, router, updateFormData, setCurrentStep]);

  // 4. Handle form submission validation
  const handleSubmit = (e) => {
    const form = e.target;
    if (form.senha.value !== form.confirmarSenha.value) {
      e.preventDefault();
      toast.error("As senhas não coincidem!");
      return;
    }
    setIsSubmitting(true);
    document.getElementById("paso3Form").requestSubmit();
  };

  const isLoading = isSubmitting || state === "pending";

  return (
    <div className="font-sans bg-gray-100 min-h-screen pb-62 safe-area-inset-bottom">
      <HeaderSectionForPage
        title="Paso 3: Senha e Termos"
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
            id="paso3Form"
            action={formAction}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <input
              type="hidden"
              name="email"
              value={formData?.paso1?.email || ""}
            />
            <input
              type="hidden"
              name="nome"
              value={formData?.paso1?.nome || ""}
            />
            <input
              type="hidden"
              name="whatsapp"
              value={formData?.paso1?.whatsapp || ""}
            />
            <input
              type="hidden"
              name="preferences"
              value={JSON.stringify(formData?.paso2?.preferences || {})}
            />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Defina sua senha</h2>
              <p className="text-gray-600">
                Crie uma senha segura e aceite os termos de uso
              </p>
            </div>

            <div className="space-y-4">
              <TextField
                label="Senha"
                name="senha"
                type="password"
                required
                minLength={8}
                error={state.errors?.senha}
                placeholder="Mínimo 8 caracteres"
              />

              <TextField
                label="Confirmar Senha"
                name="confirmarSenha"
                type="password"
                required
                minLength={8}
                error={state.errors?.confirmarSenha}
                placeholder="Digite a senha novamente"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox id="aceitaTermos" name="aceitaTermos" required />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="aceitaTermos"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Aceito os termos de uso e política de privacidade
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Ao criar sua conta, você concorda com nossos{" "}
                    <Link
                      href="/termos"
                      className="text-primary hover:underline"
                    >
                      termos de uso
                    </Link>{" "}
                    e{" "}
                    <Link
                      href="/privacidade"
                      className="text-primary hover:underline"
                    >
                      política de privacidade
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </section>
      <FloatingButtons
        step={3}
        onNext={() => document.getElementById("paso3Form").requestSubmit()}
        onBack={() => router.push("/onboarding/registro/paso-2")}
        nextText={isLoading ? "Creando cuenta..." : "Finalizar"}
        title="¿Todo listo para crear tu cuenta?"
        description="Revisa tus datos antes de finalizar el registro"
        disabled={isLoading}
      />
    </div>
  );
}
