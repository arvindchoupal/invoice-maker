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
  imageClassName = "h-10 w-10",
  showText = true,
  tagline = "Finance OS",
  title = "InvoiceWala",
}: BrandLogoProps) {
  const content = (
    <>
      <Image
        src="/logo.png"
        alt="InvoiceWala"
        width={80}
        height={80}
        className={`shrink-0 rounded-2xl object-contain ${imageClassName}`}
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
