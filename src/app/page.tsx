import { Navbar } from "@/components/common/Navbar";
import { HeroEyebrow } from "@/components/sections/HeroEyebrow";
import { HeroHeadline } from "@/components/sections/HeroHeadline";
import { HeroSubtext } from "@/components/sections/HeroSubtext";
import { HeroCTA } from "@/components/sections/HeroCTA";
import { HeroSocials } from "@/components/sections/HeroSocials";
import { VideoBackground } from "@/components/common/VideoBackground";
import { HeroScrollBlur } from "@/components/common/HeroScrollBlur";
import { PlaygroundSection } from "@/components/sections/PlaygroundSection";

export default function Home() {
  return (
    <>
    <main className="relative w-full min-h-screen overflow-hidden bg-black" id="hero">
      {/* ── Video background ── */}
      <div className="absolute inset-0">
        <VideoBackground
          src="/videos/bg.mp4"
          scale={1.15}
          transformOrigin="center 25%"
        />
      </div>

      {/* ── Dark scrim over video ── */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* ── Navbar ── */}
      <Navbar />

      {/* Blur overlay — hidden at rest, fades in on scroll via GSAP ScrollTrigger */}
      <HeroScrollBlur />

      {/*
        ── Hero content ──────────────────────────────────────────────────
        IMPORTANT: `relative` only — no z-index.
        Adding z-index here would create an isolated stacking context,
        which traps mix-blend-mode inside it and prevents the headline's
        overlay blend from reaching the video background below.
        DOM order alone puts this above the absolute-positioned layers.
      */}
      <div className="relative flex flex-col items-center justify-center w-full min-h-screen px-6">
        {/* Eyebrow — bubble is now owned internally by AvatarWithBubble */}
        <HeroEyebrow />

        {/* 2px gap between eyebrow and headline (per Figma) */}
        <div className="mt-[2px]">
          <HeroHeadline />
        </div>

        {/* 26px gap from headline (per Figma) */}
        <div className="mt-[26px]">
          <HeroSubtext />
        </div>
        {/* TODO: confirm exact gap from subtext — using 40px until Figma spec provided */}
        <div className="mt-[40px]">
          <HeroCTA />
        </div>

        {/* Social links
            Mobile  : 120px below CTA in normal flow
            Desktop : pinned to bottom of hero viewport (absolute) so the
                      centered content group stays visually centered        */}
        <div className="mt-[120px] md:mt-0 md:absolute md:bottom-[40px] md:left-0 md:right-0 md:flex md:justify-center">
          <HeroSocials />
        </div>
      </div>
    </main>

    {/* ── Playground section ── */}
    <PlaygroundSection />
    </>
  );
}
