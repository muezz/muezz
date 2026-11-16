import { createFileRoute } from "@tanstack/react-router";

import { About } from "#/components/About";
import { CommandBar } from "#/components/CommandBar";
import { Contact } from "#/components/Contact";
import { Hero } from "#/components/Hero";
import { Preloader } from "#/components/Preloader";
import { Services } from "#/components/Services";
import { Approach } from "#/components/Approach";
import { Work } from "#/components/Work";
import { useSmoothScroll } from "#/lib/scroll";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  useSmoothScroll();

  return (
    <>
      <Preloader />
      {/* Column hairlines — the grid the layout keeps breaking. */}
      <div aria-hidden className="gutter pointer-events-none fixed inset-0 z-0 hidden md:block">
        <div className="grid h-full grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="border-l border-line/50 last:border-r" />
          ))}
        </div>
      </div>
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Work />
        <Approach />
        <Contact />
      </main>
      <CommandBar />
      <div aria-hidden className="grain" />
    </>
  );
}
