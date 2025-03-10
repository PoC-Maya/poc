// /auth/login/page.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { login } from "./action";
import { toast } from "sonner";
import { Form, TextField } from "@/components/ui/form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
      const result = await login(formData);

      if (result.success) {
        toast.success("Login realizado com sucesso!");
        router.push("/"); // Redirecionar para a área logada
      } else {
        setErrors(result.errors || {});

        if (result.errors?._form) {
          toast.error(result.errors._form);
        } else {
          toast.error("Verifique os erros no formulário");
        }
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao processar seu login");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <Form id="loginForm" action={handleSubmit} className="max-w-md mx-auto">
        <TextField
          label="Email"
          name="email"
          type="email"
          error={errors.email}
          required
          placeholder="seu@email.com"
          onChange={handleFieldChange}
        />

        <TextField
          label="Senha"
          name="password"
          type="password"
          error={errors.password}
          required
          placeholder="Sua senha"
          onChange={handleFieldChange}
        />

        <Button
          type="submit"
          className="mt-4 w-full btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Entrar"}
        </Button>
      </Form>
    </div>
  );
}