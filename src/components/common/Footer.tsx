const LINK_CLASS =
  "font-sans font-normal text-[16px] md:text-[18px] leading-none tracking-[-0.03em] text-[#121212] hover:opacity-50 transition-opacity duration-200";

export function Footer() {
  return (
    <footer className="w-full bg-[#FDFFFC] overflow-hidden">

      {/* ── Social links ── spread edge-to-edge */}
      <div className="flex items-center justify-between px-5 md:px-[60px] pt-[40px] md:pt-[52px]">
        <a href="https://linkedin.com/in/swastikbose" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          LinkedIn
        </a>
        <a href="https://x.com/lensofswastik" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          X (formerly Twitter)
        </a>
        <a href="https://instagram.com/lensofswastik" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          Instagram
        </a>
        <a href="mailto:lensofswastik@gmail.com" className={LINK_CLASS}>
          Email
        </a>
      </div>

      {/* ── Giant brand wordmark — spans full screen, no overflow */}
      <div className="w-full overflow-hidden mt-2 md:mt-3">
        <p
          className="font-averia font-bold whitespace-nowrap text-center select-none pointer-events-none"
          style={{
            fontSize: "clamp(60px, 16.7vw, 240px)",
            lineHeight: 1.2,
            letterSpacing: "-0.04em",
            color: "rgba(18, 18, 18, 0.13)",
          }}
          aria-hidden="true"
        >
          lensofswastik
        </p>
      </div>

      {/* ── Copyright ── */}
      <div className="text-center pt-3 pb-6 md:pb-8">
        <p className="font-sans font-normal text-[13px] md:text-[15px] leading-none tracking-[-0.03em] text-[#121212]">
          @2026 all rights reserved
        </p>
      </div>

    </footer>
  );
}
