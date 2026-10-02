# Andrés Ramírez — Portfolio

A bilingual, static developer portfolio built with Astro. English is served at `/` and Spanish at `/es/`.

## Local development

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

To verify the production build:

```bash
npm run check
npm run build
```

## Content

Edit `src/data/portfolio.ts` to update the English and Spanish copy, professional projects, personal projects, games and experience. Add personal project images to `src/assets/projects/`, import them in the data file and assign them to the relevant entry. Projects without an image receive a designed typographic cover automatically.

The portrait area in `src/components/Portfolio.astro` currently shows a designed monogram. When the generated portrait is ready, put it in `public/images/portrait.webp` and replace the `.portrait-placeholder` element with an `<img>` using that path and descriptive alt text. The surrounding frame will remain intact.

## Deploy to Netlify

Push this repository to [gara501/aramdev](https://github.com/gara501/aramdev) and import it in Netlify. `netlify.toml` specifies `npm run build`, the `dist` publish directory and Node.js 22. No adapter or server is required for this static site.
