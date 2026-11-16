import { lucPath } from "#/content/luc";

/**
 * Counts visits to Luc's page in Workers Analytics Engine (dataset `luc_events`).
 * Logged server-side from the Worker, so there's no client script and the
 * WhatsApp redirect (which never renders HTML) is counted too.
 *
 * Each row: blob1 = event, blob2 = source, blob3 = visitor id, blob4 = country.
 * The visitor id is a hash of IP + user agent + the current UTC day, so it can't
 * be traced back to anyone and resets daily — the same approach Cloudflare Web
 * Analytics uses. "Unique visitors" therefore means unique visitors per day.
 *
 * Query in the Cloudflare dashboard: Storage & databases → Analytics Engine → Studio.
 */

/** Minimal shape of the Analytics Engine binding, so we don't need generated Worker types. */
export type AnalyticsEngineDataset = {
  writeDataPoint(point: { blobs?: string[]; doubles?: number[]; indexes?: string[] }): void;
};
export type LucAnalyticsEnv = { LUC_ANALYTICS?: AnalyticsEngineDataset };

/** `view` = landing page loaded, `whatsapp` = sent to the WhatsApp chat. */
export type LucEvent = { event: "view" | "whatsapp"; source: string };

const BOTS =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|slack|discord|curl|wget|python|headless/i;

/** Decides whether a request is a countable Luc event. Pure, so it's easy to test. */
export function classifyLucRequest(request: Request): LucEvent | null {
  if (request.method !== "GET") return null;
  const url = new URL(request.url);
  if (url.pathname !== lucPath && url.pathname !== `${lucPath}/`) return null;
  if (url.searchParams.has("style")) return null; // print sheets
  const purpose = request.headers.get("sec-purpose") ?? request.headers.get("purpose") ?? "";
  if (purpose.includes("prefetch")) return null;
  if (BOTS.test(request.headers.get("user-agent") ?? "")) return null;

  const src = url.searchParams.get("src");
  if (url.searchParams.get("contact") === "whatsapp") {
    return { event: "whatsapp", source: src ?? "other" };
  }
  return { event: "view", source: src ?? "direct" };
}

async function visitorId(request: Request) {
  const day = new Date().toISOString().slice(0, 10);
  const ip = request.headers.get("cf-connecting-ip") ?? "";
  const ua = request.headers.get("user-agent") ?? "";
  const bytes = new TextEncoder().encode(`luc|${day}|${ip}|${ua}`);
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  return Array.from(hash.slice(0, 8), (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Records the request if it's a Luc event. A `?src=` on a plain page view is only
 * there for counting, so it returns a redirect to the clean URL — that way a link
 * copied from the address bar doesn't keep counting as a QR scan.
 */
export async function trackLuc(request: Request, env: LucAnalyticsEnv): Promise<Response | null> {
  const hit = classifyLucRequest(request);
  if (!hit) return null;

  try {
    const country = (request as { cf?: { country?: string } }).cf?.country ?? "";
    env.LUC_ANALYTICS?.writeDataPoint({
      blobs: [hit.event, hit.source, await visitorId(request), country],
      doubles: [1],
      indexes: ["luc"],
    });
  } catch (error) {
    console.error("[luc-analytics] write failed", error); // never break the page over a stat
  }

  if (hit.event === "view" && hit.source !== "direct") {
    const clean = new URL(request.url);
    clean.searchParams.delete("src");
    return Response.redirect(clean.toString(), 302);
  }
  return null;
}
