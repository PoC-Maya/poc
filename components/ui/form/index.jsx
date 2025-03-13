"use client";

import { forwardRef } from "react";
import { Label } from "../label";
import { Input } from "../input";
import { Textarea } from "../textarea";


// Componente de campo com tratamento de erro
export const FormField = forwardRef(
  ({ label, name, error, children, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && <Label htmlFor={name}>{label}</Label>}
        {children ? (
          children
        ) : (
          <Input
            id={name}
            name={name}
            ref={ref}
            className={`mt-2 ${error ? "border-red-500" : ""}`}
            {...props}
          />
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);
FormField.displayName = "FormField";

// Componente de campo de texto
export const TextField = forwardRef(({ label, name, error, ...props }, ref) => {
  return (
    <FormField label={label} name={name} error={error}>
      <Input
        id={name}
        name={name}
        ref={ref}
        className={`mt-2 ${error ? "border-red-500" : ""}`}
        {...props}
      />
    </FormField>
  );
});
TextField.displayName = "TextField";

// Componente de área de texto
export const TextareaField = forwardRef(
  ({ label, name, error, ...props }, ref) => {
    return (
      <FormField label={label} name={name} error={error}>
        <Textarea
          id={name}
          name={name}
          ref={ref}
          className={`mt-2 ${error ? "border-red-500" : ""}`}
          {...props}
        />
      </FormField>
    );
  }
);
TextareaField.displayName = "TextareaField";

export const WhatsappField = forwardRef(({ label, name, error, ...props }, ref) => {
  const handleInput = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove não-dígitos
    
    // Força o código do país para ser 52 (México)
    if (value.length >= 2) {
      value = '52' + value.substring(2);
    }
    
    // Formata o número
    if (value.length > 0) {
      value = value.substring(0, 12); // Limita a 12 dígitos
      let formattedValue = '';
      
      // Adiciona +52
      formattedValue = '+52 ';
      
      // Adiciona (XXX)
      if (value.length > 2) {
        formattedValue += '(' + value.substring(2, 5);
        if (value.length > 5) {
          formattedValue += ') ';
          // Adiciona XXX
          formattedValue += value.substring(5, 8);
          if (value.length > 8) {
            // Adiciona -XXXX
            formattedValue += '-' + value.substring(8, 12);
          }
        }
      }
      
      e.target.value = formattedValue;
    }
  };

  return (
    <FormField label={label} name={name} error={error}>
      <Input
        id={name}
        name={name}
        ref={ref}
        onInput={handleInput}
        className={`mt-2 ${error ? "border-red-500" : ""}`}
        placeholder="+52 (XXX) XXX-XXXX"
        maxLength={19}
        {...props}
      />
    </FormField>
  );
});

// Componente de campo de senha
export const PasswordField = forwardRef(({ label, name, error, ...props }, ref) => {
  return (
    <FormField label={label} name={name} error={error}>
      <Input
        id={name}
        name={name}
        type="password"
        ref={ref}
        className={`mt-2 ${error ? "border-red-500" : ""}`}
        autoComplete={name === "currentPassword" ? "current-password" : "new-password"}
        {...props}
      />
    </FormField>
  );
});
PasswordField.displayName = "PasswordField";

// Componente de formulário com manipulação de erro e submissão
export function Form({ id, children, action, className = "" }) {
  return (
    <form id={id} action={action} className={className}>
      {children}
    </form>
  );
}


