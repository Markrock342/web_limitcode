import Image from "next/image";
import logo from "../../public/brand/lcs-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-brand-400/40 ${className}`}
    >
      <Image
        src={logo}
        alt="LIMIT CODE STUDIO"
        fill
        sizes="48px"
        className="object-cover"
        priority
      />
    </span>
  );
}

export function BrandWordmark({ className = "text-lg" }: { className?: string }) {
  return (
    <span className={`whitespace-nowrap font-display font-bold tracking-tight text-ink ${className}`}>
      LIMIT<span className="text-brand-600"> CODE</span> STUDIO
    </span>
  );
}
