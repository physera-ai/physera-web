"use client";

import { FormEvent, useRef, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClassName =
  "w-full bg-[#1d1d1d] rounded-xl px-4 py-3 text-[15px] text-(--site-fg) placeholder:text-white/25 focus:outline-none focus:bg-[#262626] transition-colors font-sans border border-white/10 focus:border-white/20";
const labelClassName = "text-[14px] text-(--site-fg-muted) opacity-70 font-medium";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitState === "submitting") return;

    const formData = new FormData(event.currentTarget);
    setSubmitState("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          organization: formData.get("organization"),
          website: formData.get("website"),
          message: formData.get("message"),
          companyPhone: formData.get("companyPhone"),
        }),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      setSubmitState("success");
      setStatusMessage("Thanks. We'll get back to you soon.");
      formRef.current?.reset();
    } catch {
      setSubmitState("error");
      setStatusMessage("Something went wrong. Please email hello@physera.ai directly.");
    }
  }

  return (
    <form ref={formRef} className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="companyPhone"
        tabIndex={-1}
        type="text"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClassName}>Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClassName}>Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClassName}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="organization" className={labelClassName}>Company, Lab, or Institution *</label>
        <input
          id="organization"
          name="organization"
          type="text"
          required
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="website" className={labelClassName}>Website, Product, Paper, or Profile Link</label>
        <input
          id="website"
          name="website"
          type="url"
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClassName}>
          Describe your use case or what you&apos;d like to explore with us *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={3}
          className={`${inputClassName} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="w-full mt-1 bg-white text-black font-medium text-[16px] rounded-xl py-3 hover:bg-white/90 focus:outline-none transition-all active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitState === "submitting" ? "Sending..." : "Submit"}
      </button>

      {statusMessage ? (
        <p
          className={`text-[14px] ${submitState === "success" ? "text-white/70" : "text-red-200/80"}`}
          role="status"
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
