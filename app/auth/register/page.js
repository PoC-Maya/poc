// /app/auth/register/page.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { registerUser } from "./action";
import { toast } from "sonner";
import { Form, TextField } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
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
      const result = await registerUser(formData);

      if (result.success) {
        toast.success("Registro realizado com sucesso!");
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
      toast.error("Ocorreu um erro ao processar seu registro");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>
      <Form id="registerForm" action={handleSubmit} className="max-w-md mx-auto">
        <TextField
          label="Nome Completo"
          name="fullName"
          type="text"
          error={errors.fullName}
          required
          placeholder="Seu nome completo"
          onChange={handleFieldChange}
        />

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
          label="Telefone"
          name="phone"
          type="tel"
          error={errors.phone}
          placeholder="(00) 00000-0000"
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

        <TextField
          label="Confirmar Senha"
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword}
          required
          placeholder="Confirme sua senha"
          onChange={handleFieldChange}
        />

        <Button
          type="submit"
          className="mt-4 w-full btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Criar Conta"}
        </Button>

        <div className="text-center mt-4">
          Já tem uma conta?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Faça login
          </Link>
        </div>
      </Form>
    </div>
  );
}