"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * HeroScrollBlur
 *
 * A frosted-glass overlay pinned to the bottom of the hero section.
 * Starts fully transparent (opacity 0) so social links are readable.
 * Fades in via GSAP ScrollTrigger as the user begins scrolling —
 * fully opaque by the time they've scrolled ~15% of the viewport height.
 *
 * The visual: backdrop-filter blurs the video, a gradient fades it from
 * #FDFFFC at the bottom edge to transparent upward, mask-image makes
 * the blur itself dissolve upward so it doesn't hard-clip.
 */
export function HeroScrollBlur() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "15% top",
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(el, { opacity: self.progress });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 h-[220px] pointer-events-none"
      style={{
        bottom: "-2px",
        background:
          "linear-gradient(to top, #FDFFFC 0%, rgba(253,255,252,0.5) 45%, transparent 100%)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        maskImage:
          "linear-gradient(to top, black 0%, black 35%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to top, black 0%, black 35%, transparent 100%)",
      }}
    />
  );
}
