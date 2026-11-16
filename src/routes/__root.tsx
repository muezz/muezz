import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { about, services, site, stack } from "#/content/site";
import appCss from "../styles.css?url";

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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title },
      { name: "description", content: site.description },
      { name: "author", content: site.name },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#ECEBE6" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: `${site.url}/` },
      { property: "og:title", content: title },
      { property: "og:description", content: site.description },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${site.name} — ${site.role}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: site.description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon/apple-touch-icon.png" },
      { rel: "manifest", href: "/favicon/site.webmanifest" },
      { rel: "canonical", href: `${site.url}/` },
    ],
    scripts: [
      { children: introScript },
      { type: "application/ld+json", children: JSON.stringify(jsonLd) },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    // The intro script may add data-seen before hydration.
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
