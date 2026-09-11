import type { Metadata } from "next";
import PillLink from "../components/PillLink";
import SectionNav, { type Section } from "../research/cyberlatch/components/SectionNav";
import CalibrationLoop from "./components/CalibrationLoop";
import SpendChart from "./components/SpendChart";
import { CompoundingMoat, SufficiencyThreshold, VarianceCollapse } from "./components/Curves";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "An applied research lab building the first calibrated instrument for human decision-making.",
  alternates: { canonical: "/manifesto" },
};

const sections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "introduction", label: "Introduction" },
  { id: "problem", label: "The problem" },
  { id: "bets", label: "Our bets" },
  { id: "positioning", label: "Positioning" },
  { id: "team", label: "Team" },
  { id: "data", label: "Data strategy" },
  { id: "business", label: "Business development" },
  { id: "market", label: "The market" },
  { id: "roadmap", label: "Roadmap" },
  { id: "outro", label: "Outro" },
];

const faults = [
  {
    n: "01",
    title: "Variance collapse",
    body: "Ask it to be a thousand people and you get a thousand moderate, agreeable, internally consistent variations on the same one. Real populations are heavy-tailed and contradictory; simulated ones are narrower and tamer than any real group has ever been, and the tails, where the interesting decisions live, are gone.",
  },
  {
    n: "02",
    title: "Caricature",
    body: "Prompt with demographics and you get the stereotype of a group, not the group. The evidence is consistent: given a person's actual behavior, a model reproduces that person at a measurable fraction of the human test-retest ceiling. Given only their age, income, and zip code, it does not.",
  },
  {
    n: "03",
    title: "Unfalsifiability",
    body: "Nothing tells you when it is wrong. The field's test — does the simulated population match the real distribution — cannot either. If sixty percent of a group says yes, a simulation passes whether the right sixty percent said it or a random sixty percent did. Every agent can be wrong and the aggregate still passes.",
  },
];

const bets = [
  {
    n: "01",
    title: "Agents can adopt preferences the way a human does.",
    body: "The actor starts with a prior over what a person like this would do. Every time the observer records something the person saw or did, that record enters what the actor conditions on, and the prior moves — the same way a real person's does. Nobody could run that test cheaply. We are building the instrument that can.",
  },
  {
    n: "02",
    title: "LLMs can infer latent attributes from past behavior.",
    body: "Sparse behavior and sparse text are enough to recover style, temperament, what a person weighs and what they ignore. Falsified if the recovered traits do not raise the likelihood of the person's next real action.",
  },
  {
    n: "03",
    title: "Token efficiency is a core architectural investment.",
    body: "Continuous real-world data ingestion will break economics if every update costs frontier tokens.",
  },
  {
    n: "04",
    title: "Unbounded domains never stop paying.",
    body: "Bounded domains have a sufficiency threshold (99% on document parsing is the end of the market). Unbounded domains can never be commoditized as “good enough.” Predicting what people will do in finance, insurance, and risk never stops paying: each extra point of accuracy is worth money, so the work cannot be commoditized by a cheaper model. These domains also produce the real answer on their own — trades, claims, purchases, every day — which is what a calibration loop needs and a survey cannot supply. Real-time data never runs out; ground truth is free and continuous. Falsified if buyers stop paying for accuracy past a threshold.",
  },
];

const differentiators = [
  {
    n: "01",
    title: "Simulate individuals, not populations.",
    body: "Every simulated person is built from a real person's own behavior and scored against what that real person later did. Population statistics are a consequence, not a target. This is the only setup in which a simulation can be wrong, and therefore the only one that can improve.",
  },
  {
    n: "02",
    title: "Keep the frontier model frozen and learn what it should know.",
    body: "Physera does not train the model that decides. A second, smaller model learns what the first one needs to know about each person, keeps that knowledge current as the person changes, and is scored on one thing only: whether real people, held out from training, did what the simulation said they would. Every improvement a frontier lab ships lands in our instrument for free. Labs optimize the actor; Physera optimizes the observer.",
  },
  {
    n: "03",
    title: "Report confidence, and abstain when it is low.",
    body: "Every output carries a calibrated confidence and every population run carries a predictive horizon — how far ahead it stays reliable before it drifts. Where confidence is low, the honest output is no prediction. Weather forecasting states its limits this way; so will we.",
  },
  {
    n: "04",
    title: "Treat cost as a precondition.",
    body: "A simulator nobody can afford to rerun is a simulator nobody learns from. The frontier model sets the ceiling; the cheapest model that stays within it runs the population. Real-world data arrives continuously, and the economics only work if updating against it is cheap.",
  },
  {
    n: "05",
    title: "Choose domains where being more right is always worth more.",
    body: "Most tasks stop paying once a model is good enough. Predicting what people will do in finance, insurance, and risk never stops paying — each extra point of accuracy is worth money — and these domains produce the real answer on their own, every day: trades, claims, purchases. Real-time data never runs out; ground truth is free and continuous.",
  },
  {
    n: "06",
    title: "Publish the benchmark.",
    body: "Physera will release a public leaderboard of individual behavioral fidelity, measured against the human ceiling, per model and per dollar. It will make our claims falsifiable and turn the field's argument into one we set the terms of.",
  },
];

const team = [
  {
    n: "01",
    name: "Tim Cvetko",
    bio: "Former Sync Labs, former Tenex. Co-founded Rywave at 19, backed by Sony and Universal. Author of two deep-research papers at 17.",
  },
  { n: "02", name: "Soham Parekh", bio: "Former Sync Labs." },
  { n: "03", name: "Himanshu", bio: "" },
  { n: "04", name: "Ashwarya", bio: "" },
];

const market = [
  {
    n: "01",
    title: "Advertisers.",
    body: "Global ad spend crosses $1.3 trillion in 2026, growing 9% a year, and roughly 80% of it now flows through retail media, search, and social — channels that are bought on predicted response. Physera will work with brands, agencies, and ad platforms to test creative, pricing, and targeting against a calibrated population before a campaign spends a dollar.",
  },
  {
    n: "02",
    title: "Market and financial research.",
    body: "$93B in 2025, $116B by 2030; the wider insights ecosystem is ~$160B. All of it samples. Incumbents — Qualtrics, Ipsos, Gallup, YouGov — have already shipped or acquired synthetic panels, and 71% of researchers expect most research to be synthetic within three years. Physera will supply the calibration layer these panels lack.",
  },
  {
    n: "03",
    title: "Insurers, lenders, and consumer businesses.",
    body: "They already pay for models that predict claims, defaults, churn, and purchases, and they see the real outcome daily, per individual. They are the first buyers, because they can verify the instrument themselves.",
  },
  {
    n: "04",
    title: "Central banks, regulators, and public policy.",
    body: "In 2026 the BIS, Bank of England, and Bundesbank launched Project Logos to observe LLM agents in simulated financial markets, and G7 leaders directed finance ministers and central banks to coordinate on frontier AI. Their published concern is that LLM agents are “too rational” and too homogeneous compared to real humans. That is the gap Physera closes, and the door through which it enters policy.",
  },
];

function NumberedGrid({
  items,
  columns = 2,
}: {
  items: { n: string; title: string; body: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div className={columns === 3 ? "bench-manifesto manifesto-grid-3" : "bench-manifesto"}>
      {items.map((it) => (
        <div key={it.n}>
          <span className="bench-mono-label">{it.n}</span>
          <h3>{it.title}</h3>
          <p>{it.body}</p>
        </div>
      ))}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <span className="bench-mono-label manifesto-kicker">{children}</span>;
}

export default function ManifestoPage() {
  return (
    <main className="bench flex w-full max-w-[1320px] flex-1 flex-col px-3 py-1 sm:px-4">
      <article className="rounded bg-white px-5 py-14 sm:px-12 sm:py-16">
        <div className="mx-auto flex max-w-[1180px] flex-col">
          <header id="overview" className="flex scroll-mt-24 flex-col gap-5">
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.04em] text-[#0d0d0d]">
              Manifesto
            </h1>
            <div className="bench-mono-label">Physera AI · physera.ai</div>
            <p className="max-w-[720px] font-serif text-[22px] leading-[1.35] text-[#1f1f1f]">
              An applied research lab building the first calibrated instrument for human
              decision-making.
            </p>
          </header>

          <div className="bench-article mt-10">
            <SectionNav sections={sections} />
            <div className="bench-article-body manifesto-body">
              <Kicker>Introduction</Kicker>
              <h2 id="introduction" className="bench-h2 scroll-mt-24">
                Every predictive science simulated first.
              </h2>
              <p>
                Every science that learned to predict learned to simulate first. Fluid dynamics became
                predictive when engineers could hold air still; genetics when Mendel could hold a single
                trait still; epidemiology when models could run an outbreak faster than it spread.
                Behavioral science never got that instrument. Humans cannot be held still, and the
                substitutes we built — surveys, trials, longitudinal studies — sample rather than simulate.
                None of them answers the counterfactual: what would this person have done instead.
              </p>
              <p>
                The last three years changed this. Foundational models can now instantiate plausible
                humans across modality and context. Compute is cheap enough to run those humans in
                populations rather than singletons. And we have begun to understand what these models
                actually are. An instruction-tuned LLM is not a text predictor wearing a costume. It is a
                role-conditional sample from a learned distribution of human-generated behavior. Prompt it
                as a 34-year-old marketing director in São Paulo evaluating a contract, and the model does
                not become that person. It samples from the region of its learned distribution that
                resembles that person.
              </p>
              <p className="manifesto-pull">
                Foundational models are the raw material for the first flight simulator of human
                decisions.
              </p>
              <p>Such a simulator can help humans:</p>
              <ul className="manifesto-list">
                <li>test a product, a price, a policy, or a message against a population before it ships</li>
                <li>forecast how a market, a customer base, or an electorate will move, and why</li>
                <li>
                  run the counterfactual that no survey or trial can — the same people, a different world
                </li>
              </ul>
              <p>
                Market research and consumer insights alone spend over $90B a year answering these
                questions by sampling. The broader spend on decisions that depend on predicting human
                behavior — advertising, underwriting, marketing, policy — is more than an order of
                magnitude larger. A working instrument is a transformative technology for every business
                whose economics rest on what people will do next.
              </p>
              <div className="bench-stats manifesto-stats">
                <div>
                  <div className="bench-mono-label">Market research</div>
                  <div className="v">$90B+</div>
                  <div className="k">Spent yearly sampling behavior via market research alone</div>
                </div>
                <div>
                  <div className="bench-mono-label">Broader spend</div>
                  <div className="v">10x+</div>
                  <div className="k">Broader spend on decisions that depend on predicting behavior</div>
                </div>
              </div>

              <Kicker>The problem</Kicker>
              <h2 id="problem" className="bench-h2 scroll-mt-24">
                Current behavioral simulation does not meet market constraints.
              </h2>
              <p>
                The buyers who would pay most for simulation — finance, insurance, risk — cannot use what
                exists today. It fails them in three ways.
              </p>
              <NumberedGrid items={faults} columns={3} />
              <VarianceCollapse />
              <p className="manifesto-pull">
                All three faults have the same cause: the unit of simulation has been the population.
              </p>

              <Kicker>Our bets</Kicker>
              <h2 id="bets" className="bench-h2 scroll-mt-24">
                The assumptions we&apos;re building on.
              </h2>
              <p>
                The underlying assumptions we are making about the state of this technology that justify
                the bets we are making:
              </p>
              <NumberedGrid items={bets} />
              <SufficiencyThreshold />

              <Kicker>Positioning</Kicker>
              <h2 id="positioning" className="bench-h2 scroll-mt-24">
                From language models to true simulation.
              </h2>
              <p>
                A language model interpolates within the behavior it was trained on. It can produce a
                plausible person; without calibration it produces plausible fiction. Whether a simulated
                person matches a real one is not philosophy. It is a measurement, and it can come back
                wrong.
              </p>
              <p className="manifesto-pull">
                A learned distribution becomes a scientific instrument the moment its boundaries are
                mapped — where it agrees with real humans, where it diverges, and by how much.
              </p>
              <p>
                The work is building multimodal, multi-agent environments that can be falsified and
                improved: simulated populations checked against real ones, corrected when they diverge.
                Our differentiators, which are dead angles in our competitors&apos; strategy, follow.
              </p>
              <CalibrationLoop />
              <NumberedGrid items={differentiators} />

              <Kicker>Team</Kicker>
              <h2 id="team" className="bench-h2 scroll-mt-24">
                Applied researchers, already funded by the work.
              </h2>
              <p>
                Physera is a four-person team of applied researchers and engineers that, unfunded, already
                build and sell hour-long verifiable task environments and human-fidelity synthetic data to
                top-10 frontier labs. We work on the hard problems that push applied research forward, and
                we are paid by the people who train the models to do it.
              </p>
              <div className="bench-manifesto">
                {team.map((m) => (
                  <div key={m.n}>
                    <span className="bench-mono-label">{m.n}</span>
                    <h3>{m.name}</h3>
                    {m.bio ? <p>{m.bio}</p> : null}
                  </div>
                ))}
              </div>

              <Kicker>Data strategy</Kicker>
              <h2 id="data" className="bench-h2 scroll-mt-24">
                The moat is longitudinal behavioral data.
              </h2>
              <p className="manifesto-pull">
                The moat is longitudinal behavioral data on real individuals, and the loop that keeps it
                calibrated.
              </p>
              <p>
                Physera will assemble this data through consented first-party partnerships in domains
                where behavior is observed continuously — transactions, claims, purchases, engagement —
                rather than through surveys. Each partnership adds ground truth; each round of calibration
                makes the next simulation cheaper and more accurate. The advantage compounds with time in
                a way that model access does not.
              </p>
              <p>
                We will begin in markets where such partnerships are reachable for a small team and where
                multilingual, fragmented consumer behavior keeps larger competitors out, and expand toward
                the highest-value Western finance and insurance buyers as the instrument proves itself.
              </p>
              <CompoundingMoat />

              <Kicker>Business development</Kicker>
              <h2 id="business" className="bench-h2 scroll-mt-24">
                One instrument, two customers.
              </h2>
              <p>Physera will sell the same instrument to two customers.</p>
              <div className="bench-findings">
                <div>
                  <h3>Enterprises that price risk.</h3>
                  <p className="manifesto-card-p">
                    Insurers, lenders, asset managers, and consumer businesses will license calibrated
                    populations in their domain, run their own counterfactuals, and receive the confidence
                    and horizon with every result. The continuous calibration of those populations against
                    real outcomes is the recurring service.
                  </p>
                </div>
                <div>
                  <h3>Frontier labs.</h3>
                  <p className="manifesto-card-p">
                    A calibrated human population is also an environment — the largest unmeasured one — in
                    which a frontier model&apos;s behavior can be trained and evaluated. Physera already
                    builds and sells verifiable task environments to top labs; behavioral environments
                    extend the same relationship.
                  </p>
                </div>
              </div>
              <p>
                The public benchmark serves both: it is how a small team earns credibility with labs and
                how enterprise buyers verify a vendor&apos;s claims before signing.
              </p>

              <Kicker>The market</Kicker>
              <h2 id="market" className="bench-h2 scroll-mt-24">
                Big industry buyers who can check our work first.
              </h2>
              <p>
                Physera aims to tap into big industry buyers who can check its work, and expands toward
                the ones who cannot yet.
              </p>
              <SpendChart />
              <NumberedGrid items={market} />

              <Kicker>Roadmap</Kicker>
              <h2 id="roadmap" className="bench-h2 scroll-mt-24">
                Building toward the calibration loop.
              </h2>
              <div className="bench-stats manifesto-stats">
                <div>
                  <div className="bench-mono-label">Q3 2026</div>
                  <div className="v">3</div>
                  <div className="k">Partnerships already closed.</div>
                </div>
                <div>
                  <div className="bench-mono-label">Q4 2026</div>
                  <div className="v">→</div>
                  <div className="k">Milestones in progress.</div>
                </div>
              </div>

              <Kicker>Outro</Kicker>
              <h2 id="outro" className="bench-h2 scroll-mt-24">
                Problems of measurement, not capability.
              </h2>
              <p>
                We are a team of applied researchers and engineers. The problems we care about are not
                problems of capability — frontier models are already capable enough to begin this work.
                They are problems of measurement, calibration, and cost.
              </p>
              <p>
                For all inquiries, write to{" "}
                <a href="mailto:himanshu@physera.ai" className="text-[#0d0d0d] underline underline-offset-4">
                  himanshu@physera.ai
                </a>{" "}
                /{" "}
                <a
                  href="https://x.com/PhyseraAI"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0d0d0d] underline underline-offset-4"
                >
                  @PhyseraAI
                </a>
              </p>

              <div className="flex flex-wrap gap-3 pt-6">
                <PillLink href="/contact" variant="primary">
                  Get in touch
                </PillLink>
                <PillLink href="/research">Research</PillLink>
                <PillLink href="/careers">Careers</PillLink>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
