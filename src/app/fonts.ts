import { Geist, Geist_Mono, Hubot_Sans, Newsreader, Funnel_Display, Source_Serif_4 } from "next/font/google";

export const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

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

export const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});