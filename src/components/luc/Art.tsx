/**
 * Luc's illustration kit — flat, geometric and print-safe. Animation hooks are
 * opt-in via `animated` so the print variants render perfectly still.
 */

type ArtProps = { className?: string; animated?: boolean };

export const palette = {
  oat: "#f3ede2",
  spruce: "#16302b",
  persimmon: "#ee5b2b",
  sage: "#b9cdb1",
  butter: "#f5d76e",
  blush: "#f2c4b0",
  caramel: "#c46a33",
  cocoa: "#8a4320",
  cream: "#fbf7ef",
};

/** A long, very good dachshund. */
export function Dachshund({
  className,
  animated,
  collar = palette.spruce,
}: ArtProps & { collar?: string }) {
  const a = animated ? "" : " luc-still";
  return (
    <svg viewBox="0 0 320 170" className={className} aria-hidden>
      {/* tail */}
      <path
        className={`luc-wag${a}`}
        d="M58 78 C34 66 26 46 34 30"
        fill="none"
        stroke={palette.caramel}
        strokeWidth="11"
        strokeLinecap="round"
      />
      {/* far legs (darker, behind) */}
      <rect
        className={`luc-leg-b${a}`}
        x="74"
        y="104"
        width="17"
        height="44"
        rx="8.5"
        fill={palette.cocoa}
      />
      <rect
        className={`luc-leg-a${a}`}
        x="196"
        y="104"
        width="17"
        height="44"
        rx="8.5"
        fill={palette.cocoa}
      />
      {/* body */}
      <rect x="48" y="62" width="186" height="64" rx="32" fill={palette.caramel} />
      {/* near legs */}
      <rect
        className={`luc-leg-a${a}`}
        x="96"
        y="106"
        width="18"
        height="46"
        rx="9"
        fill={palette.caramel}
      />
      <rect
        className={`luc-leg-b${a}`}
        x="218"
        y="106"
        width="18"
        height="46"
        rx="9"
        fill={palette.caramel}
      />
      {/* collar */}
      <rect
        x="222"
        y="58"
        width="13"
        height="58"
        rx="6.5"
        fill={collar}
        transform="rotate(-14 228 87)"
      />
      <circle
        cx="236"
        cy="118"
        r="8"
        fill={palette.butter}
        stroke={palette.spruce}
        strokeWidth="2.5"
      />
      {/* head */}
      <circle cx="258" cy="62" r="36" fill={palette.caramel} />
      <rect x="266" y="58" width="50" height="30" rx="15" fill={palette.caramel} />
      <circle cx="312" cy="66" r="7.5" fill={palette.spruce} />
      {/* ear */}
      <ellipse
        cx="243"
        cy="76"
        rx="15"
        ry="28"
        fill={palette.cocoa}
        transform="rotate(16 243 76)"
      />
      {/* eye + brow */}
      <circle cx="270" cy="50" r="5" fill={palette.spruce} />
      <circle cx="271.5" cy="48.5" r="1.6" fill="#fff" />
      {/* smile */}
      <path
        d="M290 84 q8 6 16 0"
        fill="none"
        stroke={palette.spruce}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A content, loaf-adjacent cat. */
export function Cat({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 180 210" className={className} aria-hidden>
      <path
        d="M128 186 C176 186 176 132 150 128"
        fill="none"
        stroke={palette.butter}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path d="M30 196 C18 120 50 100 90 100 C130 100 162 120 150 196 Z" fill={palette.butter} />
      <path d="M58 52 L48 10 L84 34 Z M122 52 L132 10 L96 34 Z" fill={palette.butter} />
      <circle cx="90" cy="68" r="44" fill={palette.butter} />
      <path
        d="M58 22 L64 40 M122 22 L116 40"
        stroke={palette.blush}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <g fill="none" stroke={palette.spruce} strokeWidth="3.5" strokeLinecap="round">
        <path d="M66 66 q8 7 16 0" />
        <path d="M98 66 q8 7 16 0" />
        <path d="M84 84 q6 5 12 0" />
        <path d="M40 80 h22 M40 90 l22 -4 M140 80 h-22 M140 90 l-22 -4" opacity=".6" />
      </g>
      <path d="M86 78 h8 l-4 5 z" fill={palette.persimmon} />
      <path
        d="M62 196 v-26 M118 196 v-26"
        stroke={palette.spruce}
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".25"
      />
    </svg>
  );
}

export function Paw({
  className,
  fill = "currentColor",
  ...rest
}: { className?: string; fill?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill={fill} {...rest}>
      <ellipse cx="14" cy="26" rx="6.5" ry="8.5" transform="rotate(-18 14 26)" />
      <ellipse cx="26" cy="14" rx="6.5" ry="9" transform="rotate(-6 26 14)" />
      <ellipse cx="40" cy="14" rx="6.5" ry="9" transform="rotate(8 40 14)" />
      <ellipse cx="51" cy="27" rx="6.5" ry="8.5" transform="rotate(20 51 27)" />
      <path d="M32 31c-9 0-19 11-19 20 0 7 6 9 11 8 4-1 5-3 8-3s4 2 8 3c5 1 11-1 11-8 0-9-10-20-19-20z" />
    </svg>
  );
}

const icons = {
  home: (
    <path
      d="M6 30 L32 8 L58 30 V56 H40 V40 H24 V56 H6 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinejoin="round"
    />
  ),
  moon: <path d="M44 6 A26 26 0 1 0 58 44 A22 22 0 1 1 44 6 Z" fill="currentColor" />,
  bone: (
    <g fill="currentColor" transform="rotate(-35 32 32)">
      <rect x="16" y="27" width="32" height="10" rx="5" />
      <circle cx="16" cy="26" r="7" />
      <circle cx="16" cy="38" r="7" />
      <circle cx="48" cy="26" r="7" />
      <circle cx="48" cy="38" r="7" />
    </g>
  ),
};

export function ServiceIcon({
  name,
  className,
}: {
  name: keyof typeof icons | "paw";
  className?: string;
}) {
  if (name === "paw") return <Paw className={className} />;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {icons[name]}
    </svg>
  );
}

export function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path
        d="M9.5 9.5c0 3 2 5 5 5l1-1.6-2.2-1-.8.8c-.9-.4-1.8-1.3-2.2-2.2l.8-.8-1-2.2z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/** Circular stamp: text running around a paw. */
export function Badge({
  className,
  text = "Dog walking • Pet sitting • Drop-ins • ",
  ring = palette.spruce,
  ink = palette.oat,
  accent = palette.butter,
  animated,
}: ArtProps & { text?: string; ring?: string; ink?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <circle cx="100" cy="100" r="98" fill={ring} />
      <defs>
        <path id="luc-badge-path" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
      </defs>
      <g className={animated ? "luc-spin" : undefined} style={{ transformOrigin: "100px 100px" }}>
        <text
          fill={ink}
          style={{ fontFamily: "var(--font-inst)", fontWeight: 600, letterSpacing: "0.16em" }}
          fontSize="15.5"
        >
          <textPath href="#luc-badge-path" textLength="460">
            {text.toUpperCase()}
          </textPath>
        </text>
      </g>
      <circle cx="100" cy="100" r="48" fill={accent} />
      <Paw fill={ring} x="70" y="68" width="60" height="60" />
    </svg>
  );
}
