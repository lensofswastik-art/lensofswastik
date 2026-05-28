/**
 * HeroSocials
 *
 * Four social text links pinned to the bottom of the hero section.
 *
 * ── Specs ───────────────────────────────────────────────────────────
 *   Layout : flex row · items-center · gap 48px
 *   Font   : Geist · Regular · 20px · Auto line-height · -4% tracking
 *   Color  : #FEFEFE · 100% opacity
 *   Hover  : 60% opacity fade (200 ms ease-out)
 */

const linkClass =
  "font-sans font-normal text-[14px] md:text-[20px] leading-none tracking-[-0.04em] text-[#FEFEFE] " +
  "hover:opacity-60 transition-opacity duration-200 ease-out select-none whitespace-nowrap";

const socials = [
  { label: "LinkedIn",           href: "#linkedin" /* TODO: add URL */ },
  { label: "X (formerly Twitter)", href: "#twitter"  /* TODO: add URL */ },
  { label: "Instagram",          href: "#instagram"/* TODO: add URL */ },
  { label: "Email",              href: "mailto:lensofswastik@gmail.com" },
] as const;

export function HeroSocials() {
  return (
    <nav aria-label="Social links" className="flex items-center gap-[36px] md:gap-[48px] px-4 md:px-0">
      {socials.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          {...(href.startsWith("mailto") || href.startsWith("#")
            ? {}
            : { target: "_blank", rel: "noopener noreferrer" })}
          className={linkClass}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
