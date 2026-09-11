import Link from "next/link";

type PillLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function PillLink({
  href,
  children,
  variant = "secondary",
}: PillLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-[var(--bench-ink)] text-[var(--bench-on-ink)] hover:opacity-85"
      : "bg-[var(--bench-rule)] text-[var(--bench-ink)] hover:bg-[var(--bench-rule-2)]";

  return (
    <Link
      href={href}
      className={`inline-flex h-8 items-center rounded-full px-3.5 text-[16px] font-medium tracking-[-0.32px] transition-colors ${styles}`}
    >
      {children}
    </Link>
  );
}
