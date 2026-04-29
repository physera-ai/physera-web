import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/physera-logo-red.svg"
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0"
        priority
      />
      <span className="text-[24px] font-medium leading-none tracking-[-0.48px] text-[#ff3333]">
        Physera AI
      </span>
    </div>
  );
}