// app/onboarding/registro/todo-listo/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { HeaderSectionForPage } from "@/components/general/HeaderPage";

export default function TodoListo() {
  const { formData, resetStore } = useOnboardingStore();
  const nome = formData?.paso1?.nome;
  const router = useRouter();
  useEffect(() => {
    if (!nome) {
      router.push("/onboarding/registro");
      return;
    }

    // Limpar o store após mostrar a mensagem
    const timer = setTimeout(() => {
      resetStore();
    }, 8000);

    return () => clearTimeout(timer);
  }, [nome, resetStore]);

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <HeaderSectionForPage
        title="¡Todo Listo!"
        bgColor="bg-black text-white"
      />

      <div className="container max-w-lg mx-auto p-6 text-center mt-12">
        <h1 className="text-3xl font-bold mb-6">
          {nome}, gracias y en breve te llamamos.
        </h1>
        <p className="text-gray-600 mb-4">
          Hemos recibido tu registro correctamente.
        </p>
        <p className="text-gray-600">
          Nuestro equipo revisará tu información y te contactará pronto.
        </p>
      </div>
    </div>
  );
}