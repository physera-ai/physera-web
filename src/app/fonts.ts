import { Ubuntu_Mono, Figtree, Hubot_Sans, Newsreader, Funnel_Display } from "next/font/google";

export const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel",
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

export const headingFont = Hubot_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const mono = Ubuntu_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});
