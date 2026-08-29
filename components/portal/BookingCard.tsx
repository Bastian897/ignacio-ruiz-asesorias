import Link from "next/link";
import { StatusBadge } from "./StatusBadge";

type BookingCardProps = {
  id: string;
  packageName: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  scheduledAt: string | null;
  href: string;
};

export function BookingCard({ packageName, status, paymentStatus, createdAt, scheduledAt, href }: BookingCardProps) {
  return (
    <Link href={href} className="portal-card portal-card-link">
      <div className="portal-card-head">
        <p className="price-name">{packageName}</p>
        <div className="portal-badges">
          <StatusBadge value={status} kind="status" />
          <StatusBadge value={paymentStatus} kind="payment" />
        </div>
      </div>
      <p className="price-meta">
        {scheduledAt
          ? `Agendada para ${new Date(scheduledAt).toLocaleString("es-CL")}`
          : `Solicitada el ${new Date(createdAt).toLocaleDateString("es-CL")}`}
      </p>
    </Link>
  );
}
