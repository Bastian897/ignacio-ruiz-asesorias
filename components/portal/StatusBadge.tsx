const STATUS_LABEL: Record<string, string> = {
  requested: "Solicitada",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
};

const PAYMENT_LABEL: Record<string, string> = {
  pending: "Pago pendiente",
  paid: "Pagada",
  waived: "Sin costo",
};

export function StatusBadge({ value, kind }: { value: string; kind: "status" | "payment" }) {
  const label = (kind === "status" ? STATUS_LABEL : PAYMENT_LABEL)[value] ?? value;
  return <span className="status-badge mono">{label}</span>;
}
