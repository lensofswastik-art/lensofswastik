import Image from "next/image";

/**
 * PlaygroundSection
 *
 * ── Section header ────────────────────────────────────────────────────
 *   "Playground"              : Averia Serif Libre · Bold · 40px · -4% · #121212
 *   "Stuffs I made on weekends" : Geist · Regular · 24px · -4% · #6D7379
 *
 * ── Cards ─────────────────────────────────────────────────────────────
 *   Grid : 2 col tablet/desktop · 1 col mobile
 *   Image cards  : aspect-square · padding 46px · bg #EFF0F0 · dark text
 *   Video card   : full-bleed video · spans 2 cols desktop · light overlay text
 *
 * ── Section margin ────────────────────────────────────────────────────
 *   Desktop : px-[60px]   Mobile : px-5
 */

/* ─── shared text classes ─────────────────────────────────────────────── */
const cardTitle = "font-averia font-bold text-[22px] md:text-[32px] leading-none tracking-[-0.04em]";
const cardSubtext = "mt-2 font-sans font-medium text-[16px] md:text-[24px] leading-none tracking-[-0.03em]";

/* ─── Image card ─────────────────────────────────────────────────────── */
interface ImageCardProps {
  image: string;
  imageAlt: string;
  title: string;
  madeIn: string;
  madeInHref: string;
}

function ImageCard({ image, imageAlt, title, madeIn, madeInHref }: ImageCardProps) {
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
          <h3 className={`${cardTitle} text-[#121212]`}>{title}</h3>
          <p className={`${cardSubtext} text-[#6D7379]`}>
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

/* ─── Video card ─────────────────────────────────────────────────────── */
interface VideoCardProps {
  video: string;
  title: string;
  subtitle: React.ReactNode;
  /** Card background colour for the text section. Default: #EFF0F0 (light). */
  cardBg?: string;
  /** Title text colour. Default: #121212 (dark). */
  titleColor?: string;
  /**
   * fullCover — video fills the entire card height.
   * Text is overlaid at the bottom with no background box, so the
   * subject centred in the video also sits at the card's visual centre.
   */
  fullCover?: boolean;
}

function VideoCard({
  video,
  title,
  subtitle,
  cardBg = "#EFF0F0",
  titleColor = "#121212",
  fullCover = false,
}: VideoCardProps) {
  if (fullCover) {
    return (
      /* Video fills the entire card — subject centred in video = centred in card */
      <article className="relative overflow-hidden rounded-[20px] aspect-square">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video} type="video/mp4" />
          <source src={video} type="video/quicktime" />
        </video>

        {/* Text overlaid at bottom — no bg box, text colour already readable on dark video */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-[46px]">
          <h3 className={cardTitle} style={{ color: titleColor }}>{title}</h3>
          <p className={`${cardSubtext} text-[#6D7379]`}>{subtitle}</p>
        </div>
      </article>
    );
  }

  return (
    <article
      className="relative overflow-hidden rounded-[20px] aspect-square"
      style={{ backgroundColor: cardBg }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={video} type="video/mp4" />
        <source src={video} type="video/quicktime" />
      </video>

      {/* Text pinned to bottom — same position as fullCover and ImageCard */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-[46px]">
        <h3 className={cardTitle} style={{ color: titleColor }}>{title}</h3>
        {subtitle && <p className={`${cardSubtext} text-[#6D7379]`}>{subtitle}</p>}
      </div>
    </article>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */
export function PlaygroundSection() {
  return (
    <section
      id="playground"
      className="w-full bg-[#FDFFFC] px-5 md:px-[60px] pt-[80px] pb-[120px]"
    >
      {/* Section header */}
      <header className="mb-10 md:mb-[52px]">
        <h2 className="font-averia font-bold text-[28px] md:text-[40px] leading-none tracking-[-0.04em] text-[#121212]">
          Playground
        </h2>
        <p className="mt-2 md:mt-3 font-sans font-normal text-[18px] md:text-[24px] leading-none tracking-[-0.04em] text-[#6D7379]">
          Stuffs I made on weekends
        </p>
      </header>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[40px]">
        <ImageCard
          image="/images/pouch.png"
          imageAlt="3D leather crypto wallet with floating Ethereum, Litecoin, Tether and Binance coins"
          title="Crypto wallet visualization"
          madeIn="Figma"
          madeInHref="https://www.figma.com/design/4SDvAvM5xSVVFnq1qgk0rE/Crypto-Pouch?node-id=0-1&t=8Y6VMJzJbJ1X64WM-1"
        />
        <ImageCard
          image="/images/legomonalisa.png"
          imageAlt="Mona Lisa portrait pixelated into LEGO blocks"
          title="Monalisa in LEGO blocks"
          madeIn="Figma"
          madeInHref="https://www.figma.com/design/NQ2IrPwOqWpr4TVe9ffn0a/Lego-Monalisa?node-id=0-1&t=fxHrg4oR0QzB8ybw-1"
        />
        <VideoCard
          video="/videos/folderinterraction.mov"
          title="Folder interraction"
          subtitle=""
        />
        <VideoCard
          video="/videos/billr.mp4"
          title="Logo Animation"
          fullCover
          titleColor="#FDFFFC"
          subtitle=""
        />
      </div>
    </section>
  );
}
