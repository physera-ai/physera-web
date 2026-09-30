import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you'd like to explore with Physera, or reach us at hello@physera.ai.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="flex w-full max-w-[1320px] flex-1 flex-col px-3 py-1 sm:px-4">
      <section className="rounded bg-white px-5 py-16 sm:px-16 sm:py-24">
        <div className="mx-auto max-w-[620px]">
          <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] leading-tight tracking-[-0.04em] text-[#0d0d0d]">
            Get in touch
          </h1>
          <p className="mt-3 text-[17px] leading-relaxed text-[#656565]">
            Tell us about your use case or what you&apos;d like to explore with
            us. Prefer email? Reach us at{" "}
            <a
              href="mailto:hello@physera.ai"
              className="text-[#0d0d0d] underline underline-offset-4"
            >
              hello@physera.ai
            </a>
            .
          </p>

          <div className="mt-9">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
