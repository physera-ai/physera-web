import type { Metadata } from "next";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { SiteHeader } from "@/components/SiteHeader";

const SITE_URL = "https://physera.ai";
const PAGE_TITLE = "Team | Physera";
const PAGE_DESCRIPTION =
  "Meet the team building Physera, a research and product lab working on model efficiency, behavioural simulations, and multimodal environments.";

const teamMembers = [
  { name: "Soham Parekh", x: "https://x.com/realsohamparekh" },
  { name: "Himanshu Dubey", x: "https://x.com/himanshustwts" },
  { name: "Ashwarya Maratha", x: "https://x.com/AshwaryaMaratha" },
  { name: "Tim Cvetko", x: "https://x.com/cvetko_tim" },
  { name: "Shashwat Dubey", x: "https://x.com/shashwatvalid" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/team#webpage`,
      url: `${SITE_URL}/team`,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en",
    },
    ...teamMembers.map((member) => ({
      "@type": "Person",
      name: member.name,
      sameAs: member.x,
      worksFor: {
        "@id": `${SITE_URL}/#organization`,
      },
    })),
  ],
};

function XIcon() {
  return (
    <svg
      className="inline-block h-[14px] w-[14px] fill-current"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M0 0H5.85088C6.35055 0.60609 6.90242 1.38164 7.38621 2.0224L10.6806 6.36824C11.3434 5.63969 11.9981 4.90373 12.6446 4.16055L14.4687 2.09959L15.7777 0.625043C15.9102 0.47399 16.2099 0.153141 16.3215 0H19.7418C19.1364 0.646123 18.491 1.41252 17.9011 2.08338L14.2431 6.24803L12.9313 7.74445C12.7807 7.91658 12.4294 8.3392 12.2829 8.47531C12.4511 8.68475 12.6138 8.91596 12.7786 9.13119L14.3072 11.1497L18.2919 16.4172C18.8294 17.1254 19.4461 17.9933 20 18.6698V20H14.2169C14.0088 19.8369 13.7266 19.4262 13.5526 19.1968L12.7081 18.0869C11.417 16.3991 10.1233 14.6774 8.81488 13.0056C8.6423 13.1638 8.3391 13.5297 8.17367 13.7202L7.18977 14.8436L3.93797 18.5564L3.22971 19.3699C3.06574 19.5594 2.82744 19.8629 2.63004 20H0V19.185C0.24193 18.8682 0.633959 18.4348 0.902926 18.1305C1.25253 17.7329 1.60007 17.3334 1.94555 16.9322L5.9684 12.3071C6.10814 12.1463 7.13287 10.9982 7.16229 10.9007C6.97152 10.5973 6.58148 10.1177 6.35437 9.81953L4.76379 7.73715L0 1.50134V0ZM15.1583 17.9859C15.7609 18.023 16.4215 17.9658 17.0076 18.0061C16.9864 17.8899 15.1382 15.4919 14.9006 15.1772L8.05893 6.13609L5.94637 3.34385L5.32969 2.52793C5.19377 2.34689 5.06307 2.15393 4.9068 1.98984C4.8016 1.87941 3.17141 1.96537 2.87443 1.91568C2.95848 2.08359 3.36795 2.59861 3.50189 2.7724L4.64678 4.26367L9.13379 10.1247L13.2677 15.5245L14.5854 17.2424C14.7098 17.4043 15.0419 17.8693 15.1583 17.9859Z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/team`,
    siteName: "Physera",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    site: "@PhyseraAI",
    creator: "@PhyseraAI",
  },
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-(--site-bg) text-(--site-fg) relative transition-colors duration-300">
      <BackgroundGrid />

      <div
        className="fixed z-0 pointer-events-none opacity-4 mix-blend-hard-light"
        style={{
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          backgroundImage: `url('/noise.png')`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <div className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-40 bg-linear-to-b from-(--site-bg) from-20% to-transparent transition-colors duration-300" />

        <SiteHeader />

        <div className="flex-1 flex flex-col items-center px-5 sm:px-4 pt-28 sm:pt-36 pb-20 pointer-events-auto cursor-default">
          <section className="w-full max-w-[700px] flex flex-col gap-8 relative z-10 text-left">
            <div className="flex flex-col gap-4">
              <h1 className="font-serif italic font-normal text-5xl sm:text-[52px] text-(--site-fg) leading-[1.1] tracking-tighter">
                Team
              </h1>
              <p className="font-sans text-[16px] sm:text-[18px] text-(--site-fg) opacity-90 leading-relaxed">
                The people building Physera.
              </p>
            </div>

            <ul className="list-disc pl-5 font-sans text-[16px] sm:text-[18px] text-(--site-fg) opacity-90 leading-relaxed space-y-3 marker:text-(--island-rule-hover)">
              {teamMembers.map((member) => (
                <li key={member.name}>
                  {member.name}{" ( "}
                  <a
                    href={member.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-(--site-fg-muted) hover:text-(--site-fg) transition-colors break-all"
                  >
                    <XIcon />
                    {member.x}
                  </a>
                  {" )"}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
