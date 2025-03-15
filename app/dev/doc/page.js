// app/docs/server-actions/page.js
import CodeBlock from "@/components/dev/code-block";

export default function ServerActionsDocPage() {

 const hook = `"use client";

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
`;

  const example1 = `
  // EM FORMULARIO DE LOGIN
'use client'

import { useServerAction } from '@/hooks/useServerAction';
import { login } from '@/app/actions/auth/login';

export default function LoginForm() {
  const { handleSubmit, isLoading, error } = useServerAction();

  return (
    <form onSubmit={handleSubmit(login, { redirectTo: '/dashboard' })}>
      {error && <div className="text-red-500">{error}</div>}

      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full border p-2"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}`;

  const example2 = `
// BOTAO DE ACAO
'use client'

import { useServerAction } from '@/hooks/useServerAction';
import { deleteItem } from '@/app/actions/items/delete';
import { toast } from 'react-hot-toast';

export default function DeleteButton({ itemId }) {
  const { handleClick, isLoading } = useServerAction();

  const handleDelete = handleClick(deleteItem, { id: itemId }, {
    successCallback: () => toast.success('Item excluído com sucesso!'),
    errorCallback: (result) => toast.error(result.error)
  });

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      {isLoading ? 'Excluindo...' : 'Excluir'}
    </button>
  );
}
`;

  const example3 = `
// EM USE EFECT
'use client'

import { useEffect } from 'react';
import { useServerAction } from '@/hooks/useServerAction';
import { fetchUserData } from '@/app/actions/user/fetch-data';

export default function UserProfile() {
  const { executeAction, isLoading, data, error } = useServerAction();

  useEffect(() => {
    executeAction(fetchUserData, {}, {
      showLoader: true
    });
  }, [executeAction]);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>Perfil de {data.name}</h1>
      {/* Renderizar os dados do usuário */}
    </div>
  );
}`;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Padrões para Server Actions</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Resumo do Hook useServerAction
        </h2>
        <p className="mb-4">
          Este hook personalizado fornece uma abstração elegante para trabalhar
          com Server Actions no Next.js, simplificando a integração em
          diferentes contextos da UI (formulários, botões, useEffect, etc).
        </p>
        <p className="mb-4">
          O `useServerAction` encapsula toda a lógica de estado, incluindo
          gerenciamento de carregamento, tratamento de erros e callbacks de
          sucesso, permitindo uma experiência de desenvolvimento mais fluida e
          consistente. Ele centraliza o tratamento de erros, gerencia estados de
          carregamento e oferece callbacks personalizáveis, resultando em
          componentes mais limpos e com menos código boilerplate.
        </p>
        <p className="mb-4">
          Com este hook, você pode facilmente invocar qualquer Server Action da
          sua aplicação, passar parâmetros, lidar com resultados e erros, tudo
          isso mantendo uma interface consistente em toda a aplicação. Isso
          promove a reutilização de código e melhora a manutenibilidade do
          projeto.
        </p>
        <CodeBlock  code={example1} />
        <CodeBlock  code={example2} />
        <CodeBlock  code={example3} />

        <h2 className="text-2xl font-semibold mb-4">Hook <CodeBlock  code={`useServeAction`} /></h2>
        <CodeBlock  code={hook} />
      </section>
    </div>
  );
}
