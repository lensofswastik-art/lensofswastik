import { AvatarWithBubble } from "@/components/common/AvatarWithBubble";

/**
 * HeroEyebrow
 *
 * "I am Swastik"  [avatar]
 *
 * ── Specs ──────────────────────────────────────────────────────────
 *   Layout : flex row · items-center · gap 6px
 *   Text   : Geist · Regular · 24px · tracking -0.04em · #FEFEFE
 *   Avatar : AvatarWithBubble (handles hover + chat bubble internally)
 */
export function HeroEyebrow() {
  return (
    <div className="flex items-center gap-[6px]">
      {/* "I am Swastik" */}
      <span
        className="
          font-sans font-normal text-[20px] md:text-[24px] leading-none
          tracking-[-0.04em] text-[#FEFEFE]
          select-none
        "
      >
        I am Swastik
      </span>

      {/* Avatar + chat bubble — client component, owns hover + timer state */}
      <AvatarWithBubble />
    </div>
  );
}
