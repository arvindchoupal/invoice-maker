import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  showText?: boolean;
  tagline?: string;
  title?: string;
};

export function BrandLogo({
  href = "/",
  className = "",
  imageClassName = "h-10 w-[120px]",
  showText = false,
  tagline = "",
  title = "InvoiceWala",
}: BrandLogoProps) {
  const content = (
    <>
      <Image
        src="/invoicewala-gradient-logo-v2.png"
        alt="InvoiceWala"
        width={2140}
        height={735}
        className={`shrink-0 object-contain dark:hidden ${imageClassName}`}
        priority
      />
      <Image
        src="/invoicewala-gradient-swoosh-logo.png"
        alt="InvoiceWala"
        width={2172}
        height={724}
        className={`hidden shrink-0 object-contain dark:block ${imageClassName}`}
        priority
      />
      {showText ? (
        <span className="min-w-0">
          <span className="block text-lg font-semibold tracking-tight leading-tight">{title}</span>
          {tagline ? <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">{tagline}</span> : null}
        </span>
      ) : null}
    </>
  );

  const wrapperClass = `inline-flex min-w-0 items-center gap-3 ${className}`;

  if (href) {
    return (
      <Link className={wrapperClass} href={href} title={title}>
        {content}
      </Link>
    );
  }

  return <span className={wrapperClass}>{content}</span>;
}
