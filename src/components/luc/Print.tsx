import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

import { LUC_PHONE_DISPLAY, luc, lucServices, lucUrls, type PrintStyle } from "#/content/luc";
import { Badge, Cat, Dachshund, Paw, ServiceIcon, palette } from "./Art";
import { QrCode } from "./QrCode";

/* ───────────────────────── Shell ───────────────────────── */

const variants: { style: Exclude<PrintStyle, "kit">; name: string; size: string; use: string }[] = [
  {
    style: "card",
    name: "Business cards",
    size: "85 × 55 mm · 8 per A4, fronts + backs",
    use: "Hand out, pin to boards, leave at counters.",
  },
  {
    style: "flyer",
    name: "Flyer",
    size: "A5 · 148 × 210 mm",
    use: "Letterboxes, café tables, vet waiting rooms.",
  },
  {
    style: "poster",
    name: "Noticeboard poster",
    size: "A4 · with 8 tear-off tabs",
    use: "Community boards in cafés, shops and libraries.",
  },
  {
    style: "tent",
    name: "Table tent",
    size: "A4 landscape · fold in half",
    use: "Stands on café tables and shop counters.",
  },
  {
    style: "banner",
    name: "Banner",
    size: "600 × 200 mm",
    use: "Shop windows, stalls, market tables.",
  },
];

const pageSizes: Record<Exclude<PrintStyle, "kit">, { w: number; h: number; zoom: number }> = {
  card: { w: 210, h: 297, zoom: 1 },
  flyer: { w: 148, h: 210, zoom: 1.2 },
  poster: { w: 210, h: 297, zoom: 1 },
  tent: { w: 297, h: 210, zoom: 1 },
  banner: { w: 600, h: 200, zoom: 0.55 },
};

function Toolbar({ current }: { current: PrintStyle }) {
  return (
    <div className="print-chrome sticky top-0 z-20 border-b border-spruce/10 bg-cream/90 px-4 py-3 backdrop-blur md:px-8">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link to="/ref/luc" search={{ style: "kit" }} className="fraunces text-2xl italic">
          Luc · print kit
        </Link>
        <nav className="flex flex-wrap gap-1.5 text-sm font-semibold">
          {variants.map((v) => (
            <Link
              key={v.style}
              to="/ref/luc"
              search={{ style: v.style }}
              className={`rounded-full px-3 py-1.5 ${current === v.style ? "bg-spruce text-cream" : "bg-oat-2 hover:bg-sage"}`}
            >
              {v.name}
            </Link>
          ))}
        </nav>
        {current !== "kit" && (
          <button
            type="button"
            onClick={() => window.print()}
            className="ml-auto rounded-full bg-persimmon px-5 py-2.5 text-sm font-semibold text-cream"
          >
            Print / Save as PDF
          </button>
        )}
      </div>
      {current !== "kit" && (
        <p className="mt-2 text-xs text-spruce/60">
          In the print dialog: paper size matches automatically · Margins: None · turn on Background
          graphics · Scale 100%.
        </p>
      )}
    </div>
  );
}

function PrintShell({ style, pages }: { style: Exclude<PrintStyle, "kit">; pages: ReactNode[] }) {
  const { w, h, zoom } = pageSizes[style];
  return (
    <div className="print-root min-h-screen bg-[#d8d2c6] font-inst text-spruce">
      <style>{`@page{size:${w}mm ${h}mm;margin:0}`}</style>
      <Toolbar current={style} />
      <div className="print-stage flex flex-col items-center gap-10 overflow-x-auto p-6 md:p-12">
        {pages.map((page, i) => (
          <div
            key={i}
            className="print-sheet relative shrink-0 overflow-hidden bg-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]"
            style={{ width: `${w}mm`, height: `${h}mm`, "--preview-zoom": zoom } as CSSProperties}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Shared bits ───────────────────────── */

function Wordmark({ size, color = palette.spruce }: { size: string; color?: string }) {
  return (
    <span className="fraunces inline-flex items-center italic" style={{ fontSize: size, color }}>
      Luc
      <Paw className="ml-[0.08em] size-[0.42em]" fill={palette.persimmon} />
    </span>
  );
}

function QrBlock({
  value,
  size,
  label,
  sub,
  labelColor = palette.spruce,
  bg = "#ffffff",
}: {
  value: string;
  size: string;
  label: string;
  sub?: string;
  labelColor?: string;
  bg?: string;
}) {
  return (
    <figure className="flex flex-col items-center" style={{ width: size }}>
      <QrCode value={value} bg={bg} className="block w-full" />
      <figcaption className="mt-[1.6mm] text-center leading-tight" style={{ color: labelColor }}>
        <span className="block font-semibold" style={{ fontSize: `calc(${size} * 0.09)` }}>
          {label}
        </span>
        {sub && (
          <span
            className="block whitespace-nowrap opacity-75"
            style={{ fontSize: `calc(${size} * 0.075)` }}
          >
            {sub}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

const ground = `repeating-linear-gradient(90deg, ${palette.spruce} 0 3mm, transparent 3mm 5mm)`;

/* ───────────────────────── Business cards ───────────────────────── */

const CARD = { w: 85, h: 55, bleed: 2, cols: 2, rows: 4 };

function CardFront() {
  return (
    <div className="relative size-full" style={{ background: palette.oat }}>
      <div className="absolute inset-[6mm]">
        <Wordmark size="17mm" />
        <p className="mt-[1mm] text-[7.5pt] font-semibold tracking-[0.12em] uppercase">
          {luc.trade}
        </p>
        <p className="absolute bottom-0 left-0 text-[6.5pt] leading-snug text-spruce/80">
          WhatsApp Luc
          <br />
          <span className="font-semibold whitespace-nowrap text-spruce">{LUC_PHONE_DISPLAY}</span>
        </p>
      </div>
      <div className="absolute right-[3mm] bottom-[7mm] w-[40mm]">
        <Dachshund className="w-full" />
        <div className="h-[0.5mm] opacity-25" style={{ background: ground }} />
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div className="relative size-full" style={{ background: palette.spruce, color: palette.oat }}>
      <div className="absolute inset-[6mm] flex items-center justify-between gap-[4mm]">
        <div className="flex h-full flex-col justify-between">
          <p className="fraunces text-[17pt] leading-[0.95]" style={{ color: palette.oat }}>
            Scan &amp;
            <br />
            <em className="italic" style={{ color: palette.butter }}>
              say hi.
            </em>
          </p>
          <Paw className="size-[6mm]" fill={palette.persimmon} />
        </div>
        <div className="flex gap-[3mm]">
          <QrBlock
            value={lucUrls.qrWhatsapp}
            size="19mm"
            label="WhatsApp"
            labelColor={palette.oat}
            bg={palette.cream}
          />
          <QrBlock
            value={lucUrls.qrPage}
            size="19mm"
            label="Website"
            labelColor={palette.oat}
            bg={palette.cream}
          />
        </div>
      </div>
    </div>
  );
}

function CardSheet({ side }: { side: "front" | "back" }) {
  const cellW = CARD.w + CARD.bleed * 2;
  const cellH = CARD.h + CARD.bleed * 2;
  const left = (210 - cellW * CARD.cols) / 2;
  const top = (297 - cellH * CARD.rows) / 2;
  const xs = Array.from({ length: CARD.cols }, (_, c) => [
    left + c * cellW + CARD.bleed,
    left + c * cellW + CARD.bleed + CARD.w,
  ]).flat();
  const ys = Array.from({ length: CARD.rows }, (_, r) => [
    top + r * cellH + CARD.bleed,
    top + r * cellH + CARD.bleed + CARD.h,
  ]).flat();
  const gap = 3;

  return (
    <div className="relative size-full bg-white">
      {Array.from({ length: CARD.cols * CARD.rows }, (_, i) => {
        const c = i % CARD.cols;
        const r = Math.floor(i / CARD.cols);
        return (
          <div
            key={i}
            className="absolute overflow-hidden"
            style={{
              left: `${left + c * cellW}mm`,
              top: `${top + r * cellH}mm`,
              width: `${cellW}mm`,
              height: `${cellH}mm`,
            }}
          >
            {side === "front" ? <CardFront /> : <CardBack />}
          </div>
        );
      })}
      {/* Crop marks at every trim line, kept clear of the bleed. */}
      <svg viewBox="0 0 210 297" className="pointer-events-none absolute inset-0 size-full">
        <g stroke="#000" strokeWidth="0.15">
          {xs.map((x, i) => (
            <g key={`x${i}`}>
              <line x1={x} x2={x} y1={top - gap - 7} y2={top - gap} />
              <line x1={x} x2={x} y1={297 - top + gap} y2={297 - top + gap + 7} />
            </g>
          ))}
          {ys.map((y, i) => (
            <g key={`y${i}`}>
              <line y1={y} y2={y} x1={left - gap - 7} x2={left - gap} />
              <line y1={y} y2={y} x1={210 - left + gap} x2={210 - left + gap + 7} />
            </g>
          ))}
        </g>
      </svg>
      <p className="print-chrome absolute bottom-[4mm] left-0 w-full text-center text-[7pt] text-black/50">
        {side === "front" ? "Fronts" : "Backs"} · 85 × 55 mm with 2 mm bleed · print double-sided,
        flip on long edge
      </p>
    </div>
  );
}

/* ───────────────────────── Flyer (A5) ───────────────────────── */

const tone = { butter: palette.butter, sage: palette.sage, blush: palette.blush, cream: "#fbf7ef" };

function Flyer() {
  return (
    <div className="relative flex size-full flex-col" style={{ background: palette.oat }}>
      <div className="flex items-center justify-between px-[10mm] pt-[9mm]">
        <Wordmark size="11mm" />
        <span className="text-[7.5pt] font-semibold tracking-[0.12em] uppercase">{luc.trade}</span>
      </div>
      <h1 className="fraunces px-[10mm] pt-[8mm] text-[42pt]">
        Need a dog{" "}
        <em className="italic" style={{ color: palette.persimmon }}>
          walker?
        </em>
      </h1>
      <div className="relative mx-[10mm] mt-[4mm]">
        <Dachshund className="w-[94mm]" />
        <div className="h-[0.6mm] opacity-25" style={{ background: ground }} />
        <Badge className="absolute -top-[9mm] -right-[1mm] w-[26mm]" />
      </div>
      <div className="mx-[10mm] mt-[6mm] grid grid-cols-2 gap-[3mm]">
        {lucServices.map((s) => (
          <div
            key={s.title}
            className="rounded-[4mm] p-[3.5mm]"
            style={{ background: tone[s.tone] }}
          >
            <ServiceIcon name={s.icon} className="size-[6mm] text-spruce" />
            <p className="fraunces mt-[2mm] text-[13pt]">{s.title}</p>
            <p className="mt-[1mm] text-[7pt] leading-snug">{s.detail}</p>
          </div>
        ))}
      </div>
      <div
        className="mt-auto flex items-center justify-between gap-[6mm] px-[10mm] py-[7mm]"
        style={{ background: palette.spruce, color: palette.oat }}
      >
        <div>
          <p className="fraunces text-[22pt] leading-[0.95]">
            Say hi on{" "}
            <em className="italic" style={{ color: palette.butter }}>
              WhatsApp.
            </em>
          </p>
          <p className="mt-[2.5mm] text-[8pt] leading-snug opacity-85">
            Point your phone camera at the code
            <br />
            to open a chat with Luc.
          </p>
        </div>
        <QrBlock
          value={lucUrls.qrWhatsapp}
          size="30mm"
          label="Message Luc"
          labelColor={palette.oat}
          bg={palette.cream}
        />
      </div>
    </div>
  );
}

/* ───────────────────────── Poster with tear-offs (A4) ───────────────────────── */

function Poster() {
  const tabs = 8;
  return (
    <div className="relative flex size-full flex-col" style={{ background: palette.oat }}>
      <div className="flex items-center justify-between px-[14mm] pt-[12mm]">
        <Wordmark size="14mm" />
        <span
          className="rounded-full px-[4mm] py-[1.5mm] text-[9pt] font-semibold"
          style={{ background: palette.butter }}
        >
          {luc.trade}
        </span>
      </div>
      <h1 className="fraunces px-[14mm] pt-[10mm] text-[60pt]">
        Going away?
        <br />
        <em className="italic" style={{ color: palette.persimmon }}>
          Your pets can stay home.
        </em>
      </h1>

      <div className="mt-[8mm] grid grid-cols-[1fr_auto] items-end gap-[8mm] px-[14mm]">
        <div>
          <ul className="grid gap-[2.5mm]">
            {lucServices.map((s) => (
              <li key={s.title} className="flex items-baseline gap-[3mm] text-[11pt]">
                <Paw className="size-[4mm] shrink-0 translate-y-[0.6mm]" fill={palette.persimmon} />
                <span>
                  <span className="font-semibold">{s.title}</span> — {s.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <QrBlock
          value={lucUrls.qrWhatsapp}
          size="42mm"
          label="Scan to message Luc"
          sub="on WhatsApp"
        />
      </div>

      <div className="relative mx-[14mm] mt-auto mb-[4mm] flex items-end justify-between">
        <Dachshund className="w-[118mm]" />
        <Cat className="w-[40mm]" />
        <div
          className="absolute inset-x-0 bottom-0 h-[0.6mm] opacity-25"
          style={{ background: ground }}
        />
      </div>

      {/* Tear-off tabs */}
      <div
        className="relative h-[66mm] border-t-[0.4mm] border-dashed border-spruce/50"
        style={{ background: "#fbf7ef" }}
      >
        <span
          className="absolute -top-[3.2mm] left-[10mm] px-[2mm] text-[8pt] font-semibold"
          style={{ background: palette.oat }}
        >
          ✂ Take one
        </span>
        <div className="grid h-full" style={{ gridTemplateColumns: `repeat(${tabs}, 1fr)` }}>
          {Array.from({ length: tabs }, (_, i) => (
            <div
              key={i}
              className="flex flex-col items-center border-l-[0.3mm] border-dashed border-spruce/40 px-[1.5mm] pt-[3mm] first:border-l-0"
            >
              <QrCode value={lucUrls.qrWhatsapp} bg="#fbf7ef" className="w-[15mm]" />
              <div className="mt-[2mm] flex flex-1 items-center">
                <p className="text-[8.5pt] leading-tight whitespace-nowrap [writing-mode:vertical-rl]">
                  <span className="fraunces text-[12pt] italic">Luc</span> · dog walks &amp; sitting
                  <br />
                  <span className="font-semibold">Scan to WhatsApp</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Table tent (A4 landscape, folded) ───────────────────────── */

function TentPanel({
  headline,
  accent,
  qr,
  qrLabel,
  sub,
  bg,
}: {
  sub?: string;
  headline: string;
  accent: string;
  qr: string;
  qrLabel: string;
  bg: string;
}) {
  return (
    <div
      className="relative flex size-full items-center gap-[10mm] px-[16mm]"
      style={{ background: bg }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-[4mm]">
          <Wordmark size="11mm" />
          <span className="text-[8pt] font-semibold tracking-[0.12em] uppercase">{luc.trade}</span>
        </div>
        <p className="fraunces mt-[4mm] text-[42pt]">
          {headline}{" "}
          <em className="italic" style={{ color: palette.persimmon }}>
            {accent}
          </em>
        </p>
        <div className="mt-[3mm] w-[84mm]">
          <Dachshund className="w-full" />
        </div>
      </div>
      <div className="rounded-[5mm] bg-white p-[4mm] shadow-[0_0_0_0.3mm_rgb(22_48_43/0.12)]">
        <QrBlock value={qr} size="48mm" label={qrLabel} sub={sub} />
      </div>
    </div>
  );
}

function Tent() {
  return (
    <div className="relative size-full">
      <div className="h-1/2 rotate-180">
        <TentPanel
          headline="Going away? Your pets can"
          accent="stay home."
          qr={lucUrls.qrPage}
          qrLabel="Scan to see services"
          sub={`WhatsApp ${LUC_PHONE_DISPLAY}`}
          bg={palette.butter}
        />
      </div>
      <div className="h-1/2">
        <TentPanel
          headline="Need a dog"
          accent="walker?"
          qr={lucUrls.qrWhatsapp}
          qrLabel="Scan to message Luc"
          bg={palette.oat}
        />
      </div>
      <div className="absolute inset-x-0 top-1/2 border-t-[0.3mm] border-dashed border-spruce/30" />
      <span className="absolute top-1/2 left-[3mm] -translate-y-1/2 text-[6pt] text-spruce/50">
        fold
      </span>
      <span className="absolute top-1/2 right-[3mm] -translate-y-1/2 text-[6pt] text-spruce/50">
        fold
      </span>
    </div>
  );
}

/* ───────────────────────── Banner (600 × 200 mm) ───────────────────────── */

function Banner() {
  return (
    <div
      className="relative flex size-full items-center gap-[18mm] px-[24mm]"
      style={{ background: palette.spruce, color: palette.oat }}
    >
      <div className="shrink-0">
        <p className="fraunces text-[230pt] leading-[0.8] italic" style={{ color: palette.oat }}>
          Luc
        </p>
        <p
          className="mt-[8mm] text-[30pt] font-semibold tracking-[0.06em] uppercase"
          style={{ color: palette.butter }}
        >
          {luc.trade}
        </p>
      </div>
      <div className="relative flex-1 self-end pb-[26mm]">
        <Badge
          className="absolute -top-[34mm] right-[40mm] w-[52mm]"
          ring={palette.butter}
          ink={palette.spruce}
          accent={palette.persimmon}
        />
        <Dachshund className="w-full" collar={palette.persimmon} />
        <div className="h-[1.6mm] rounded-full" style={{ background: palette.butter }} />
      </div>
      <div className="shrink-0 rounded-[8mm] p-[7mm]" style={{ background: "#fbf7ef" }}>
        <QrBlock value={lucUrls.qrWhatsapp} size="104mm" label="Scan to message Luc" bg="#fbf7ef" />
      </div>
    </div>
  );
}

/* ───────────────────────── Kit index ───────────────────────── */

function Kit() {
  return (
    <div className="min-h-screen bg-oat font-inst text-spruce">
      <Toolbar current="kit" />
      <main className="px-5 py-12 md:px-10 md:py-16">
        <h1 className="fraunces text-[clamp(2.75rem,7vw,5rem)]">
          Print kit for <em className="text-persimmon italic">Luc.</em>
        </h1>
        <p className="mt-4 max-w-[52ch] text-lg text-spruce/75">
          Every piece is sized for real paper and has no animation. Open one, then print or save as
          PDF at 100% with margins set to None.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {variants.map((v, i) => (
            <li key={v.style}>
              <Link
                to="/ref/luc"
                search={{ style: v.style }}
                className="flex h-full flex-col justify-between rounded-[1.75rem] bg-cream p-6 transition-transform hover:-translate-y-1"
              >
                <span className="text-sm font-semibold text-spruce/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-8">
                  <span className="fraunces block text-[2rem]">{v.name}</span>
                  <span className="mt-1 block text-sm font-semibold">{v.size}</span>
                  <span className="mt-3 block text-spruce/70">{v.use}</span>
                </span>
                <span className="mt-6 font-semibold text-persimmon">Open →</span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="fraunces mt-20 text-[2.5rem]">Just the codes</h2>
        <p className="mt-2 text-spruce/70">For stickers, social posts or anything else.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
          {[
            {
              label: "Opens WhatsApp",
              url: lucUrls.qrWhatsapp,
              hint: "Opens a chat with Luc, message pre-filled",
            },
            { label: "Opens the page", url: lucUrls.qrPage, hint: "Luc's services page" },
          ].map((code) => (
            <figure key={code.url} className="rounded-[1.75rem] bg-cream p-6">
              <QrCode value={code.url} bg="#fbf7ef" className="w-full" />
              <figcaption className="mt-4">
                <span className="fraunces block text-2xl">{code.label}</span>
                <span className="mt-1 block text-sm text-spruce/70">{code.hint}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ───────────────────────── Entry ───────────────────────── */

export function LucPrint({ style }: { style: PrintStyle }) {
  switch (style) {
    case "kit":
      return <Kit />;
    case "card":
      return (
        <PrintShell
          style="card"
          pages={[<CardSheet key="f" side="front" />, <CardSheet key="b" side="back" />]}
        />
      );
    case "flyer":
      return <PrintShell style="flyer" pages={[<Flyer key="f" />]} />;
    case "poster":
      return <PrintShell style="poster" pages={[<Poster key="p" />]} />;
    case "tent":
      return <PrintShell style="tent" pages={[<Tent key="t" />]} />;
    case "banner":
      return <PrintShell style="banner" pages={[<Banner key="b" />]} />;
  }
}
