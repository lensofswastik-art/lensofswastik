"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PILL_SHADOW = [
  "inset 0 -1px 1px rgba(253,255,252,0.12)",
  "inset 0 1px 1px rgba(253,255,252,0.12)",
  "0 20px 50px rgba(0,0,0,0.50)",
].join(", ");

const PILL_BORDER = "0.6px solid rgba(255,255,255,0.09)";

const LINK_CLASS =
  "hidden md:block font-sans font-normal text-[20px] leading-none " +
  "tracking-[-0.04em] text-[#FEFEFE] transition-opacity duration-200 ease-out " +
  "hover:opacity-60 focus-visible:outline-none focus-visible:opacity-60";

const MOBILE_NAV_LINK =
  "font-averia font-normal text-[20px] leading-none tracking-[-0.04em] " +
  "text-[#FEFEFE] opacity-80 active:opacity-100 transition-opacity duration-150";

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.125 10H16.875" stroke="#FDFFFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.125 5H16.875" stroke="#FDFFFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.125 15H16.875" stroke="#FDFFFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Navbar() {
  const playgroundRef = useRef<HTMLAnchorElement>(null);
  const projectsRef = useRef<HTMLAnchorElement>(null);
  const mobilePillRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // GSAP colour adaptation for desktop links
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const links = [playgroundRef.current, projectsRef.current].filter(Boolean);
    gsap.set(links, { color: "#FEFEFE" });
    const st = ScrollTrigger.create({
      trigger: "#my-story",
      start: "top 80px",
      onEnter: () => gsap.to(links, { color: "#121212", duration: 0.4, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(links, { color: "#FEFEFE", duration: 0.4, ease: "power2.out" }),
    });
    return () => { st.kill(); };
  }, []);

  // Close on outside tap/click
  useEffect(() => {
    if (!mobileOpen) return;
    function onOutside(e: PointerEvent | TouchEvent) {
      const target = e.target as Node;
      if (mobilePillRef.current && !mobilePillRef.current.contains(target)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("touchstart", onOutside as EventListener, { passive: true });
    document.addEventListener("pointerdown", onOutside as EventListener);
    return () => {
      document.removeEventListener("touchstart", onOutside as EventListener);
      document.removeEventListener("pointerdown", onOutside as EventListener);
    };
  }, [mobileOpen]);

  // Close on scroll
  useEffect(() => {
    if (!mobileOpen) return;
    function onScroll() { setMobileOpen(false); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  function toggle() { setMobileOpen(v => !v); }
  function closeMenu() { setMobileOpen(false); }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 pt-6 pb-0 pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-10" aria-label="Main navigation">

        {/* ── Desktop left link ── */}
        <Link ref={playgroundRef} href="#playground" className={LINK_CLASS}>
          Playground
        </Link>

        {/* ── Desktop pill (≥ md) ── */}
        <Link
          href="/"
          className="hidden md:flex items-center gap-[6px] pl-[6px] pr-5 py-[6px] rounded-full bg-[#060606] transition-opacity duration-200 ease-out hover:opacity-80 focus-visible:outline-none focus-visible:opacity-80"
          style={{ border: PILL_BORDER, boxShadow: PILL_SHADOW }}
          aria-label="lensofswastik — home"
        >
          <Image src="/images/eye-logo.png" alt="" width={38} height={38} className="rounded-full select-none shrink-0" priority />
          <span className="font-averia font-normal text-[20px] leading-none tracking-[-0.04em] text-[#FEFEFE] select-none whitespace-nowrap">
            lensofswastik
          </span>
        </Link>

        {/* ── Mobile pill (< md) — CSS Dynamic Island ── */}
        <div
          ref={mobilePillRef}
          className="md:hidden overflow-hidden bg-[#060606]"
          style={{
            borderRadius: mobileOpen ? "28px" : "9999px",
            border: PILL_BORDER,
            boxShadow: PILL_SHADOW,
            transition: "border-radius 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Top row */}
          <div className="flex items-center gap-[6px] pl-[6px] pr-[6px] py-[6px]">
            <Image src="/images/eye-logo.png" alt="" width={38} height={38} className="rounded-full select-none shrink-0" priority />
            <span className="font-averia font-normal text-[20px] leading-none tracking-[-0.04em] text-[#FEFEFE] select-none whitespace-nowrap">
              lensofswastik
            </span>
            <button
              onClick={toggle}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="w-[38px] h-[38px] shrink-0 rounded-full flex items-center justify-center cursor-pointer select-none"
              style={{ background: "rgba(253,255,252,0.04)", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              <HamburgerIcon />
            </button>
          </div>

          {/* Expanded nav — CSS max-height + opacity */}
          <div
            style={{
              maxHeight: mobileOpen ? "200px" : "0px",
              opacity: mobileOpen ? 1 : 0,
              overflow: "hidden",
              transition: mobileOpen
                ? "max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease 0.08s"
                : "max-height 0.25s ease, opacity 0.1s ease",
            }}
          >
            <div className="px-5 pb-5 pt-2 flex flex-col gap-5">
              <div className="h-px bg-white/10" />
              <Link href="#playground" className={MOBILE_NAV_LINK} onClick={closeMenu}>
                Playground
              </Link>
              <Link href="#my-story" className={MOBILE_NAV_LINK} onClick={closeMenu}>
                My Story
              </Link>
              <Link href="#projects" className={MOBILE_NAV_LINK} onClick={closeMenu}>
                My Projects
              </Link>
            </div>
          </div>
        </div>

        {/* ── Desktop right link ── */}
        <Link ref={projectsRef} href="#projects" className={LINK_CLASS}>
          My Projects
        </Link>

      </nav>
    </header>
  );
}
