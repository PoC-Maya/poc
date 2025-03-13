"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { Form, PasswordField } from "@/components/ui/form/index";
import { LoadingButton } from "@/components/ui/form/loading-button";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { updatePassword } from "../action";

export function PasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const [state, formAction] = useActionState(updatePassword, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (state && state !== "pending") {
      setIsSubmitting(false);
      if (state.success) {
        toast.success("Senha atualizada com sucesso!");
        document.getElementById("passwordForm").reset();
        setIsOpen(false);
      } else if (state.errors?._form) {
        toast.error(state.errors._form);
      }
    }
  }, [state]);

  const handleSubmit = async () => {
    if (!document.getElementById("passwordForm").checkValidity()) {
      return; // Não submete se o form não estiver válido
    }
    setIsSubmitting(true);
    document.getElementById("passwordForm").requestSubmit();
  };

  const isLoading = isSubmitting || state === "pending";

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="btn btn-ghost"
      >
        Alterar Senha
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Alterar Senha</DrawerTitle>
            </DrawerHeader>

            <div className="p-4">
              <Form 
                id="passwordForm" 
                action={formAction}
                className="space-y-4"
              >
                <PasswordField
                  label="Senha Atual"
                  name="currentPassword"
                  error={state.errors?.currentPassword}
                  required
                />

                <PasswordField
                  label="Nova Senha"
                  name="newPassword"
                  error={state.errors?.newPassword}
                  required
                />

                <PasswordField
                  label="Confirmar Nova Senha"
                  name="confirmPassword"
                  error={state.errors?.confirmPassword}
                  required
                />

                <DrawerFooter className="pt-2">
                  <LoadingButton
                    type="submit"
                    className="btn btn-primary"
                    loading={isLoading}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Atualizar Senha
                  </LoadingButton>
                  <DrawerClose asChild>
                    <Button className="btn btn-ghost">Cancelar</Button>
                  </DrawerClose>
                </DrawerFooter>
              </Form>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}