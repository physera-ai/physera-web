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
  return (
    <Link href={href} className={variant === "primary" ? "btn-cta" : "btn-cta btn-cta-secondary"}>
      {children}
    </Link>
  );
}
