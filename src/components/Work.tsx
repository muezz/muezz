import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";

import { process, work, type Project } from "#/content/site";
import { scrollToId } from "#/lib/scroll";
import { SectionHead } from "./SectionHead";

const ease = [0.16, 1, 0.3, 1] as const;

function Tag({ kind }: { kind: Project["kind"] }) {
  return (
    <span
      className={`label inline-block border px-1.5 py-0.5 text-[0.625rem] ${
        kind === "Concept" ? "border-line text-mute" : "border-signal text-signal"
      }`}
    >
      {kind}
    </span>
  );
}

function CaseStudy({ project }: { project: Project }) {
  const study = project.caseStudy!;
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.7, ease }}
      className="overflow-hidden"
    >
      <div className="grid gap-8 pb-12 md:grid-cols-12 md:gap-x-4">
        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} — concept screens`}
            loading="lazy"
            width={1600}
            height={1200}
            className="aspect-[4/3] w-full object-cover md:col-span-6 md:col-start-2"
          />
        )}
        <dl className="flex flex-col gap-6 md:col-span-5">
          {(
            [
              ["Brief", study.brief],
              ["Approach", study.approach],
              ["Explores", study.explores],
            ] as const
          ).map(([term, text]) => (
            <div key={term} className="border-t border-line pt-3">
              <dt className="label text-mute">{term}</dt>
              <dd className="mt-2 max-w-[52ch] text-[1.0625rem] leading-snug tracking-tight">
                {text}
              </dd>
            </div>
          ))}
          <div className="border-t border-line pt-3">
            <dt className="label text-mute">Stack</dt>
            <dd className="label mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {project.stack.map((tool) => (
                <span key={tool}>/{tool}</span>
              ))}
            </dd>
          </div>
          <p className="label text-mute">
            Self-initiated concept — a design and engineering study, not client work.
          </p>
        </dl>
      </div>
    </motion.div>
  );
}

function Row({
  project,
  index,
  open,
  onToggle,
  onHover,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
  onHover: (p: Project | null) => void;
}) {
  const body = (
    <>
      <span className="label col-span-2 text-mute md:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="col-span-10 md:col-span-6">
        <span className="block text-[clamp(1.75rem,4.5vw,4.25rem)] leading-none font-[560] tracking-[-0.045em] transition-transform duration-500 ease-out-expo group-hover:translate-x-3">
          {project.title}
        </span>
        <span className="mt-3 block max-w-[48ch] font-mono text-[0.8125rem] leading-relaxed text-mute">
          {project.summary}
        </span>
      </span>
      <span className="label col-span-6 col-start-3 mt-4 text-mute md:col-span-3 md:col-start-auto md:mt-0">
        {project.discipline}
        <span className="mt-1 block normal-case">{project.stack.join(", ")}</span>
      </span>
      <span className="col-span-4 mt-4 flex flex-col items-end gap-2 md:col-span-2 md:mt-0">
        <span className="flex items-center gap-3">
          <Tag kind={project.kind} />
          <span className="label">{project.year}</span>
        </span>
        <span className="label text-right text-mute">
          {project.link ? (
            <span className="text-signal">{project.link.label} ↗</span>
          ) : (
            <span className="inline-flex items-center gap-2 group-hover:text-ink">
              {open ? "Close" : "Case study"}
              <span
                className={`inline-block transition-transform duration-500 ease-out-expo ${open ? "rotate-45" : ""}`}
              >
                +
              </span>
            </span>
          )}
        </span>
      </span>
    </>
  );

  const rowClass =
    "group grid w-full cursor-pointer grid-cols-12 items-baseline gap-x-4 py-7 text-left md:py-9";

  return (
    <li className="border-b border-line">
      {project.link ? (
        <a
          href={project.link.href}
          target="_blank"
          rel="noreferrer"
          className={rowClass}
          onPointerEnter={() => onHover(project)}
        >
          {body}
        </a>
      ) : (
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
          onPointerEnter={() => onHover(open ? null : project)}
          className={rowClass}
        >
          {body}
        </button>
      )}
      <AnimatePresence initial={false}>
        {open && project.caseStudy && <CaseStudy project={project} />}
      </AnimatePresence>
    </li>
  );
}

/** Index of projects. Covers trail the cursor; concept rows open into a case study. */
function Registry({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30 });
  const sy = useSpring(y, { stiffness: 260, damping: 30 });
  const preview = hovered?.image && hovered.title !== open ? hovered.image : null;

  return (
    <div
      className="relative"
      onPointerMove={(event) => {
        x.set(event.clientX);
        y.set(event.clientY);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ol>
        {projects.map((project, i) => (
          <Row
            key={project.title}
            project={project}
            index={i}
            open={open === project.title}
            onHover={setHovered}
            onToggle={() => {
              const next = open === project.title ? null : project.title;
              setOpen(next);
              if (next) setHovered(null);
            }}
          />
        ))}
      </ol>

      <AnimatePresence>
        {preview && (
          <motion.img
            key={preview}
            src={preview}
            alt=""
            initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 0 50% 0)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease }}
            style={{ left: sx, top: sy }}
            className="pointer-events-none fixed z-40 hidden aspect-[4/3] w-[min(28vw,420px)] -translate-x-1/2 -translate-y-1/2 object-cover shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] [@media(hover:hover)]:md:block"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function Work() {
  const concepts = work.filter((p) => p.kind === "Concept").length;
  return (
    <section id="work" className="gutter pb-[clamp(6rem,14vw,12rem)]">
      <SectionHead
        index="04"
        label="Selected work"
        aside={
          work.length
            ? `${concepts} concepts · ${work.length - concepts} open source`
            : "Archive in progress"
        }
      />

      <div className="label mt-10 hidden grid-cols-12 gap-x-4 border-b border-line pb-3 text-mute md:mt-16 md:grid">
        <span className="col-span-1">No.</span>
        <span className="col-span-6">Project</span>
        <span className="col-span-3">Discipline / Stack</span>
        <span className="col-span-2 text-right">Type / Year</span>
      </div>

      {work.length > 0 ? (
        <Registry projects={work} />
      ) : (
        <div className="grid grid-cols-12 items-baseline gap-x-4 border-b border-line py-8 md:py-10">
          <span className="label col-span-2 text-mute md:col-span-1">—</span>
          <p className="col-span-10 text-[clamp(1.75rem,4.5vw,4.25rem)] leading-[0.95] font-[560] tracking-[-0.045em] md:col-span-8">
            Case studies are being{" "}
            <em className="font-serif font-normal tracking-[-0.02em] italic">written up.</em>
          </p>
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="label link-draw col-span-10 col-start-3 mt-5 w-fit text-left md:col-span-3 md:mt-0 md:justify-self-end"
          >
            Ask for a walkthrough →
          </button>
        </div>
      )}

      {/* How an engagement runs */}
      <div className="mt-24 md:mt-32">
        <p className="label text-mute">How we'll work together</p>
        <ol className="mt-6 grid border-t border-line md:grid-cols-3">
          {process.map((step, i) => (
            <li
              key={step}
              className="flex min-h-[13rem] flex-col justify-between border-b border-line py-6 md:min-h-[18rem] md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"
              style={{ paddingTop: `calc(1.5rem + ${i} * clamp(0rem, 3vw, 3rem))` }}
            >
              <span className="font-mono text-sm text-signal">Step {i + 1}</span>
              <span className="text-[clamp(2rem,3.6vw,3.5rem)] leading-[0.95] font-[560] tracking-[-0.045em]">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
