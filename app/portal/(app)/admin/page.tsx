import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/portal/StatusBadge";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, status, payment_status, created_at, scheduled_at, packages(name), profiles!bookings_client_id_fkey(full_name, email)")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="section-head">
        <h2>Todas las reservas</h2>
        <p>Marca confirmada/pagada y agrega el entregable cuando corresponda.</p>
      </div>

      <div className="portal-table-wrap">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Paquete</th>
              <th>Estado</th>
              <th>Pago</th>
              <th>Creada</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b) => {
              const pkg = b.packages as unknown as { name: string } | null;
              const client = b.profiles as unknown as { full_name: string | null; email: string } | null;
              return (
                <tr key={b.id}>
                  <td>{client?.full_name || client?.email}</td>
                  <td>{pkg?.name}</td>
                  <td>
                    <StatusBadge value={b.status} kind="status" />
                  </td>
                  <td>
                    <StatusBadge value={b.payment_status} kind="payment" />
                  </td>
                  <td>{new Date(b.created_at).toLocaleDateString("es-CL")}</td>
                  <td>
                    <Link className="btn btn-ghost" href={`/portal/admin/reservas/${b.id}`}>
                      Abrir
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
