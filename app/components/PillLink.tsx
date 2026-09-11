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
      ? "bg-[#232323] text-white hover:bg-[#3a3a3a]"
      : "bg-[#e8e8e8] text-[#232323] hover:bg-[#dcdcdc]";

  return (
    <Link
      href={href}
      className={`inline-flex h-8 items-center rounded-full px-3.5 text-[16px] font-medium tracking-[-0.32px] transition-colors ${styles}`}
    >
      {children}
    </Link>
  );
}
