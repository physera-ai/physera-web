import { DM_Mono, Figtree, Hubot_Sans } from "next/font/google";

export const headingFont = Hubot_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const mono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});
