import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BookingCard } from "@/components/portal/BookingCard";

export default async function PortalDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, status, payment_status, created_at, scheduled_at, packages(name)")
    .eq("client_id", user!.id)
    .order("created_at", { ascending: false });

  const { data: deliverables } = await supabase
    .from("deliverables")
    .select("id, summary, action_plan, created_at, bookings(id, created_at, packages(name))")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="section-head">
        <h2>Historial de reuniones</h2>
        <p>Acá ves el estado de tus sesiones solicitadas, sus resúmenes y las tareas acordadas.</p>
      </div>

      <div className="cta-row" style={{ marginBottom: 28 }}>
        <Link className="btn btn-nav" href="/portal/solicitar">
          Solicitar una sesión
        </Link>
      </div>

      {!bookings || bookings.length === 0 ? (
        <p className="price-desc">Todavía no tienes reservas. Solicita tu primera sesión arriba.</p>
      ) : (
        <div className="portal-list">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              id={booking.id}
              packageName={(booking.packages as unknown as { name: string } | null)?.name ?? "Paquete"}
              status={booking.status}
              paymentStatus={booking.payment_status}
              createdAt={booking.created_at}
              scheduledAt={booking.scheduled_at}
              href={`/portal/reservas/${booking.id}`}
            />
          ))}
        </div>
      )}

      <div className="section-head" style={{ marginTop: 48 }}>
        <h3>Entregables</h3>
        <p>El resumen escrito de cada sesión, para que no dependa de tu memoria.</p>
      </div>
      {!deliverables || deliverables.length === 0 ? (
        <p className="price-desc">Todavía no tienes entregables.</p>
      ) : (
        <div className="portal-list">
          {deliverables.map((d) => {
            const booking = d.bookings as unknown as { id: string; created_at: string; packages: { name: string } | null } | null;
            return (
              <Link key={d.id} href={`/portal/reservas/${booking?.id}`} className="portal-card portal-card-link">
                <div className="portal-card-head">
                  <p className="price-name">{booking?.packages?.name ?? "Sesión"}</p>
                  <p className="price-meta">{new Date(d.created_at).toLocaleDateString("es-CL")}</p>
                </div>
                <p className="price-desc">{d.summary}</p>
              </Link>
            );
          })}
        </div>
      )}

      <div className="section-head" style={{ marginTop: 48 }}>
        <h3>Tareas acordadas</h3>
        <p>Los próximos pasos que quedaron definidos en cada sesión.</p>
      </div>
      {!deliverables || deliverables.length === 0 ? (
        <p className="price-desc">Todavía no tienes tareas acordadas.</p>
      ) : (
        <div className="portal-list">
          {deliverables.map((d) => {
            const booking = d.bookings as unknown as { id: string; created_at: string; packages: { name: string } | null } | null;
            return (
              <div key={d.id} className="portal-card">
                <div className="portal-card-head">
                  <p className="price-name">{booking?.packages?.name ?? "Sesión"}</p>
                  <p className="price-meta">{new Date(d.created_at).toLocaleDateString("es-CL")}</p>
                </div>
                <p className="price-desc">{d.action_plan}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
