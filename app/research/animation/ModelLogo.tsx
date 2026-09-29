/** Provider marks are decorative: the adjacent model name is the accessible label. */
export default function ModelLogo({ model }: { model: string }) {
  const provider = /claude|opus|fable/i.test(model) ? "anthropic" : "openai";
  return (
    <span className={`ab-model-logo ab-model-logo-${provider}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/animation-bench/logos/${provider}.svg`} alt="" width={20} height={20} />
    </span>
  );
}
