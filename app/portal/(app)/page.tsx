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

  return (
    <>
      <div className="section-head">
        <h2>Mis reservas</h2>
        <p>Acá ves el estado de tus sesiones solicitadas y sus entregables.</p>
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
    </>
  );
}
