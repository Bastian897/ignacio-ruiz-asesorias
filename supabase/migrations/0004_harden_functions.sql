-- Endurece funciones: search_path fijo y sin ejecución pública vía RPC directo.

alter function public.set_updated_at() set search_path = public;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
