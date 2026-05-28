"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll
 *
 * Initialises Lenis (inertia smooth scroll) driven by native RAF.
 * ScrollTrigger is synced via lenis.on("scroll") so GSAP animations
 * stay accurate to the Lenis scroll position.
 *
 * Root cause note: <html> must NOT have height: 100% (h-full) — that
 * fixes the HTML element to 100vh and shifts the scroll container from
 * window to <html>, so Lenis's window listeners prevent native scroll
 * but never apply its own scroll. Removed h-full from layout.tsx.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from native RAF (time is already in ms — no conversion needed)
    let rafId: number;
    function animate(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
