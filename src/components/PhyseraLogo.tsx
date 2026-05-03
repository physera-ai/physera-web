import Image from "next/image";

export type PhyseraLogoTone = "white" | "red";

interface PhyseraLogoProps {
  tone?: PhyseraLogoTone;
  className?: string;
  priority?: boolean;
}

const logoByTone: Record<PhyseraLogoTone, string> = {
  white: "/logo/logo-full/physera-logo-full-white-plain-transparent.svg",
  red: "/logo/logo-full/physera-logo-full-red-transparent.svg",
};

export function PhyseraLogo({
  tone = "white",
  className = "h-6 w-auto",
  priority = false,
}: PhyseraLogoProps) {
  const filterClass = tone === "white" ? "logo-invertible" : "";
  return (
    <Image
      src={logoByTone[tone]}
      alt="Physera AI Logo"
      width={161}
      height={32}
      className={`${className} ${filterClass}`}
      priority={priority}
    />
  );
}
