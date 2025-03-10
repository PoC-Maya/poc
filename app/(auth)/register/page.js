// /app/auth/register/page.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { registerUser } from "./action";
import { toast } from "sonner";
import { Form, TextField } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PlaceHolder from "@/components/general/PlaceHolder";
import { CircleArrowLeft, UserCheck2 } from "lucide-react";
import { HeaderSectionForPage } from "@/components/general/HeaderPage";

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
    <div className="mx-auto flex w-full flex-col justify-start py-6 px-6 relative">
      <Link href="/"><CircleArrowLeft className="absolute top-4 left-4 w-10 h-10 text-black" /></Link>
      <PlaceHolder
        title="Sign up and find your next trip"
        icon={<UserCheck2 className="w-10 h-10 text-black" />}
      />

      <Form id="registerForm" action={handleSubmit} className="w-full mx-auto">
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
          className="mt-4 w-full btn-primary uppercase text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Criar Conta"}
        </Button>
      </Form>

      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-10">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Already have an account?{" "}
        </span>
      </div>

      <div className="text-center">
        <Link href={"/login"}>
          <Button
            type="submit"
            className="w-full btn-secondary uppercase text-lg"
          >
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
