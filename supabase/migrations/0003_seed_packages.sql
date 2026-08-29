-- Seed: los 3 paquetes publicados hoy en la landing.

insert into public.packages (slug, name, duration_minutes, price_clp, price_includes_iva, billing_type, description, sort_order)
values
  ('diagnostico', 'Diagnóstico', 60, 60000, false, 'one_time', 'Primera vez. Una lectura clara de dónde está parado tu negocio hoy.', 0),
  ('sesion-trabajo', 'Sesión de trabajo', 90, 90000, false, 'one_time', 'Ya conversaste antes y quieres atacar un problema puntual.', 1),
  ('acompanamiento-mensual', 'Acompañamiento mensual', null, 250000, false, 'monthly', 'Quieres seguimiento continuo, no una conversación única.', 2);
