'use client';
import Lenis from 'lenis';
import { useEffect } from 'react';

export const useLenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const animate = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis.destroy();
    };
  }, []);
};
