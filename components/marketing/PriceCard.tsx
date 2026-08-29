type PriceCardProps = {
  name: string;
  meta: string;
  amount?: string;
  amountSuffix?: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  download?: boolean;
  featured?: boolean;
};

export function PriceCard({
  name,
  meta,
  amount,
  amountSuffix,
  description,
  ctaHref,
  ctaLabel,
  download,
  featured,
}: PriceCardProps) {
  return (
    <div className={`price-card fade-up${featured ? " is-featured" : ""}`}>
      <p className="price-name">{name}</p>
      <p className="price-meta">{meta}</p>
      {amount && (
        <p className="price-amount">
          {amount}
          {amountSuffix && <span> {amountSuffix}</span>}
        </p>
      )}
      <p className="price-desc">{description}</p>
      <a className="btn btn-card" href={ctaHref} download={download}>
        {ctaLabel}
      </a>
    </div>
  );
}
