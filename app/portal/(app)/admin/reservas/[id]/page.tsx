import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateBookingStatus, addDeliverable } from "@/app/actions/bookings";

export default async function AdminReservaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select(
      "id, status, payment_status, payment_method, payment_reference, admin_notes, requested_note, preferred_datetime, scheduled_at, packages(name), profiles!bookings_client_id_fkey(full_name, email, phone)",
    )
    .eq("id", id)
    .single();

  if (!booking) notFound();

  const pkg = booking.packages as unknown as { name: string } | null;
  const client = booking.profiles as unknown as { full_name: string | null; email: string; phone: string | null } | null;

  const { data: deliverables } = await supabase
    .from("deliverables")
    .select("id, summary, action_plan, created_at")
    .eq("booking_id", id)
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="section-head">
        <h2>
          {pkg?.name} — {client?.full_name || client?.email}
        </h2>
        <p>
          {client?.email}
          {client?.phone ? ` · ${client.phone}` : ""}
        </p>
        {booking.requested_note && <p className="price-desc">Nota del cliente: {booking.requested_note}</p>}
      </div>

      <form action={updateBookingStatus} className="portal-card portal-form">
        <input type="hidden" name="booking_id" value={booking.id} />

        <label htmlFor="status">Estado</label>
        <select id="status" name="status" defaultValue={booking.status}>
          <option value="requested">Solicitada</option>
          <option value="confirmed">Confirmada</option>
          <option value="completed">Completada</option>
          <option value="cancelled">Cancelada</option>
        </select>

        <label htmlFor="payment_status">Estado de pago</label>
        <select id="payment_status" name="payment_status" defaultValue={booking.payment_status}>
          <option value="pending">Pendiente</option>
          <option value="paid">Pagada</option>
          <option value="waived">Sin costo</option>
        </select>

        <label htmlFor="payment_method">Medio de pago (manual)</label>
        <input id="payment_method" name="payment_method" defaultValue={booking.payment_method ?? ""} placeholder="Ej: transferencia por WhatsApp" />

        <label htmlFor="payment_reference">Referencia de pago</label>
        <input id="payment_reference" name="payment_reference" defaultValue={booking.payment_reference ?? ""} placeholder="Ej: comprobante #1234" />

        <label htmlFor="scheduled_at">Hora agendada</label>
        <input
          id="scheduled_at"
          name="scheduled_at"
          type="datetime-local"
          defaultValue={booking.scheduled_at ? booking.scheduled_at.slice(0, 16) : ""}
        />

        <label htmlFor="admin_notes">Notas internas</label>
        <textarea id="admin_notes" name="admin_notes" rows={3} defaultValue={booking.admin_notes ?? ""} />

        <button className="btn btn-nav" type="submit">
          Guardar cambios
        </button>
      </form>

      <h3 style={{ marginTop: 32 }}>Agregar entregable</h3>
      <form action={addDeliverable} className="portal-card portal-form">
        <input type="hidden" name="booking_id" value={booking.id} />
        <label htmlFor="summary">Resumen de lo conversado</label>
        <textarea id="summary" name="summary" rows={4} required />
        <label htmlFor="action_plan">Plan de acción</label>
        <textarea id="action_plan" name="action_plan" rows={4} required />
        <button className="btn btn-nav" type="submit">
          Guardar entregable
        </button>
      </form>

      {deliverables && deliverables.length > 0 && (
        <>
          <h3 style={{ marginTop: 32 }}>Entregables ya enviados</h3>
          <div className="portal-list">
            {deliverables.map((d) => (
              <div key={d.id} className="portal-card">
                <p>
                  <strong>Resumen:</strong> {d.summary}
                </p>
                <p>
                  <strong>Plan de acción:</strong> {d.action_plan}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
