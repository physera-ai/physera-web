import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { funnelDisplay, headingFont, mono, sans, serifFont } from "./fonts";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-XHRND0W3WV";

export const metadata: Metadata = {
  title: "Physera | Rethinking Applied Intelligence",
  description: "Physera is a research and product lab rethinking applied intelligence.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
      suppressHydrationWarning
      className={`${funnelDisplay.variable} ${headingFont.variable} ${sans.variable} ${mono.variable} ${serifFont.variable} h-full`}
    >
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <body className="min-h-full flex flex-col relative">
        {children}
      </body>
    </html>
  );
}
