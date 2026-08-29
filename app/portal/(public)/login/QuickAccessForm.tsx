"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Cuentas demo fijas mientras el portal está en pruebas — sin fricción, sin datos reales.
const DEMO_PASSWORD = "portal-demo-2026";
const DEMO_ACCOUNTS = {
  client: "maria.fernandez@demo.local",
  admin: "admin-demo@portal.local",
} as const;

export function QuickAccessForm() {
  const [loading, setLoading] = useState<"client" | "admin" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function enter(role: "client" | "admin") {
    setLoading(role);
    setError(null);
    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: DEMO_ACCOUNTS[role],
      password: DEMO_PASSWORD,
    });

    if (authError) {
      setError(authError.message);
      setLoading(null);
      return;
    }

    router.push(role === "admin" ? "/portal/admin" : "/portal");
    router.refresh();
  }

  return (
    <div className="portal-card portal-form">
      {error && <p className="portal-error">{error}</p>}
      <div className="cta-row">
        <button className="btn btn-nav" type="button" disabled={loading !== null} onClick={() => enter("client")}>
          {loading === "client" ? "Entrando…" : "Entrar como cliente"}
        </button>
        <button className="btn btn-ghost" type="button" disabled={loading !== null} onClick={() => enter("admin")}>
          {loading === "admin" ? "Entrando…" : "Entrar como admin"}
        </button>
      </div>
    </div>
  );
}
