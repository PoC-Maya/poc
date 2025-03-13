create table pre_signup (
  id uuid default uuid_generate_v4() primary key,
  email text unique,
  nome text,
  whatsapp text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  status text default 'paso1' -- pode ser 'paso1' ou 'paso2'
);