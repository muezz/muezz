import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { sections, site, type SectionId } from "#/content/site";
import { scrollToId } from "#/lib/scroll";

type Command = { id: string; label: string; hint: string; run: () => void };

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("top");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}

/**
 * Navigation as a bottom-docked command bar, with a ⌘K palette
 * for jumping between chapters and reaching out.
 */
export function CommandBar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeIndex = sections.findIndex((s) => s.id === active);

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map((s, i) => ({
        id: s.id,
        label: s.label,
        hint: `Go to ${String(i + 1).padStart(2, "0")}`,
        run: () => scrollToId(s.id),
      })),
      {
        id: "copy",
        label: "Copy email address",
        hint: site.email,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(
            () => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            },
            () => {},
          );
        },
      },
      ...site.links.map((link) => ({
        id: link.label,
        label: `Open ${link.label}`,
        hint: "External ↗",
        run: () => window.open(link.href, "_blank", "noopener,noreferrer"),
      })),
    ],
    [],
  );

  const results = commands.filter((c) =>
    c.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (wasOpen.current) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  function run(command: Command | undefined) {
    if (!command) return;
    setOpen(false);
    // Let the palette close before the page starts moving.
    setTimeout(command.run, 120);
  }

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-3"
      >
        <div
          className="fade-late flex items-stretch bg-ink text-paper shadow-[0_0_0_1px_rgb(236_235_230/0.12)]"
          style={{ "--i": 6 } as React.CSSProperties}
        >
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="flex items-center gap-3 border-r border-line-dark px-4"
            aria-label="Back to top"
          >
            <img src="/svg/logo.svg" alt="" className="h-5 w-auto" />
          </button>

          <ul className="hidden items-stretch md:flex">
            {sections.slice(1).map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToId(section.id);
                  }}
                  aria-current={active === section.id ? "true" : undefined}
                  className={`label flex h-full items-center gap-2 px-3.5 py-3.5 transition-colors ${
                    active === section.id ? "text-paper" : "text-mute-dark hover:text-paper"
                  }`}
                >
                  <span
                    className={`size-1 bg-signal transition-opacity ${active === section.id ? "opacity-100" : "opacity-0"}`}
                  />
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Compact status on small screens */}
          <span className="label flex items-center gap-2 px-4 text-mute-dark md:hidden">
            <span className="text-paper">{String(activeIndex + 1).padStart(2, "0")}</span>
            {sections[activeIndex]?.label}
          </span>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="label flex items-center gap-2 border-l border-line-dark px-4 text-mute-dark transition-colors hover:text-paper"
          >
            <span className="md:hidden">Menu</span>
            <kbd className="border border-line-dark px-1.5 py-0.5 font-mono text-[0.625rem] text-paper">
              ⌘K
            </kbd>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/40 p-3 backdrop-blur-[2px] md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-lg bg-ink text-paper shadow-[0_30px_80px_-20px_rgb(0_0_0/0.5)]"
            >
              <div className="flex items-center gap-3 border-b border-line-dark px-5">
                <span className="font-mono text-signal">›</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCursor(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setCursor((c) => Math.min(results.length - 1, c + 1));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setCursor((c) => Math.max(0, c - 1));
                    } else if (e.key === "Enter") {
                      e.preventDefault();
                      run(results[cursor]);
                    }
                  }}
                  placeholder="Jump to…"
                  aria-label="Search commands"
                  className="w-full border-0 bg-transparent py-4 font-mono text-sm text-paper placeholder:text-mute-dark focus:ring-0 focus:outline-none"
                />
                <kbd className="label text-mute-dark">Esc</kbd>
              </div>
              <ul role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
                {results.map((command, i) => (
                  <li key={command.id} role="option" aria-selected={i === cursor}>
                    <button
                      type="button"
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => run(command)}
                      className={`flex w-full items-center justify-between px-5 py-2.5 text-left transition-colors ${
                        i === cursor ? "bg-ink-2 text-paper" : "text-mute-dark"
                      }`}
                    >
                      <span className="flex items-center gap-3 text-[0.95rem] tracking-tight">
                        <span
                          className={`size-1 bg-signal ${i === cursor ? "opacity-100" : "opacity-0"}`}
                        />
                        {command.label}
                      </span>
                      <span className="label text-mute-dark">{command.hint}</span>
                    </button>
                  </li>
                ))}
                {results.length === 0 && (
                  <li className="label px-5 py-4 text-mute-dark">No matches</li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        aria-live="polite"
        className={`label pointer-events-none fixed bottom-20 left-1/2 z-50 -translate-x-1/2 bg-signal px-3 py-2 text-paper transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Email copied
      </div>
    </>
  );
}
