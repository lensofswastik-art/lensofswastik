import Image from "next/image";

export function MyStorySection() {
  return (
    <section id="my-story" className="w-full bg-[#FDFFFC] px-5 md:px-[60px] pt-[80px] pb-[120px]">
      <div>

        {/* ── Top: avatar + name/intro ── */}
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-[80px]">

          {/* Avatar — circular frame */}
          <div className="shrink-0 mx-auto md:mx-0 w-[240px] h-[240px] md:w-[380px] md:h-[380px] relative">
            <Image
              src="/images/swastikavatar.png"
              alt="Swastik Bose — illustrated portrait"
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 240px, 380px"
              priority
            />
          </div>

          {/* Name + intro */}
          <div className="flex flex-col text-center md:text-left">
            {/* "Hi! I am" */}
            <span className="font-averia font-bold text-[20px] md:text-[32px] leading-[1.2] tracking-[-0.04em] text-[#6D7379]">
              Hi! I am
            </span>

            {/* "Swastik Bose" */}
            <h2 className="mt-0 font-averia font-bold text-[56px] md:text-[96px] leading-[1.2] tracking-[-0.04em] text-black">
              Swastik Bose
            </h2>

            {/* Three intro lines */}
            <div className="mt-6 md:mt-8 flex flex-col gap-0">
              <p className="font-sans font-medium text-[18px] md:text-[32px] leading-[1.4] tracking-[-0.03em] text-[#6D7379]">
                I&apos;ve shipped products people use daily.
              </p>
              <p className="font-sans font-medium text-[18px] md:text-[32px] leading-[1.4] tracking-[-0.03em] text-[#6D7379]">
                I&apos;ve also shipped things that flopped.
              </p>
              <p className="font-sans font-medium text-[18px] md:text-[32px] leading-[1.4] tracking-[-0.03em] text-[#6D7379]">
                Both taught me everything I know about design.
              </p>
            </div>
          </div>
        </div>

        {/* ── Body paragraphs ── */}
        <div className="mt-[60px] md:mt-[80px] flex flex-col gap-[28px]">
          <p className="font-sans font-normal text-[16px] md:text-[24px] leading-[1.2] tracking-[-0.04em] text-[#6D7379]">
            The thing about AI-generated interfaces is that they&apos;re almost right. Structured, functional, technically correct. But they skip the screen where a user just arrived and doesn&apos;t know what to do. They miss the hesitation moment. They assume everyone already knows the context.
          </p>
          <p className="font-sans font-normal text-[16px] md:text-[24px] leading-[1.2] tracking-[-0.04em] text-[#6D7379]">
            That&apos;s the gap I work in.
          </p>
          <p className="font-sans font-normal text-[16px] md:text-[24px] leading-[1.2] tracking-[-0.04em] text-[#6D7379]">
            I call it{" "}
            <span className="text-[#FF4B3E] font-medium">Design Humanism</span>
            . The human layer underneath every interface, the questions AI doesn&apos;t know to ask, the friction users feel but won&apos;t put into words, the empty state nobody thought to design for.
          </p>
          <p className="font-sans font-normal text-[16px] md:text-[24px] leading-[1.2] tracking-[-0.04em] text-[#6D7379]">
            My philosophy isn&apos;t just invisible design. It&apos;s inevitable design. The moment a user lands on a screen and it feels like it couldn&apos;t have been made any other way.{" "}
            That comes from judgment calls AI doesn&apos;t make. Choosing dark when dark signals premium, not just preference. Committing to a 3D character on a paywall screen because the design should feel like the product, not just describe it. Picking the accent color that&apos;s slightly too bold, the one that almost shouldn&apos;t work, because restraint here would cost the product its personality.
          </p>
          <p className="font-sans font-normal text-[16px] md:text-[24px] leading-[1.2] tracking-[-0.04em] text-[#6D7379]">
            AI generates the correct interface. It can&apos;t decide any of that. The taste, the commitment to a visual identity, the willingness to push past what&apos;s safe, that&apos;s the human layer. That&apos;s what I bring.
          </p>
        </div>

      </div>
    </section>
  );
}
