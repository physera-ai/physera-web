"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import HomeFooter from "./HomeFooter";

/** The home page keeps main's compact footer; every other page gets the research footer. */
export default function FooterSwitch() {
  return usePathname() === "/" ? <HomeFooter /> : <Footer />;
}
