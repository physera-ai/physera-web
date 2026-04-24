import type { Metadata } from "next";
import { displaySerif, mono, sans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Physera",
  description: "Simulation as infrastructure for intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displaySerif.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col relative">{children}</body>
    </html>
  );
}
