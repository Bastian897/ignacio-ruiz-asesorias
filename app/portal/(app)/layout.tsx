import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  return (
    <>
      <header className="nav">
        <div className="wrap portal-nav-inner">
          <Link className="brand" href="/portal">
            Ignacio Ruiz
          </Link>
          <nav className="portal-nav-links">
            <Link href="/portal">Mis reservas</Link>
            <Link href="/portal/solicitar">Solicitar sesión</Link>
            {isAdmin && <Link href="/portal/admin">Admin</Link>}
            <form action={signOut}>
              <button className="btn btn-ghost" type="submit">
                Salir
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="portal-shell">
        <div className="wrap">{children}</div>
      </main>
    </>
  );
}
