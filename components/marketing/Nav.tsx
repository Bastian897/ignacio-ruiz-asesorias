import Image from "next/image";
import Link from "next/link";

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/">
          <Image src="/assets/img/logo.webp" alt="" width={30} height={30} />
          Ignacio Ruiz
        </Link>
        <Link className="btn btn-nav" href="/#precios">
          Agendar
        </Link>
      </div>
    </header>
  );
}
