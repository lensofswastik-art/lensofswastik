import Image from "next/image";
import Link from "next/link";

/**
 * Navbar
 *
 * Layout : [Playground]  [● lensofswastik]  [My Projects]
 *
 * ── Pill auto-layout (from Figma node 5:1166) ─────────────────────────
 *   Direction  : horizontal
 *   Alignment  : left-center
 *   W / H      : 185 / 50 (hug)
 *   Gap        : 6px  (between eye icon and brand text)
 *   Padding    : top 6 | right 6 | bottom 6 | left 20
 *                (left is larger to visually balance the pill's left curve)
 *   Border-r   : 9999px (full pill)
 *
 * ── Effects (from Figma) ───────────────────────────────────────────────
 *   Inner shadow 1 : X 0  Y -1  blur 1  spread 0  #FDFFFC 12%  → rim at bottom interior
 *   Inner shadow 2 : X 0  Y  1  blur 1  spread 0  #FDFFFC 12%  → rim at top interior
 *   Drop shadow    : X 0  Y 20  blur 50 spread 0  #000000 50%  → ambient lift
 *
 * ── Typography ────────────────────────────────────────────────────────
 *   Brand text  : Averia Serif Libre · 400 · 20px · tracking -0.04em · #FEFEFE
 *   Nav links   : Geist · 400 · 20px · tracking -0.04em · #FEFEFE
 */

const PILL_SHADOW = [
  "inset 0 -1px 1px rgba(253,255,252,0.12)", // inner rim — bottom edge
  "inset 0 1px 1px rgba(253,255,252,0.12)",  // inner rim — top edge
  "0 20px 50px rgba(0,0,0,0.50)",            // ambient drop shadow
].join(", ");

// 0.6px stroke — sub-pixel, can't be expressed as a Tailwind class; kept in style
const PILL_BORDER = "0.6px solid rgba(255,255,255,0.09)";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 pt-6 pb-0 pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center gap-10"
        aria-label="Main navigation"
      >
        {/* ── Left nav link ─────────────────────────────────────── */}
        <Link
          href="#playground"
          className="
            font-sans font-normal text-[20px] leading-none
            tracking-[-0.04em] text-[#FEFEFE]
            transition-opacity duration-200 ease-out
            hover:opacity-60
            focus-visible:outline-none focus-visible:opacity-60
          "
        >
          Playground
        </Link>

        {/* ── Centre brand pill ─────────────────────────────────── */}
        {/*
          Padding:  pl-5 (20px left) · pr-[6px] (6px right) · py-[6px] (6px top/bottom)
          Gap:      gap-[6px] between icon and text
          Height:   6 (top) + 38 (icon) + 6 (bottom) = 50px — matches Figma H:50
          Width:    hugs content (~185px) — do NOT fix width
        */}
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
          {/* Eye icon — 38×38 so the pill hugs to exactly 50px tall (6+38+6) */}
          <Image
            src="/images/eye-logo.png"
            alt=""
            width={38}
            height={38}
            className="rounded-full select-none shrink-0"
            priority
          />

          {/* Brand name — Averia Serif Libre */}
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

        {/* ── Right nav link ────────────────────────────────────── */}
        <Link
          href="#projects"
          className="
            font-sans font-normal text-[20px] leading-none
            tracking-[-0.04em] text-[#FEFEFE]
            transition-opacity duration-200 ease-out
            hover:opacity-60
            focus-visible:outline-none focus-visible:opacity-60
          "
        >
          My Projects
        </Link>
      </nav>
    </header>
  );
}
