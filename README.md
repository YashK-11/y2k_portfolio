# Yash Kuber Khanna — Developer Portfolio

A scroll-driven developer portfolio built with Next.js, TypeScript, CSS Modules, GSAP + ScrollTrigger, and Lenis.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Stack

- Next.js (App Router) + TypeScript
- CSS Modules + global CSS (no Tailwind)
- GSAP + ScrollTrigger for scroll-driven interaction
- Lenis for smooth scrolling, synced to ScrollTrigger
- Lucide React for icons
- Self-hosted fonts via @fontsource (Space Grotesk, Inter, JetBrains Mono)

## Structure

- `app/` — root layout, page, global styles, metadata (SEO, sitemap, robots)
- `components/` — one folder per section (Navigation, Hero, Projects, About, Stack, Background, Contact, Footer, ScrollProgress), each with a `.tsx` and a co-located `.module.css`
- `data/` — `projects.ts` and `technologies.ts`, typed content used to render the site. Edit these files to add or update projects and stack entries.
- `lib/` — `SmoothScroll.tsx` (Lenis + GSAP ticker integration) and `animations/useReducedMotion.ts`
- `public/projects/` — placeholder abstract SVG visuals for each project; swap these for real screenshots/case-study art (same filenames, or update `data/projects.ts`)

## Content to review before shipping

- Replace the four sample projects in `data/projects.ts` with your real projects (or edit the existing four).
- Replace the placeholder SVGs in `public/projects/` with real project imagery.
- Update the GitHub/LinkedIn/email links in `components/Projects/Projects.tsx` and `components/Contact/Contact.tsx`.
- Double check the About copy and Background/education details in `components/About/About.tsx` and `components/Background/Background.tsx`.

## Motion & accessibility notes

- Every scroll interaction (hero depth, pinned project sequence, About line reveal, Contact headline) respects `prefers-reduced-motion`, falling back to fully visible static content.
- The pinned project sequence automatically switches to a static stacked layout on narrow viewports (≤900px) and under reduced motion.
- Animations use `transform`/`opacity`/`clip-path` only — no layout-thrashing properties.

## Deployment

Ready to deploy on Vercel as-is (`vercel deploy`), or connect the repo in the Vercel dashboard and point the `yashkuberkhanna.in` domain at it.
