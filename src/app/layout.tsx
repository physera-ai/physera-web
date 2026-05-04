import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { funnelDisplay, headingFont, mono, sans, serifFont } from "./fonts";
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, SITE_TITLE, SITE_URL } from "./site-metadata";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-XHRND0W3WV";
const ORGANIZATION_LOGO_URL = `${SITE_URL}/logo/logo-full/physera-logo-full-red-transparent.svg`;
const SAME_AS_LINKS = [
  "https://github.com/physera-ai/",
  "https://x.com/PhyseraAI",
  "https://www.linkedin.com/company/physera-ai/",
  "https://huggingface.co/physera",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: ORGANIZATION_LOGO_URL,
      description: SITE_DESCRIPTION,
      foundingDate: "2026-05-04",
      sameAs: SAME_AS_LINKS,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [SITE_OG_IMAGE],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
    site: "@PhyseraAI",
    creator: "@PhyseraAI",
  },
  icons: {
    icon: [
      { url: "/metadata/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/metadata/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/metadata/apple-touch-icon.png",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
