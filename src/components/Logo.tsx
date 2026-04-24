import { displaySerif } from "@/app/fonts";

export function Logo() {
  return (
    <span className={`${displaySerif.className} text-[22px] font-medium leading-none tracking-[-0.03em] text-ink`}>
      Physera
    </span>
  );
}
