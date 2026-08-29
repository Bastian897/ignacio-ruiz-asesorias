import Link from "next/link";

export function MobileCta() {
  return (
    <div className="mobile-cta">
      <Link className="btn btn-primary" href="/#precios">
        Agendar una hora
      </Link>
    </div>
  );
}
