import Link from "next/link";
export function Brand() {
  return (
    <Link
      className="brand product-brand"
      href="/"
      aria-label="Kenny AI Business Studio home"
    >
      <span className="brand-mark" aria-hidden="true">
        K
      </span>
      <span>
        <strong>Kenny</strong>
        <span className="brand-subtitle">AI Business Studio</span>
      </span>
    </Link>
  );
}
