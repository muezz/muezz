import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { LUC_PHONE_DISPLAY, luc, lucPromises, lucServices, lucSteps, lucUrls } from "#/content/luc";
import { Badge, Cat, ChatIcon, Dachshund, Paw, ServiceIcon } from "./Art";
import { QrCode } from "./QrCode";

const ease = [0.16, 1, 0.3, 1] as const;

const toneClass = {
  butter: "bg-butter",
  sage: "bg-sage",
  blush: "bg-blush",
  cream: "bg-cream",
} as const;

function WhatsAppButton({
  className = "",
  label = "Message Luc on WhatsApp",
  dark,
}: {
  className?: string;
  label?: string;
  dark?: boolean;
}) {
  return (
    <a
      href={lucUrls.pageWhatsapp}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex h-15 items-center justify-center gap-3 rounded-full px-7 text-[1.0625rem] font-semibold tracking-tight transition-transform duration-300 active:scale-[0.98] md:hover:-translate-y-0.5 ${
        dark
          ? "bg-spruce text-cream shadow-[0_14px_30px_-14px_rgb(22_48_43/0.8)]"
          : "bg-persimmon text-cream shadow-[0_14px_30px_-12px_rgb(238_91_43/0.75)]"
      } ${className}`}
    >
      <ChatIcon className="size-5.5" />
      {label}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function Hero({ ctaRef }: { ctaRef: React.RefObject<HTMLDivElement | null> }) {
  const words = luc.headline.split(" ");
  return (
    <section className="relative overflow-hidden px-5 pt-6 pb-14 md:px-10 md:pt-8 md:pb-24">
      <header className="flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2" aria-label="Luc — home">
          <Paw className="size-7 text-persimmon" />
          <span className="fraunces text-[2rem] italic">Luc</span>
        </a>
        <a
          href={lucUrls.pageWhatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-spruce px-4 py-2.5 text-sm font-semibold text-cream"
        >
          <ChatIcon className="size-4" />
          WhatsApp
        </a>
      </header>

      <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-spruce/15 bg-cream/70 px-3.5 py-1.5 text-[0.8125rem] font-medium"
          >
            <span className="size-2 rounded-full bg-persimmon" />
            {luc.trade}
          </motion.p>
          <h1 className="fraunces mt-6 text-[clamp(3.25rem,13.5vw,8.75rem)]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span
                  className={`inline-block ${word === "favourite" ? "text-persimmon italic" : ""}`}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease, delay: 0.15 + i * 0.07 }}
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          className="relative pt-16 md:col-span-5 md:pt-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.5 }}
        >
          <Badge
            animated
            className="absolute top-0 left-[30%] z-10 w-20 md:-top-24 md:left-[30%] md:w-32"
          />
          <div className="luc-bob">
            <Dachshund animated className="w-full max-w-[30rem]" />
          </div>
          <div className="mt-1 h-[3px] w-full bg-[repeating-linear-gradient(90deg,var(--color-spruce)_0_14px,transparent_14px_24px)] opacity-25" />
        </motion.div>
      </div>

      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="max-w-[36ch] text-[1.1875rem] leading-snug text-spruce/80 md:col-span-5 md:text-xl"
        >
          {luc.intro}
        </motion.p>
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.85 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center md:col-span-7 md:justify-end"
        >
          <WhatsAppButton className="w-full sm:w-auto" />
          <a
            href="#how"
            className="px-2 py-3 text-center font-semibold underline decoration-2 underline-offset-4 decoration-persimmon"
          >
            How it works
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Dog walks",
    "Drop-in visits",
    "Sleepovers",
    "Puppy visits",
    "Cat cuddles",
    "Photo updates",
  ];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden bg-spruce py-5 text-butter" aria-hidden>
      <div className="luc-marquee flex w-max items-center gap-8">
        {[...row, ...row].map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="fraunces text-[2rem] italic md:text-[2.75rem]">{item}</span>
            <Paw className="size-6 text-persimmon" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section className="px-5 py-20 md:px-10 md:py-32">
      <Reveal>
        <p className="text-sm font-semibold tracking-[0.14em] text-persimmon uppercase">Services</p>
        <h2 className="fraunces mt-4 max-w-[14ch] text-[clamp(2.6rem,8vw,5.5rem)]">
          Four ways to make their day.
        </h2>
      </Reveal>

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 md:gap-7 lg:grid-cols-4">
        {lucServices.map((service, i) => (
          <li key={service.title} className={i % 2 ? "lg:mt-16" : ""}>
            <Reveal delay={i * 0.08}>
              <article
                className={`group relative flex flex-col justify-between rounded-[2rem] p-6 md:min-h-[19rem] transition-transform duration-500 md:hover:rotate-0 md:hover:-translate-y-2 ${toneClass[service.tone]}`}
                style={{ rotate: `${i % 2 ? 1.6 : -1.4}deg` }}
              >
                <div className="flex items-start justify-between">
                  <span className="size-5 rounded-full bg-oat shadow-[inset_0_2px_3px_rgb(0_0_0/0.18)]" />
                  <span className="text-sm font-semibold text-spruce/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <ServiceIcon
                  name={service.icon}
                  className="mt-2 size-10 text-spruce md:mt-6 md:size-12"
                />
                <div className="mt-4 md:mt-6">
                  <h3 className="fraunces text-[2.1rem]">{service.title}</h3>
                  <p className="mt-3 text-[1.0625rem] leading-snug text-spruce/80">
                    {service.detail}
                  </p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-spruce/70">
        Rates depend on your area and routine — ask Luc on WhatsApp.
      </p>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="how" className="scroll-mt-6 bg-oat-2 px-5 py-20 md:px-10 md:py-32">
      <Reveal>
        <p className="text-sm font-semibold tracking-[0.14em] text-persimmon uppercase">
          How it works
        </p>
        <h2 className="fraunces mt-4 max-w-[16ch] text-[clamp(2.6rem,8vw,5.5rem)]">
          Three steps to a <em className="italic">happy</em> pet.
        </h2>
      </Reveal>

      <ol ref={ref} className="relative mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
        {/* The walk route, drawn as you scroll. */}
        <span
          aria-hidden
          className="absolute top-6 bottom-6 left-6 w-[3px] bg-spruce/10 md:hidden"
        />
        <motion.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute top-6 bottom-6 left-6 w-[3px] origin-top bg-persimmon md:hidden"
        />
        <span
          aria-hidden
          className="absolute top-6 right-[8%] left-6 hidden h-[3px] bg-spruce/10 md:block"
        />
        <motion.span
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute top-6 right-[8%] left-6 hidden h-[3px] origin-left bg-persimmon md:block"
        />
        {lucSteps.map((step, i) => (
          <li key={step.title} className="relative grid grid-cols-[3rem_1fr] gap-5 md:block">
            <span className="fraunces relative z-10 grid size-12 place-items-center rounded-full bg-butter text-2xl ring-8 ring-oat-2">
              {i + 1}
            </span>
            <Reveal delay={i * 0.1} className="md:mt-8">
              <h3 className="fraunces text-[2rem] md:text-[2.4rem]">{step.title}</h3>
              <p className="mt-3 max-w-[30ch] text-[1.0625rem] leading-snug text-spruce/80">
                {step.detail}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Promise() {
  return (
    <section className="px-3 py-3 md:px-6 md:py-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-spruce px-6 py-16 text-oat md:px-14 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2 className="fraunces text-[clamp(2.6rem,7.5vw,5.75rem)]">
              While you're away, they're in <em className="text-butter italic">good hands.</em>
            </h2>
            <ul className="mt-10 grid gap-4">
              {lucPromises.map((promise) => (
                <li key={promise} className="flex items-center gap-4 text-[1.125rem] md:text-xl">
                  <Paw className="size-6 shrink-0 text-butter" />
                  {promise}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="relative md:col-span-5">
            <div className="mx-auto w-52 md:w-72">
              <Cat className="w-full" />
              <div className="-mt-3 h-6 rounded-[50%] bg-spruce-2" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ ctaRef }: { ctaRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="px-5 py-20 md:px-10 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-8">
          <h2 className="fraunces text-[clamp(3.5rem,15vw,10rem)]">
            Say hi to <em className="text-persimmon italic">Luc.</em>
          </h2>
          <p className="mt-6 max-w-[34ch] text-[1.1875rem] leading-snug text-spruce/80">
            Tell Luc about your pet and the days you need. It only takes a minute.
          </p>
          <div ref={ctaRef} className="mt-8">
            <WhatsAppButton dark className="w-full sm:w-auto" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="hidden md:col-span-4 md:block">
          <figure className="rounded-[2rem] bg-cream p-6 shadow-[0_30px_60px_-40px_rgb(22_48_43/0.6)]">
            <QrCode value={lucUrls.screenWhatsapp} className="w-full" bg="#fbf7ef" />
            <figcaption className="mt-4 text-center font-semibold">
              On a computer? Scan to message from your phone.
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <footer className="mt-24 flex flex-col gap-3 border-t border-spruce/15 pt-6 text-sm text-spruce/70 sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} Luc · {luc.trade}
        </span>
        <a
          href={lucUrls.pageWhatsapp}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:underline"
        >
          WhatsApp <span className="whitespace-nowrap">{LUC_PHONE_DISPLAY}</span>
        </a>
      </footer>
    </section>
  );
}

/** Thumb-reach WhatsApp bar on phones, once the hero button has scrolled away. */
function StickyCta({ hidden }: { hidden: boolean }) {
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-oat via-oat/95 to-oat/0 px-4 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <WhatsAppButton className="w-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function LucLanding() {
  const heroCta = useRef<HTMLDivElement>(null);
  const endCta = useRef<HTMLDivElement>(null);
  const heroVisible = useInView(heroCta, { initial: true });
  const endVisible = useInView(endCta);

  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-oat font-inst text-spruce">
      <style>{"html{background:#f3ede2;scroll-behavior:smooth}"}</style>
      <Hero ctaRef={heroCta} />
      <Marquee />
      <Services />
      <HowItWorks />
      <Promise />
      <FinalCta ctaRef={endCta} />
      <StickyCta hidden={heroVisible || endVisible} />
    </div>
  );
}
