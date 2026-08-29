-- Permite email nulo en profiles para soportar el acceso rápido (Supabase Anonymous Auth).
alter table public.profiles alter column email drop not null;
