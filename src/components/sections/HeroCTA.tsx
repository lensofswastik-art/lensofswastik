"use client";

/**
 * HeroCTA
 *
 * Two side-by-side CTA buttons:
 *   [View my works ↓]   [Download CV ↓]
 *
 * ── "View my works" ───────────────────────────────────────────────────
 *   Fill        : #121212 · 100%
 *   Inner shadow 1 : X 0 · Y -1 · Blur 1 · Spread 0 · #FDFFFC 12%
 *   Inner shadow 2 : X 0 · Y  1 · Blur 1 · Spread 0 · #FDFFFC 12%
 *   Drop shadow    : X 0 · Y 20 · Blur 50 · Spread 0 · #000000 50%
 *   Arrow icon     : gentle infinite y-float animation (0 → 4px → 0)
 *
 * ── "Download CV" ─────────────────────────────────────────────────────
 *   Fill        : #FDFFFC · 7%  (translucent frosted glass)
 *   Bg blur     : Uniform · 20px  → backdrop-filter: blur(20px)
 *   Drop shadow : X 0 · Y 20 · Blur 50 · Spread 0 · #000000 50%
 *
 * ── Text (both buttons) ───────────────────────────────────────────────
 *   Font    : Averia Serif Libre · Regular · 20px · -4% tracking · #FDFFFC
 *
 * ── Icons ─────────────────────────────────────────────────────────────
 *   Size  : 20×20px · Fill #FDFFFC
 */

import { motion } from "framer-motion";

const VIEW_WORKS_SHADOW = [
  "inset 0 -1px 1px rgba(253,255,252,0.12)", // inner rim — bottom
  "inset 0  1px 1px rgba(253,255,252,0.12)", // inner rim — top
  "0 20px 50px rgba(0,0,0,0.50)",            // drop shadow
].join(", ");

const DOWNLOAD_SHADOW = "0 20px 50px rgba(0,0,0,0.50)";

/** Shared text style for both button labels */
const labelClass =
  "font-averia font-normal text-[20px] leading-none tracking-[-0.04em] text-[#FDFFFC] whitespace-nowrap select-none";

/**
 * Shared pill layout for both buttons.
 * H:50 is FIXED — must set h-[50px] explicitly.
 * W is Hug — let it size from px-5 + content naturally.
 */
const pillBase =
  "flex items-center gap-[6px] h-[50px] px-5 py-[6px] rounded-full transition-opacity duration-200 ease-out hover:opacity-80 focus-visible:outline-none focus-visible:opacity-80";

/** Downward scroll arrow — used on "View my works" */
function ScrollArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M16.0672 11.6922L10.4422 17.3172C10.3842 17.3753 10.3152 17.4214 10.2393 17.4529C10.1635 17.4843 10.0821 17.5005 10 17.5005C9.91788 17.5005 9.83655 17.4843 9.76067 17.4529C9.6848 17.4214 9.61587 17.3753 9.55782 17.3172L3.93282 11.6922C3.81555 11.5749 3.74966 11.4159 3.74966 11.25C3.74966 11.0841 3.81555 10.9251 3.93282 10.8078C4.0501 10.6905 4.20916 10.6247 4.37501 10.6247C4.54086 10.6247 4.69992 10.6905 4.8172 10.8078L9.37501 15.3664V3.125C9.37501 2.95924 9.44086 2.80027 9.55807 2.68306C9.67528 2.56585 9.83425 2.5 10 2.5C10.1658 2.5 10.3247 2.56585 10.442 2.68306C10.5592 2.80027 10.625 2.95924 10.625 3.125V15.3664L15.1828 10.8078C15.3001 10.6905 15.4592 10.6247 15.625 10.6247C15.7909 10.6247 15.9499 10.6905 16.0672 10.8078C16.1845 10.9251 16.2504 11.0841 16.2504 11.25C16.2504 11.4159 16.1845 11.5749 16.0672 11.6922Z"
        fill="#FDFFFC"
      />
    </svg>
  );
}

/** Download icon — used on "Download CV" */
function DownloadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M17.5 11.25V16.25C17.5 16.4158 17.4342 16.5747 17.3169 16.6919C17.1997 16.8092 17.0408 16.875 16.875 16.875H3.125C2.95924 16.875 2.80027 16.8092 2.68306 16.6919C2.56585 16.5747 2.5 16.4158 2.5 16.25V11.25C2.5 11.0842 2.56585 10.9253 2.68306 10.8081C2.80027 10.6908 2.95924 10.625 3.125 10.625C3.29076 10.625 3.44973 10.6908 3.56694 10.8081C3.68415 10.9253 3.75 11.0842 3.75 11.25V15.625H16.25V11.25C16.25 11.0842 16.3158 10.9253 16.4331 10.8081C16.5503 10.6908 16.7092 10.625 16.875 10.625C17.0408 10.625 17.1997 10.6908 17.3169 10.8081C17.4342 10.9253 17.5 11.0842 17.5 11.25ZM9.55781 11.6922C9.61586 11.7503 9.68479 11.7964 9.76066 11.8279C9.83654 11.8593 9.91787 11.8755 10 11.8755C10.0821 11.8755 10.1635 11.8593 10.2393 11.8279C10.3152 11.7964 10.3841 11.7503 10.4422 11.6922L13.5672 8.56719C13.6253 8.50912 13.6713 8.44018 13.7027 8.36431C13.7342 8.28844 13.7503 8.20712 13.7503 8.125C13.7503 8.04288 13.7342 7.96156 13.7027 7.88569C13.6713 7.80982 13.6253 7.74088 13.5672 7.68281C13.5091 7.62474 13.4402 7.57868 13.3643 7.54725C13.2884 7.51583 13.2071 7.49965 13.125 7.49965C13.0429 7.49965 12.9616 7.51583 12.8857 7.54725C12.8098 7.57868 12.7409 7.62474 12.6828 7.68281L10.625 9.74141V2.5C10.625 2.33424 10.5592 2.17527 10.4419 2.05806C10.3247 1.94085 10.1658 1.875 10 1.875C9.83424 1.875 9.67527 1.94085 9.55806 2.05806C9.44085 2.17527 9.375 2.33424 9.375 2.5V9.74141L7.31719 7.68281C7.19991 7.56554 7.04085 7.49965 6.875 7.49965C6.70915 7.49965 6.55009 7.56554 6.43281 7.68281C6.31554 7.80009 6.24965 7.95915 6.24965 8.125C6.24965 8.29085 6.31554 8.44991 6.43281 8.56719L9.55781 11.6922Z"
        fill="#FDFFFC"
      />
    </svg>
  );
}

export function HeroCTA() {
  return (
    <div className="flex items-center gap-[10px]">
      {/* ── Button 1: View my works ─────────────────────────── */}
      {/* Dark pill: #121212 + 2 inner rim shadows + drop shadow */}
      <a
        href="#projects"
        className={`${pillBase} bg-[#121212]`}
        style={{ boxShadow: VIEW_WORKS_SHADOW }}
      >
        <span className={labelClass}>View my works</span>

        {/*
          Gentle infinite float: icon nudges 4 px down then back up.
          mirror repeat keeps the motion fluid with no hard reset jump.
          Duration 1.4 s feels organic — not mechanical, not slow.
        */}
        <motion.span
          aria-hidden="true"
          className="flex items-center shrink-0"
          animate={{ y: [0, 4, 0] }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <ScrollArrowIcon />
        </motion.span>
      </a>

      {/* ── Button 2: Download CV ───────────────────────────── */}
      {/* Frosted glass: #FDFFFC 7% + backdrop-blur 20px + drop shadow */}
      <a
        href="/cv.pdf"
        download
        className={`${pillBase} bg-[rgba(253,255,252,0.07)] backdrop-blur-[20px]`}
        style={{ boxShadow: DOWNLOAD_SHADOW }}
      >
        <span className={labelClass}>Download CV</span>
        <DownloadIcon />
      </a>
    </div>
  );
}
