# Akhilesh Yadav — Portfolio

Personal portfolio for Akhilesh Yadav, an Android engineer. Built with Next.js 15 (App Router),
TypeScript, Tailwind CSS, and GSAP.

**Live:** https://akhilesh-nitw-portfolio.vercel.app/

## Stack

- **Framework:** Next.js 15 (App Router, React 18)
- **Styling:** Tailwind CSS 3, `shadcn/ui` primitives
- **Motion:** GSAP (`useGSAP`, `ScrollTrigger`, `SplitText`)
- **Content:** plain TypeScript data files under `utils/Data/`
- **Contact form:** EmailJS (optional — the form degrades gracefully when unconfigured)

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production only | Canonical URL, Open Graph, `sitemap.xml` and `robots.txt`. Falls back to `http://localhost:3000`. |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | For the contact form | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | For the contact form | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | For the contact form | EmailJS public key |

If the EmailJS values are missing, the form shows a toast pointing visitors at the email
address instead of failing silently. The EmailJS template must accept the params
`from_name`, `email`, and `message`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier write |

## Project structure

```
src/
  app/                 routes: /, /projects, /projects/[id], metadata routes
  components/
    sections/          one file per page section (Hero, About, Projects, …)
    ui/                shadcn/ui primitives
  lib/                 site config + class-name helper
utils/
  Data/                content (profile, experience, projects, skills)
public/
  projects/covers/     project thumbnails (SVG)
```

Sections are plain components rather than routes — `src/app` only contains real pages.

## Deployment

Any Node host works (Vercel, Fly.io, Railway, a VPS). Build and run:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
npm start
```

Remember to set `NEXT_PUBLIC_SITE_URL` before building — it is inlined at build time, and the
sitemap and Open Graph tags fall back to localhost without it. Security headers
(`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) are configured in
`next.config.ts`.

## Content

- Profile, socials, resume: `utils/Data/PersonalData.ts`
- Projects: `utils/Data/projects-data.ts`
- Experience: `utils/Data/experience.ts`
- Skills: `utils/Data/skills.ts`
- Resume PDF: `public/resume.pdf`
- Portrait: `public/pic1.jpg`
- Social preview image: `public/og-cover.jpg` (1200×630)