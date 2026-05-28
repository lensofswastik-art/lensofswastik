import Image from "next/image";

/**
 * MyProjectsSection
 *
 * ── Section header ────────────────────────────────────────────────────
 *   "My Projects"               : Averia Serif Libre · Bold · 40px · -4% · #121212
 *   "Stuffs I made on weekdays" : Geist · Regular · 24px · -4% · #6D7379
 *
 * ── Project entry layout ──────────────────────────────────────────────
 *   [Card]                 ← full-width · H 762px desktop / 280px mobile
 *     image (object-contain · object-center — centred on all breakpoints)
 *   [Title below card]     ← Averia Serif Libre · Bold · 32px · -4% · #121212
 *
 * ── Card ──────────────────────────────────────────────────────────────
 *   W : fill · H : 762px · Border-radius : 20px · Fill : #EFF0F0
 *   Clip content : enabled
 *
 * ── Section margin ────────────────────────────────────────────────────
 *   Desktop : px-[60px]   Mobile : px-5
 */

const projects = [
  {
    image: "/images/odorsensingdashboard.png",
    alt: "ODOR industrial IoT odour sensing dashboard — live sensor map, zone management and analytics",
    title: "Odor sensing dashboard for data visualization",
  },
  {
    image: "/images/kdt.png",
    alt: "KDT — concept airdrop dashboard for Kenya's first digital token",
    title: "Concept airdrop dashboard for Kenya's first digital token",
  },
  {
    image: "/images/jogito.png",
    alt: "Jogito — football themed offline gaming activity app showing multiple screens",
    title: "Football themed offline gaming activity app",
  },
  {
    image: "/images/billr.png",
    alt: "Billr — billing and invoice creation platform for freelance workers",
    title: "A billing and invoice creation platform for freelance workers",
  },
] as const;

export function MyProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full bg-[#FDFFFC] px-5 md:px-[60px] pt-[80px] pb-[120px]"
    >
      {/* ── Section header ── */}
      <header className="mb-10 md:mb-[52px]">
        <h2 className="font-averia font-bold text-[28px] md:text-[40px] leading-none tracking-[-0.04em] text-[#121212]">
          My Projects
        </h2>
        <p className="mt-2 md:mt-3 font-sans font-normal text-[18px] md:text-[24px] leading-none tracking-[-0.04em] text-[#6D7379]">
          Stuffs I made on weekdays
        </p>
      </header>

      {/* ── Project entries (stacked) ── */}
      <div className="flex flex-col gap-[40px] md:gap-[60px]">
        {projects.map((project) => (
          <div key={project.title}>
            {/* Card */}
            <article className="relative overflow-hidden rounded-[20px] bg-[#EFF0F0] w-full h-[280px] md:h-[762px]">
              {/*
                Image is inset so the #EFF0F0 background shows as a frame.
                object-contain + object-center keeps the full screenshot
                visible and centred on every screen size.
              */}
              <div className="absolute inset-4 md:inset-10">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) calc(100vw - 40px), calc(100vw - 120px)"
                />
              </div>
            </article>

            {/* Title below card */}
            <p className="mt-4 md:mt-6 font-averia font-bold text-[20px] md:text-[32px] leading-none tracking-[-0.04em] text-[#121212]">
              {project.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
