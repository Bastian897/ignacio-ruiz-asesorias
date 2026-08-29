import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { PayButton } from "@/components/portal/PayButton";

export default async function ReservaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select("id, status, payment_status, requested_note, preferred_datetime, scheduled_at, created_at, packages(name, description)")
    .eq("id", id)
    .single();

  if (!booking) notFound();

  const { data: deliverables } = await supabase
    .from("deliverables")
    .select("id, summary, action_plan, created_at")
    .eq("booking_id", id)
    .order("created_at", { ascending: false });

  const pkg = booking.packages as unknown as { name: string; description: string | null } | null;

  return (
    <>
      <div className="section-head">
        <h2>{pkg?.name ?? "Reserva"}</h2>
        <div className="portal-badges">
          <StatusBadge value={booking.status} kind="status" />
          <StatusBadge value={booking.payment_status} kind="payment" />
        </div>
      </div>

      <div className="portal-card" style={{ marginBottom: 24 }}>
        {pkg?.description && <p className="price-desc">{pkg.description}</p>}
        {booking.requested_note && (
          <p className="price-desc">
            <strong>Tu nota:</strong> {booking.requested_note}
          </p>
        )}
        <p className="price-meta">
          {booking.scheduled_at
            ? `Agendada para ${new Date(booking.scheduled_at).toLocaleString("es-CL")}`
            : booking.preferred_datetime
              ? `Preferencia: ${new Date(booking.preferred_datetime).toLocaleString("es-CL")}`
              : "Aún sin horario confirmado."}
        </p>
      </div>

      {booking.payment_status === "pending" && (
        <div className="portal-card" style={{ marginBottom: 24 }}>
          <PayButton />
        </div>
      )}

      <h3>Entregables</h3>
      {!deliverables || deliverables.length === 0 ? (
        <p className="price-desc">Todavía no hay entregables para esta sesión.</p>
      ) : (
        <div className="portal-list">
          {deliverables.map((d) => (
            <div key={d.id} className="portal-card">
              <p>
                <strong>Resumen:</strong> {d.summary}
              </p>
              <p>
                <strong>Plan de acción:</strong> {d.action_plan}
              </p>
              <p className="price-meta">{new Date(d.created_at).toLocaleDateString("es-CL")}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
