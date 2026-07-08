<div align="center">

# Developer Portfolio — React + TypeScript + Tailwind

A modern, production-ready personal portfolio website. Fast, fully responsive, accessible, internationalized (🇩🇪 German / 🇬🇧 English), and themeable (dark / light / system) — with a 3D animated hero, premium motion, and a working contact form.

**Everything you need to make it yours lives in a single config file and two translation files.**

[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#-license)

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Make It Yours](#-make-it-yours)
- [Deployment](#-deployment)
- [Available Scripts](#-available-scripts)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

## ✨ Features

- **🎨 Premium design** — glassmorphism, soft gradients, a custom design-token color system, and Inter + JetBrains Mono typography.
- **🌗 Three themes** — Dark (default), Light, and System, persisted in `localStorage` with smooth animated transitions and live OS-preference tracking.
- **🌍 Internationalization** — German and English out of the box via i18next; the whole UI translates and the choice is remembered. Adding a new language is a 3-step task.
- **🪐 3D hero background** — a lazy-loaded Three.js particle field with mouse parallax. It pauses when off-screen, scales particle counts down on mobile, and fully respects `prefers-reduced-motion`.
- **🎬 Tasteful motion** — scroll reveals, staggered entrances, magnetic buttons, an animated experience timeline, and a typing effect (Framer Motion).
- **🧩 Complete sections** — Hero, About, Experience timeline, filterable Projects, Skills, Education, Certifications, a Medium-ready Blog, and Contact.
- **📬 Working contact form** — client-side validation with loading / success / error states, backed by [Formspree](https://formspree.io) with a graceful e-mail fallback.
- **🔍 SEO-ready** — meta tags, Open Graph, Twitter Cards, JSON-LD structured data, `sitemap.xml`, `robots.txt`, and a canonical URL.
- **♿ Accessible** — semantic HTML, ARIA labels, keyboard navigation, visible focus states, a skip link, and reduced-motion support (targets WCAG AA).
- **⚡ Optimized** — route-free code splitting (Three.js, Framer Motion, i18n, and React in separate cacheable chunks), lazy loading, and self-hosted fonts.
- **🛠️ One-file configuration** — all structured data lives in `src/config/site.ts`; all copy lives in `src/locales/*.json`.

## 🧱 Tech Stack

| Layer     | Technology                                             |
| --------- | ------------------------------------------------------ |
| Build     | [Vite 8](https://vite.dev) + TypeScript 6              |
| UI        | [React 19](https://react.dev)                          |
| Styling   | [Tailwind CSS 4](https://tailwindcss.com) (CSS-first, design tokens) |
| Animation | [Framer Motion 12](https://www.framer.com/motion/)     |
| 3D        | [Three.js](https://threejs.org) (lazy-loaded)          |
| i18n      | [i18next](https://www.i18next.com) + react-i18next     |
| Icons     | [react-icons](https://react-icons.github.io/react-icons/) |
| Fonts     | [Fontsource](https://fontsource.org) (Inter, JetBrains Mono) |
| Form      | [Formspree](https://formspree.io) (via `fetch`, no SDK) |
| Quality   | ESLint 10 + Prettier 3                                  |

## 🚀 Quick Start

> **Prerequisites:** [Node.js](https://nodejs.org) **20+** (22 LTS recommended) and npm 10+.

```bash
# 1. Clone
git clone https://github.com/arslanzafar-pro/arslanzafar-pro.github.io.git
cd arslanzafar-pro.github.io

# 2. Install dependencies
npm install

# 3. Start the dev server → http://localhost:5173
npm run dev
```

That's it. Edit files and the page hot-reloads instantly.

## 📁 Project Structure

```
.
├── .github/workflows/deploy.yml   # CI/CD: builds & deploys to GitHub Pages
├── public/
│   ├── favicon.svg                # Site icon
│   ├── og-image.png               # Social-sharing image (1200×630)
│   ├── robots.txt · sitemap.xml   # SEO
│   ├── resume/                    # Downloadable resume PDF
│   └── images/                    # profile / projects / backgrounds
├── src/
│   ├── config/site.ts             # ⭐ ALL structured data (links, dates, tech)
│   ├── locales/                   # ⭐ ALL copy — de.json, en.json
│   ├── styles/index.css           # Design tokens + Tailwind setup
│   ├── lib/                       # i18n bootstrap + small utilities
│   ├── hooks/                     # useTheme, useScrollSpy
│   ├── components/
│   │   ├── layout/                # Navbar, Footer
│   │   ├── three/                 # ParticleField (3D hero background)
│   │   └── ui/                    # Buttons, dropdowns, reveal, icons …
│   ├── sections/                  # Hero, About, Experience, Projects …
│   ├── App.tsx                    # Page assembly
│   └── main.tsx                   # Entry point
├── index.html                     # SEO meta tags + pre-paint theme script
└── vite.config.ts                 # Base path, aliases, chunk splitting
```

## 🎯 Make It Yours

You can turn this into **your own** portfolio by editing just a few files — no component code required.

**Golden rule:** structured data (links, dates, technologies) goes in `src/config/site.ts`; all visible text goes in `src/locales/de.json` and `src/locales/en.json`. Whenever you add an entry with an `id` in the config, add matching text under the same `id` in **both** locale files.

| I want to change…            | Edit this                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| Name, e-mail, social links   | `src/config/site.ts` → `siteConfig` (top of file)               |
| Any visible text             | `src/locales/de.json` and `src/locales/en.json`                 |
| Colors / themes              | `src/styles/index.css` (CSS variables under `:root` and `.dark`)|
| Projects / experience / skills | the arrays in `src/config/site.ts` (+ copy in the locale files) |
| Resume PDF                   | replace the file in `public/resume/` and update `resumeFile`    |
| Site URL / SEO               | `url` in `src/config/site.ts`, plus `index.html`, `public/sitemap.xml`, `public/robots.txt` |
| Contact form destination     | `formspreeEndpoint` in `src/config/site.ts`                     |

**Set up the contact form:** create a free form at [formspree.io](https://formspree.io), copy your endpoint (e.g. `https://formspree.io/f/abcdwxyz`), and paste it into `formspreeEndpoint` in `src/config/site.ts`. Until then, submissions show a friendly fallback message.

**Add a language (e.g. Arabic):** copy `src/locales/en.json` to `src/locales/ar.json`, translate the values, then register it in `src/lib/i18n.ts`. The switcher, persistence, and `<html lang>` update automatically.

> 💡 A detailed, step-by-step customization walkthrough is available in **`CUSTOMIZATION.md`** in the repository.

## 🌐 Deployment

The repo ships with a ready-to-use GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that lints, builds, and deploys on every push to `main`.

### GitHub Pages (primary)

1. **Name the repository correctly.** For a personal site at `https://<username>.github.io`, the repository **must** be named exactly `<username>.github.io`.
   > For a *project* page (`https://<username>.github.io/<repo>`) instead, set `base: '/<repo>/'` in `vite.config.ts`.
2. **Push your code** to the `main` branch.
3. In the repo, open **Settings → Pages → Build and deployment → Source** and choose **“GitHub Actions.”**
4. Every push to `main` now builds and publishes automatically. Watch progress under the **Actions** tab; the site goes live in about a minute.

Remember to update the absolute URLs (`url` in `src/config/site.ts`, and the URLs in `index.html`, `public/sitemap.xml`, `public/robots.txt`) to match your own domain.

### Other hosts

<details>
<summary><strong>Netlify · Vercel · Cloudflare Pages</strong></summary>

All three auto-detect Vite. Use these settings if asked:

- **Build command:** `npm run build`
- **Output / publish directory:** `dist`

**Netlify:** New site → Import from Git → pick the repo → Deploy.
**Vercel:** New Project → import the repo → framework preset **Vite** → Deploy.
**Cloudflare Pages:** Workers & Pages → Create → Pages → Connect to Git → set the build command and output directory above → Deploy.

</details>

## 📜 Available Scripts

| Command           | What it does                                             |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server at `http://localhost:5173`    |
| `npm run build`   | Type-check (strict) and build the production site to `dist/` |
| `npm run preview` | Serve the production build locally                      |
| `npm run lint`    | Run ESLint over the codebase                            |
| `npm run format`  | Format the source with Prettier                         |

## 🧯 Troubleshooting

| Problem                                   | Fix                                                                                 |
| ----------------------------------------- | ----------------------------------------------------------------------------------- |
| **Blank page after deployment**           | The `base` path doesn't match the deploy type. User site → `base: '/'`; project page → `base: '/<repo>/'` in `vite.config.ts`. |
| **404 on GitHub Pages**                   | Settings → Pages → Source must be **“GitHub Actions,”** and the latest Actions run must be green. |
| **Contact form always shows an error**    | Set a real `formspreeEndpoint` in `src/config/site.ts`.                              |
| **`npm run build` fails after editing text** | `de.json` and `en.json` must stay valid JSON and share the same keys.            |
| **Fonts/icons missing**                   | Re-run `npm install` — fonts are self-hosted npm packages, not a CDN.               |
| **Stale content after deploy**            | Hard-refresh (Ctrl/Cmd + Shift + R); hashed assets update, but `index.html` can cache briefly. |

## 📄 License

Released under the [MIT License](https://opensource.org/licenses/MIT) — you're free to fork this and build your own portfolio from it.

Please replace all personal content (name, résumé, project descriptions, links, and images) with your own before publishing.

---

<div align="center">
Built with React, TypeScript &amp; Tailwind CSS · Crafted by <a href="https://github.com/arslanzafar-pro">Arslan Zafar</a>
</div>
