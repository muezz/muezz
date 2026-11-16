import { createFileRoute, redirect } from "@tanstack/react-router";

import { LucLanding } from "#/components/luc/Landing";
import { LucPrint } from "#/components/luc/Print";
import { luc, lucUrls, printStyles, whatsappLink, type PrintStyle } from "#/content/luc";
import lucCss from "../luc.css?url";

type LucSearch = { contact?: "whatsapp"; style?: PrintStyle };

export const Route = createFileRoute("/ref/luc")({
  validateSearch: (search: Record<string, unknown>): LucSearch => {
    const out: LucSearch = {};
    if (search.contact === "whatsapp") out.contact = "whatsapp";
    if (printStyles.includes(search.style as PrintStyle)) out.style = search.style as PrintStyle;
    return out;
  },
  // ?contact=whatsapp → straight into a WhatsApp chat (server-side 302 on first load).
  beforeLoad: ({ search }) => {
    if (search.contact === "whatsapp") {
      throw redirect({ href: whatsappLink(), statusCode: 302 });
    }
  },
  head: ({ match }) => {
    const style = (match.search as LucSearch).style;
    const title = style ? `Luc — print ${style}` : `${luc.name} — ${luc.trade}`;
    return {
      meta: [
        { title },
        { name: "description", content: luc.intro },
        { name: "theme-color", content: "#f3ede2" },
        // Print sheets are tools, not pages to rank.
        ...(style ? [{ name: "robots", content: "noindex, nofollow" }] : []),
        { property: "og:type", content: "website" },
        { property: "og:url", content: lucUrls.page },
        { property: "og:title", content: title },
        { property: "og:description", content: luc.intro },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: luc.intro },
      ],
      links: [
        { rel: "stylesheet", href: lucCss },
        { rel: "canonical", href: lucUrls.page },
      ],
    };
  },
  component: LucPage,
});

function LucPage() {
  const { style } = Route.useSearch();
  return style ? <LucPrint style={style} /> : <LucLanding />;
}
