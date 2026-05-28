# CLAUDE.md — Portfolio Website

> Project-specific operating manual for Swastik Bose's personal design portfolio, built in Next.js. Every agent, command, and skill in this project defers to this file.

---

## Project Overview

**What it is:** A personal portfolio website for Swastik Bose — Senior Product Designer, Design Engineer, Vibe Designer. Built to attract high-quality clients, showcase design depth, and express a distinct personal brand.

**Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS v3, Framer Motion v11, shadcn/ui (selective use)

**Design source:** Figma (primary). All screens designed by Swastik. Convert with zero deviation — never interpret, never "improve" unless explicitly asked.

**Deployment target:** Vercel

---

## Critical Rules

1. **Figma is the source of truth.** If Swastik shares a screen, that is the spec. Do not redesign. Do not simplify. Do not "clean it up." Build what's there.

2. **Pixel-perfect means pixel-perfect.** Spacing, font sizes, weights, line heights, letter spacing, border radii — all exact. Use Inspect panel values directly.

3. **Animations are not optional.** Every transition, hover state, scroll behavior, and page entrance is part of the design. Use Framer Motion. Don't skip them.

4. **Dark-first.** Swastik's aesthetic is dark UI with bold accent colors. Default assumptions: dark backgrounds, high-contrast text, accent in green / teal / purple depending on section.

5. **Performance is not negotiable.** No layout shift. No FOUC. Images use `next/image`. Fonts use `next/font`. Lazy load below the fold.

6. **Never generate placeholder content.** Only use real copy Swastik provides. No Lorem Ipsum anywhere.

7. **TypeScript strict mode.** No `any`. Proper types for every prop, event, and API shape.

---

## Tech Stack Reference

```
Framework:     Next.js 14+ (App Router)
Language:      TypeScript (strict)
Styling:       Tailwind CSS v3 + CSS custom properties for design tokens
Animation:     Framer Motion v11
Components:    shadcn/ui (as base layer, always customized to match Figma)
Icons:         Lucide React (default) or custom SVGs from Figma
Fonts:         next/font (Google Fonts or local — confirm from Figma)
Images:        next/image
Deployment:    Vercel
```

---

## File Structure

```
/app
  layout.tsx            ← Root layout, fonts, global providers
  page.tsx              ← Homepage
  /work
    page.tsx            ← Case studies index
    /[slug]
      page.tsx          ← Individual case study
  /about
    page.tsx
  /contact
    page.tsx

/components
  /ui                   ← shadcn/ui base + Swastik overrides
  /sections             ← Page sections (Hero, Work, About, Contact)
  /common               ← Shared (Nav, Footer, Cursor, etc.)
  /animations           ← Reusable Framer Motion variants and wrappers

/lib
  /utils                ← cn(), formatters, helpers
  /data                 ← Static data (projects, work items)
  /types                ← Shared TypeScript types

/styles
  globals.css           ← Tailwind directives + CSS custom properties
  tokens.css            ← Design tokens (colors, spacing, typography)

/public
  /images
  /fonts (if local)
```

---

## Design System Tokens

Tokens live in `/styles/tokens.css` as CSS custom properties. Tailwind extends them via `tailwind.config.ts`. Never hardcode hex values in components — always reference tokens.

### Color Token Naming

```css
--color-bg-primary       /* main dark background */
--color-bg-secondary     /* elevated surface */
--color-bg-tertiary      /* card/panel surfaces */

--color-text-primary     /* primary readable text */
--color-text-secondary   /* secondary/muted */
--color-text-disabled    /* placeholder/disabled */

--color-accent-1         /* primary accent (green or teal) */
--color-accent-2         /* secondary accent */
--color-accent-hover     /* hover state of accent */

--color-border           /* default border */
--color-border-subtle    /* subtle dividers */
```

> Actual hex values come from Figma. When starting a new section, read the Figma color styles first and populate tokens before building any components.

### Typography Token Naming

```css
--font-display           /* heading font family */
--font-body              /* body font family */
--font-mono              /* monospace for labels/code */

/* Scale — match Figma text style names exactly */
--text-hero
--text-h1  --text-h2  --text-h3  --text-h4
--text-body-lg  --text-body  --text-body-sm
--text-caption  --text-label
```

---

## Figma-to-Code Workflow

Follow this exact sequence when converting a Figma screen. Do not skip steps.

### Step 1 — Screen Audit
Before writing code:
- [ ] List all layers and map layer names to component names
- [ ] Identify all text styles → map to token names
- [ ] Identify all color styles → map to token names
- [ ] List all spacing values → confirm against Tailwind 4px scale
- [ ] List all interactive states (hover, active, focus, disabled)
- [ ] Note all animation cues (from Prototype tab or Figma comments)
- [ ] List all breakpoint variants shown
- [ ] List all assets needed (SVGs, images) — extract before coding

### Step 2 — Token Layer
Update `tokens.css` with any new values. Update `tailwind.config.ts`. Do not write component code until tokens exist.

### Step 3 — Structure First, Style Second
Write semantic HTML structure. Get component hierarchy right. Then add Tailwind classes. Then add Framer Motion. In that order.

### Step 4 — Animations
After structure and style are confirmed correct, layer in Framer Motion. Check `/components/animations/` for existing variants first.

### Step 5 — Responsive Pass
Mobile-first. Verify breakpoints: sm (640) / md (768) / lg (1024) / xl (1280) / 2xl (1536).

### Step 6 — Pixel-Perfect QA
Run the checklist in `.claude/skills/pixel-perfect.md` before marking done.

---

## Animation Principles

- **Page entrances:** Fade in + translate from below (y: 20→0). Stagger children 0.05–0.1s.
- **Scroll-triggered:** `whileInView` with `once: true`. Viewport threshold: 0.15.
- **Hover states:** Scale 1.0→1.02 on interactive cards. Duration 0.2s ease-out.
- **Custom cursor:** If in design, implement via `mousemove` + Framer Motion `useSpring` for lag.
- **Page transitions:** `AnimatePresence` at root. Crossfade or slide per Figma prototype.
- **Easing:** `[0.22, 1, 0.36, 1]` (expo out) for entrances. `ease-out` for micro-interactions.
- **Duration guide:** Micro (hover/click): 150–200ms. Component entrance: 400–600ms. Page transition: 600–800ms.

---

## Component Pattern

```tsx
// Types at top. Variants outside component. Named function export.

interface ComponentProps {
  // no 'any'
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export function ComponentName({ prop }: ComponentProps) {
  // ...
}
```

---

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Components | PascalCase | `ProjectCard.tsx` |
| Pages | lowercase | `page.tsx` |
| Hooks | camelCase + use prefix | `useScrollProgress.ts` |
| Utils | camelCase | `formatDate.ts` |
| CSS tokens | kebab-case with prefix | `--color-accent-1` |
| Tailwind extends | camelCase | `accent1: 'var(--color-accent-1)'` |
| Animation variants | camelCase | `fadeInUp`, `staggerChildren` |
| Data files | kebab-case | `project-data.ts` |

---

## What NOT to Do

- Never hardcode hex values — use tokens.
- Never use inline `style={{ color: '#hex' }}` — use Tailwind or CSS classes.
- Never wrap everything in a `div` — use semantic HTML (`section`, `article`, `nav`, `main`, `aside`, `header`, `footer`).
- Never skip `alt` text on images.
- Never add `console.log` to production code.
- Never use `useEffect` for state that could be derived.
- Never apply both CSS transitions AND Framer Motion to the same element.
- Never use `any` TypeScript type.
- Never create placeholder copy — leave a clearly marked `TODO` instead.

---

## Swastik's Design Fingerprint

- **Dark themes are default.** 4 of 5 portfolio pieces use dark UI.
- **Bold accents.** Green (Jogito, GetSmart), Cyan/Teal (Salon app), Purple (ODOR) — always high-contrast on dark.
- **Typography-forward.** Uppercase bold headings, strong hierarchy, text carries the design.
- **3D + illustration integration.** 3D assets alongside UI — treat as first-class design elements.
- **Immersive but structured.** High visual energy without sacrificing usability.
- **Range.** Gamification, EdTech, IoT, Web3 — the portfolio must reflect genuine versatility.

---

## Reference Files

| File | Location | Purpose |
|------|----------|---------|
| About context | `../context/about-me.md` | Who Swastik is, design DNA |
| Brand voice | `../context/brand-voice.md` | How Swastik communicates |
| Writing guardrails | `../context/ai-writing-guardrails.md` | AI slop detection for any copy |
| Design system | `.claude/skills/design-system.md` | Token patterns + Tailwind setup |
| Animation | `.claude/skills/animation.md` | Framer Motion patterns |
| Figma-to-code | `.claude/skills/figma-to-code.md` | Full conversion methodology |
| Pixel-perfect QA | `.claude/skills/pixel-perfect.md` | Pre-completion checklist |
| Next.js patterns | `.claude/skills/nextjs-patterns.md` | App Router conventions |
| Component architecture | `.claude/skills/component-architecture.md` | Component structure patterns |
