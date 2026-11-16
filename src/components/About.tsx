import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { about, services, site, stack } from "#/content/site";
import { SectionHead } from "./SectionHead";

const words = about.split(" ");

/** Each word inks in as the paragraph is scrolled through. */
function Word({ word, i, progress }: { word: string; i: number; progress: MotionValue<number> }) {
  const start = i / words.length;
  const opacity = useTransform(progress, [start, start + 1.5 / words.length], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const toolCount = stack.reduce((sum, group) => sum + group.items.length, 0);

  const facts = [
    ["Discipline", "Software engineering"],
    ["Platforms", site.disciplines.join(", ")],
    ["Practice", `${services.length} services`],
    ["Toolchain", `${toolCount} tools`],
  ];

  return (
    <section id="about" className="gutter py-[clamp(6rem,14vw,12rem)]">
      <SectionHead index="02" label="About" aside="A short manifesto" />

      <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12">
        <div className="hidden md:col-span-3 md:block">
          <img src="/svg/logo.svg" alt="" className="sticky top-10 h-14 w-auto invert" />
        </div>
        <p
          ref={ref}
          className="text-[clamp(1.85rem,4.4vw,4.4rem)] leading-[1.02] font-[560] tracking-[-0.035em] md:col-span-9"
        >
          {words.map((word, i) => (
            <Word key={i} word={word} i={i} progress={scrollYProgress} />
          ))}
        </p>
      </div>

      <dl className="mt-16 grid grid-cols-2 border-t border-line md:mt-24 md:grid-cols-4">
        {facts.map(([term, value]) => (
          <div key={term} className="border-b border-line py-5 pr-4 md:border-b-0">
            <dt className="label text-mute">{term}</dt>
            <dd className="mt-2 text-lg tracking-tight">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
