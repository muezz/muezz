/**
 * Every word on the site lives here. Edit this file to change copy,
 * add projects, or update links — the components only render it.
 */

export const site = {
  name: "Muezz",
  role: "Software Engineer",
  disciplines: ["Web", "Android", "iOS"],
  url: "https://muezz.dev",
  description:
    "Muezz is a software engineer crafting elegant web and mobile products — scalable web applications and seamless user experiences, built with code and creativity.",
  email: "muezz7055@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/muezz" },
    { label: "Discord", href: "https://discordapp.com/users/478529330171871252" },
  ],
};

export const hero = {
  headline: ["World of", "creative", "solutions."],
  kicker: "Let's make the digital world more exciting!",
};

export const about =
  "I'm a passionate software engineer who crafts elegant solutions for web and mobile platforms. Whether it's building scalable web applications or creating seamless user experiences, I bring ideas to life with code and creativity.";

export const services = [
  {
    title: "Mobile Apps",
    platforms: "Android & iOS",
    description:
      "Designing sleek and intuitive mobile apps for Android and iOS to meet your unique needs with top-notch performance.",
    tools: ["Flutter", "Dart", "Firebase", "Supabase"],
  },
  {
    title: "Web Development",
    platforms: "Sites & web apps",
    description:
      "Creating fast, responsive websites and web apps using modern technologies like React and Next.js.",
    tools: ["React", "Next.js", "Vue", "TypeScript"],
  },
];

export const stack = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Dart", "Python", "Go", "HTML", "CSS"],
  },
  { group: "Frameworks", items: ["React", "Next.js", "Vue", "Flutter"] },
  { group: "Data & backend", items: ["Supabase", "Firebase", "PostgreSQL", "MySQL"] },
  { group: "Tooling", items: ["Git"] },
];

export type Project = {
  title: string;
  /** "Concept" = self-initiated design + build study. Keep labels honest. */
  kind: "Concept" | "Open source";
  discipline: string;
  year: string;
  summary: string;
  stack: string[];
  /** Path under /public. Trails the cursor on hover and opens with the case study. */
  image?: string;
  link?: { href: string; label: string };
  caseStudy?: { brief: string; approach: string; explores: string };
};

/** The Work registry renders these in order. */
export const work: Project[] = [
  {
    title: "Pulse",
    kind: "Concept",
    discipline: "Mobile app",
    year: "2026",
    summary: "A training companion that turns heart-rate data into one clear daily goal.",
    stack: ["Flutter", "Dart", "Firebase"],
    image: "/images/work/pulse.jpg",
    caseStudy: {
      brief:
        "Fitness apps bury people in charts. Pulse asks one question each morning — how hard should I train today? — and answers it from sleep, resting heart rate and recent load.",
      approach:
        "A single Flutter codebase for Android and iOS, with health data read on-device and only daily summaries synced to Firebase. Rings and zones are custom-painted so they stay smooth on mid-range phones.",
      explores:
        "The daily-goal loop, a live heart-rate screen and a design system built around two colours and one number per screen.",
    },
  },
  {
    title: "Slotted",
    kind: "Concept",
    discipline: "Web platform",
    year: "2026",
    summary: "Bookings, waitlists and payments for independent studios, in one calm calendar.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    image: "/images/work/slotted.jpg",
    caseStudy: {
      brief:
        "Small studios juggle spreadsheets, DMs and payment links to fill classes. Slotted gives them a public booking page and a week view that shows what's full, open and waitlisted at a glance.",
      approach:
        "Next.js with server-rendered booking pages for speed and SEO, Supabase for auth and row-level security, and PostgreSQL constraints to make double-booking impossible rather than unlikely.",
      explores:
        "The studio dashboard and booking flow, waitlist promotion when a spot opens up, and a data model ready for multiple rooms and instructors.",
    },
  },
  {
    title: "Fieldnote",
    kind: "Concept",
    discipline: "Mobile app",
    year: "2025",
    summary: "Offline-first notes for field researchers that sync when signal returns.",
    stack: ["Flutter", "Supabase", "PostgreSQL"],
    image: "/images/work/fieldnote.jpg",
    caseStudy: {
      brief:
        "Researchers record samples where there's no signal, then lose hours re-typing notes. Fieldnote captures text, photos and GPS offline and syncs everything later without conflicts.",
      approach:
        "A local database on the device is the source of truth. Changes queue up offline and replay to Supabase in order once a connection returns, with per-field merge rules for edits made on two devices.",
      explores:
        "Capture, map and sync-queue screens, and a sync design for the hard cases: duplicate uploads, edits made offline and partial photo uploads.",
    },
  },
  {
    title: "flutter_liquid_glass",
    kind: "Open source",
    discipline: "Flutter package",
    year: "2026",
    summary: "Fix for the tab indicator getting stuck in the example bottom bar.",
    stack: ["Flutter", "Dart"],
    link: {
      href: "https://github.com/whynotmake-it/flutter_liquid_glass/pull/133",
      label: "Pull request #133 · in review",
    },
  },
  {
    title: "flutter-pie-menu",
    kind: "Open source",
    discipline: "Flutter package",
    year: "2025",
    summary: "Custom builders so apps can define their own menu open and close animations.",
    stack: ["Flutter", "Dart"],
    link: {
      href: "https://github.com/rasitayaz/flutter-pie-menu/pull/81",
      label: "Pull request #81 · in review",
    },
  },
];

/** "How I work" — the principles chapter that pins while you scroll. */
export const principles = [
  {
    title: "Start with the problem",
    body: "Before any code, I want to understand who it's for and what success looks like. Good software starts as a good question.",
  },
  {
    title: "One codebase, every screen",
    body: "Flutter for Android and iOS, React for the web — chosen so your product feels native everywhere without paying for it three times.",
  },
  {
    title: "Show, don't report",
    body: "You see working builds early and often, not status decks. Feedback lands while it's still cheap to act on.",
  },
  {
    title: "Built to be handed over",
    body: "Typed, tested and documented, so your team — or the next developer — can pick it up without me in the room.",
  },
];

export const process = ["Browse & Choose", "Do Your Research", "Let's Connect"];

export const sections = [
  { id: "top", label: "Index" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
