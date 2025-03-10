-- Tabela users (usuários comuns)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar TEXT,
  role TEXT CHECK (role IN ('tourist', 'guide')) NOT NULL DEFAULT 'tourist',
  created_at TIMESTAMPTZ DEFAULT now()
);