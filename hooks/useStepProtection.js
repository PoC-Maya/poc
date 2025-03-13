"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useStepProtection = (requiredStep, formData) => {
  const router = useRouter();

  useEffect(() => {
    const validateStep = () => {
      switch (requiredStep) {
        case 2:
          if (!formData?.paso1?.email) {
            router.replace("/onboarding/registro");
            return false;
          }
          break;
        case 3:
          if (!formData?.paso1?.email || !formData?.paso2?.preferences) {
            router.replace("/onboarding/registro");
            return false;
          }
          break;
      }
      return true;
    };

    if (!validateStep()) {
      toast.error("Por favor, complete os passos anteriores");
    }
  }, [formData, router, requiredStep]);
};