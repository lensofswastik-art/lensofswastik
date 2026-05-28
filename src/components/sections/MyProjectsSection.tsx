import Image from "next/image";

const projects = [
  {
    image: "/images/odorsensingdashboard.png",
    alt: "ODOR — industrial IoT odour sensing dashboard with live sensor map and analytics",
    title: "Odor sensing dashboard for data visualization",
    href: "https://www.figma.com/design/M7BB5PKpEbafRYgePHuITO/Data-Visualizer-Dahboard?node-id=1-12512&t=a3Haqg01YfisTbHM-1",
  },
  {
    image: "/images/kdt.png",
    alt: "KDT — concept airdrop dashboard for Kenya's first digital token",
    title: "Concept airdrop platform for Kenya's first digital token",
    href: "https://www.figma.com/design/3dOVCeuZDrRqYGKmQj6hRg/Airdrop-Dashboard?node-id=1-19518&t=31mY6Sfld4BaoDkR-1",
  },
  {
    image: "/images/jogito.png",
    alt: "Jogito — football themed offline gaming activity app showing multiple screens",
    title: "Football themed offline gaming activity app",
    href: "https://www.figma.com/design/1nCxJBG8aD16ITiqne1b0S/JOGITO--Football-gaming-app?node-id=0-1&t=5p4dzQUZqzp4KQJy-1",
  },
  {
    image: "/images/billr.png",
    alt: "Billr — billing and invoice creation platform for freelance workers",
    title: "A billing and invoice creation platform for freelance workers",
    href: "https://www.figma.com/design/oTSl5eSrDkDJj3WJ2kt8DG/Billr?node-id=0-1&t=j0k7Uzt6n7rgoU3T-1",
  },
  {
    image: "/images/hoppe.png",
    alt: "Hoppe — coaching institute app connecting teachers, parents and students",
    title: "A coaching institute app to connect teachers, parents and students under 1 ecosystem",
    href: "https://www.figma.com/design/NkZ2zWdtXxE0XCd08JHF5E/Coaching-Institute-app--Germany-based-?node-id=1-3&t=hTqwYwJDvvQvgLcU-1",
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
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            {/* Card — full clickable area */}
            <article className="relative overflow-hidden rounded-[20px] bg-[#EFF0F0] w-full h-[280px] md:h-[762px] transition-opacity duration-300 group-hover:opacity-90">
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

            {/* Title */}
            <p className="mt-4 md:mt-6 font-averia font-bold text-[20px] md:text-[32px] leading-[1.2] tracking-[-0.04em] text-[#121212]">
              {project.title}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
