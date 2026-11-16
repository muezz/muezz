import { useEffect, useState } from "react";

/**
 * Counts 000 → 100 while the grid settles. The exit is pure CSS
 * (see `.preloader` in styles.css), so it never blocks the page.
 */
export function Preloader() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 950;
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      aria-hidden
      className="preloader gutter fixed inset-0 z-[70] flex flex-col justify-between bg-ink py-6 text-paper"
    >
      <div className="label flex justify-between text-mute-dark">
        <span>Muezz</span>
        <span>Software Engineer</span>
      </div>
      <div>
        <div className="display text-[clamp(5rem,22vw,20rem)] tabular-nums">
          {String(count).padStart(3, "0")}
        </div>
        <div className="mt-6 h-px w-full bg-line-dark">
          <div className="preloader-bar h-px w-full bg-signal" />
        </div>
      </div>
    </div>
  );
}
