-- 20250312054500_add_preferences_to_presignup.sql
alter table pre_signup
  add column preferences jsonb default '{}'::jsonb,
  alter column status type text using status::text; -- Ajustando para aceitar 'paso2'