import { Geist, Geist_Mono, Hubot_Sans, Newsreader, Funnel_Display, Gentium_Plus } from "next/font/google";

export const serifFont = Gentium_Plus({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-gentium",
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