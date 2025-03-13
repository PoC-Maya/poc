Claro! Aqui está o prompt completo, em espanhol, que você pode copiar e colar na outra IA para gerar as telas:

---

**Prompt Completo - Onboarding para Guías**

---

### **Fase 1: Registro Inicial (Con Creación de Cuenta)**

**Objetivo**: El guía crea una cuenta personal con correo electrónico y contraseña para que pueda acceder más tarde y continuar con el proceso de registro, además de ver su progreso.

**Campos del Formulario**:
- **Nombre** (Campo de texto dinámico)
  - **Descripción**: "¿Qué nombre te gustaría que use para contactarte? (No es necesario que sea tu nombre completo)"
- **Apellido** (Campo de texto opcional, o puede estar vacío por ahora)
- **WhatsApp** (Campo de texto)
- **Correo Electrónico** (Campo de texto)
- **Contraseña** (Campo de contraseña)
  - **Confirmar Contraseña** (Campo de contraseña)
- [ ] **He leído y entiendo los términos y condiciones de la plataforma** (Casilla de verificación)

**Explicación del Nombre**:
- **"Nombre para Contacto"**: Este campo es para que el guía proporcione un nombre que desea usar para ser contactado. Puede ser un apodo o simplemente un nombre con el que se sienta cómodo. El nombre completo será solicitado más adelante durante la entrevista.

---

### **Fase 2: Confirmación de Correo y Entrevista**

**Objetivo**: Después de crear la cuenta, el guía debe confirmar su correo electrónico y luego tendrás una entrevista para revisar su perfil y aprobarlo.

**Pasos**:
1. **Confirmación de Correo**: Después de registrarse, el guía recibe un enlace de confirmación de correo electrónico.
2. **Entrevista y Aprobación**: Una vez confirmado el correo, el guía tendrá una entrevista contigo vía Google Meets, donde podrás completar los detalles de su perfil (incluyendo su nombre completo).

---

### **Fase 3: Progreso Visible y Continuación del Registro**

**Objetivo**: El guía podrá iniciar sesión en la plataforma y ver en qué etapa del proceso de registro se encuentra, pudiendo continuar cuando desee.

**Pasos**:
- **Inicio de Sesión**: Después de crear la cuenta y confirmar el correo, el guía podrá iniciar sesión en cualquier momento con su correo electrónico y contraseña.
- **Progreso Visible**: El sistema mostrará el progreso en el formulario, indicando la etapa actual (por ejemplo: **"Registro Completo"**, **"Perfil en Progreso"**, **"Esperando Aprobación"**). Esto permitirá que el guía sepa qué pasos le faltan y qué ha completado.

---

### **Fase 4: Registro Completo - Formulario Detallado**

**Objetivo**: Una vez que el guía sea aprobado, podrá completar su perfil detallado.

**Campos del Formulario Completo**:
- **Fecha de Nacimiento** (Campo de texto o selector de fecha)
- **Idiomas Hablados** (Campo de texto)
- **Subir Foto de Perfil** (Campo de carga de imagen)
- **Seleccionar Tour**: Mostrar 4 opciones de tours con checkbox, donde el guía elige cuál cree que se adapta más a su perfil. Incluir detalles como el valor y el itinerario de cada tour.
- **Registro en Stripe**: Explicar cómo funciona el registro en Stripe y pedir al guía que ingrese su código de cuenta de Stripe.

**Explicación**:
- Este formulario se puede completar parcialmente en cualquier momento. El guía puede guardar su progreso y volver más tarde para completar la información restante.
- Es importante mostrar un indicador de porcentaje de llenado para que el guía sepa qué tan avanzado está en el proceso.

---

### **Widget Explicativo en Formato Carrusel**

**Objetivo**: Antes de cada formulario, se debe mostrar un widget en formato carrusel que explique, paso a paso, lo que sucederá durante el proceso de registro.

- **Carrusel 1 (Registro Inicial)**:
  - **Icono o Imagen**: Un ícono de bienvenida.
  - **Título**: "¡Bienvenido a XploraCancun!"
  - **Descripción**: "En este primer paso, solo necesitas proporcionar algunos datos básicos para comenzar. Luego, podrás continuar con tu registro cuando quieras."

- **Carrusel 2 (Entrevista y Aprobación)**:
  - **Icono o Imagen**: Imagen de una entrevista o una videollamada.
  - **Título**: "Entrevista Personalizada"
  - **Descripción**: "Después de completar el registro, agendaremos una entrevista para conocerte mejor y aprobar tu perfil."

- **Carrusel 3 (Formulario Completo)**:
  - **Icono o Imagen**: Imagen de un formulario o documento.
  - **Título**: "Completa Tu Perfil"
  - **Descripción**: "Cuando seas aprobado, podrás completar tu perfil, elegir el tour que te interesa y registrarte en Stripe para comenzar a trabajar."

---

### **Resumen del Flujo de Registro**:

1. **Registro Inicial**: El guía completa el formulario con nombre, WhatsApp, correo electrónico, y contraseña. Recibe un enlace para confirmar su correo.
2. **Entrevista y Aprobación**: Después de la confirmación de correo, tendrás una entrevista con el guía para completar su perfil.
3. **Acceso al Progreso**: El guía puede iniciar sesión para ver su progreso y continuar en cualquier momento.
4. **Formulario Completo**: Después de la entrevista, el guía podrá completar su perfil y registrarse en Stripe.

---

Este flujo está diseñado para ser **sencillo**, **mobile-first** y enfocado en la **comunicación clara**. El widget carrusel ayuda a que el guía entienda qué pasará en cada paso del proceso, evitando frustración. Además, el sistema de login y seguimiento de progreso le permite retomar el proceso en cualquier momento.

---



// lib/supabase/server.js
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => cookieStore.set(name, value, options),
        remove: (name, options) => cookieStore.delete(name, options),
      },
    }
  );
}

// lib/hooks/useUser.js
import { cache } from 'react';
import { createClient } from "@/lib/supabase/server";

export const getUser = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !data?.user) {
    return { user: null, profile: null };
  }
  
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", data.user.id)
    .single();
    
  return { user: data.user, profile: profileData };
});

// lib/auth.js
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/hooks/useUser";

export async function withAuth(handler) {
  return async (formData) => {
    // Verificar autenticação
    const { user, profile } = await getUser();
    
    if (!user) {
      throw new Error("Não autenticado");
    }
    
    // Criar uma única instância do Supabase
    const supabase = await createClient();
    
    // Passar user, profile e supabase para o handler
    return handler({ user, profile, supabase, formData });
  };
}

// lib/rate-limit.js
import { createClient } from "@/lib/supabase/server";

export async function checkRateLimit(userId, actionType, limit = 10, windowSeconds = 60) {
  const supabase = await createClient();
  const now = new Date();
  const windowStart = new Date(now.getTime() - (windowSeconds * 1000));
  
  // Verificar se a tabela existe (criar se não existir)
  const { error: checkError } = await supabase.from('rate_limits').select('id').limit(1);
  
  if (checkError && checkError.code === '42P01') { // Tabela não existe
    // Criar tabela de rate limits
    await supabase.rpc('create_rate_limits_table');
  }
  
  // Buscar contagem de requisições no período
  const { count, error: countError } = await supabase
    .from('rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('action_type', actionType)
    .gte('created_at', windowStart.toISOString());
  
  if (countError) {
    console.error("Erro ao verificar rate limit:", countError);
    return; // Prosseguir em caso de erro para não bloquear o usuário
  }
    
  if (count >= limit) {
    throw new Error(`Limite de requisições excedido. Tente novamente em ${windowSeconds} segundos.`);
  }
  
  // Registrar esta requisição
  await supabase.from('rate_limits').insert({
    user_id: userId,
    action_type: actionType,
    created_at: now.toISOString()
  });
}

// lib/error-handler.js
export async function withErrorHandling(handler) {
  try {
    const result = await handler();
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error("Action error:", error);
    
    // Mapear tipos específicos de erro
    if (error.message.includes("Não autenticado")) {
      return {
        success: false,
        error: {
          code: "UNAUTHENTICATED",
          message: "Você precisa estar logado para realizar esta ação"
        }
      };
    }
    
    if (error.message.includes("Sem permissão")) {
      return {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Você não tem permissão para realizar esta ação"
        }
      };
    }
    
    if (error.message.includes("Limite de requisições")) {
      return {
        success: false,
        error: {
          code: "RATE_LIMITED",
          message: "Muitas requisições. Tente novamente em alguns minutos."
        }
      };
    }
    
    // Erro de validação
    if (error.message.includes("Dados inválidos")) {
      return {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: error.message.replace("Dados inválidos: ", "")
        }
      };
    }
    
    // Erro genérico (para produção, evite expor detalhes internos)
    return {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "Ocorreu um erro ao processar sua solicitação"
      }
    };
  }
}

// lib/validation.js
export function validateWithSchema(schema, formData) {
  try {
    // Converter FormData para objeto
    const formValues = {};
    for (const [key, value] of formData.entries()) {
      formValues[key] = value;
    }
    
    // Validar com schema Zod
    const result = schema.safeParse(formValues);
    
    if (!result.success) {
      return {
        success: false,
        error: {
          message: result.error.errors.map(err => `${err.path}: ${err.message}`).join('; ')
        }
      };
    }
    
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: `Erro na validação: ${error.message}`
      }
    };
  }
}

// -----------------------------
// SQL para criar tabela rate_limits (executar no SQL Editor do Supabase)
// -----------------------------

/*
-- Função para criar tabela rate_limits se não existir
CREATE OR REPLACE FUNCTION create_rate_limits_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS rate_limits (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    action_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
  );
  
  -- Adicionar índice para consultas rápidas
  CREATE INDEX IF NOT EXISTS idx_rate_limits_user_action_time 
  ON rate_limits(user_id, action_type, created_at);
  
  -- Adicionar política de expiração para limpar registros antigos
  CREATE OR REPLACE FUNCTION delete_old_rate_limits() RETURNS TRIGGER AS $$
  BEGIN
    DELETE FROM rate_limits WHERE created_at < NOW() - INTERVAL '1 day';
    RETURN NULL;
  END;
  $$ LANGUAGE plpgsql;
  
  -- Verificar se o trigger já existe antes de criar
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_delete_old_rate_limits'
  ) THEN
    CREATE TRIGGER trigger_delete_old_rate_limits
    AFTER INSERT ON rate_limits
    EXECUTE PROCEDURE delete_old_rate_limits();
  END IF;
  
  -- Adicionar RLS
  ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
  
  -- Policy para leitura
  CREATE POLICY "Users can read own rate limits"
    ON rate_limits FOR SELECT
    USING (auth.uid() = user_id);
  
  -- Policy para inserção
  CREATE POLICY "Users can insert own rate limits"
    ON rate_limits FOR INSERT
    WITH CHECK (auth.uid() = user_id);
END;
$$ LANGUAGE plpgsql;
*/

// -----------------------------
// Exemplo de uso
// -----------------------------

// app/actions.js
"use server";

import { withAuth } from '@/lib/auth';
import { withErrorHandling } from '@/lib/error-handler';
import { validateWithSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

// Schema de validação
const itemSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  price: z.string().transform(val => parseFloat(val)).refine(val => !isNaN(val) && val > 0, "Preço deve ser um número positivo")
});

// Action para criar um item
export async function createItem(formData) {
  return withErrorHandling(async () => {
    return withAuth(async ({ user, profile, supabase, formData }) => {
      // Verifica rate limit
      await checkRateLimit(user.id, 'create_item');
      
      // Valida dados
      const validation = validateWithSchema(itemSchema, formData);
      if (!validation.success) {
        throw new Error(`Dados inválidos: ${validation.error.message}`);
      }
      
      // Realiza a mutation
      const { data, error } = await supabase
        .from('items')
        .insert({ 
          ...validation.data, 
          user_id: user.id,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
        
      if (error) throw new Error(`Erro ao criar item: ${error.message}`);
      
      return data;
    })(formData);
  });
}

// Action para buscar itens do usuário
export async function getUserItems() {
  return withErrorHandling(async () => {
    return withAuth(async ({ user, supabase }) => {
      // Busca itens do usuário
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw new Error(`Erro ao buscar itens: ${error.message}`);
      
      return data;
    })();
  });
}

// Action para atualizar um item
export async function updateItem(formData) {
  return withErrorHandling(async () => {
    return withAuth(async ({ user, supabase, formData }) => {
      // Obter ID do item
      const id = formData.get('id');
      if (!id) throw new Error("ID do item é obrigatório");
      
      // Verifica rate limit
      await checkRateLimit(user.id, 'update_item');
      
      // Valida dados
      const validation = validateWithSchema(itemSchema, formData);
      if (!validation.success) {
        throw new Error(`Dados inválidos: ${validation.error.message}`);
      }
      
      // Verifica se o item pertence ao usuário
      const { data: item, error: fetchError } = await supabase
        .from('items')
        .select('user_id')
        .eq('id', id)
        .single();
        
      if (fetchError) throw new Error(`Item não encontrado: ${fetchError.message}`);
      if (item.user_id !== user.id) throw new Error("Sem permissão para editar este item");
      
      // Atualiza o item
      const { data, error } = await supabase
        .from('items')
        .update({
          ...validation.data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw new Error(`Erro ao atualizar item: ${error.message}`);
      
      return data;
    })(formData);
  });
}

// Action para deletar um item
export async function deleteItem(formData) {
  return withErrorHandling(async () => {
    return withAuth(async ({ user, supabase, formData }) => {
      // Obter ID do item
      const id = formData.get('id');
      if (!id) throw new Error("ID do item é obrigatório");
      
      // Verifica rate limit
      await checkRateLimit(user.id, 'delete_item');
      
      // Verifica se o item pertence ao usuário
      const { data: item, error: fetchError } = await supabase
        .from('items')
        .select('user_id')
        .eq('id', id)
        .single();
        
      if (fetchError) throw new Error(`Item não encontrado: ${fetchError.message}`);
      if (item.user_id !== user.id) throw new Error("Sem permissão para deletar este item");
      
      // Deleta o item
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);
        
      if (error) throw new Error(`Erro ao deletar item: ${error.message}`);
      
      return { id, success: true };
    })(formData);
  });
}