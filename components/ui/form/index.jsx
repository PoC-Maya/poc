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

// Componente de formulário com manipulação de erro e submissão
export function Form({ id, children, action, className = "" }) {
  return (
    <form id={id} action={action} className={className}>
      {children}
    </form>
  );
}


