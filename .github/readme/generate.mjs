// Generates the GitHub profile README artwork (hero + call to action), with the
// site fonts embedded so they render inside GitHub image tags.
// Run from the repo root: node .github/readme/generate.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? process.cwd();
const out = join(root, ".github/readme");
mkdirSync(out, { recursive: true });

const font = (p) => readFileSync(join(root, "node_modules", p)).toString("base64");
const F = {
  serif: font("@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2"),
  serifIt: font("@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2"),
  sans: font("@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2"),
  mono: font("@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2"),
};
const face = (name, key, style = "normal", weight = "400") =>
  `@font-face{font-family:'${name}';src:url(data:font/woff2;base64,${F[key]}) format('woff2');font-style:${style};font-weight:${weight}}`;

const themes = {
  dark: { bg: "#0e0e0d", ink: "#ecebe6", mute: "#8f8d86", line: "rgba(236,235,230,0.14)" },
  light: { bg: "#ecebe6", ink: "#0e0e0d", mute: "#6d6b64", line: "rgba(14,14,13,0.14)" },
};
const signal = "#ff4f00";
const ease = "cubic-bezier(0.16,1,0.3,1)";

function hero(t) {
  const W = 1280, H = 720, X = 56;
  const lines = [
    { text: "World of", y: 300, it: false },
    { text: "creative", y: 450, it: true },
    { text: 'solutions<tspan fill="#ff4f00">.</tspan>', y: 600, it: false },
  ];
  const about = [
    "I design and build web and",
    "mobile products — scalable",
    "apps and seamless experiences,",
    "made with code and creativity.",
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Muezz — Software engineer. World of creative solutions.">
<style>
${face("S", "serif")}${face("S", "serifIt", "italic")}${face("T", "sans", "normal", "100 900")}${face("M", "mono", "normal", "100 800")}
.mono{font-family:M,ui-monospace,monospace;font-size:13px;letter-spacing:.08em;fill:${t.mute};text-transform:uppercase}
.ink{fill:${t.ink}}
.nocase{text-transform:none}
.head{font-family:S,'Times New Roman',serif;font-size:184px;letter-spacing:-.02em;fill:${t.ink}}
.it{font-style:italic}
.body{font-family:T,'Helvetica Neue',Arial,sans-serif;font-size:20px;fill:${t.mute};letter-spacing:-.005em}
.rise{animation:rise 1.4s ${ease} both}
.fade{animation:fade 1.2s ${ease} both}
.rule{animation:draw 1.6s ${ease} both;transform-origin:left;transform-box:fill-box}
.pip{animation:pip 2.4s ease-in-out 1.6s infinite;transform-origin:center;transform-box:fill-box}
@keyframes rise{from{transform:translateY(190px)}to{transform:none}}
@keyframes fade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes draw{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes pip{0%,100%{opacity:1}50%{opacity:.25}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<rect width="${W}" height="${H}" fill="${t.bg}"/>
${lines.map((l, i) => `<clipPath id="c${i}"><rect x="0" y="${l.y - 165}" width="${W}" height="205"/></clipPath>`).join("")}

<g class="fade" style="animation-delay:.1s">
  <text x="${X}" y="62" class="mono"><tspan class="ink" font-weight="600">Muezz</tspan>  ·  Software Engineer</text>
  <text x="${W / 2}" y="62" class="mono nocase" text-anchor="middle">WEB / ANDROID / iOS</text>
  <circle cx="${W - X - 158}" cy="57.5" r="4.5" fill="${signal}" class="pip"/>
  <text x="${W - X}" y="62" class="mono" text-anchor="end">Portfolio — 2026</text>
</g>
<rect x="${X}" y="88" width="${W - X * 2}" height="1" fill="${t.line}" class="rule"/>

${lines
  .map(
    (l, i) =>
      `<g clip-path="url(#c${i})"><text x="${X - 8}" y="${l.y}" class="head${l.it ? " it" : ""} rise" style="animation-delay:${0.25 + i * 0.12}s">${l.text}</text></g>`,
  )
  .join("\n")}
<circle cx="0" cy="0" r="0" fill="none"/>

<g class="fade" style="animation-delay:.9s">
  <text x="${W - X - 330}" y="196" class="mono">(01) — About</text>
  ${about.map((s, i) => `<text x="${W - X - 330}" y="${236 + i * 30}" class="body">${s}</text>`).join("")}
</g>

<g class="fade" style="animation-delay:1s">
  <text x="${W - X - 330}" y="470" class="mono">(02) — Services</text>
  <rect x="${W - X - 330}" y="490" width="330" height="1" fill="${t.line}"/>
  <text x="${W - X - 330}" y="530" class="body" style="fill:${t.ink}">Mobile apps</text>
  <text x="${W - X}" y="530" class="mono" text-anchor="end">Android &amp; <tspan class="nocase">iOS</tspan></text>
  <rect x="${W - X - 330}" y="552" width="330" height="1" fill="${t.line}"/>
  <text x="${W - X - 330}" y="592" class="body" style="fill:${t.ink}">Web development</text>
  <text x="${W - X}" y="592" class="mono" text-anchor="end">Sites &amp; web apps</text>
</g>
<rect x="${X}" y="652" width="${W - X * 2}" height="1" fill="${t.line}" class="rule" style="animation-delay:.4s"/>
<g class="fade" style="animation-delay:1.1s">
  <text x="${X}" y="686" class="mono">Let’s make the digital world more exciting</text>
  <text x="${W - X}" y="686" class="mono ink" text-anchor="end" font-weight="600">muezz.dev  ↗</text>
</g>
</svg>
`;
}

function cta(t) {
  const W = 1280, H = 260, X = 56;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Visit muezz.dev — selected work, case studies and how to start a project.">
<style>
${face("S", "serif")}${face("S", "serifIt", "italic")}${face("M", "mono", "normal", "100 800")}
.mono{font-family:M,ui-monospace,monospace;font-size:13px;letter-spacing:.08em;text-transform:uppercase;fill:#0e0e0d}
.big{font-family:S,'Times New Roman',serif;font-size:132px;letter-spacing:-.02em;fill:#0e0e0d}
.it{font-style:italic}
.arrow{animation:nudge 2.4s ${ease} infinite;transform-box:fill-box}
@keyframes nudge{0%,55%,100%{transform:none}25%{transform:translate(8px,-8px)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<rect width="${W}" height="${H}" rx="28" fill="${signal}"/>
<text x="${X}" y="62" class="mono" font-weight="600">(→) The full portfolio</text>
<text x="${W - X}" y="62" class="mono" text-anchor="end">Selected work · Case studies · Start a project</text>
<text x="${X - 6}" y="204" class="big">Visit <tspan class="it">muezz.dev</tspan></text>
<g transform="translate(${W - X - 120} 104)">
  <circle cx="60" cy="60" r="60" fill="#0e0e0d"/>
  <g class="arrow"><path d="M42 78 L78 42 M50 42 H78 V70" stroke="${t.bg === "#0e0e0d" ? "#ecebe6" : "#ecebe6"}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
</g>
</svg>
`;
}

for (const [name, t] of Object.entries(themes)) {
  writeFileSync(join(out, `hero-${name}.svg`), hero(t));
}
writeFileSync(join(out, "cta.svg"), cta(themes.dark));
console.log("ok");
