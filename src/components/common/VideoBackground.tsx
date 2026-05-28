"use client";

import { useRef } from "react";

interface VideoBackgroundProps {
  /**
   * Path to the video file (relative to /public).
   * E.g. "/videos/mp_.mp4"
   */
  src: string;

  /**
   * Zoom scale applied to the video via CSS transform.
   *
   * Why this is needed: the source video is 16:9 with black pillarbox bars
   * baked in on the left and right edges. Because the bars are part of the
   * video frame (not a container mismatch), `object-fit: cover` alone does
   * not crop them — the scale zoom is required to push them off-screen.
   *
   * A value of 1.15 (15 % zoom) hides ~7.5 % on each side (bars) and
   * ~11 % from the bottom (both watermarks) while keeping the subject
   * fully visible in the centre.
   *
   * Default: 1.15 — adjust up to 1.2 if bars/watermarks are still visible.
   */
  scale?: number;

  /**
   * CSS transform-origin for the scale.
   *
   * "center 25%" anchors the zoom to the upper quarter of the frame, so the
   * scale "spills" more downward (hiding the bottom watermarks) than upward.
   *
   * If the top of the video content is being cut off, move this toward
   * "center 40%" or "center 50%".
   */
  transformOrigin?: string;

  /** Optional extra className on the outer wrapper */
  className?: string;
}

/**
 * VideoBackground
 *
 * Renders a muted, looping, auto-playing video that fills its parent
 * container completely with NO black bars, NO stretching, and NO visible
 * watermarks.
 *
 * How the clipping works
 * ──────────────────────
 * 1. `object-fit: cover` — scales the video to fill the container while
 *    preserving aspect ratio (handles non-16:9 containers on tablet/mobile).
 *
 * 2. `transform: scale(1.15)` — zooms in a further 15%, pushing the baked-in
 *    black pillarbox bars off both side edges and both bottom-corner watermarks
 *    off the bottom edge simultaneously.
 *
 * 3. `transform-origin: center 25%` — anchors the zoom toward the top so the
 *    scale overflow is weighted toward the bottom, aggressively cropping the
 *    watermark area while barely touching the top of the frame.
 *
 * 4. `overflow: hidden` on the wrapper clips everything that spills outside
 *    the container bounds.
 *
 * Responsive behaviour
 * ────────────────────
 * Works on any container aspect ratio. Make the parent as tall as needed:
 *   - Full-bleed hero → parent with `h-screen`
 *   - Fixed section   → parent with `h-[600px]` or similar
 */
export function VideoBackground({
  src,
  scale = 1.15,
  transformOrigin = "center 25%",
  className = "",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * When the video ends, seek back to a tiny offset (0.1 s) instead of 0.
   * Seeking to exactly 0 forces the browser to re-decode the first keyframe,
   * which can cause a brief black flash. Seeking to 0.1 s avoids the keyframe
   * decode stall and makes the loop visually seamless.
   *
   * Note: the native `loop` attribute is kept as a fallback for browsers that
   * don't fire `onEnded` reliably — it will engage before `onEnded` in most
   * cases anyway, so the tiny-offset trick acts as a secondary safety net.
   */
  function handleEnded() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0.1;
    v.play().catch(() => {/* autoplay policy: silently ignore */});
  }

  return (
    <div
      className={`relative overflow-hidden w-full h-full ${className}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          transform: `scale(${scale})`,
          transformOrigin,
        }}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        onEnded={handleEnded}
      />
    </div>
  );
}
