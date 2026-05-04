import Link from "next/link";
import { CutoutWrapper } from "@/components/CutoutWrapper";
import { HoverScrambleText } from "@/components/HoverScrambleText";
import { PhyseraLogo, type PhyseraLogoTone } from "@/components/PhyseraLogo";

type SiteHeaderProps = {
  logoTone?: PhyseraLogoTone;
  hideContactButton?: boolean;
};

export function SiteHeader({ logoTone = "white", hideContactButton = false }: SiteHeaderProps) {
  return (
    <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-50 flex justify-between items-center pointer-events-none">
      <Link href="/" aria-label="Physera AI home" className="hover:opacity-80 transition-opacity pointer-events-auto">
        <PhyseraLogo tone={logoTone} className="h-7 sm:h-8 w-auto" />
      </Link>
      <div className={`pointer-events-auto transition-opacity duration-200 ${hideContactButton ? "opacity-0" : "opacity-100"}`}>
        <div data-scramble-trigger className="relative h-8 rounded-[5px] text-(--island-fg) shrink-0 group select-none inline-flex bg-(--island-bg) hover:bg-(--island-bg-hover)">
          <CutoutWrapper
            id="header-contact-button"
            hoverClass="group-hover:fill-(--island-bg-hover)"
            hasSeparator={false}
          >
            <div className="flex h-full items-center transition-colors duration-200">
              <Link
                href="/contact"
                className="flex min-h-full flex-1 items-center justify-center px-4 font-display text-[15px] font-medium tracking-[-0.01em] text-(--island-fg-muted) group-hover:text-(--island-fg) cursor-pointer border-none bg-transparent"
              >
                <HoverScrambleText text="Get in touch" />
              </Link>
            </div>
          </CutoutWrapper>
        </div>
      </div>
    </div>
  );
}