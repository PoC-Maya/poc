"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const validateStep = (currentStep, formData) => {
  switch (currentStep) {
    case 1:
      return !!formData.paso1;
    case 2:
      return !!formData.paso1 && !!formData.paso2;
    case 3:
      return !!formData.paso1 && !!formData.paso2;
    default:
      return false;
  }
};

export const useOnboardingStore = create(
  persist(
    (set, get) => ({
      currentStep: 0,
      allowedStep1: false,
      formData: {
        paso1: null,
        paso2: null,
        paso3: null,
      },
      progress: 0,
      setCurrentStep: (step) => {
        const state = get();
        if (validateStep(step, state.formData)) {
          set({ 
            currentStep: step,
            progress: (step / 3) * 100 
          });
          return true;
        }
        return false;
      },
      setAllowedStep1: (allowed) => set({ allowedStep1: allowed }),
      updateFormData: (step, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [step]: data,
          },
        })),
      resetStore: () =>
        set({
          currentStep: 0,
          allowedStep1: false,
          formData: {
            paso1: null,
            paso2: null,
            paso3: null,
          },
          progress: 0,
        }),
    }),
    {
      name: "onboarding-storage",
      // Adicionar criptografia ao storage
      storage: {
        getItem: (name) => {
          const encrypted = localStorage.getItem(name);
          // TODO: Implementar decriptação
          return encrypted;
        },
        setItem: (name, value) => {
          // TODO: Implementar criptação
          localStorage.setItem(name, value);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);