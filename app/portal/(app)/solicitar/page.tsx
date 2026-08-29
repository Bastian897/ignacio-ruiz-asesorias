import { createClient } from "@/lib/supabase/server";
import { createBookingRequest } from "@/app/actions/bookings";

export default async function SolicitarPage() {
  const supabase = await createClient();
  const { data: packages } = await supabase
    .from("packages")
    .select("id, name, description, price_clp, duration_minutes")
    .eq("is_active", true)
    .order("sort_order");

  return (
    <>
      <div className="section-head">
        <h2>Solicitar una sesión</h2>
        <p>
          Elige un paquete y cuéntanos qué quieres resolver. Ignacio confirma la hora y el pago se coordina por
          WhatsApp mientras no haya pago en línea.
        </p>
      </div>

      <form action={createBookingRequest} className="portal-card portal-form">
        <label htmlFor="package_id">Paquete</label>
        <select id="package_id" name="package_id" required defaultValue="">
          <option value="" disabled>
            Elige un paquete
          </option>
          {packages?.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} — ${pkg.price_clp.toLocaleString("es-CL")}
              {pkg.duration_minutes ? ` (${pkg.duration_minutes} min)` : ""}
            </option>
          ))}
        </select>

        <label htmlFor="requested_note">¿Qué quieres resolver? (opcional)</label>
        <textarea id="requested_note" name="requested_note" rows={4} placeholder="En una línea, cuéntanos tu problema." />

        <label htmlFor="preferred_datetime">Horario preferido (opcional)</label>
        <input id="preferred_datetime" name="preferred_datetime" type="datetime-local" />

        <button className="btn btn-nav" type="submit">
          Enviar solicitud
        </button>
      </form>
    </>
  );
}
