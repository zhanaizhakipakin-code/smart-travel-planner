# Voyanté — Premium AI Travel Planner

A luxury landing page built with Next.js, Tailwind CSS, Framer Motion, and Lucide React.

## Getting started

1. **Place your hero video** — Copy `video.mp4` from the project root into `public/video.mp4` (Next.js serves static assets from `public/`).

2. **Install dependencies** (requires Node.js 18+):

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Structure

| Section | Component |
|---------|-----------|
| Navbar | `components/Navbar.tsx` |
| Hero | `components/Hero.tsx` |
| Featured Services | `components/FeaturedServices.tsx` |
| Brand Philosophy | `components/BrandPhilosophy.tsx` |
| Experiences | `components/Experiences.tsx` |
| Curated Stats | `components/CuratedStats.tsx` |
| Footer | `components/Footer.tsx` |

## Design tokens

- **Forest greens** — `forest`, `forest-deep`, `forest-mid`
- **Cream/ivory** — `cream`, `cream-warm`, `cream-ivory`
- **Gold accents** — `gold`, `gold-muted`, `gold-glow`
- **Charcoal** — `charcoal`, `charcoal-muted`

Fonts: Playfair Display (headlines), Inter (body) via `next/font`.
