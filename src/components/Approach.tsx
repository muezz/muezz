import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

import { principles } from "#/content/site";
import { SectionHead } from "./SectionHead";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * "How I work" — a dark chapter that pins to the viewport while the
 * principles advance, one per screen of scroll.
 */
export function Approach() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(principles.length - 1, Math.floor(value * principles.length));
    if (next !== index) setIndex(next);
  });

  const item = principles[index];

  return (
    <section
      id="approach"
      ref={ref}
      className="relative bg-ink text-paper"
      style={{ height: `${principles.length * 100}svh` }}
    >
      <div className="gutter sticky top-0 flex h-[100svh] flex-col justify-between pt-6 pb-28 md:pb-24">
        <SectionHead index="05" label="How I work" aside="Four principles" dark />

        {/* Screen readers and crawlers get every principle at once. */}
        <ol className="sr-only">
          {principles.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>

        <div aria-hidden className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="display flex items-start text-[clamp(5rem,14vw,14rem)] tabular-nums md:col-span-4">
            <span className="relative inline-block h-[0.86em] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={index}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease }}
                  className="block"
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="label ml-3 pt-3 text-mute-dark">
              /{String(principles.length).padStart(2, "0")}
            </span>
          </div>

          <div className="md:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease }}
              >
                <p className="display text-[clamp(2.75rem,6.2vw,6.75rem)]">
                  {item.title.split(" ").map((word, i, words) =>
                    i === words.length - 1 ? (
                      <em
                        key={i}
                        className="font-serif font-normal tracking-[-0.02em] text-signal italic"
                      >
                        {word}
                      </em>
                    ) : (
                      <span key={i}>{word} </span>
                    ),
                  )}
                </p>
                <p className="mt-8 max-w-[46ch] font-mono text-[0.9375rem] leading-relaxed text-mute-dark">
                  {item.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress ledger */}
        <ol aria-hidden className="grid grid-cols-4 gap-2">
          {principles.map((p, i) => (
            <li key={p.title} className="label text-mute-dark">
              <span className="relative mb-3 block h-px bg-line-dark">
                <span
                  className="absolute inset-0 origin-left bg-paper transition-transform duration-700 ease-out-expo"
                  style={{ transform: `scaleX(${i <= index ? 1 : 0})` }}
                />
              </span>
              <span className={`hidden sm:inline ${i === index ? "text-paper" : ""}`}>
                {p.title}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
