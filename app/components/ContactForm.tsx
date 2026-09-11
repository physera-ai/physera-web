"use client";

import { useState } from "react";

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  {
    name: "organization",
    label: "Company, Lab, or Institution",
    type: "text",
    required: true,
  },
  {
    name: "link",
    label: "Website, Product, Paper, or Profile Link",
    type: "url",
    required: false,
  },
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    let response: Response;
    try {
      response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
    } catch {
      setError("Could not send your message. Please try again.");
      setStatus("error");
      return;
    }

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setError(result?.error ?? "Something went wrong. Please try again.");
      setStatus("error");
      return;
    }

    form.reset();
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="rounded-md border border-[var(--bench-rule)] bg-[var(--bench-hover)] px-5 py-6 text-[16px] text-[var(--bench-ink-2)]">
        Thanks — your message has been sent. We&apos;ll get back to you at the
        email you shared. You can also reach us directly at{" "}
        <a
          href="mailto:hello@physera.ai"
          className="text-[var(--bench-ink)] underline underline-offset-4"
        >
          hello@physera.ai
        </a>
        .
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input
        type="text"
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {fields.map((f) => (
        <label key={f.name} className="flex flex-col gap-1.5">
          <span className="text-[14px] font-medium text-[var(--bench-ink)]">
            {f.label}
            {f.required && <span className="text-[var(--bench-ink-3)]"> *</span>}
          </span>
          <input
            name={f.name}
            type={f.type}
            required={f.required}
            className="h-11 rounded-md border border-[var(--bench-rule-2)] bg-[var(--bench-panel)] px-3.5 text-[15px] text-[var(--bench-ink)] outline-none transition-colors placeholder:text-[var(--bench-ink-3)] focus:border-[var(--bench-ink-3)]"
          />
        </label>
      ))}

      <label className="flex flex-col gap-1.5">
        <span className="text-[14px] font-medium text-[var(--bench-ink)]">
          Describe your use case or what you&apos;d like to explore with us
          <span className="text-[var(--bench-ink-3)]"> *</span>
        </span>
        <textarea
          name="usecase"
          required
          rows={5}
          className="resize-y rounded-md border border-[var(--bench-rule-2)] bg-[var(--bench-panel)] px-3.5 py-3 text-[15px] leading-relaxed text-[var(--bench-ink)] outline-none transition-colors placeholder:text-[var(--bench-ink-3)] focus:border-[var(--bench-ink-3)]"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--bench-ink)] px-6 text-[16px] font-medium tracking-[-0.32px] text-[var(--bench-on-ink)] transition-opacity hover:opacity-85 sm:w-auto sm:self-start"
      >
        {status === "sending" ? "Sending..." : "Submit"}
      </button>

      {status === "error" && (
        <p className="text-[14px] leading-relaxed text-[var(--bench-bad-ink)]">{error}</p>
      )}
    </form>
  );
}
