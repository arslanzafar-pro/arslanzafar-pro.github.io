# Arslan Zafar — Personal Portfolio

A premium, production-ready personal portfolio website built with **React 19, TypeScript, Tailwind CSS 4, Framer Motion and Three.js** — fully internationalized (German 🇩🇪 default / English 🇬🇧), themeable (dark / light / system), accessible, SEO-optimized and deployable to GitHub Pages with zero configuration.

**Live site:** https://arslanzafar.github.io

---

## ✨ Features

- **Premium design** — glassmorphism, soft gradients, custom color system, Inter + JetBrains Mono typography
- **Three color themes** — Dark (default), Light and System, persisted in `localStorage`, with smooth animated transitions and OS-preference tracking
- **Multi-language** — German (default) and English via i18next; adding a language is a 3-step task (see [CUSTOMIZATION.md](CUSTOMIZATION.md))
- **3D hero background** — lazy-loaded Three.js particle field with mouse parallax; pauses off-screen, respects `prefers-reduced-motion`, mobile-friendly particle counts
- **Premium animations** — scroll reveal, stagger, magnetic buttons, card lift, typing effect, animated timeline (Framer Motion)
- **Sections** — Hero, About, Experience timeline, filterable Projects, Skills, Education, Certifications, Blog (Medium-ready), Contact
- **Contact form** — Formspree-backed with client-side validation, loading / success / error states and a graceful e-mail fallback
- **Single config file** — all personal data lives in [`src/config/site.ts`](src/config/site.ts); all prose lives in [`src/locales/`](src/locales)
- **SEO** — meta tags, Open Graph, Twitter Cards, JSON-LD structured data, `sitemap.xml`, `robots.txt`, canonical URL
- **Accessibility** — semantic HTML, ARIA labels, keyboard navigation, focus states, skip link, color contrast, reduced-motion support
- **Performance** — code splitting (three.js, framer-motion, i18n and React in separate cacheable chunks), lazy loading, self-hosted fonts, capped pixel ratio
- **Code quality** — strict TypeScript, ESLint (flat config + react-hooks rules), Prettier

## 🛠 Technology Stack

| Layer      | Technology                                        |
| ---------- | ------------------------------------------------- |
| Build      | [Vite 8](https://vite.dev) + TypeScript 6         |
| UI         | React 19                                          |
| Styling    | Tailwind CSS 4 (CSS-first config, design tokens)  |
| Animation  | Framer Motion 12                                  |
| 3D         | Three.js (lazy-loaded)                            |
| i18n       | i18next + react-i18next + language detector       |
| Icons      | react-icons (Feather, Simple Icons, Tabler)       |
| Fonts      | @fontsource-variable (Inter, JetBrains Mono)      |
| Form       | Formspree (fetch, no SDK)                         |
| Quality    | ESLint 10, Prettier 3                             |

## 📁 Folder Structure

```
PortfolioWebsite/
├── .github/workflows/deploy.yml   # GitHub Pages CI/CD
├── public/
│   ├── favicon.svg                # Site icon
│   ├── og-image.png               # Social sharing image (1200×630)
│   ├── robots.txt · sitemap.xml   # SEO
│   ├── resume/                    # Downloadable resume PDF
│   └── images/
│       ├── profile/               # Put your profile photo here
│       ├── projects/              # Project screenshots
│       └── backgrounds/           # Optional background assets
├── src/
│   ├── config/site.ts             # ⭐ ALL personal data (links, dates, tech)
│   ├── locales/                   # ⭐ ALL text content (de.json, en.json)
│   ├── styles/index.css           # Design tokens + Tailwind setup
│   ├── lib/                       # i18n bootstrap, small utilities
│   ├── hooks/                     # useTheme, useScrollSpy
│   ├── components/
│   │   ├── layout/                # Navbar, Footer
│   │   ├── three/                 # ParticleField (3D hero background)
│   │   └── ui/                    # Buttons, dropdowns, reveal, icons …
│   ├── sections/                  # Hero, About, Experience, Projects, …
│   ├── App.tsx                    # Page assembly
│   └── main.tsx                   # Entry point
├── index.html                     # SEO meta tags + pre-paint theme script
└── vite.config.ts                 # Base path, aliases, chunk splitting
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20 or newer (22 LTS recommended)
- npm 10+

### Installation

```bash
git clone https://github.com/arslanzafar-pro/arslanzafar-pro.github.io.git
cd arslanzafar-pro.github.io
npm install
```

### Development

```bash
npm run dev        # start dev server at http://localhost:5173
npm run lint       # check code quality
npm run format     # format with Prettier
```

### Production build

```bash
npm run build      # type-check + build to dist/
npm run preview    # preview the production build locally
```

The build must finish without errors — TypeScript runs in strict mode as part of it.

---

## 🌍 Deployment

### GitHub Pages (primary) — step by step

The repository ships with a ready-to-use workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

1. **Create the repository.** For a *user site* served at `https://<username>.github.io`, the repo **must be named `<username>.github.io`** — e.g. for the GitHub account `arslanzafar-pro` the repo name is `arslanzafar-pro.github.io` and the site URL is `https://arslanzafar-pro.github.io`.
   > ℹ️ The URL `https://arslanzafar-pro.github.io` requires the GitHub username `arslanzafar-pro`. If your username differs, update `url` in `src/config/site.ts`, the URLs in `index.html` and `public/sitemap.xml` / `public/robots.txt` accordingly.

2. **Push the code:**

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git push -u origin main
   ```

3. **Enable Pages:** repository **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.

4. Every push to `main` now lints, builds and deploys automatically. The first run appears under the **Actions** tab; the site is live at `https://<username>.github.io` after ~1 minute.

**Deploying to a project page instead** (`https://<username>.github.io/<repo>`): set `base: '/<repo>/'` in [vite.config.ts](vite.config.ts) and change the absolute URLs mentioned above.

### Netlify

1. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project** → pick the repo.
2. Build command: `npm run build` · Publish directory: `dist` → **Deploy**.

### Vercel

1. [vercel.com/new](https://vercel.com/new) → import the repo.
2. Framework preset: **Vite** (auto-detected: build `npm run build`, output `dist`) → **Deploy**.

### Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Build command: `npm run build` · Build output directory: `dist` → **Save and Deploy**.

### Custom domain (optional)

1. Add a file `public/CNAME` containing your domain (e.g. `www.example.com`).
2. GitHub repo **Settings → Pages → Custom domain**, enter the domain, enable **Enforce HTTPS**.
3. At your DNS provider add a `CNAME` record pointing `www` → `<username>.github.io` (or `A` records to GitHub's Pages IPs for the apex domain).
4. Update `url` in `src/config/site.ts` and the URLs in `index.html`, `public/sitemap.xml`, `public/robots.txt`.

## 🔄 Updating the website

1. Edit content in `src/config/site.ts` and/or `src/locales/*.json` (see [CUSTOMIZATION.md](CUSTOMIZATION.md)).
2. Check locally with `npm run dev`.
3. Commit and push to `main` — deployment is automatic.

## 🧰 Troubleshooting

| Problem | Fix |
| --- | --- |
| **Blank page after deployment** | The `base` path doesn't match the deployment type. User site (`<user>.github.io`) → `base: '/'`; project page → `base: '/<repo>/'` in `vite.config.ts`. |
| **404 on GitHub Pages** | Settings → Pages → Source must be **"GitHub Actions"**, and the workflow run must be green under the Actions tab. |
| **Contact form always shows the error state** | Replace `YOUR_FORM_ID` in `src/config/site.ts` with your real Formspree form ID (see CUSTOMIZATION.md § Contact form). |
| **`npm run build` fails after editing locales** | Both `de.json` and `en.json` must stay valid JSON and contain the same keys. Validate with an editor or `npx jsonlint`. |
| **Fonts/icons missing offline** | Run `npm install` again — fonts are self-hosted npm packages, no CDN involved. |
| **Old content after deploy** | Hard-refresh (Ctrl+F5). Assets are content-hashed, but `index.html` may be cached briefly. |

## 📚 Further docs

- [CUSTOMIZATION.md](CUSTOMIZATION.md) — beginner-friendly, step-by-step guide for every kind of change (content, colors, sections, languages, animations, icons, form, resume …)

## 📄 License

Personal portfolio of Arslan Zafar. Feel free to use the code structure as inspiration; please replace all personal content before publishing your own version.
