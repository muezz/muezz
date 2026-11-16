import { hero, site } from "#/content/site";
import { scrollToId } from "#/lib/scroll";
import { ParticleWordmark } from "./ParticleWordmark";

export function Hero() {
  return (
    <section
      id="top"
      className="gutter relative flex min-h-[100svh] flex-col justify-between pt-5 pb-28 md:pb-24"
    >
      {/* Running header */}
      <div className="label grid grid-cols-2 gap-y-2 border-b border-line pb-4 md:grid-cols-4">
        <span className="fade-late" style={{ "--i": 0 } as React.CSSProperties}>
          {site.name} ©{new Date().getFullYear()}
        </span>
        <span
          className="fade-late text-right md:text-left"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {site.role}
        </span>
        <span className="fade-late" style={{ "--i": 2 } as React.CSSProperties}>
          {site.disciplines.join(" · ")}
        </span>
        <span
          className="fade-late flex items-center justify-end gap-2"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <span className="size-1.5 animate-pip bg-signal" />
          Open for enquiries
        </span>
      </div>

      {/* Headline + kicker */}
      <div className="grid gap-10 py-14 md:grid-cols-12 md:py-0">
        <h1 className="display text-[clamp(3rem,8.4vw,9.5rem)] md:col-span-9">
          <span className="sr-only">
            {site.name}, {site.role.toLowerCase()} —{" "}
          </span>
          {hero.headline.map((word, i) => (
            <span key={word} className="block overflow-hidden pb-[0.06em]">
              <span className="rise" style={{ "--i": i } as React.CSSProperties}>
                {word === "creative" ? (
                  <em className="font-serif font-normal tracking-[-0.02em] italic">{word}</em>
                ) : (
                  word
                )}
              </span>{" "}
            </span>
          ))}
        </h1>
        <div className="flex flex-col justify-end gap-6 md:col-span-3">
          <p
            className="fade-late max-w-[26ch] font-mono text-sm leading-relaxed"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {hero.kicker}
          </p>
          <button
            type="button"
            onClick={() => scrollToId("about")}
            className="fade-late label group flex w-fit items-center gap-3 text-mute hover:text-ink"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-y-1">
              ↓
            </span>
            Scroll to begin
          </button>
        </div>
      </div>

      {/* Wordmark */}
      <div>
        <ParticleWordmark text={site.name.toUpperCase()} />
        <div className="label mt-4 flex justify-between text-mute">
          <span className="fade-late" style={{ "--i": 5 } as React.CSSProperties}>
            (Move the cursor through the type)
          </span>
          <span className="fade-late hidden md:inline" style={{ "--i": 6 } as React.CSSProperties}>
            Index — 01 / 06
          </span>
        </div>
      </div>
    </section>
  );
}
