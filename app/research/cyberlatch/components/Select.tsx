"use client";

type Option = { value: string; label: string };

export default function Select({
  glyph,
  label,
  value,
  options,
  onChange,
}: {
  glyph: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="bench-select">
      <span aria-hidden="true">{glyph}</span>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="bench-select-caret">
        ⌃⌄
      </span>
    </label>
  );
}
