/**
 * HeroSubtext
 *
 * "Product designer with 3 years across Web3, AI, mobile and games"
 *
 * ── Figma specs ──────────────────────────────────────────────────
 *   Font        : Geist · Regular · 24px
 *   Line height : 100% → line-height: 1 (leading-none)
 *   Tracking    : -4%  → letter-spacing: -0.04em
 *   Color       : #FDFFFC · 60% opacity
 *   Gap from heading : 26px (mt-[26px] on the wrapper in page.tsx)
 */
export function HeroSubtext() {
  return (
    <p
      className="
        font-sans font-normal
        text-[24px] leading-none
        tracking-[-0.04em]
        text-[#FDFFFC]/60
        text-center
      "
    >
      Product designer with 3 years across Web3, AI, mobile and games
    </p>
  );
}
