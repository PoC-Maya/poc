create table public.profiles (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,
  full_name text not null,
  phone text null,
  avatar text null,
  bio text null,
  location text null,
  preferences jsonb null,
  role text not null default 'tourist'::text,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_user_id_fkey foreign key (user_id) references auth.users(id) on delete cascade,
  constraint profiles_user_id_key unique (user_id),
  constraint profiles_role_check check (
    (
      role = any (array['tourist'::text, 'guide'::text])
    )
  )
) TABLESPACE pg_default;

-- Função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger que chama a função quando um registro é atualizado
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();