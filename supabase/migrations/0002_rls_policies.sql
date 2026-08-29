-- RLS: cada cliente ve solo lo suyo; Ignacio (role='admin') ve y administra todo.

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.packages enable row level security;
alter table public.bookings enable row level security;
alter table public.deliverables enable row level security;

-- profiles
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "profiles_update_own"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "profiles_update_admin"
  on public.profiles for update
  using (public.is_admin())
  with check (public.is_admin());

-- packages
create policy "packages_select_public"
  on public.packages for select
  using (true);

create policy "packages_write_admin"
  on public.packages for all
  using (public.is_admin())
  with check (public.is_admin());

-- bookings
create policy "bookings_select_own_or_admin"
  on public.bookings for select
  using (client_id = auth.uid() or public.is_admin());

create policy "bookings_insert_own"
  on public.bookings for insert
  with check (client_id = auth.uid());

create policy "bookings_update_admin"
  on public.bookings for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "bookings_delete_admin"
  on public.bookings for delete
  using (public.is_admin());

-- deliverables
create policy "deliverables_select_via_booking"
  on public.deliverables for select
  using (
    exists (
      select 1 from public.bookings b
      where b.id = deliverables.booking_id
        and (b.client_id = auth.uid() or public.is_admin())
    )
  );

create policy "deliverables_write_admin"
  on public.deliverables for all
  using (public.is_admin())
  with check (public.is_admin());
