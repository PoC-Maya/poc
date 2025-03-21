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

# Chat - Requisitos e Funcionalidades

## Visão Geral
Sistema de chat para comunicação entre guias e turistas, integrado ao dashboard administrativo dos guias e área do turista.

## Estrutura de Acesso
- **Guias**: Acesso via `/dashboard/chat`
- **Turistas**: Acesso via `/me/chat`

## Regras de Negócio
1. **Iniciação de Conversas**
   - Sempre iniciada através do perfil do guia
   - Botão "Fale com o guia" para iniciar conversa
   - Uma conversa ativa por vez entre guia-turista

2. **Gestão de Conversas**
   - Conversas não são fechadas permanentemente
   - Tornam-se inativas após 3 meses sem mensagens
   - Sistema de arquivamento para conversas inativas
   - Possibilidade de reativar conversas arquivadas

3. **Status de Conversas**
   - Ativas
   - Inativas (após 3 meses)
   - Arquivadas
   - Banner indicativo para conversas inativas

## Interface

### Layout Desktop
- **Guias**: View parcial integrada ao dashboard
- **Turistas**: View em tela cheia
- Sidebar recolhível (não fixa)
- Mobile-first design

### Componentes UI
- Utilização exclusiva de componentes shadcn-ui
- Lista de conversas
- Área de mensagens
- Indicadores de status

## Funcionalidades

### Mensagens
- Apenas texto (sem suporte para arquivos/fotos)
- Indicador de digitação em tempo real
- Status de presença (online/offline)
- Timestamp das mensagens

### Notificações
1. **Email**
   - Notificações com moderação (evitar spam)
   - Possível resumo periódico

2. **Web Notifications**
   - Notificações push no navegador
   - Requer permissão do usuário

3. **Sons**
   - Alertas sonoros para novas mensagens
   - Configurável pelo usuário

## Tecnologias

### Backend
- Supabase para real-time messaging
- SQL para tabelas e procedures
- Row Level Security (RLS) para proteção de dados

### Frontend
- Next.js (JavaScript)
- shadcn-ui para componentes
- Supabase Client para real-time

## Tabelas Principais
1. **conversations**
   - ID da conversa
   - ID do guia
   - ID do turista
   - Status (ativo/inativo/arquivado)
   - Data última mensagem
   - Data criação

2. **messages**
   - ID da mensagem
   - ID da conversa
   - ID do remetente
   - Conteúdo
   - Timestamp
   - Status (enviado/lido)

3. **notification_settings**
   - ID do usuário
   - Preferências de email
   - Preferências de web notifications
   - Preferências de som

## Segurança
- Autenticação requerida
- Verificação de permissões por conversa
- Proteção contra spam
- Limitação de taxa de mensagens

## Métricas
- Total de mensagens
- Tempo médio de resposta
- Taxa de engajamento
- Status das conversas



<!-- TELAS -->

- Experiências gerenciadas pela plataforma - pacotes prontos, com suporte, qualidade garantida e menos esforço para o guia iniciar

- Experiências próprias do guia - total liberdade criativa, diferenciação no mercado, mas com mais responsabilidade
