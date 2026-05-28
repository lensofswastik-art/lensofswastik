/**
 * HeroHeadline
 *
 * "AI generates.
 *  I design what it missed"
 *
 * ── Figma specs ────────────────────────────────────────────────────────
 *   Font       : Averia Serif Libre · Regular · 96px
 *   Tracking   : -4% → letter-spacing: -0.04em
 *   Align      : center
 *   Fill       : #FDFFFC · 100%
 *   Blend mode : Overlay  ← applied to BOTH layers
 *
 * ── Two-layer technique ───────────────────────────────────────────────
 *   Figma has two identical text layers stacked on top of each other,
 *   both set to "Overlay" blend mode.  This doubles the intensity of the
 *   overlay compositing against the video background — producing the
 *   luminous green-tinted glow visible in the screenshot.
 *
 *   In CSS:
 *   • Layer 1 (normal flow)   : mix-blend-mode: overlay — blends with video
 *   • Layer 2 (absolute inset): mix-blend-mode: overlay — blends with
 *     the visual result of layer 1 + video, amplifying the effect
 *
 * ── Stacking context note ─────────────────────────────────────────────
 *   mix-blend-mode only blends with content OUTSIDE the element's
 *   stacking context.  The parent hero wrapper must NOT set both
 *   `position: relative` AND `z-index` together — that would create an
 *   isolated stacking context trapping the blend.  Use `relative` alone
 *   (no z-index) so the blend passes through to the video.
 */

const LINE_1 = "AI generates.";
const LINE_2 = "I design what it missed";

/** Classes shared by both overlay layers */
const layerClass = [
  "font-averia font-normal",
  "text-[96px] leading-none",
  "tracking-[-0.04em]",
  "text-[#FDFFFC]",
  "text-center whitespace-nowrap",
  "mix-blend-overlay",
].join(" ");

export function HeroHeadline() {
  return (
    /**
     * `relative` only — NO z-index so we don't create an isolated
     * stacking context that would trap mix-blend-mode inside it.
     */
    <div className="relative">
      {/* ── Layer 1 — semantic, sets container dimensions ── */}
      <h1 className={layerClass}>
        {LINE_1}
        <br />
        {LINE_2}
      </h1>

      {/* ── Layer 2 — decorative duplicate, amplifies overlay ── */}
      <h1
        className={`absolute inset-0 ${layerClass}`}
        aria-hidden="true"
      >
        {LINE_1}
        <br />
        {LINE_2}
      </h1>
    </div>
  );
}
