# Red Epic Photography

Premium client proposal website for **Red Epic Photography** — cinematic, elegant, and conversion-focused.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Brand assets

Official wordmark and mark live in:

- `public/images/logo-red-epic.png` — full lockup reference
- `public/icons/red-epic-mark.svg` — scalable white mark used in the UI

Brand palette and typography are defined in `app/globals.css` (Montserrat + Inter, burgundy primary system).

## Replacing content

Edit `data/site.ts` to update:

- copy and contact details
- services
- portfolio images/categories
- testimonials
- social links

Swap Unsplash placeholders with final client photography under `public/images/` and update the paths in `data/site.ts`.

## Contact form

The inquiry form is Formspree-ready.

1. Copy `.env.example` to `.env.local`
2. Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT`

Without the endpoint, the form runs in **proposal demo mode** (validation + success state only).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
