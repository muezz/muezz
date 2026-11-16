import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "#/lib/scroll";

const FONT_FAMILY = '"Inter Tight Variable", "Helvetica Neue", Arial, sans-serif';
const FONT_WEIGHT = 640;
const INK = "#0e0e0d";
const SIGNAL = "#ff4f00";

type Field = {
  count: number;
  size: number;
  ox: Float32Array;
  oy: Float32Array;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
};

/**
 * The wordmark as a field of square "pixels" that scatter from the cursor
 * and spring back home — a dot-matrix print of the name, set full-bleed.
 */
export function ParticleWordmark({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const still = prefersReducedMotion();
    const pointer = { x: -9999, y: -9999, active: false };
    let field: Field | null = null;
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    let disposed = false;
    const born = performance.now();
    // Land as the preloader lifts; no wait on repeat visits (see --intro).
    const ENTRY_DELAY = document.documentElement.hasAttribute("data-seen") ? 0 : 1150;

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap!.clientWidth;

      // Fit the word to the full container width.
      const probe = document.createElement("canvas").getContext("2d")!;
      probe.font = `${FONT_WEIGHT} 100px ${FONT_FAMILY}`;
      probe.letterSpacing = "-5.5px";
      const m = probe.measureText(text);
      const fontSize = (100 * width) / (m.actualBoundingBoxRight + m.actualBoundingBoxLeft);
      const ascent = m.actualBoundingBoxAscent * (fontSize / 100);
      height = Math.ceil(ascent + fontSize * 0.02);

      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rasterise once, then sample a grid of the inked pixels.
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.font = `${FONT_WEIGHT} ${fontSize}px ${FONT_FAMILY}`;
      octx.letterSpacing = `${-0.055 * fontSize}px`;
      octx.textBaseline = "alphabetic";
      octx.fillText(text, m.actualBoundingBoxLeft * (fontSize / 100), ascent);
      const data = octx.getImageData(0, 0, width, height).data;

      const step = Math.max(3, Math.min(7, Math.round(width / 210)));
      const points: number[] = [];
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          if (data[(y * width + x) * 4 + 3] > 140) points.push(x, y);
        }
      }

      const count = points.length / 2;
      const next: Field = {
        count,
        size: step * 0.74,
        ox: new Float32Array(count),
        oy: new Float32Array(count),
        x: new Float32Array(count),
        y: new Float32Array(count),
        vx: new Float32Array(count),
        vy: new Float32Array(count),
      };
      const settled = field !== null || still;
      for (let i = 0; i < count; i++) {
        next.ox[i] = points[i * 2];
        next.oy[i] = points[i * 2 + 1];
        // First build: scatter below the fold so the word assembles upward.
        next.x[i] = settled ? next.ox[i] : Math.random() * width;
        next.y[i] = settled ? next.oy[i] : height + Math.random() * height * 1.5;
      }
      field = next;
    }

    function step(now: number) {
      if (!field) return 0;
      const { count, ox, oy, x, y, vx, vy } = field;
      const entering = now - born < ENTRY_DELAY;
      const radius = Math.max(70, width * 0.075);
      const r2 = radius * radius;
      let energy = 0;

      if (!entering) {
        for (let i = 0; i < count; i++) {
          const dx = x[i] - pointer.x;
          const dy = y[i] - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (pointer.active && d2 < r2) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / radius) * 5.5;
            vx[i] += (dx / d) * force;
            vy[i] += (dy / d) * force;
          }
          vx[i] = (vx[i] + (ox[i] - x[i]) * 0.055) * 0.82;
          vy[i] = (vy[i] + (oy[i] - y[i]) * 0.055) * 0.82;
          x[i] += vx[i];
          y[i] += vy[i];
          energy += Math.abs(vx[i]) + Math.abs(vy[i]);
        }
      }
      return entering ? Infinity : energy;
    }

    function draw() {
      if (!field) return;
      const { count, size, ox, oy, x, y } = field;
      ctx!.clearRect(0, 0, width, height);
      if (performance.now() - born < ENTRY_DELAY && !still) return;
      const threshold = size * 2.2;
      ctx!.fillStyle = INK;
      for (let i = 0; i < count; i++) {
        if (Math.abs(x[i] - ox[i]) + Math.abs(y[i] - oy[i]) < threshold) {
          ctx!.fillRect(x[i], y[i], size, size);
        }
      }
      ctx!.fillStyle = SIGNAL;
      for (let i = 0; i < count; i++) {
        if (Math.abs(x[i] - ox[i]) + Math.abs(y[i] - oy[i]) >= threshold) {
          ctx!.fillRect(x[i], y[i], size, size);
        }
      }
    }

    function loop(now: number) {
      const energy = step(now);
      draw();
      // Sleep once everything is home and the cursor has left.
      if (visible && (pointer.active || energy > 0.5)) {
        frame = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    }

    function wake() {
      if (still || running || disposed) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function onMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active =
        pointer.x > -80 &&
        pointer.y > -80 &&
        pointer.x < rect.width + 80 &&
        pointer.y < rect.height + 80;
      if (pointer.active) wake();
    }

    function onLeave() {
      pointer.active = false;
    }

    const resize = new ResizeObserver(() => {
      if (wrap!.clientWidth === width) return;
      build();
      draw();
      wake();
    });
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });

    void document.fonts.load(`${FONT_WEIGHT} 100px ${FONT_FAMILY}`).then(() => {
      if (disposed) return;
      build();
      setReady(true);
      if (still) draw();
      else wake();
      resize.observe(wrap);
      io.observe(canvas);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [text]);

  return (
    <div ref={wrapRef} className="relative w-full select-none">
      <canvas
        ref={canvasRef}
        aria-hidden
        className={ready ? "block w-full" : "absolute inset-x-0 top-0 w-full opacity-0"}
      />
      {/* Server-rendered stand-in until the canvas has drawn. */}
      {!ready && (
        <span aria-hidden className="display block text-[29vw] leading-[0.74] tracking-[-0.055em]">
          {text}
        </span>
      )}
    </div>
  );
}
