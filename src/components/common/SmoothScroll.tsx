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

    // Intercept all anchor href="#section" clicks — capture phase runs before
    // Next.js Link's handler, and e.preventDefault() causes Link to bail out.
    function onAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#") || href.length <= 1) return;
      e.preventDefault();
      lenis.scrollTo(href, { offset: -80, duration: 1.2 });
    }
    document.addEventListener("click", onAnchorClick, true);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", onAnchorClick, true);
    };
  }, []);

  return <>{children}</>;
}
