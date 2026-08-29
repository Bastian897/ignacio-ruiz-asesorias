"use client";

// Placeholder: todavía no hay pasarela de pago conectada.
// El botón no hace nada al hacer clic — se conecta cuando Ignacio defina el medio de pago.
export function PayButton() {
  return (
    <div>
      <button className="btn btn-nav" type="button" onClick={() => {}}>
        Pagar ahora
      </button>
      <p className="price-meta" style={{ marginTop: 8 }}>
        Pago en línea próximamente. Por ahora este botón no hace nada.
      </p>
    </div>
  );
}
