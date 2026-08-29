-- Ignacio Ruiz Asesorías — esquema inicial: perfiles, paquetes, reservas, entregables.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default now()
);

create table public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  duration_minutes integer,
  price_clp integer not null,
  price_includes_iva boolean not null default false,
  billing_type text not null check (billing_type in ('one_time', 'monthly')),
  description text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  package_id uuid not null references public.packages(id),
  status text not null default 'requested' check (status in ('requested', 'confirmed', 'completed', 'cancelled')),
  requested_note text,
  preferred_datetime timestamptz,
  scheduled_at timestamptz,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'waived')),
  payment_method text,
  payment_reference text,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.deliverables (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  summary text not null,
  action_plan text not null,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

-- Perfil automático al crear un usuario de auth
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at automático en bookings
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger bookings_set_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

create index bookings_client_id_idx on public.bookings(client_id);
create index bookings_package_id_idx on public.bookings(package_id);
create index deliverables_booking_id_idx on public.deliverables(booking_id);
