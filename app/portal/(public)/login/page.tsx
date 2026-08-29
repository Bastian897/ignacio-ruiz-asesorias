import type { Metadata } from "next";
import Link from "next/link";
import { QuickAccessForm } from "./QuickAccessForm";

export const metadata: Metadata = {
  title: "Entrar al portal — Ignacio Ruiz",
};

export default function LoginPage() {
  return (
    <main className="portal-shell portal-shell-center">
      <div className="wrap portal-narrow">
        <Link className="brand" href="/">
          Ignacio Ruiz
        </Link>
        <div className="section-head" style={{ marginTop: 24 }}>
          <h2>Portal de clientes</h2>
          <p>Acceso rápido mientras el portal está en pruebas: elige con qué rol entrar.</p>
        </div>
        <QuickAccessForm />
      </div>
    </main>
  );
}
