### Resumo do Entendimento e Estrutura do Banco de Dados

Baseado nas informações fornecidas, entendo que precisamos criar um banco de dados no Supabase para uma plataforma de turismo que conecta guias turísticos e turistas. A plataforma já possui interfaces desenvolvidas, e agora precisamos criar a estrutura do banco de dados que suporte essas interfaces.

## Visão Geral do Sistema

- **Plataforma**: Supabase
- **Escala**: Máximo de 200 guias, 1000 experiências, 200-500 reservas mensais
- **Idiomas**: 6 idiomas, com inglês como principal e traduções em tabela separada
- **Pagamentos**: Via Stripe, comissão padrão 26% plataforma/74% guia
- **Tipos de Experiências**:

1. **Clone**: Guia escolhe experiência pré-fabricada do marketplace
2. **Custom**: Guia cria experiência do zero
3. **Cotação**: Versão simplificada criada via chat, gera link de pagamento





## Estrutura de Tabelas Proposta

### 1. Users (Usuários)

```plaintext
- id (uuid, PK)
- auth_id (text) - ID do Auth do Supabase
- email (text)
- full_name (text)
- avatar_url (text)
- phone (text)
- created_at (timestamp)
- updated_at (timestamp)
- last_sign_in (timestamp)
- user_type (enum: 'tourist', 'guide', 'admin')
- is_active (boolean)
- preferred_language (text)
```

### 2. Guides (Guias)

```plaintext
- id (uuid, PK)
- user_id (uuid, FK -> users.id)
- bio (text)
- location (text)
- experience_years (integer)
- languages (text[])
- specialties (text[])
- certifications (text[])
- verified (boolean)
- commission_rate (numeric) - Percentual personalizado, default 74%
- response_rate (numeric)
- response_time (text)
- cover_image (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### 3. Categories (Categorias de Experiências)

```plaintext
- id (uuid, PK)
- name (text)
- slug (text)
- icon (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### 4. Locations (Locais/Cidades)

```plaintext
- id (uuid, PK)
- name (text)
- country (text)
- state (text)
- latitude (numeric)
- longitude (numeric)
- created_at (timestamp)
- updated_at (timestamp)
```

### 5. Experiences (Experiências/Produtos)

```plaintext
- id (uuid, PK)
- title (text)
- short_description (text)
- full_description (text)
- slug (text, unique)
- duration (numeric)
- min_capacity (integer)
- max_capacity (integer)
- cover_image (text)
- gallery_images (text[])
- available_languages (text[])
- services_included (text[])
- services_not_included (text[])
- transport_mode (text)
- category_id (uuid, FK -> categories.id)
- location_id (uuid, FK -> locations.id)
- meeting_point (text)
- meeting_point_coordinates (jsonb)
- is_active (boolean)
- experience_type (enum: 'clone', 'custom', 'quotation')
- is_template (boolean) - Para experiências pré-fabricadas do marketplace
- created_at (timestamp)
- updated_at (timestamp)
```

### 6. Experience_Translations (Traduções de Experiências)

```plaintext
- id (uuid, PK)
- experience_id (uuid, FK -> experiences.id)
- language_code (text)
- title (text)
- short_description (text)
- full_description (text)
- services_included (text[])
- services_not_included (text[])
- meeting_point (text)
- created_at (timestamp)
- updated_at (timestamp)
- last_translated_at (timestamp)
```

### 7. Experience_Guides (Relação Guias-Experiências)

```plaintext
- id (uuid, PK)
- experience_id (uuid, FK -> experiences.id)
- guide_id (uuid, FK -> guides.id)
- is_owner (boolean) - Se é o criador original ou apenas um guia que oferece
- commission_rate (numeric) - Pode variar por experiência
- created_at (timestamp)
- updated_at (timestamp)
```

### 8. Itinerary_Items (Itens do Itinerário)

```plaintext
- id (uuid, PK)
- experience_id (uuid, FK -> experiences.id)
- title (text)
- description (text)
- start_time (text) - Ex: "09:00"
- duration (numeric) - Em minutos ou horas
- order (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

### 9. Pricing_Tiers (Faixas de Preço)

```plaintext
- id (uuid, PK)
- experience_id (uuid, FK -> experiences.id)
- min_participants (integer)
- max_participants (integer)
- adult_price (numeric)
- teenager_price (numeric)
- child_price (numeric)
- created_at (timestamp)
- updated_at (timestamp)
```

### 10. Availability (Disponibilidade)

```plaintext
- id (uuid, PK)
- guide_id (uuid, FK -> guides.id)
- experience_id (uuid, FK -> experiences.id)
- date (date)
- is_available (boolean)
- available_times (text[]) - Array de horários disponíveis
- created_at (timestamp)
- updated_at (timestamp)
```

### 11. Bookings (Reservas)

```plaintext
- id (uuid, PK)
- experience_id (uuid, FK -> experiences.id)
- guide_id (uuid, FK -> guides.id)
- tourist_id (uuid, FK -> users.id)
- booking_date (date)
- booking_time (time)
- adult_count (integer)
- teenager_count (integer)
- child_count (integer)
- adult_price (numeric)
- teenager_price (numeric)
- child_price (numeric)
- subtotal (numeric)
- total_price (numeric)
- platform_commission_percentage (numeric)
- platform_commission_amount (numeric)
- guide_commission_amount (numeric)
- status (enum: 'pending', 'confirmed', 'completed', 'cancelled')
- cancellation_date (date)
- cancellation_reason (text)
- tourist_name (text)
- tourist_email (text)
- tourist_phone (text)
- hotel (text)
- special_requests (text)
- stripe_session_id (text)
- stripe_payment_intent (text)
- stripe_transfer_id (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### 12. Reviews (Avaliações)

```plaintext
- id (uuid, PK)
- booking_id (uuid, FK -> bookings.id)
- experience_id (uuid, FK -> experiences.id)
- guide_id (uuid, FK -> guides.id)
- tourist_id (uuid, FK -> users.id)
- rating (integer) - 1 a 5
- comment (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### 13. Chats (Conversas)

```plaintext
- id (uuid, PK)
- tourist_id (uuid, FK -> users.id)
- guide_id (uuid, FK -> guides.id)
- last_message (text)
- last_message_time (timestamp)
- is_read_by_tourist (boolean)
- is_read_by_guide (boolean)
- created_at (timestamp)
- updated_at (timestamp)
```

### 14. Messages (Mensagens)

```plaintext
- id (uuid, PK)
- chat_id (uuid, FK -> chats.id)
- sender_id (uuid, FK -> users.id)
- sender_type (enum: 'tourist', 'guide')
- message (text)
- is_read (boolean)
- created_at (timestamp)
```

### 15. Quotations (Cotações)

```plaintext
- id (uuid, PK)
- chat_id (uuid, FK -> chats.id)
- guide_id (uuid, FK -> guides.id)
- tourist_id (uuid, FK -> users.id)
- title (text)
- description (text)
- itinerary (text)
- date (date)
- duration (numeric)
- people_count (integer)
- price (numeric)
- meeting_point (text)
- inclusions (text[])
- exclusions (text[])
- status (enum: 'pending', 'approved', 'rejected', 'paid')
- created_at (timestamp)
- updated_at (timestamp)
```

### 16. Blog_Posts (Posts do Blog)

```plaintext
- id (uuid, PK)
- title (text)
- slug (text)
- content (text)
- excerpt (text)
- cover_image (text)
- author_id (uuid, FK -> users.id)
- category (text)
- tags (text[])
- published (boolean)
- published_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

## Relacionamentos Principais

1. Um usuário pode ser um turista ou um guia
2. Um guia pode oferecer múltiplas experiências
3. Uma experiência pode ter múltiplos guias (no caso de clones)
4. Uma experiência tem um itinerário com múltiplos itens
5. Uma experiência tem múltiplas faixas de preço
6. Um guia tem disponibilidade para cada experiência
7. Um turista pode fazer múltiplas reservas
8. Uma reserva está associada a uma experiência, um guia e um turista
9. Um turista pode deixar uma avaliação após uma reserva
10. Um turista e um guia podem ter múltiplas conversas
11. Uma conversa tem múltiplas mensagens
12. Uma cotação está associada a uma conversa


Esta estrutura suporta os três tipos de experiências mencionados e todas as funcionalidades mostradas nas interfaces. A tabela de traduções permite implementar a estratégia de internacionalização mencionada.

Gostaria de saber se esta estrutura atende às suas necessidades ou se precisa de ajustes antes de prosseguirmos com a criação dos scripts SQL detalhados.


### SOBRE O BANCO DE DADOS 
Este esquema completo de banco de dados para o Supabase resolve seu problema de disponibilidade de guias através de uma abordagem baseada em blocos de horário. Em vez de armazenar cada intervalo de 30 minutos individualmente, agora você tem:

Templates de disponibilidade semanal - Onde o guia define seu padrão de trabalho
Blocos de horário - Períodos contínuos (ex: 9h-12h, 14h-17h)
Exceções - Para datas específicas (bloqueios ou disponibilidades extras)
Funções úteis:

- check_guide_availability - Verifica disponibilidade em horário específico
- get_available_times - Retorna todos os horários disponíveis em uma data
- can_book_experience - Verifica se uma reserva pode ser feita


Esta estrutura oferece várias vantagens:

Redução drástica no número de registros - De milhares para apenas alguns por guia
Melhor desempenho - Menos registros = consultas mais rápidas
Flexibilidade - Fácil de adicionar exceções para bloqueios ou dias especiais
Escalabilidade - Suporta bem o crescimento de guias e experiências

As views e índices adicionados também ajudarão no desempenho e facilitarão a obtenção de estatísticas importantes para o negócio.
O banco de dados está projetado para funcionar bem com o Supabase e pode ser facilmente configurado através da interface deles.

<!-- BANCO DE DADOS -->
-- Habilita a extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tipos enumerados
CREATE TYPE user_type AS ENUM ('tourist', 'guide', 'admin');
CREATE TYPE experience_type AS ENUM ('clone', 'custom', 'quotation');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE sender_type AS ENUM ('tourist', 'guide');
CREATE TYPE quotation_status AS ENUM ('pending', 'approved', 'rejected', 'paid');

-- Triggers para atualização automática do updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tabela de Usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id TEXT UNIQUE, -- ID do Auth do Supabase
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_sign_in TIMESTAMPTZ,
    user_type user_type NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    preferred_language TEXT DEFAULT 'en'
);

-- Aplicamos o trigger em todas as tabelas que têm updated_at
CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Guias
CREATE TABLE guides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    location TEXT,
    experience_years INTEGER,
    languages TEXT[],
    specialties TEXT[],
    certifications TEXT[],
    verified BOOLEAN DEFAULT FALSE,
    commission_rate NUMERIC DEFAULT 74, -- Percentual padrão 74%
    response_rate NUMERIC,
    response_time TEXT,
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

CREATE TRIGGER update_guides_timestamp
BEFORE UPDATE ON guides
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Categorias
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_categories_timestamp
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Localizações
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    state TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_locations_timestamp
BEFORE UPDATE ON locations
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Experiências
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    short_description TEXT,
    full_description TEXT,
    slug TEXT UNIQUE NOT NULL,
    duration NUMERIC NOT NULL, -- Em horas
    min_capacity INTEGER NOT NULL,
    max_capacity INTEGER NOT NULL,
    cover_image TEXT,
    gallery_images TEXT[],
    available_languages TEXT[],
    services_included TEXT[],
    services_not_included TEXT[],
    transport_mode TEXT,
    category_id UUID REFERENCES categories(id),
    location_id UUID REFERENCES locations(id),
    meeting_point TEXT,
    meeting_point_coordinates JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    experience_type experience_type NOT NULL,
    is_template BOOLEAN DEFAULT FALSE, -- Para experiências do marketplace
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Campos adicionais para melhorias
    cancellation_policy TEXT,
    what_to_bring TEXT[],
    accessibility_options TEXT[],
    meta_title TEXT,
    meta_description TEXT,
    keywords TEXT[]
);

CREATE TRIGGER update_experiences_timestamp
BEFORE UPDATE ON experiences
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Traduções de Experiências
CREATE TABLE experience_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    language_code TEXT NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT,
    full_description TEXT,
    services_included TEXT[],
    services_not_included TEXT[],
    meeting_point TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_translated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(experience_id, language_code)
);

CREATE TRIGGER update_experience_translations_timestamp
BEFORE UPDATE ON experience_translations
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Relação Guias-Experiências
CREATE TABLE experience_guides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    is_owner BOOLEAN DEFAULT FALSE,
    commission_rate NUMERIC, -- Pode ser NULL para usar o padrão do guia
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(experience_id, guide_id)
);

CREATE TRIGGER update_experience_guides_timestamp
BEFORE UPDATE ON experience_guides
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Itens do Itinerário
CREATE TABLE itinerary_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    start_time TEXT, -- Exemplo: "09:00"
    duration NUMERIC, -- Em minutos ou horas
    order_num INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_itinerary_items_timestamp
BEFORE UPDATE ON itinerary_items
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Faixas de Preço
CREATE TABLE pricing_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    min_participants INTEGER NOT NULL,
    max_participants INTEGER NOT NULL,
    adult_price NUMERIC NOT NULL,
    teenager_price NUMERIC,
    child_price NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_pricing_tiers_timestamp
BEFORE UPDATE ON pricing_tiers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- NOVA ESTRUTURA DE DISPONIBILIDADE --

-- Templates de disponibilidade padrão semanal
CREATE TABLE guide_availability_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    name TEXT, -- Ex: "Horário padrão verão", "Horário alta temporada"
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_guide_availability_templates_timestamp
BEFORE UPDATE ON guide_availability_templates
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Blocos de horário para os templates
CREATE TABLE availability_time_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID NOT NULL REFERENCES guide_availability_templates(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL, -- 0-6 (domingo-sábado)
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CHECK (start_time < end_time),
    CHECK (day_of_week BETWEEN 0 AND 6)
);

CREATE TRIGGER update_availability_time_blocks_timestamp
BEFORE UPDATE ON availability_time_blocks
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Exceções de disponibilidade (datas específicas)
CREATE TABLE availability_exceptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    exception_date DATE NOT NULL,
    is_available BOOLEAN NOT NULL, -- true = disponível, false = bloqueado
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(guide_id, experience_id, exception_date)
);

CREATE TRIGGER update_availability_exceptions_timestamp
BEFORE UPDATE ON availability_exceptions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Blocos de horário para exceções
CREATE TABLE availability_exception_time_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exception_id UUID NOT NULL REFERENCES availability_exceptions(id) ON DELETE CASCADE,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CHECK (start_time < end_time)
);

CREATE TRIGGER update_availability_exception_time_blocks_timestamp
BEFORE UPDATE ON availability_exception_time_blocks
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Reservas
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experience_id UUID NOT NULL REFERENCES experiences(id),
    guide_id UUID NOT NULL REFERENCES guides(id),
    tourist_id UUID NOT NULL REFERENCES users(id),
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    adult_count INTEGER NOT NULL DEFAULT 0,
    teenager_count INTEGER NOT NULL DEFAULT 0,
    child_count INTEGER NOT NULL DEFAULT 0,
    adult_price NUMERIC NOT NULL,
    teenager_price NUMERIC NOT NULL DEFAULT 0,
    child_price NUMERIC NOT NULL DEFAULT 0,
    subtotal NUMERIC NOT NULL,
    total_price NUMERIC NOT NULL,
    platform_commission_percentage NUMERIC NOT NULL,
    platform_commission_amount NUMERIC NOT NULL,
    guide_commission_amount NUMERIC NOT NULL,
    status booking_status NOT NULL DEFAULT 'pending',
    cancellation_date DATE,
    cancellation_reason TEXT,
    tourist_name TEXT NOT NULL,
    tourist_email TEXT NOT NULL,
    tourist_phone TEXT,
    hotel TEXT,
    special_requests TEXT,
    stripe_session_id TEXT,
    stripe_payment_intent TEXT,
    stripe_transfer_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Coluna adicional para otimização
    booking_time_range tsrange
);

CREATE TRIGGER update_bookings_timestamp
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Avaliações
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    experience_id UUID NOT NULL REFERENCES experiences(id),
    guide_id UUID NOT NULL REFERENCES guides(id),
    tourist_id UUID NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(booking_id)
);

CREATE TRIGGER update_reviews_timestamp
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Chats
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tourist_id UUID NOT NULL REFERENCES users(id),
    guide_id UUID NOT NULL REFERENCES guides(id),
    last_message TEXT,
    last_message_time TIMESTAMPTZ,
    is_read_by_tourist BOOLEAN DEFAULT FALSE,
    is_read_by_guide BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tourist_id, guide_id)
);

CREATE TRIGGER update_chats_timestamp
BEFORE UPDATE ON chats
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Mensagens
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id),
    sender_type sender_type NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Cotações
CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    guide_id UUID NOT NULL REFERENCES guides(id),
    tourist_id UUID NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT,
    itinerary TEXT,
    date DATE,
    duration NUMERIC, -- Em horas
    people_count INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    meeting_point TEXT,
    inclusions TEXT[],
    exclusions TEXT[],
    status quotation_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_quotations_timestamp
BEFORE UPDATE ON quotations
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de Posts do Blog
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image TEXT,
    author_id UUID NOT NULL REFERENCES users(id),
    category TEXT,
    tags TEXT[],
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_blog_posts_timestamp
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabela de auditoria
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    operation TEXT NOT NULL,
    old_data JSONB,
    new_data JSONB,
    changed_by UUID REFERENCES users(id),
    changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de consentimentos LGPD
CREATE TABLE user_consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_type TEXT NOT NULL,
    is_granted BOOLEAN NOT NULL,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    ip_address TEXT,
    user_agent TEXT
);

-- Função para verificar disponibilidade
CREATE OR REPLACE FUNCTION check_guide_availability(
    p_guide_id UUID,
    p_experience_id UUID,
    p_date DATE,
    p_time TIME
) RETURNS BOOLEAN AS $$
DECLARE
    v_day_of_week INTEGER;
    v_is_available BOOLEAN := FALSE;
    v_has_exception BOOLEAN := FALSE;
    v_exception_available BOOLEAN := FALSE;
BEGIN
    -- Determina o dia da semana (0-6, domingo-sábado)
    v_day_of_week := EXTRACT(DOW FROM p_date);
    
    -- Verifica se existe uma exceção para esta data
    SELECT 
        EXISTS(SELECT 1 FROM availability_exceptions 
               WHERE guide_id = p_guide_id 
               AND experience_id = p_experience_id
               AND exception_date = p_date) INTO v_has_exception;
    
    IF v_has_exception THEN
        -- Se existe exceção, verifica se a data está marcada como disponível
        SELECT 
            is_available INTO v_exception_available
        FROM availability_exceptions 
        WHERE guide_id = p_guide_id 
        AND experience_id = p_experience_id
        AND exception_date = p_date;
        -- Se a exceção marca o dia como indisponível, retorna FALSE
        IF NOT v_exception_available THEN
            RETURN FALSE;
        END IF;
        
        -- Se a exceção marca o dia como disponível, verifica os blocos de horário da exceção
        SELECT 
            EXISTS(
                SELECT 1 
                FROM availability_exception_time_blocks b
                JOIN availability_exceptions e ON b.exception_id = e.id
                WHERE e.guide_id = p_guide_id
                AND e.experience_id = p_experience_id
                AND e.exception_date = p_date
                AND p_time >= b.start_time
                AND p_time < b.end_time
            ) INTO v_is_available;
        
        RETURN v_is_available;
    ELSE
        -- Se não há exceção, verifica disponibilidade no template padrão
        SELECT 
            EXISTS(
                SELECT 1 
                FROM availability_time_blocks b
                JOIN guide_availability_templates t ON b.template_id = t.id
                WHERE t.guide_id = p_guide_id
                AND t.experience_id = p_experience_id
                AND t.is_active = TRUE
                AND b.day_of_week = v_day_of_week
                AND p_time >= b.start_time
                AND p_time < b.end_time
            ) INTO v_is_available;
        
        RETURN v_is_available;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Função para obter todos os horários disponíveis para uma experiência em uma data
CREATE OR REPLACE FUNCTION get_available_times(
    p_guide_id UUID,
    p_experience_id UUID,
    p_date DATE
) RETURNS TABLE(start_time TIME, end_time TIME) AS $$
DECLARE
    v_day_of_week INTEGER;
    v_has_exception BOOLEAN := FALSE;
    v_exception_available BOOLEAN := FALSE;
BEGIN
    -- Determina o dia da semana
    v_day_of_week := EXTRACT(DOW FROM p_date);
    
    -- Verifica exceções
    SELECT 
        EXISTS(SELECT 1 FROM availability_exceptions 
               WHERE guide_id = p_guide_id 
               AND experience_id = p_experience_id
               AND exception_date = p_date) INTO v_has_exception;
    
    IF v_has_exception THEN
        SELECT 
            is_available INTO v_exception_available
        FROM availability_exceptions 
        WHERE guide_id = p_guide_id 
        AND experience_id = p_experience_id
        AND exception_date = p_date;
        
        IF NOT v_exception_available THEN
            -- Dia bloqueado, retorna tabela vazia
            RETURN;
        END IF;
        
        -- Retorna os horários das exceções
        RETURN QUERY
        SELECT b.start_time, b.end_time
        FROM availability_exception_time_blocks b
        JOIN availability_exceptions e ON b.exception_id = e.id
        WHERE e.guide_id = p_guide_id
        AND e.experience_id = p_experience_id
        AND e.exception_date = p_date
        ORDER BY b.start_time;
    ELSE
        -- Retorna os horários do template padrão
        RETURN QUERY
        SELECT b.start_time, b.end_time
        FROM availability_time_blocks b
        JOIN guide_availability_templates t ON b.template_id = t.id
        WHERE t.guide_id = p_guide_id
        AND t.experience_id = p_experience_id
        AND t.is_active = TRUE
        AND b.day_of_week = v_day_of_week
        ORDER BY b.start_time;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Função para atualizar o booking_time_range
CREATE OR REPLACE FUNCTION update_booking_time_range()
RETURNS TRIGGER AS $$
BEGIN
    NEW.booking_time_range := tsrange(
        NEW.booking_date + NEW.booking_time,
        NEW.booking_date + NEW.booking_time + (duration * interval '1 hour')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_booking_time_range
BEFORE INSERT OR UPDATE OF booking_date, booking_time, duration ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_booking_time_range();

-- Função para verificar se uma reserva pode ser feita
CREATE OR REPLACE FUNCTION can_book_experience(
    p_guide_id UUID,
    p_experience_id UUID,
    p_date DATE,
    p_time TIME,
    p_duration NUMERIC -- Duração da experiência em horas
) RETURNS BOOLEAN AS $$
DECLARE
    v_can_book BOOLEAN := TRUE;
    v_booking_exists BOOLEAN := FALSE;
    v_time_range tsrange;
BEGIN
    -- Verifica se o guia está disponível para esse horário
    IF NOT check_guide_availability(p_guide_id, p_experience_id, p_date, p_time) THEN
        RETURN FALSE;
    END IF;
    
    -- Cria o intervalo de tempo para a nova reserva
    v_time_range := tsrange(
        p_date + p_time,
        p_date + p_time + (p_duration * interval '1 hour')
    );
    
    -- Verifica se já existe uma reserva para esse guia e experiência no mesmo horário
    -- usando o índice GiST para melhor performance
    SELECT 
        EXISTS(
            SELECT 1 
            FROM bookings 
            WHERE guide_id = p_guide_id
            AND experience_id = p_experience_id
            AND status IN ('pending', 'confirmed')
            AND booking_time_range && v_time_range
        ) INTO v_booking_exists;
    
    IF v_booking_exists THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Função para calcular comissões
CREATE OR REPLACE FUNCTION calculate_commissions(
    p_total_price NUMERIC,
    p_guide_commission_rate NUMERIC DEFAULT 74
) RETURNS TABLE(
    platform_commission NUMERIC,
    guide_commission NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ROUND(p_total_price * ((100 - p_guide_commission_rate) / 100), 2) as platform_commission,
        ROUND(p_total_price * (p_guide_commission_rate / 100), 2) as guide_commission;
END;
$$ LANGUAGE plpgsql;

-- Função para registrar alterações em experiências
CREATE OR REPLACE FUNCTION audit_experience_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (
            table_name, 
            record_id, 
            operation, 
            old_data, 
            new_data, 
            changed_by
        ) VALUES (
            'experiences',
            NEW.id,
            'UPDATE',
            row_to_json(OLD),
            row_to_json(NEW),
            (SELECT auth.uid())
        );
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (
            table_name, 
            record_id, 
            operation, 
            new_data, 
            changed_by
        ) VALUES (
            'experiences',
            NEW.id,
            'INSERT',
            row_to_json(NEW),
            (SELECT auth.uid())
        );
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (
            table_name, 
            record_id, 
            operation, 
            old_data, 
            changed_by
        ) VALUES (
            'experiences',
            OLD.id,
            'DELETE',
            row_to_json(OLD),
            (SELECT auth.uid())
        );
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_experience_changes
AFTER INSERT OR UPDATE OR DELETE ON experiences
FOR EACH ROW
EXECUTE FUNCTION audit_experience_changes();

-- Função para registrar alterações em preços
CREATE OR REPLACE FUNCTION audit_pricing_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (
            table_name, 
            record_id, 
            operation, 
            old_data, 
            new_data, 
            changed_by
        ) VALUES (
            'pricing_tiers',
            NEW.id,
            'UPDATE',
            row_to_json(OLD),
            row_to_json(NEW),
            (SELECT auth.uid())
        );
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (
            table_name, 
            record_id, 
            operation, 
            new_data, 
            changed_by
        ) VALUES (
            'pricing_tiers',
            NEW.id,
            'INSERT',
            row_to_json(NEW),
            (SELECT auth.uid())
        );
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (
            table_name, 
            record_id, 
            operation, 
            old_data, 
            changed_by
        ) VALUES (
            'pricing_tiers',
            OLD.id,
            'DELETE',
            row_to_json(OLD),
            (SELECT auth.uid())
        );
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_pricing_changes
AFTER INSERT OR UPDATE OR DELETE ON pricing_tiers
FOR EACH ROW
EXECUTE FUNCTION audit_pricing_changes();

-- Stored Procedure para cancelamento de reserva
CREATE OR REPLACE PROCEDURE cancel_booking(
    p_booking_id UUID,
    p_cancellation_reason TEXT,
    p_cancelled_by UUID
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_status booking_status;
BEGIN
    -- Salva o status atual
    SELECT status INTO v_old_status FROM bookings WHERE id = p_booking_id;
    
    -- Atualiza a reserva
    UPDATE bookings
    SET 
        status = 'cancelled',
        cancellation_date = CURRENT_DATE,
        cancellation_reason = p_cancellation_reason,
        updated_at = NOW()
    WHERE id = p_booking_id
    AND status IN ('pending', 'confirmed');
    
    -- Registra a ação no log de auditoria
    INSERT INTO audit_logs (
        table_name,
        record_id,
        operation,
        old_data,
        new_data,
        changed_by,
        changed_at
    )
    SELECT
        'bookings',
        id,
        'CANCEL',
        jsonb_build_object('status', v_old_status),
        jsonb_build_object('status', 'cancelled', 'cancellation_reason', p_cancellation_reason),
        p_cancelled_by,
        NOW()
    FROM bookings
    WHERE id = p_booking_id;
    
    -- Poderia adicionar aqui lógica para notificações, reembolsos, etc.
END;
$$;

-- Função para anonimização de dados
CREATE OR REPLACE FUNCTION anonymize_user(p_user_id UUID) 
RETURNS VOID AS $$
BEGIN
    -- Anonimiza os dados do usuário
    UPDATE users 
    SET 
        full_name = 'Usuário Anônimo',
        email = 'anonymous_' || id || '@example.com',
        phone = NULL,
        avatar_url = NULL,
        auth_id = NULL,
        is_active = FALSE
    WHERE id = p_user_id;
    
    -- Registra a ação no log de auditoria
    INSERT INTO audit_logs (
        table_name,
        record_id,
        operation,
        new_data,
        changed_by,
        changed_at
    )
    VALUES (
        'users',
        p_user_id,
        'ANONYMIZE',
        jsonb_build_object('anonymized', TRUE),
        (SELECT auth.uid()),
        NOW()
    );
END;
$$ LANGUAGE plpgsql;

-- View materializada para cache de disponibilidade
CREATE MATERIALIZED VIEW guide_availability_cache AS
WITH dates AS (
    SELECT generate_series(
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '60 days',
        INTERVAL '1 day'
    )::date AS date
)
SELECT 
    g.id AS guide_id,
    e.id AS experience_id,
    d.date,
    (
        SELECT array_agg(ROW(start_time, end_time)::text)
        FROM get_available_times(g.id, e.id, d.date)
    ) AS available_time_blocks,
    EXISTS (
        SELECT 1 
        FROM availability_exceptions ae 
        WHERE ae.guide_id = g.id 
        AND ae.experience_id = e.id 
        AND ae.exception_date = d.date
        AND ae.is_available = FALSE
    ) AS is_blocked_day
FROM guides g
CROSS JOIN dates d
JOIN experience_guides eg ON g.id = eg.guide_id
JOIN experiences e ON eg.experience_id = e.id
WHERE e.is_active = TRUE;

-- Função para atualizar o cache de disponibilidade
CREATE OR REPLACE FUNCTION refresh_availability_cache()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY guide_availability_cache;
END;
$$ LANGUAGE plpgsql;

-- Views úteis

-- View de média de avaliações por guia
CREATE VIEW guide_ratings AS
SELECT 
    g.id as guide_id,
    g.user_id,
    u.full_name,
    COUNT(r.id) as review_count,
    COALESCE(AVG(r.rating), 0) as average_rating
FROM guides g
LEFT JOIN reviews r ON g.id = r.guide_id
JOIN users u ON g.user_id = u.id
GROUP BY g.id, g.user_id, u.full_name;

-- View de média de avaliações por experiência
CREATE VIEW experience_  g.user_id, u.full_name;

-- View de média de avaliações por experiência
CREATE VIEW experience_ratings AS
SELECT 
    e.id as experience_id,
    e.title,
    COUNT(r.id) as review_count,
    COALESCE(AVG(r.rating), 0) as average_rating
FROM experiences e
LEFT JOIN reviews r ON e.id = r.experience_id
GROUP BY e.id, e.title;

-- View de guias com experiências ativas
CREATE VIEW active_guides AS
SELECT 
    g.id as guide_id,
    u.full_name,
    COUNT(DISTINCT eg.experience_id) as experience_count,
    array_agg(DISTINCT c.name) as categories
FROM guides g
JOIN users u ON g.user_id = u.id
JOIN experience_guides eg ON g.id = eg.guide_id
JOIN experiences e ON eg.experience_id = e.id AND e.is_active = TRUE
LEFT JOIN categories c ON e.category_id = c.id
GROUP BY g.id, u.full_name;

-- View de estatísticas de reservas
CREATE VIEW booking_stats AS
SELECT
    DATE_TRUNC('month', b.created_at) as month,
    COUNT(b.id) as total_bookings,
    SUM(b.total_price) as total_revenue,
    SUM(b.platform_commission_amount) as platform_revenue,
    COUNT(DISTINCT b.tourist_id) as unique_tourists,
    COUNT(DISTINCT b.guide_id) as active_guides
FROM bookings b
WHERE b.status IN ('confirmed', 'completed')
GROUP BY DATE_TRUNC('month', b.created_at)
ORDER BY DATE_TRUNC('month', b.created_at) DESC;

-- Índices para melhorar a performance
CREATE INDEX idx_experience_guides_guide_id ON experience_guides(guide_id);
CREATE INDEX idx_experience_guides_experience_id ON experience_guides(experience_id);
CREATE INDEX idx_availability_exceptions_guide_exp_date ON availability_exceptions(guide_id, experience_id, exception_date);
CREATE INDEX idx_availability_time_blocks_template_day ON availability_time_blocks(template_id, day_of_week);
CREATE INDEX idx_bookings_guide_exp_date ON bookings(guide_id, experience_id, booking_date);
CREATE INDEX idx_bookings_tourist_id ON bookings(tourist_id);
CREATE INDEX idx_reviews_experience_id ON reviews(experience_id);
CREATE INDEX idx_reviews_guide_id ON reviews(guide_id);
CREATE INDEX idx_messages_chat_id ON messages(chat_id);
CREATE INDEX idx_experience_translations_exp_lang ON experience_translations(experience_id, language_code);
CREATE INDEX idx_experiences_slug ON experiences(slug);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_user_consents_user_id ON user_consents(user_id);
CREATE INDEX idx_user_consents_type ON user_consents(consent_type);
CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_changed_at ON audit_logs(changed_at);
CREATE UNIQUE INDEX idx_guide_availability_cache ON guide_availability_cache(guide_id, experience_id, date);
CREATE INDEX idx_bookings_time_range ON bookings USING GIST (booking_time_range);

-- Políticas de segurança RLS (Row Level Security)
-- Estas serão configuradas no Supabase UI ou via SQL após a criação das tabelas

-- Exemplo de política para users:
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Permitir que usuários só vejam e editem seus próprios dados (exceto admins)
CREATE POLICY users_view_own ON users 
    FOR SELECT USING (
        auth.uid() = auth_id OR 
        EXISTS(SELECT 1 FROM users WHERE auth_id = auth.uid() AND user_type = 'admin')
    );

CREATE POLICY users_update_own ON users 
    FOR UPDATE USING (
        auth.uid() = auth_id
    );

-- Agendamento para atualizar o cache de disponibilidade diariamente
-- Nota: Isso requer a extensão pg_cron, que pode não estar disponível no Supabase
-- Se não estiver disponível, você precisará implementar isso no seu backend
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
        PERFORM cron.schedule('0 3 * * *', 'SELECT refresh_availability_cache()');
    END IF;
END $$;