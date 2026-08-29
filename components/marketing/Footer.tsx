import Link from "next/link";

type FooterProps = {
  variant?: "home" | "guia" | "terminos";
};

export function Footer({ variant = "home" }: FooterProps) {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div>
          <strong>Ignacio Ruiz</strong>
          <br />
          Asesorías directas para dueños de negocio.
        </div>
        <div className="footer-legal">
          {variant === "home" && (
            <>
              Al escribirnos por WhatsApp aceptas que usemos tus datos solo para coordinar tu asesoría. Revisa los{" "}
              <Link href="/terminos">Términos y condiciones y política de privacidad</Link>.
            </>
          )}
          {variant === "guia" && (
            <>
              <Link href="/">Volver al inicio</Link> · <Link href="/terminos">Términos y condiciones</Link>
            </>
          )}
          {variant === "terminos" && <Link href="/">Volver al inicio</Link>}
        </div>
      </div>
    </footer>
  );
}
