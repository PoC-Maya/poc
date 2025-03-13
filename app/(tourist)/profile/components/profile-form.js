"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form, TextField, TextareaField } from "@/components/ui/form/index";
import { LoadingButton } from "@/components/ui/form/loading-button";
import { updateProfile } from "../action";

export function ProfileForm({ userProfile }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (state && state !== "pending") {
      setIsSubmitting(false);
      if (state.success) {
        toast.success("Suas informações foram atualizadas com sucesso.");
        router.refresh();
      } else if (state.errors?._form) {
        toast.error(state.errors._form);
      }
    }
  }, [state, router]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    document.getElementById("updateProfileForm").requestSubmit();
  };

  const isLoading = isSubmitting || state === "pending";

  return (
    <Form 
      id="updateProfileForm" 
      action={formAction}  // Voltamos para formAction aqui
      className="w-full mx-auto"
    >
      <TextField
        label="Nome Completo"
        name="fullName"
        type="text"
        error={state.errors?.fullName}
        required
        placeholder="Seu nome completo"
        defaultValue={userProfile?.full_name}
      />

      <TextField
        label="Telefone"
        name="phone"
        type="phone"
        error={state.errors?.phone}
        required
        placeholder="(999) 9999-9999"
        defaultValue={userProfile?.phone}
      />

      <TextareaField
        label="Sobre você"
        name="bio"
        error={state.errors?.bio}
        rows={8}
        placeholder="Fale sobre você em até 100 caracteres"
        defaultValue={userProfile?.bio}
      />

      <LoadingButton
        type="submit"
        className="btn btn-primary"
        loading={isLoading}
        onClick={handleSubmit}  // Adicionamos o onClick aqui
      >
        Salvar alterações
      </LoadingButton>
    </Form>
  );
}