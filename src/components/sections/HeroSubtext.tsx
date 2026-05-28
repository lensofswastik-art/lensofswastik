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
        text-[16px] md:text-[24px] leading-[1.2]
        tracking-[-0.04em]
        text-[#FDFFFC]/60
        text-center
        max-w-[300px] md:max-w-none
      "
    >
      Product designer with 3 years across Web3, AI, mobile and games
    </p>
  );
}
