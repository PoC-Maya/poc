-- Tabela guides (informações extras para usuários com role 'guide')
CREATE TABLE guides (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  bio TEXT,
  preferences TEXT[],
  languages TEXT[],
  status TEXT CHECK (status IN ('active', 'suspended', 'banned')) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);


