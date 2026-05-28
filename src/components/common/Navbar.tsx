"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Navbar
 *
 * Layout : [Playground]  [● lensofswastik]  [My Projects]
 *
 * ── Pill auto-layout (from Figma node 5:1166) ─────────────────────────
 *   Direction  : horizontal · Gap: 6px · Padding: top/bottom 6 | left 6 | right 20
 *   H : 50px (fixed) · W : hug · Border-radius : 9999px
 *
 * ── Adaptive link colour ──────────────────────────────────────────────
 *   Hero section (dark bg)    : #FEFEFE
 *   Light sections (e.g. #FDFFFC projects) : #121212
 *   Transition is GSAP-animated (0.4 s power2.out) so colour tracks
 *   the Lenis scroll position smoothly.
 *   The centre pill keeps its dark-glass style on all backgrounds.
 */

const PILL_SHADOW = [
  "inset 0 -1px 1px rgba(253,255,252,0.12)",
  "inset 0 1px 1px rgba(253,255,252,0.12)",
  "0 20px 50px rgba(0,0,0,0.50)",
].join(", ");

const PILL_BORDER = "0.6px solid rgba(255,255,255,0.09)";

const LINK_CLASS =
  "hidden md:block font-sans font-normal text-[20px] leading-none " +
  "tracking-[-0.04em] transition-opacity duration-200 ease-out " +
  "hover:opacity-60 focus-visible:outline-none focus-visible:opacity-60";

export function Navbar() {
  const playgroundRef = useRef<HTMLAnchorElement>(null);
  const projectsRef   = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const links = [playgroundRef.current, projectsRef.current].filter(Boolean);

    // Set initial colour explicitly so GSAP can tween from it
    gsap.set(links, { color: "#FEFEFE" });

    const st = ScrollTrigger.create({
      trigger: "#projects",
      // Fire when the top of #projects reaches 80px from top (= navbar base)
      start: "top 80px",
      onEnter: () =>
        gsap.to(links, { color: "#121212", duration: 0.4, ease: "power2.out" }),
      onLeaveBack: () =>
        gsap.to(links, { color: "#FEFEFE", duration: 0.4, ease: "power2.out" }),
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 pt-6 pb-0 pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center gap-10"
        aria-label="Main navigation"
      >
        {/* ── Left nav link — hidden on mobile ─────────────────── */}
        <Link
          ref={playgroundRef}
          href="#playground"
          className={LINK_CLASS}
          // colour is set/animated by GSAP; no inline colour here
        >
          Playground
        </Link>

        {/* ── Centre brand pill — always dark glass, always readable ── */}
        <Link
          href="/"
          className="
            flex items-center gap-[6px]
            pl-[6px] pr-5 py-[6px]
            rounded-full
            bg-[rgba(6,6,6,0.78)]
            backdrop-blur-[20px]
            transition-opacity duration-200 ease-out
            hover:opacity-80
            focus-visible:outline-none focus-visible:opacity-80
          "
          style={{ border: PILL_BORDER, boxShadow: PILL_SHADOW }}
          aria-label="lensofswastik — home"
        >
          <Image
            src="/images/eye-logo.png"
            alt=""
            width={38}
            height={38}
            className="rounded-full select-none shrink-0"
            priority
          />
          <span
            className="
              font-averia font-normal text-[20px] leading-none
              tracking-[-0.04em] text-[#FEFEFE]
              select-none whitespace-nowrap
            "
          >
            lensofswastik
          </span>
        </Link>

        {/* ── Right nav link — hidden on mobile ────────────────── */}
        <Link
          ref={projectsRef}
          href="#projects"
          className={LINK_CLASS}
        >
          My Projects
        </Link>
      </nav>
    </header>
  );
}
