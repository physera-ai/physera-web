export function AnimatedLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <a
      className="group inline-flex border-b border-ink hover:border-ink/30 duration-300 pb-px text-ink"
      href={href}
    >
      {text.split("").map((char, i) => (
        <span key={i} className="relative inline-block overflow-hidden">
          {/* visible char — slides up on hover */}
          <span
            className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 16}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
          {/* clone — enters from below on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 block translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 16}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </a>
  );
}
