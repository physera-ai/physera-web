import type { Metadata } from "next";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_DESCRIPTION, SITE_URL } from "../site-metadata";

const PAGE_TITLE = "Contact | Physera";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/contact`,
    siteName: "Physera",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: PAGE_TITLE,
    description: SITE_DESCRIPTION,
    site: "@PhyseraAI",
    creator: "@PhyseraAI",
  },
};

export default function ContactPage() {
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

        <SiteHeader hideContactButton />

        <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-4 pt-24 sm:pt-26 pb-14 sm:pb-16 pointer-events-auto">
          <section className="w-full max-w-[560px] flex flex-col gap-8 sm:gap-9 relative z-10 text-left">
            <div className="flex items-center justify-between gap-4 sm:gap-6">
              <h1 className="font-serif font-normal text-[34px] sm:text-[38px] text-(--site-fg) leading-none tracking-tight">
                Get in touch
              </h1>
              <div className="flex items-center justify-start gap-3 shrink-0">
                <a
                  href="https://x.com/PhyseraAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H5.85088C6.35055 0.60609 6.90242 1.38164 7.38621 2.0224L10.6806 6.36824C11.3434 5.63969 11.9981 4.90373 12.6446 4.16055L14.4687 2.09959L15.7777 0.625043C15.9102 0.47399 16.2099 0.153141 16.3215 0H19.7418C19.1364 0.646123 18.491 1.41252 17.9011 2.08338L14.2431 6.24803L12.9313 7.74445C12.7807 7.91658 12.4294 8.3392 12.2829 8.47531C12.4511 8.68475 12.6138 8.91596 12.7786 9.13119L14.3072 11.1497L18.2919 16.4172C18.8294 17.1254 19.4461 17.9933 20 18.6698V20H14.2169C14.0088 19.8369 13.7266 19.4262 13.5526 19.1968L12.7081 18.0869C11.417 16.3991 10.1233 14.6774 8.81488 13.0056C8.6423 13.1638 8.3391 13.5297 8.17367 13.7202L7.18977 14.8436L3.93797 18.5564L3.22971 19.3699C3.06574 19.5594 2.82744 19.8629 2.63004 20H0V19.185C0.24193 18.8682 0.633959 18.4348 0.902926 18.1305C1.25253 17.7329 1.60007 17.3334 1.94555 16.9322L5.9684 12.3071C6.10814 12.1463 7.13287 10.9982 7.16229 10.9007C6.97152 10.5973 6.58148 10.1177 6.35437 9.81953L4.76379 7.73715L0 1.50134V0ZM15.1583 17.9859C15.7609 18.023 16.4215 17.9658 17.0076 18.0061C16.9864 17.8899 15.1382 15.4919 14.9006 15.1772L8.05893 6.13609L5.94637 3.34385L5.32969 2.52793C5.19377 2.34689 5.06307 2.15393 4.9068 1.98984C4.8016 1.87941 3.17141 1.96537 2.87443 1.91568C2.95848 2.08359 3.36795 2.59861 3.50189 2.7724L4.64678 4.26367L9.13379 10.1247L13.2677 15.5245L14.5854 17.2424C14.7098 17.4043 15.0419 17.8693 15.1583 17.9859Z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/physera-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="h-[20px] w-[20px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[14px] text-(--site-fg-muted) opacity-70 font-medium">Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full bg-[#1d1d1d] rounded-xl px-4 py-3 text-[15px] text-(--site-fg) placeholder:text-white/25 focus:outline-none focus:bg-[#262626] transition-colors font-sans border border-white/10 focus:border-white/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[14px] text-(--site-fg-muted) opacity-70 font-medium">Work Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full bg-[#1d1d1d] rounded-xl px-4 py-3 text-[15px] text-(--site-fg) placeholder:text-white/25 focus:outline-none focus:bg-[#262626] transition-colors font-sans border border-white/10 focus:border-white/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="organization" className="text-[14px] text-(--site-fg-muted) opacity-70 font-medium">Company, Lab, or Institution *</label>
                <input
                  id="organization"
                  type="text"
                  required
                  className="w-full bg-[#1d1d1d] rounded-xl px-4 py-3 text-[15px] text-(--site-fg) placeholder:text-white/25 focus:outline-none focus:bg-[#262626] transition-colors font-sans border border-white/10 focus:border-white/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="website" className="text-[14px] text-(--site-fg-muted) opacity-70 font-medium">Website, Product, Paper, or Profile Link</label>
                <input
                  id="website"
                  type="url"
                  className="w-full bg-[#1d1d1d] rounded-xl px-4 py-3 text-[15px] text-(--site-fg) placeholder:text-white/25 focus:outline-none focus:bg-[#262626] transition-colors font-sans border border-white/10 focus:border-white/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[14px] text-(--site-fg-muted) opacity-70 font-medium">Describe your use case or what you&apos;d like to explore with us *</label>
                <textarea
                  id="message"
                  required
                  rows={3}
                  className="w-full bg-[#1d1d1d] rounded-xl px-4 py-3 text-[15px] text-(--site-fg) placeholder:text-white/25 focus:outline-none focus:bg-[#262626] transition-colors font-sans resize-none border border-white/10 focus:border-white/20"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-1 bg-white text-black font-medium text-[16px] rounded-xl py-3 hover:bg-white/90 focus:outline-none transition-all active:scale-[0.98] cursor-pointer"
              >
                Submit
              </button>
            </form>

          </section>
        </div>
      </div>
    </main>
  );
}