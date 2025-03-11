// app/(protected)/profile/profile-form.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form, TextField, TextareaField } from "@/components/ui/form/index";
import { updateProfile } from "../action";

export function ProfileForm({ userProfile }) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFieldChange = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  async function handleSubmit(formData) {
    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await updateProfile(formData);
      console.log("Result:", result);
      if (result.success) {
        toast.success("Suas informações foram atualizadas com sucesso.");
        router.refresh();
      } else {
        setErrors(result.errors || {});
        if (result.errors?._form) {
          toast.error(result.errors._form);
        } else {
          toast.error("Verifique os erros no formulário");
        }
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao atualizar suas informações.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form
      id="updateProfileForm"
      action={handleSubmit}
      className="w-full mx-auto"
    >
      <TextField
        label="Full Name"
        name="fullName"
        type="text"
        error={errors.fullName}
        required
        placeholder="Seu nome completo"
        onChange={handleFieldChange}
        defaultValue={userProfile?.full_name}
      />

      <TextField
        label="Cellphone"
        name="phone"
        type="phone"
        error={errors.phone}
        required
        placeholder="(999) 9999-9999"
        onChange={handleFieldChange}
        defaultValue={userProfile?.phone}
      />

      <TextareaField
        label="Talk about yourself"
        name="bio"
        error={errors.bio}
        required
        rows={8}
        placeholder="Speak about yourself in 100 characters or less"
        onChange={handleFieldChange}
        defaultValue={userProfile?.bio}
      />

      <Button
        type="submit"
        className="mt-4 w-full btn-primary uppercase text-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Save changes"}
      </Button>
    </Form>
  );
}
