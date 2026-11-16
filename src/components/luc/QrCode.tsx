import { encode } from "uqr";

type Props = {
  value: string;
  /** Module colour. Keep it dark on a light background so every phone can read it. */
  fg?: string;
  bg?: string;
  className?: string;
  title?: string;
};

/**
 * A QR code with rounded "eyes" and dot modules. Error correction is set to Q
 * (25%) so the styling never costs scannability; the quiet zone is built in.
 */
export function QrCode({ value, fg = "#16302b", bg = "#ffffff", className, title }: Props) {
  const { data, types, size } = encode(value, { ecc: "Q", border: 0 });
  const quiet = 3;
  const full = size + quiet * 2;

  const isEye = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);

  const dots: string[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!data[y][x] || isEye(x, y)) continue;
      const solid = types[y][x] !== 0; // timing/alignment stay square-ish for reliability
      const r = solid ? 0.5 : 0.44;
      dots.push(
        solid
          ? `M${x + 0.05} ${y + 0.05}h0.9v0.9h-0.9z`
          : `M${x + 0.5 - r} ${y + 0.5}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`,
      );
    }
  }

  const eyes = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ];

  return (
    <svg
      viewBox={`${-quiet} ${-quiet} ${full} ${full}`}
      className={className}
      role="img"
      aria-label={title ?? `QR code for ${value}`}
      shapeRendering="geometricPrecision"
    >
      <rect x={-quiet} y={-quiet} width={full} height={full} rx={2.2} fill={bg} />
      <path d={dots.join("")} fill={fg} />
      {eyes.map(([x, y]) => (
        <g key={`${x}-${y}`} fill={fg}>
          <path
            fillRule="evenodd"
            d={`M${x + 2} ${y}h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z
                M${x + 2} ${y + 1}h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z`}
          />
          <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.9} />
        </g>
      ))}
    </svg>
  );
}
