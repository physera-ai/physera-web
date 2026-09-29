"use client";

import { useState } from "react";

export default function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () =>
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  return (
    <div className="ab-cite">
      <div className="ab-cite-bar">
        <span className="bench-mono-label">bibtex</span>
        <button type="button" onClick={copy} className="bench-mono-label ab-cite-copy">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  );
}
