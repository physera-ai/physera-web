import type { Metadata, Viewport } from "next";
import { headingFont, mono, sans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Physera",
  description: "Simulation as infrastructure for intelligence.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col relative">{children}</body>
    </html>
  );
}
