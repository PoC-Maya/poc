"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HeaderSectionForPage } from "@/components/general/HeaderPage";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { Carousel } from "@/components/carrousel";
import FloatingButtons from "./components/FloatingButtons";

const carouselData = [
  {
    title: "Descubra Cancún",
    image: "/images/1.jpg",
    description:
      "Explore as maravilhosas praias e atrações turísticas de Cancún",
  },
  {
    title: "Guia Local",
    image: "/images/2.jpg",
    description: "Seja um guia local e compartilhe suas experiências",
  },
  {
    title: "Ganhe Dinheiro",
    image: "/images/3.jpg",
    description: "Transforme seu conhecimento em renda extra",
  },
];

export default function Page() {
  const router = useRouter();
  const { setAllowedStep1, setCurrentStep } = useOnboardingStore();

  const handleStart = () => {
    setAllowedStep1(true);
    setCurrentStep(1);
    router.push("/onboarding/registro/paso-1");
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen pb-62 safe-area-inset-bottom">
      <HeaderSectionForPage
        title="Antes de empezar..."
        bgColor="bg-black text-white"
      />

      {/* Carousel Section */}
      <section className="mt-6 bg-green-50 px-6">
        <div className="container max-w-lg mx-auto">
          <Carousel items={carouselData} />
        </div>
      </section>

      <section className="mt-6 bg-green-50">
        <div className="container p-6 max-w-lg mx-auto space-y-6">
          <h2 className="text-xl font-semibold mb-4">
            Es un gusto tenerte aqui!
          </h2>
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            euismod mauris ac metus vestibulum, in vehicula nunc pellentesque.
            Donec vehicula, nisi nec placerat ultricies.
          </p>
        </div>
      </section>
      <FloatingButtons
        step={0}
        onNext={handleStart}
        nextText="Comenzar"
        title="¿Listo para empezar?"
        description="Únete a nuestra comunidad de guías locales y comparte tus experiencias"
      />
    </div>
  );
}
