# AI Vision Consulting Website

A production-ready marketing website for AI Vision Consulting Ltd, built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Three.js (React Three Fiber).

The site is designed as a high-impact, animated single-page experience with a 3D neural background, conversion-focused sections, and an EmailJS-powered contact form.

## Highlights

- Immersive animated 3D background (`@react-three/fiber`, `@react-three/drei`, `three`)
- Adaptive rendering quality for lower-end devices and reduced-motion users
- Conversion-oriented landing flow across Hero, social proof, flagship offerings, courses, testimonials, about, services, blog, and contact
- Sticky CTA, custom cursor, page loader, and scroll progress indicator
- EmailJS integration for real contact form submissions
- Responsive layout and motion-enhanced UX across desktop and mobile
- Vite build chunking tuned for heavy visual dependencies

## Tech Stack

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 4
- Framer Motion 12
- Three.js + React Three Fiber + Drei
- EmailJS browser SDK
- Lucide React icons
- ESLint + TypeScript ESLint

## Project Structure

```text
.
|- src/
|  |- components/         # UI sections, effects, and interactive elements
|  |- data/               # Content collections (courses, services, testimonials, etc.)
|  |- hooks/              # Reusable hooks (intersection observer, etc.)
|  |- utils/              # Shared utilities
|  |- App.tsx             # Main page composition
|  |- main.tsx            # App bootstrap
|  |- index.css           # Global styles and design tokens
|- docs/
|  |- plans/              # Internal implementation planning docs
|- .env.example           # EmailJS environment variable template
|- vite.config.ts         # Build config and chunk splitting
|- tsconfig.json
|- eslint.config.js
```

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm 10+ (recommended)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your EmailJS values:

```bash
cp .env.example .env
```

Required variables:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

If these are missing, contact form submissions will fail and show an error state in the UI.

### Run Locally

```bash
npm run dev
```

Then open the local URL shown in terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview production build locally

## 3D and Performance Strategy

The background scene is implemented in `src/components/NeuralCanvas3D.tsx` and includes:

- Particle field with interactive motion
- Orbiting geometric layers
- Pulse rings and depth grid
- Additional far-depth star shell and floating crystal accents on high-quality mode

Performance controls:

- Automatic low/high quality mode based on viewport size, reduced-motion preference, device memory, and CPU thread count
- Lower DPR on constrained devices
- `antialias: false` for background-only 3D rendering
- Manual chunk splitting in `vite.config.ts` to isolate heavy 3D and animation bundles

## Content Management

Most section content can be updated without touching layout logic:

- `src/data/courses.ts`
- `src/data/flagship.ts`
- `src/data/services.ts`
- `src/data/testimonials.ts`
- `src/data/navigation.ts`

Some sections still keep local content arrays inside their component files (for example, `Blog.tsx` and parts of footer copy), which can be moved to `src/data` if you want full centralization.

## Contact Form Integration (EmailJS)

The contact form is implemented in `src/components/Contact.tsx` and sends messages through EmailJS from the browser.

Setup checklist:

1. Create an EmailJS account.
2. Create a service and template.
3. Add your IDs/keys to `.env`.
4. Ensure your template fields match the payload keys: `from_name`, `from_email`, `enquiry_type`, `message`.

## Deployment

This is a static Vite build and can be deployed to:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- Any static host that serves `dist/`

Production build:

```bash
npm run build
```

Deploy the generated `dist/` directory.

## Quality and Maintenance

- TypeScript strict mode is enabled.
- ESLint config is included (`eslint.config.js`).
- Build output currently warns about large vendor chunks because of 3D dependencies; this is expected for Three.js-heavy experiences and partially mitigated with manual chunking.

## Troubleshooting

- Contact form not sending: verify all `VITE_EMAILJS_*` values and confirm EmailJS template field names match the payload.
- Blank or slower 3D on mobile: the app intentionally downgrades effect quality on constrained devices for smoother interaction.
- Cursor not visible: the custom cursor is intentionally disabled on mobile/touch contexts.

## License

No license file is currently present in this repository. Add one if you plan to distribute the code publicly.
