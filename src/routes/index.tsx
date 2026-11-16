import { createFileRoute } from "@tanstack/react-router";

import { About } from "#/components/About";
import { CommandBar } from "#/components/CommandBar";
import { Contact } from "#/components/Contact";
import { Hero } from "#/components/Hero";
import { Preloader } from "#/components/Preloader";
import { Services } from "#/components/Services";
import { Approach } from "#/components/Approach";
import { Work } from "#/components/Work";
import { about, services, site, stack } from "#/content/site";
import { useSmoothScroll } from "#/lib/scroll";

const title = `${site.name} — ${site.role} · Web & Mobile`;
const ogImage = `${site.url}/images/og.jpg`;

/** Structured data so search engines understand who the site is about. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: ogImage,
      jobTitle: site.role,
      description: about,
      email: `mailto:${site.email}`,
      sameAs: site.links.map((link) => link.href),
      knowsAbout: [...services.map((s) => s.title), ...stack.flatMap((group) => group.items)],
    },
  ],
};

/** Skips the intro on repeat visits within a session (see --intro in styles.css). */
const introScript = `try{var s=sessionStorage;if(s.getItem("intro"))document.documentElement.setAttribute("data-seen","");s.setItem("intro","1")}catch(e){}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: site.description },
      { name: "author", content: site.name },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#ECEBE6" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:url", content: `${site.url}/` },
      { property: "og:title", content: title },
      { property: "og:description", content: site.description },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${site.name} — ${site.role}` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: site.description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: `${site.url}/` }],
    scripts: [
      { children: introScript },
      { type: "application/ld+json", children: JSON.stringify(jsonLd) },
    ],
  }),
  component: Home,
});

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
