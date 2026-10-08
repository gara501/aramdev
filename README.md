# Andrés Ramírez — Portfolio

A bilingual, static developer portfolio built with Astro and Motion. English is served at `/` and Spanish at `/es/`.

## Local development

Requires Node.js 18.20.8, 20.3.0 or 22+ (Netlify builds use 22.19.0).

```bash
npm install
npm run dev
```

To verify and preview the production build:

```bash
npm run check
npm run build
npm run preview
```

## Project structure

- `src/data/portfolio.ts` — all content: English/Spanish copy, professional and personal projects, games and experience.
- `src/components/Portfolio.astro` — the full page layout, rendered for both locales from `src/pages/index.astro` and `src/pages/es/index.astro`.
- `src/components/PersonalProjectCard.astro` — card used by the personal work tabs.
- `src/scripts/portfolio.ts` — tab behavior, Motion animations (hero, scroll reveals, reading progress, parallax) and mobile menu; all animation respects `prefers-reduced-motion`.
- `src/styles/global.css` — single global stylesheet.

## Content

Edit `src/data/portfolio.ts` to update the English and Spanish copy, professional projects, personal projects, games and experience. Add personal project images to `src/assets/projects/`, import them in the data file and assign them to the relevant entry. Projects without an image receive a designed typographic cover automatically. The personal work section uses accessible tabs (arrow-key navigation and URL hash deep-links).

The illustrated portrait is imported from `src/assets/projects/me.png` in `src/components/Portfolio.astro`.

## Deploy to Netlify

Push this repository to [gara501/aramdev](https://github.com/gara501/aramdev) and import it in Netlify. `netlify.toml` specifies `npm run build`, the `dist` publish directory and Node.js 22. No adapter or server is required for this static site.
