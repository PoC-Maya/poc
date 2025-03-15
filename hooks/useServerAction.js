"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useServerAction() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const router = useRouter();

  const resetState = useCallback(() => {
    setError("");
    setData(null);
  }, []);

  const executeAction = useCallback(
    async (actionFn, payload = {}, options = {}) => {
      const {
        showLoader = true,
        redirectTo = null,
        successCallback = null,
        errorCallback = null,
        finallyCallback = null,
      } = options;

      if (showLoader) setIsLoading(true);
      setError("");

      try {
        // Converter payload para FormData se não for
        let formData;

        if (payload instanceof FormData) {
          formData = payload;
        } else if (
          payload instanceof Event &&
          payload.target &&
          payload.target.tagName === "FORM"
        ) {
          payload.preventDefault();
          formData = new FormData(payload.target);
        } else {
          formData = new FormData();
          // Adicionar cada propriedade do objeto ao FormData
          Object.entries(payload).forEach(([key, value]) => {
            if (value === undefined || value === null) {
              return; // Pular valores undefined/null
            }

            // Tratar arrays e objetos convertendo para JSON
            if (typeof value === "object") {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, String(value));
            }
          });
        }

        // Chamar a action
        const result = await actionFn(formData);

        // Processar resultado
        if (result.success) {
          setData(result.data || null);

          // Callback de sucesso personalizado
          if (successCallback) {
            successCallback(result);
          }

          // Redirecionamento após sucesso
          if (redirectTo) {
            router.push(redirectTo);
          }
        } else {
          const errorMsg = result.error || "Ocorreu um erro. Tente novamente.";
          setError(errorMsg);

          // Callback de erro personalizado
          if (errorCallback) {
            errorCallback(result);
          }
        }

        return result;
      } catch (err) {
        console.error("Erro ao executar action:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Ocorreu um erro inesperado. Tente novamente.";
        setError(errorMessage);

        // Callback de erro personalizado
        if (errorCallback) {
          errorCallback({ success: false, error: errorMessage });
        }

        return { success: false, error: errorMessage };
      } finally {
        if (showLoader) setIsLoading(false);

        // Callback final personalizado
        if (finallyCallback) {
          finallyCallback();
        }
      }
    },
    [router]
  );

  // Função auxiliar para formulários
  const handleSubmit = useCallback(
    (actionFn, options = {}) => {
      return async (e) => {
        e.preventDefault();
        return executeAction(actionFn, e, options);
      };
    },
    [executeAction]
  );

  // Função auxiliar para botões
  const handleClick = useCallback(
    (actionFn, payload = {}, options = {}) => {
      return async () => {
        return executeAction(actionFn, payload, options);
      };
    },
    [executeAction]
  );

  return {
    executeAction,
    handleSubmit,
    handleClick,
    isLoading,
    error,
    data,
    setError,
    setData,
    resetState,
  };
}
