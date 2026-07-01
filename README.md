# Done Deal — React site

A React + Vite + Tailwind port of the Done Deal marketing site (the live
`done.deals` build). All 8 pages, every animation, and the exact visual design
are preserved.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Stack

- **React 18** + **React Router 6** (`src/App.jsx` defines the routes)
- **Vite 5** build tooling
- **Tailwind CSS 3** (hybrid — see *Styling* below)
- **Lenis** for smooth scrolling

## Routes

| Path | Page |
|------|------|
| `/` | Home (`pages/Home.jsx`) |
| `/investors` | Buyer & investor network |
| `/mandates` | Mandates |
| `/faq` | FAQs |
| `/blog` | Blog index |
| `/blog/:slug` | Blog post |
| `/legal` | Legal |
| `/contact` | Contact |

## Structure

```
src/
  components/   Home sections (Hero, Process, DealMakers, …) + Nav, Footer, ImageSlot
  hooks/        Scroll/animation logic, one concern per hook
  lib/          icons.jsx, imageSlot.js (the <image-slot> web component)
  pages/        One component per route
  styles/       Preserved design-system CSS (imported by index.css)
  App.jsx       Router + global chrome (bg wash, scroll progress, role modal)
  main.jsx      Entry
public/assets/  Fonts + images extracted from the original build
```

### Hooks

Each hook wraps one self-contained behaviour and cleans up on unmount:

- `useLenis` — smooth scroll engine + in-page anchor scrolling
- `useNav` — sticky/auto-hide nav, mobile burger, `--nav-h` / `--strip-h`
- `useReveal` — scroll reveals, progress bar, FAQ accordions, count-up stats, marquee, testimonial carousel
- `useParallax` — image + ambient-shape parallax
- `useLightwell` — dark → light background wash band
- `useMakersPin` — pinned horizontal "deal makers" scroll
- `useProcessScenes` — guided-process step tracking, scene swap, connector lines
- `useHeroViz` — hero rotating verb + looping flip-card sequence
- `useHeroAurora` — interactive hero dot-grid canvas

## Styling (hybrid)

The site's bespoke CSS — fonts, brand tokens, layout, every section — is
preserved verbatim under `src/styles/` and imported by `src/index.css`, which
guarantees the design is **pixel-faithful**. Tailwind is layered on top
(preflight disabled so it never overrides the design system) and brand tokens
(`ink`, `bone`, `purple`, `peach`, `font-sans`) are exposed in
`tailwind.config.js` for any new layout work.

Each route's page-specific CSS is mounted with that route and unmounts with it,
so there is no cross-page style leakage.

## A note on the markup

The dense, animation-heavy section markup (with ~70 inline SVGs) is preserved
as authored HTML inside each component for exact fidelity. The components, hooks,
routing, styling pipeline, and assets are all real, idiomatic React/Vite — you
can progressively rewrite any section's markup as JSX without touching the rest.
