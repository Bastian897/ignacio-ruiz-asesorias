import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";

const title = "7 señales de que tu negocio no te está dejando plata — Ignacio Ruiz";
const description =
  "Mini-guía gratuita: 7 señales concretas para revisar si tu negocio realmente te está dejando plata, antes de agendar una asesoría.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guia-7-senales",
  },
  openGraph: {
    type: "article",
    title: "7 señales de que tu negocio no te está dejando plata",
    description: "Mini-guía gratuita de Ignacio Ruiz: 7 señales concretas para revisar tu negocio con números reales.",
    images: ["/assets/img/ignacio-ruiz.webp"],
    url: "/guia-7-senales",
  },
};

export default function GuiaSietesenales() {
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>

      <Nav />

      <main id="main">
        <section>
          <div className="wrap legal-content">
            <div className="section-head fade-up">
              <span className="hero-eyebrow">Recurso gratuito</span>
              <h2>7 señales de que tu negocio no te está dejando plata</h2>
              <p>
                Antes de agendar una hora, revisa esto. Si te calza más de una, probablemente tu negocio tiene un
                problema de caja, no de ventas.
              </p>
            </div>

            <h3>1. No sabes cuánto tienes en caja hoy, solo &quot;más o menos&quot;</h3>
            <p>
              Si tuvieras que decir ahora mismo cuánto dinero real tienes disponible, sin abrir el banco, y tu
              respuesta es un número aproximado, esa es la primera señal.
            </p>

            <h3>2. Mezclas la plata del negocio con la personal</h3>
            <p>
              Pagas cosas de la casa con la cuenta del negocio, o al revés, &quot;porque después se ordena&quot;.
              Nunca se ordena solo. Así es imposible saber si el negocio realmente gana.
            </p>

            <h3>3. Vendes mucho pero el banco no lo refleja</h3>
            <p>Facturas o boleteas fuerte, pero la plata no aparece en la cuenta. Casi siempre es un problema de plazos de cobro, no de ventas.</p>

            <h3>4. Pagas deudas con lo que entra hoy, no con lo que planificaste</h3>
            <p>
              Si cada pago de proveedor o cuota depende de que justo llegue plata esa semana, no tienes un plan de
              caja: tienes suerte administrada día a día.
            </p>

            <h3>5. No sabes cuál producto o servicio te deja más margen</h3>
            <p>
              Vendes de todo, pero nunca calculaste qué te deja más plata después de costos. Puede que tu producto
              estrella sea el que menos te conviene.
            </p>

            <h3>6. Creces en ventas, pero tus gastos fijos crecen más rápido</h3>
            <p>Facturaste más que el año pasado y aun así te queda menos. Es una de las señales más comunes en negocios que están creciendo mal, no poco.</p>

            <h3>7. Evitas mirar tus números porque &quot;dan miedo&quot;</h3>
            <p>Postergas abrir la planilla, el Excel o el sistema porque prefieres no saber. Esa evasión es, en sí misma, la señal más clara de que algo hay que revisar.</p>

            <div className="deliverables fade-up" style={{ marginTop: 36 }}>
              <h3>¿Te calzó alguna?</h3>
              <p style={{ margin: "0 0 20px" }}>
                Trae tus números tal cual los tienes hoy —aunque sea una libreta o el saldo del banco— y revísalos
                con Ignacio en una hora.
              </p>
              <Link className="btn btn-primary" href="/#precios">
                Agendar una hora
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="guia" />
    </>
  );
}
