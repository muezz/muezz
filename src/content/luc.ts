import { site } from "./site";

/** Luc's WhatsApp number for wa.me links: country code + digits, no symbols. */
export const LUC_WHATSAPP_NUMBER = "19148604851";
/** How the number is printed on cards, posters and the page. Keep in sync with the above. */
export const LUC_PHONE_DISPLAY = "+1 (914) 860-4851";

export const LUC_WHATSAPP_MESSAGE =
  "Hi Luc! I came across your card and I'd love to hear more about dog walking and pet sitting.";

export const lucPath = "/ref/luc";

/** Absolute URLs. `page` is the canonical address; the `qr*` ones are encoded in QR
 * codes only (never printed as text) and carry `src=qr` so scans are counted
 * separately (see server/luc-analytics.ts). WhatsApp links go through our redirect,
 * so printed codes keep working if the number changes and every chat opened is counted. */
export const lucUrls = {
  page: `${site.url}${lucPath}`,
  qrPage: `${site.url}${lucPath}?src=qr`,
  qrWhatsapp: `${site.url}${lucPath}?contact=whatsapp&src=qr`,
  /** The code shown on the page itself (desktop), kept apart from printed scans. */
  screenWhatsapp: `${site.url}${lucPath}?contact=whatsapp&src=screen`,
  /** Relative: used by the buttons on the page itself. */
  pageWhatsapp: `${lucPath}?contact=whatsapp&src=page`,
};

export function whatsappLink(message = LUC_WHATSAPP_MESSAGE) {
  return `https://wa.me/${LUC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const luc = {
  name: "Luc",
  trade: "Dog walking & pet sitting",
  headline: "Your dog's favourite part of the day.",
  intro:
    "Friendly, reliable care from someone local — long walks, drop-in visits and overnight stays, with a photo update every single time.",
};

export const lucServices = [
  {
    icon: "paw",
    title: "Dog walks",
    detail: "Solo or small-group walks of 30 or 60 minutes. Rain, shine or puddles.",
    tone: "butter",
  },
  {
    icon: "home",
    title: "Drop-in visits",
    detail: "Feeding, fresh water, litter and a good play while you're at work.",
    tone: "sage",
  },
  {
    icon: "moon",
    title: "Overnight sitting",
    detail: "Your pets stay home and keep their routine. Luc stays over.",
    tone: "blush",
  },
  {
    icon: "bone",
    title: "Puppy & senior care",
    detail: "Shorter, gentler visits built around toilet breaks, meds and naps.",
    tone: "cream",
  },
] as const;

export const lucSteps = [
  {
    title: "Say hi on WhatsApp",
    detail: "Tell Luc about your pet, your area and the days you need.",
  },
  { title: "Meet & greet", detail: "A relaxed hello at home so everyone gets comfortable first." },
  { title: "Relax", detail: "Walks and visits begin, with photo updates rolling in." },
];

export const lucPromises = [
  "A photo update after every visit",
  "The same friendly face every time",
  "A meet & greet before the first booking",
  "Keys kept safe and never labelled",
];

export const printStyles = ["kit", "card", "flyer", "poster", "tent", "banner"] as const;
export type PrintStyle = (typeof printStyles)[number];
