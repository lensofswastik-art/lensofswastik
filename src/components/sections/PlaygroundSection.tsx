import Image from "next/image";

/**
 * PlaygroundSection
 *
 * ── Section header ────────────────────────────────────────────────────
 *   "Playground"              : Averia Serif Libre · Bold · 40px · -4% · #121212
 *   "Stuffs I made on weekends" : Geist · Regular · 24px · -4% · #6D7379
 *
 * ── Cards ─────────────────────────────────────────────────────────────
 *   Grid    : 2 col (tablet/desktop) · 1 col stacked (mobile)
 *   Size    : 640×640px (aspect-square, responsive)
 *   Radius  : 20px
 *   Padding : 46px
 *   Fill    : #F8F9FA
 *
 *   Card title   : Averia Serif Libre · Bold · 32px · -4% · #121212
 *   Card subtitle: Geist · Medium · 24px · -3% · "made in [Figma ↗]"
 *
 * ── Section margin ────────────────────────────────────────────────────
 *   Desktop : px-[60px]
 *   Mobile  : px-5
 */

const cards = [
  {
    image: "/images/pouch.png",
    imageAlt: "3D leather crypto wallet with floating Ethereum, Litecoin, Tether and Binance coins",
    title: "Crypto wallet visualization",
    madeIn: "Figma",
    madeInHref: "https://figma.com",
  },
  {
    image: "/images/legomonalisa.png",
    imageAlt: "Mona Lisa portrait pixelated into LEGO blocks",
    title: "Monalisa in LEGO blocks",
    madeIn: "Figma",
    madeInHref: "https://figma.com",
  },
] as const;

function PlaygroundCard({
  image,
  imageAlt,
  title,
  madeIn,
  madeInHref,
}: (typeof cards)[number]) {
  return (
    <article className="relative overflow-hidden rounded-[20px] bg-[#EFF0F0] aspect-square">
      <div className="absolute inset-0 flex flex-col p-5 md:p-[46px]">
        {/* Image — fills the upper flexible area */}
        <div className="relative flex-1 min-h-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Text — pinned to bottom */}
        <div className="shrink-0 pt-4 md:pt-8">
          <h3
            className="
              font-averia font-bold
              text-[22px] md:text-[32px]
              leading-none tracking-[-0.04em]
              text-[#121212]
            "
          >
            {title}
          </h3>
          <p
            className="
              mt-2
              font-sans font-medium
              text-[16px] md:text-[24px]
              leading-none tracking-[-0.03em]
              text-[#6D7379]
            "
          >
            made in{" "}
            <a
              href={madeInHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1B6FEB] hover:underline underline-offset-2"
            >
              {madeIn}
            </a>
          </p>
        </div>
      </div>
    </article>
  );
}

export function PlaygroundSection() {
  return (
    <section
      id="playground"
      className="w-full bg-[#FDFFFC] px-5 md:px-[60px] pt-[80px] pb-[120px]"
    >
      {/* ── Section header ── */}
      <header className="mb-10 md:mb-[52px]">
        <h2
          className="
            font-averia font-bold
            text-[28px] md:text-[40px]
            leading-none tracking-[-0.04em]
            text-[#121212]
          "
        >
          Playground
        </h2>
        <p
          className="
            mt-2 md:mt-3
            font-sans font-normal
            text-[18px] md:text-[24px]
            leading-none tracking-[-0.04em]
            text-[#6D7379]
          "
        >
          Stuffs I made on weekends
        </p>
      </header>

      {/* ── Cards grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[40px]">
        {cards.map((card) => (
          <PlaygroundCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
