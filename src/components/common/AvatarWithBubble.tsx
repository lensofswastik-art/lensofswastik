"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Why opacity + y instead of scale ───────────────────────────────
 * Animating scale: 0→1 creates the backdrop-blur visual bug: at scale 0
 * the element has no pixel surface, so the browser cannot pre-compute
 * backdrop-filter. As scale grows the blur is calculated per-frame,
 * producing the "styles gradually loading" artefact.
 *
 * Fix: keep the element at full size (scale never changes). Animate only
 * opacity (0→1) and a small y offset (8→0). The browser always has a
 * full-size surface to compute backdrop-filter on, so blur is instant.
 * ──────────────────────────────────────────────────────────────────── */

/* ─── Redirect arrow icon ─────────────────────────────────────────── */
function RedirectIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M14.3538 6.85378L11.3538 9.85378C11.2599 9.9476 11.1327 10.0003 11 10.0003C10.8673 10.0003 10.7401 9.9476 10.6462 9.85378C10.5524 9.75996 10.4997 9.63272 10.4997 9.50003C10.4997 9.36735 10.5524 9.2401 10.6462 9.14628L12.7931 7.00003H8C6.54182 7.00169 5.14383 7.58168 4.11274 8.61277C3.08165 9.64387 2.50165 11.0419 2.5 12.5C2.5 12.6326 2.44732 12.7598 2.35355 12.8536C2.25979 12.9474 2.13261 13 2 13C1.86739 13 1.74021 12.9474 1.64645 12.8536C1.55268 12.7598 1.5 12.6326 1.5 12.5C1.50182 10.7767 2.18722 9.12444 3.40582 7.90585C4.62441 6.68726 6.27665 6.00185 8 6.00003H12.7931L10.6462 3.85378C10.5998 3.80733 10.5629 3.75218 10.5378 3.69148C10.5127 3.63079 10.4997 3.56573 10.4997 3.50003C10.4997 3.43434 10.5127 3.36928 10.5378 3.30859C10.5629 3.24789 10.5998 3.19274 10.6462 3.14628C10.7401 3.05246 10.8673 2.99976 11 2.99976C11.0657 2.99976 11.1308 3.0127 11.1914 3.03784C11.2521 3.06298 11.3073 3.09983 11.3538 3.14628L14.3538 6.14628C14.4002 6.19272 14.4371 6.24786 14.4623 6.30856C14.4874 6.36926 14.5004 6.43433 14.5004 6.50003C14.5004 6.56574 14.4874 6.6308 14.4623 6.6915C14.4371 6.7522 14.4002 6.80735 14.3538 6.85378Z"
        fill="#FDFFFC"
      />
    </svg>
  );
}

/* ─── Bubble SVG shape ────────────────────────────────────────────── */
function BubbleShape() {
  return (
    <svg
      width="175"
      height="62"
      viewBox="0 0 167 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
    >
      <foreignObject x="-50" y="-50" width="266.167" height="158.052">
        <div
          // @ts-expect-error — xmlns attr required inside SVG foreignObject
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            clipPath: "url(#bgblur_clip)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <g>
        <mask id="bubble-stroke-mask" fill="white">
          <path d="M11.667 46.0518C14.9806 46.0518 17.6669 48.7382 17.667 52.0518C17.667 55.3655 14.9807 58.0518 11.667 58.0518C8.35328 58.0518 5.66699 55.3655 5.66699 52.0518C5.66712 48.7382 8.35337 46.0518 11.667 46.0518ZM148.543 0C158.276 0 166.167 7.89063 166.167 17.624C166.167 27.3573 158.276 35.248 148.543 35.248H38.5293C38.5311 35.3272 38.5352 35.4067 38.5352 35.4863C38.5351 41.2488 33.864 45.9197 28.1016 45.9199C22.339 45.9199 17.6671 41.2489 17.667 35.4863C17.667 35.4067 17.6711 35.3272 17.6729 35.248H17.624C7.89076 35.248 8.65913e-05 27.3573 0 17.624C0 7.89068 7.8907 8.06943e-05 17.624 0H148.543Z" />
        </mask>
        {/* Fill — #FDFFFC 8% */}
        <path
          d="M11.667 46.0518C14.9806 46.0518 17.6669 48.7382 17.667 52.0518C17.667 55.3655 14.9807 58.0518 11.667 58.0518C8.35328 58.0518 5.66699 55.3655 5.66699 52.0518C5.66712 48.7382 8.35337 46.0518 11.667 46.0518ZM148.543 0C158.276 0 166.167 7.89063 166.167 17.624C166.167 27.3573 158.276 35.248 148.543 35.248H38.5293C38.5311 35.3272 38.5352 35.4067 38.5352 35.4863C38.5351 41.2488 33.864 45.9197 28.1016 45.9199C22.339 45.9199 17.6671 41.2489 17.667 35.4863C17.667 35.4067 17.6711 35.3272 17.6729 35.248H17.624C7.89076 35.248 8.65913e-05 27.3573 0 17.624C0 7.89068 7.8907 8.06943e-05 17.624 0H148.543Z"
          fill="#FDFFFC"
          fillOpacity="0.14"
        />
        {/* Stroke — #FDFFFC 9% inside 1px */}
        <path
          d="M17.667 52.0518H18.667V52.0517L17.667 52.0518ZM5.66699 52.0518L4.66699 52.0517V52.0518H5.66699ZM166.167 17.624L167.167 17.624V17.624H166.167ZM38.5293 35.248V34.248H37.5066L37.5295 35.2704L38.5293 35.248ZM38.5352 35.4863L39.5352 35.4863V35.4863H38.5352ZM28.1016 45.9199V46.9199H28.1016L28.1016 45.9199ZM17.667 35.4863H16.667V35.4863L17.667 35.4863ZM17.6729 35.248L18.6726 35.2704L18.6955 34.248H17.6729V35.248ZM17.624 35.248L17.624 36.248H17.624V35.248ZM0 17.624H-1V17.624L0 17.624ZM17.624 0V-1H17.624L17.624 0ZM11.667 46.0518V47.0518C14.4283 47.0518 16.6669 49.2904 16.667 52.0518L17.667 52.0518L18.667 52.0517C18.6668 48.1859 15.5329 45.0518 11.667 45.0518V46.0518ZM17.667 52.0518H16.667C16.667 54.8132 14.4284 57.0518 11.667 57.0518V58.0518V59.0518C15.533 59.0518 18.667 55.9178 18.667 52.0518H17.667ZM11.667 58.0518V57.0518C8.90557 57.0518 6.66699 54.8132 6.66699 52.0518H5.66699H4.66699C4.66699 55.9178 7.801 59.0518 11.667 59.0518V58.0518ZM5.66699 52.0518L6.66699 52.0518C6.6671 49.2904 8.90569 47.0518 11.667 47.0518V46.0518V45.0518C7.80104 45.0518 4.66715 48.1859 4.66699 52.0517L5.66699 52.0518ZM148.543 0V1C157.724 1 165.167 8.44292 165.167 17.624H166.167H167.167C167.167 7.33835 158.829 -1 148.543 -1V0ZM166.167 17.624L165.167 17.624C165.167 26.8051 157.724 34.248 148.543 34.248V35.248V36.248C158.829 36.248 167.167 27.9096 167.167 17.624L166.167 17.624ZM148.543 35.248V34.248H38.5293V35.248V36.248H148.543V35.248ZM38.5293 35.248L37.5295 35.2704C37.5323 35.393 37.5352 35.4169 37.5352 35.4863H38.5352H39.5352C39.5352 35.3965 39.5299 35.2615 39.529 35.2257L38.5293 35.248ZM38.5352 35.4863L37.5352 35.4863C37.5351 40.6965 33.3117 44.9197 28.1015 44.9199L28.1016 45.9199L28.1016 46.9199C34.4163 46.9197 39.5351 41.8011 39.5352 35.4863L38.5352 35.4863ZM28.1016 45.9199V44.9199C22.8911 44.9199 18.6671 40.6965 18.667 35.4863L17.667 35.4863L16.667 35.4863C16.6671 41.8013 21.7868 46.9199 28.1016 46.9199V45.9199ZM17.667 35.4863H18.667C18.667 35.4169 18.6699 35.393 18.6726 35.2704L17.6729 35.248L16.6731 35.2257C16.6723 35.2615 16.667 35.3965 16.667 35.4863H17.667ZM17.6729 35.248V34.248H17.624V35.248V36.248H17.6729V35.248ZM17.624 35.248L17.624 34.248C8.44305 34.248 1.00008 26.805 1 17.624L0 17.624L-1 17.624C-0.999909 27.9096 7.33848 36.2479 17.624 36.248L17.624 35.248ZM0 17.624H1C1 8.44297 8.44298 1.00008 17.624 1L17.624 0L17.624 -1C7.33842 -0.999915 -1 7.33839 -1 17.624H0ZM17.624 0V1H148.543V0V-1H17.624V0Z"
          fill="#FDFFFC"
          fillOpacity="0.09"
          mask="url(#bubble-stroke-mask)"
        />
      </g>
      <defs>
        <clipPath id="bgblur_clip" transform="translate(50 50)">
          <path d="M11.667 46.0518C14.9806 46.0518 17.6669 48.7382 17.667 52.0518C17.667 55.3655 14.9807 58.0518 11.667 58.0518C8.35328 58.0518 5.66699 55.3655 5.66699 52.0518C5.66712 48.7382 8.35337 46.0518 11.667 46.0518ZM148.543 0C158.276 0 166.167 7.89063 166.167 17.624C166.167 27.3573 158.276 35.248 148.543 35.248H38.5293C38.5311 35.3272 38.5352 35.4067 38.5352 35.4863C38.5351 41.2488 33.864 45.9197 28.1016 45.9199C22.339 45.9199 17.6671 41.2489 17.667 35.4863C17.667 35.4067 17.6711 35.3272 17.6729 35.248H17.624C7.89076 35.248 8.65913e-05 27.3573 0 17.624C0 7.89068 7.8907 8.06943e-05 17.624 0H148.543Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ─── AvatarWithBubble ────────────────────────────────────────────── */
/*
 * Owns three things:
 *   1. The avatar image (with hover detection)
 *   2. The chat bubble (visual + text)
 *   3. Shared `show` state driven by either the timer OR hover
 *
 * Auto-cycle:
 *   1.5 s delay → appear → 6 s dwell → disappear → 3 s pause → repeat
 *   Hover overrides: bubble stays while cursor is on the avatar.
 *
 * Bubble position:
 *   left: 6px  → tail (x≈12 from SVG left) sits above avatar centre (x=18)
 *   bottom: calc(100% + 10px) → 10 px above the avatar
 */
export function AvatarWithBubble() {
  const [timerShow, setTimerShow] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Derived: bubble visible when either timer fires OR cursor is on avatar
  const show = timerShow || hovered;

  // Timer refs so we can safely clear across re-renders
  const showRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cycle = useCallback((delay: number) => {
    showRef.current = setTimeout(() => {
      setTimerShow(true);
      hideRef.current = setTimeout(() => {
        setTimerShow(false);
        cycle(3000); // pause between appearances
      }, 6000); // dwell: 6 s
    }, delay);
  }, []);

  useEffect(() => {
    cycle(1500); // first appearance after 1.5 s
    return () => {
      if (showRef.current) clearTimeout(showRef.current);
      if (hideRef.current) clearTimeout(hideRef.current);
    };
  }, [cycle]);

  return (
    /* relative so the absolute bubble anchors here */
    <div
      className="relative shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Avatar ── */}
      <Image
        src="/images/swastik.png"
        alt="Swastik Bose"
        width={36}
        height={36}
        className="rounded-full select-none cursor-pointer"
        style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.80)" }}
        priority
      />

      {/* ── Chat bubble ── */}
      {/*
        Position: left:6 aligns the tail (SVG x≈12) above the avatar centre.
        The bubble extends 125 px to the right of the avatar — fine at desktop.
        Tweak `left` if the tail drifts: more → shifts right, less → shifts left.
      */}
      <AnimatePresence>
        {show && (
          <motion.div
            className="absolute w-[175px] h-[62px] pointer-events-none"
            style={{ bottom: "calc(100% + 10px)", left: "3px" }}
            /*
             * Enter: fade up (opacity + y). NO scale.
             * The element is always full-size so backdrop-filter is
             * pre-computed — blur appears instantly, no gradual-load bug.
             */
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            /*
             * Exit: fade up slightly.
             */
            exit={{
              opacity: 0,
              y: -5,
              transition: { duration: 0.22, ease: "easeOut" },
            }}
          >
            {/* SVG shape: fill + stroke + backdrop blur */}
            <BubbleShape />

            {/* Text centred in the pill body (top 35.248 px of the 59 px SVG) */}
            <div
              className="absolute left-0 right-0 top-0 flex items-center justify-center gap-[6px]"
              style={{ height: "37px" }}
            >
              <span className="font-sans font-normal text-[20px] leading-none tracking-[-0.04em] text-[#FDFFFC] whitespace-nowrap select-none">
                See my story
              </span>
              <RedirectIcon />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
