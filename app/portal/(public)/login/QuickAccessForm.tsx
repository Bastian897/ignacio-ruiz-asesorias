"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function QuickAccessForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function enter(role: "client" | "admin") {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    let userId: string | undefined;
    const {
      data: { user: existingUser },
    } = await supabase.auth.getUser();

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const { data, error: authError } = await supabase.auth.signInAnonymously();
      if (authError || !data.user) {
        setError(authError?.message ?? "No se pudo entrar. Intenta de nuevo.");
        setLoading(false);
        return;
      }
      userId = data.user.id;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name: name.trim() || null, role })
      .eq("id", userId);

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    router.push("/portal");
    router.refresh();
  }

  return (
    <div className="portal-card portal-form">
      <label htmlFor="name">Tu nombre</label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Escribe cualquier nombre"
        autoComplete="off"
      />
      {error && <p className="portal-error">{error}</p>}
      <div className="cta-row" style={{ marginTop: 18 }}>
        <button className="btn btn-nav" type="button" disabled={loading} onClick={() => enter("client")}>
          Entrar como cliente
        </button>
        <button className="btn btn-ghost" type="button" disabled={loading} onClick={() => enter("admin")}>
          Entrar como admin
        </button>
      </div>
    </div>
  );
}
