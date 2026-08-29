import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { MobileCta } from "@/components/marketing/MobileCta";
import { PriceCard } from "@/components/marketing/PriceCard";

const title = "Ignacio Ruiz: asesorías directas para tu negocio";
const description =
  "Una hora con Ignacio Ruiz para revisar tu negocio con números reales. Precio a la vista, sin formularios, sin promesas de resultado.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title,
    description,
    images: ["/assets/img/ignacio-ruiz.webp"],
    url: "/",
    locale: "es_CL",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Asesoría empresarial",
  provider: {
    "@type": "Person",
    name: "Ignacio Ruiz",
  },
  areaServed: "CL",
  description: "Asesorías 1:1 de orientación empresarial para dueños de negocio en Chile.",
  offers: [
    { "@type": "Offer", name: "Diagnóstico", priceCurrency: "CLP", price: "60000" },
    { "@type": "Offer", name: "Sesión de trabajo", priceCurrency: "CLP", price: "90000" },
    { "@type": "Offer", name: "Acompañamiento mensual", priceCurrency: "CLP", price: "250000" },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>

      <Nav />

      <main id="main">
        {/* HERO */}
        <section className="hero" id="top">
          <Image
            className="hero-bg"
            src="/assets/img/hero-texture.webp"
            alt=""
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div className="hero-bg-scrim" />
          <div className="wrap">
            <div className="fade-up">
              <span className="hero-eyebrow">Asesoría 1:1 · Ignacio Ruiz</span>
              <h1>Vendes bien y aun así no te queda nada.</h1>
              <p className="lead">
                Una hora para mirar tu negocio con números reales, no con frases motivacionales. El precio lo ves
                aquí abajo, sin escribir primero.
              </p>
              <div className="cta-row">
                <Link className="btn btn-primary" href="#precios">
                  Agendar una hora
                </Link>
                <Link className="btn btn-ghost" href="#que-pasa">
                  Ver qué pasa en la hora
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* QUIÉN ES IGNACIO */}
        <section className="about" id="ignacio">
          <div className="wrap about-grid">
            <div className="fade-up">
              <div className="hero-photo-frame">
                <Image src="/assets/img/ignacio-ruiz.webp" alt="Ignacio Ruiz" width={900} height={900} />
                <div className="hero-photo-caption">Ignacio Ruiz</div>
              </div>
            </div>
            <div className="about-copy fade-up">
              <div className="section-head" style={{ marginBottom: 20 }}>
                <h2>Quién te va a atender</h2>
              </div>
              <p>
                Empresario chileno, creador de contenido y conductor de un programa diario. Quebró dos veces (una a
                los 20 años, otra entre 2022 y 2024) y se reconstruyó las dos veces.
              </p>
              <p>
                Hoy participa en varias empresas (una agencia de contenido, un hotel en Rapa Nui, una incubadora) y
                conversa a diario con miles de dueños de negocio que le escriben por Instagram.
              </p>
              <p>Esta hora es con él, directamente. No es una llamada de venta ni una reunión con un ejecutivo comercial.</p>
            </div>
          </div>
        </section>

        {/* QUÉ PASA EN LA HORA */}
        <section id="que-pasa">
          <div className="wrap">
            <div className="section-head fade-up">
              <h2>Qué pasa en la hora</h2>
              <p>Para que llegues sabiendo exactamente qué esperar, sin sorpresas.</p>
            </div>
            <div className="timeline">
              <div className="timeline-step fade-up">
                <span className="num mono">Antes</span>
                <h3>Agendas y cuentas tu problema</h3>
                <p>
                  Eliges hora por WhatsApp y escribes en una línea qué quieres resolver. Trae a mano tus números del
                  último mes: ventas, gastos, lo que debes.
                </p>
              </div>
              <div className="timeline-step fade-up">
                <span className="num mono">Min. 0-10</span>
                <h3>Revisan tus números</h3>
                <p>Miran juntos tu caja real, no lo que &quot;sientes&quot; que estás ganando.</p>
              </div>
              <div className="timeline-step fade-up">
                <span className="num mono">Min. 10-50</span>
                <h3>Lectura directa</h3>
                <p>Ignacio te dice qué ve en tu situación y qué haría esta semana en tu lugar.</p>
              </div>
              <div className="timeline-step fade-up">
                <span className="num mono">Después</span>
                <h3>Te llevas algo escrito</h3>
                <p>Un resumen de lo conversado, para que no dependa de la memoria.</p>
              </div>
            </div>

            <div className="deliverables fade-up">
              <h3>Qué te llevas de la hora (tus entregables)</h3>
              <ul className="deliverables-list">
                <li>
                  <span className="mark mono">&times;</span> Resumen escrito de lo conversado.
                </li>
                <li>
                  <span className="mark mono">&times;</span> Un plan de acción con los próximos pasos concretos para
                  esta semana.
                </li>
                <li>
                  <span className="mark mono">&times;</span> Todo esto te llega por correo y WhatsApp después de la
                  reunión, no depende de tu memoria.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* PRECIOS */}
        <section id="precios">
          <div className="wrap">
            <div className="section-head fade-up">
              <h2>Precios</h2>
              <p>Sin formulario de por medio. Lo que se cobra es tiempo y criterio aplicado a tu caso; lo demás nunca se cobra.</p>
            </div>
            <div className="price-grid">
              <PriceCard
                name="Diagnóstico"
                meta="60 min · videollamada 1:1"
                amount="$60.000"
                amountSuffix="+ IVA"
                description="Primera vez. Una lectura clara de dónde está parado tu negocio hoy."
                ctaHref="https://wa.me/56900000000?text=Hola%2C%20quiero%20agendar%20un%20Diagn%C3%B3stico%20(60%20min)"
                ctaLabel="Elegir"
              />
              <PriceCard
                name="Sesión de trabajo"
                meta="90 min · videollamada 1:1"
                amount="$90.000"
                amountSuffix="+ IVA"
                description="Ya conversaste antes y quieres atacar un problema puntual."
                ctaHref="https://wa.me/56900000000?text=Hola%2C%20quiero%20agendar%20una%20Sesi%C3%B3n%20de%20trabajo%20(90%20min)"
                ctaLabel="Elegir"
                featured
              />
              <PriceCard
                name="Acompañamiento mensual"
                meta="Seguimiento · mensual"
                amount="$250.000"
                amountSuffix="+ IVA"
                description="Quieres seguimiento continuo, no una conversación única."
                ctaHref="https://wa.me/56900000000?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20del%20Acompa%C3%B1amiento%20mensual"
                ctaLabel="Elegir"
              />
            </div>
            <div className="disclaimer fade-up">
              <strong>Qué es esto y qué no es.</strong> Ignacio Ruiz entrega orientación empresarial, basada en su
              experiencia como emprendedor. No es asesoría legal, tributaria ni contable. Si tu caso lo necesita, se
              te deriva a un profesional del área correspondiente.
            </div>
          </div>
        </section>

        {/* RECURSOS GRATUITOS */}
        <section id="recursos">
          <div className="wrap">
            <div className="section-head fade-up">
              <h2>Recursos gratuitos</h2>
              <p>Para que empieces a mirar tu negocio con números reales, aunque todavía no agendes hora.</p>
            </div>
            <div className="resource-grid">
              <PriceCard
                name="Plantilla de flujo de caja simple"
                meta="Excel · descarga directa"
                description="Para anotar ingresos, gastos y saldo real de tu negocio, mes a mes. Sin fórmulas raras."
                ctaHref="/assets/downloads/plantilla-flujo-caja.xlsx"
                ctaLabel="Descargar plantilla"
                download
              />
              <PriceCard
                name="7 señales de que tu negocio no te está dejando plata"
                meta="Mini-guía · 2 min de lectura"
                description="Un chequeo rápido y directo, en el mismo tono de Ignacio, para saber si tu problema es de caja o de ventas."
                ctaHref="/guia-7-senales"
                ctaLabel="Leer la guía"
              />
            </div>
          </div>
        </section>

        {/* QUÉ NO ES ESTO */}
        <section>
          <div className="wrap">
            <div className="not-this fade-up" style={{ padding: "48px 32px" }}>
              <div className="section-head">
                <h2>Qué no es esto</h2>
                <p>Para que sepas si esta hora es para ti antes de escribir.</p>
              </div>
              <ul className="not-list">
                <li>
                  <span className="mark mono">&times;</span> No es un curso ni una membresía.
                </li>
                <li>
                  <span className="mark mono">&times;</span> No es contabilidad ni representación ante el SII.
                </li>
                <li>
                  <span className="mark mono">&times;</span> No te vamos a decir cómo &quot;hacerte millonario&quot;.
                </li>
                <li>
                  <span className="mark mono">&times;</span> No prometemos resultados. Prometemos una hora bien
                  usada.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="wrap">
            <div className="section-head fade-up">
              <h2>Preguntas frecuentes</h2>
            </div>
            <div className="faq">
              <details>
                <summary>¿Necesito saber de finanzas para venir?</summary>
                <p>
                  No. Vienes con tus números tal cual los tienes hoy, aunque sea una libreta o el saldo del banco. La
                  sesión parte de ahí.
                </p>
              </details>
              <details>
                <summary>¿Qué pasa si no puedo asistir a la hora que agendé?</summary>
                <p>
                  Escríbenos por WhatsApp con anticipación y reagendamos. La política formal de reagendamiento y
                  devolución se publica junto con el pago en línea.
                </p>
              </details>
              <details>
                <summary>¿Esto reemplaza a mi contador o abogado?</summary>
                <p>
                  No. Es orientación de negocio. Para temas legales, tributarios o contables específicos, se te
                  deriva a un profesional del área.
                </p>
              </details>
              <details>
                <summary>¿Cómo pago?</summary>
                <p>Por ahora la reserva se coordina directo por WhatsApp. El pago en línea con confirmación automática está en desarrollo.</p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section>
          <div className="wrap">
            <div className="final-cta fade-up">
              <h2>¿Vemos tu negocio con números reales?</h2>
              <p>Elige tu hora, cuéntanos en una línea qué quieres resolver, y listo.</p>
              <Link className="btn btn-primary" href="#precios">
                Ver precios y agendar
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="home" />
      <MobileCta />
    </>
  );
}
