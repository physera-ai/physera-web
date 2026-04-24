import { David_Libre, DM_Mono, DM_Sans } from "next/font/google";

export const displaySerif = David_Libre({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-david-libre",
});

export const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const mono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});
