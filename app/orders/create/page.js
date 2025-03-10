"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createOrder } from "./action";
import { toast } from "sonner";
import { Form, TextareaField, TextField } from "@/components/ui/form";

export default function OrderForm() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Adicionando função para limpar erros específicos ao campo
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
      // submitt for action
      const result = await createOrder(formData);

      if (result.success) {
        toast.success("Pedido criado com sucesso!");
        document.getElementById("orderForm").reset();
      } else {
        setErrors(result.errors || {});
      }

      if (result.errors?._form) {
        toast.error(result.errors._form);
      } else {
        toast.error("Verifique os erros no formulário");
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao processar seu pedido");
      return; // Impede o envio do formulário
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-4 container mx-auto">
      <Form id="orderForm" action={handleSubmit} className="max-w-md mx-auto">
        <TextareaField
          label="Conteúdo JSON"
          name="content"
          error={errors.content}
          required
          rows={8}
          placeholder='{"chave": "valor"}'
          className="font-mono"
          onChange={handleFieldChange}
        />

        <TextField
          label="Nome"
          name="name"
          error={errors.name}
          required
          placeholder="Nome do cliente"
          onChange={handleFieldChange}
        />

        <Button type="submit" className="mt-4 w-full btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Criar Pedido"}
        </Button>
      </Form>
    </div>
  );
}
