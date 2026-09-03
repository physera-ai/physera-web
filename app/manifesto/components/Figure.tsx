export default function Figure({
  title,
  note,
  caption,
  children,
}: {
  title: string;
  note?: string;
  caption?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="bench-panel manifesto-figure">
      <div className="bench-panel-head">
        <h3 className="bench-panel-title">{title}</h3>
        {note ? <span className="bench-mono-label">{note}</span> : null}
      </div>
      <div className="bench-dots">{children}</div>
      {caption ? <figcaption className="bench-legend manifesto-figcaption">{caption}</figcaption> : null}
    </figure>
  );
}
