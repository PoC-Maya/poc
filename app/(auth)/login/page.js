// /auth/login/page.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { login } from "./action";
import { toast } from "sonner";
import { Form, TextField } from "@/components/ui/form/index";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HeaderSectionForPage } from "@/components/general/HeaderPage";
import PlaceHolder from "@/components/general/PlaceHolder";
import { UserCheck2 } from "lucide-react";

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
    <div className="container max-w-md">
      <div className="flex flex-col space-y-6 px-6 py-6  h-screen">
        <PlaceHolder
          title={"Signin"}
          message={"Welcome back!"}
          icon={<UserCheck2 className="w-10 h-10 text-primary" />}
        />
        <Form id="loginForm" action={handleSubmit} className="w-full">
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
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : "Entrar"}
          </Button>
        </Form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Dont have an account?
          </span>
        </div>
        <div className="text-center">
          <Link href={"/register"}>
            <Button type="submit" className="btn btn-secondary">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
