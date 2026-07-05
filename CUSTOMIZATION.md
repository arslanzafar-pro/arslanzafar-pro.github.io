# Customization Guide

Everything you will ever want to change, in one place. Two files hold almost all content:

| What | File |
| --- | --- |
| Links, dates, technologies, section structure | [`src/config/site.ts`](src/config/site.ts) |
| All visible text (German) | [`src/locales/de.json`](src/locales/de.json) |
| All visible text (English) | [`src/locales/en.json`](src/locales/en.json) |

> **Golden rule:** whenever you add or rename an `id` in `site.ts`, add the matching text under the same key in **both** locale files.

After any change, check locally with `npm run dev`, then push to deploy.

---

## 1. Change name, e-mail & social links

**File:** `src/config/site.ts` (lines ~110–125)

```ts
name: 'Arslan Zafar',
url: 'https://arslanzafar.github.io',
email: 'arslanzafar.pro@gmail.com',
social: {
  github: 'https://github.com/arslanzafar-pro',
  linkedin: 'https://www.linkedin.com/in/arslanzafar-pro/',
  medium: 'https://arslan-zafar.medium.com',
},
```

Every button, icon and footer link across the site reads from these values. If you change `url`, also update the URLs in `index.html` (meta tags), `public/sitemap.xml` and `public/robots.txt`.

## 2. Change the profile picture

1. Put your photo in `public/images/profile/` (e.g. `me.jpg`, ideally square, ≥ 512×512, < 300 KB).
2. The current design is intentionally photo-free. To add the photo to the About section, open `src/sections/About.tsx` and insert inside the facts card (`<div className="card p-6">`, before the `<h3>`):

```tsx
<img
  src="/images/profile/me.jpg"
  alt="Arslan Zafar"
  className="mx-auto mb-5 h-32 w-32 rounded-2xl object-cover"
/>
```

## 3. Change colors / themes

**File:** `src/styles/index.css` (lines ~10–40)

Light theme lives under `:root`, dark theme under `.dark`. Each is just a set of CSS variables:

```css
.dark {
  --background: #060a13;   /* page background */
  --surface: #0b1120;      /* cards, navbar */
  --primary: #818cf8;      /* buttons, links, highlights */
  --accent: #22d3ee;       /* secondary highlight color */
  ...
}
```

Change a hex value → the whole site re-skins. The 3D particle colors are set in `src/components/three/ParticleField.tsx` (search for `0x818cf8`).

## 4. Add a project

**Step 1 — `src/config/site.ts`**, `projects` array. Copy an existing block:

```ts
{
  id: 'myNewProject',            // unique camelCase key
  tags: ['web'],                 // 'ai' | 'iot' | 'web' | 'cloud'
  technologies: ['React', 'Node.js'],
  github: 'https://github.com/arslanzafar-pro/my-new-project', // or null
  live: 'https://example.com',   // or null
  image: '/images/projects/my-new-project.jpg', // or null for a placeholder
  proprietary: false,
},
```

**Step 2 — both locale files**, under `projects.items`:

```json
"myNewProject": {
  "title": "My New Project",
  "description": "One or two sentences about it.",
  "achievement": "The most impressive fact about it"
}
```

**Step 3 (optional):** drop a screenshot into `public/images/projects/` and reference it in `image`.

> The `// TODO` comments in `site.ts` mark the placeholder GitHub repo URLs from the initial generation — replace them with your real repository links.

## 5. Add a work experience

**Step 1 — `src/config/site.ts`**, `experience` array (newest first):

```ts
{
  id: 'myNewJob',
  company: 'ACME GmbH',
  start: '2026-01',   // ISO year-month
  end: null,          // null = "Present"
  technologies: ['C#', 'Azure'],
},
```

**Step 2 — both locale files**, under `experience.items`:

```json
"myNewJob": {
  "role": "Senior Software Engineer",
  "location": "Munich, Germany",
  "summary": "One-line summary of the role.",
  "highlights": ["Achievement one", "Achievement two"]
}
```

## 6. Add or edit skills

**File:** `src/config/site.ts`, `skills` array — plain strings inside categories:

```ts
{ id: 'languages', skills: ['Java', 'Python', 'Rust'] },
```

Category display names are in the locale files under `skills.categories`. Brand icons are resolved in `src/components/ui/TechIcon.tsx` — unknown names automatically get a generic icon; to give a new skill a proper logo, add one line to the `iconMap` there (icons come from [react-icons](https://react-icons.github.io/react-icons/)).

## 7. Update education / certifications

Same pattern: structural data in `site.ts` (`education`, `certifications` arrays), text in the locale files (`education.items`, `certifications.items`).
Setting `certifications: []` hides the whole section automatically.

## 8. Replace the resume PDF

Overwrite `public/resume/Lebenslauf_Arslan_Zafar.pdf` with the new file. If the filename changes, update `resumeFile` in `src/config/site.ts` (line ~127).

## 9. Set up the contact form (required once)

1. Create a free account at [formspree.io](https://formspree.io) → **New form** → copy the endpoint (looks like `https://formspree.io/f/abcdwxyz`).
2. In `src/config/site.ts` replace:

```ts
formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
```

Until you do this, submissions show a friendly error with your e-mail address as fallback — nothing breaks.

## 10. Add blog articles

**Step 1 — `src/config/site.ts`**, `blogArticles` array:

```ts
blogArticles: [
  { id: 'myFirstPost', url: 'https://arslan-zafar.medium.com/…', date: '2026-07-01' },
],
```

**Step 2 — both locale files**, add under `blog`:

```json
"items": {
  "myFirstPost": {
    "title": "My article title",
    "excerpt": "One-sentence teaser."
  }
}
```

The Medium profile card is always shown; article cards appear next to it.

## 11. Add a new language (e.g. Arabic)

1. Copy `src/locales/en.json` → `src/locales/ar.json` and translate all values (never the keys).
2. In `src/lib/i18n.ts` add:

```ts
import ar from '@/locales/ar.json'
// …
export const languages = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
] as const
// … and in resources:
resources: {
  de: { translation: de },
  en: { translation: en },
  ar: { translation: ar },
},
```

The switcher, persistence and `<html lang>` update automatically. (For right-to-left languages you'd additionally want to set `dir="rtl"` — ask your friendly AI assistant.)

## 12. Remove a section

1. In `src/config/site.ts` delete its entry from the `sections` array (removes it from navbar + footer).
2. In `src/App.tsx` delete the corresponding component line (e.g. `<Blog />`) and its import.

## 13. Modify animations

- **Scroll reveals:** `src/components/ui/Reveal.tsx` — change `duration`, `y` offset or the easing curve in one place to affect the whole site.
- **Typing effect speed:** props in `src/components/ui/TypingEffect.tsx` (`typingSpeed`, `deletingSpeed`, `pauseMs`).
- **Magnetic strength:** `strength` prop in `src/components/ui/MagneticButton.tsx` (default 8 px).
- **3D particles:** `src/components/three/ParticleField.tsx` — particle counts (`base = isSmallScreen ? 350 : 900`), rotation speeds in `renderFrame`.
- All animations automatically disable for visitors with `prefers-reduced-motion`.

## 14. Replace icons

UI icons come from `react-icons/fi` (Feather), brand icons from `react-icons/si` / `tb` / `fa`. Browse [react-icons.github.io](https://react-icons.github.io/react-icons/), then swap the import + usage in the relevant component. Tech-logo mapping lives centrally in `src/components/ui/TechIcon.tsx`.

## 15. Change themes behavior

Theme logic lives in `src/hooks/useTheme.tsx`. The default theme for first-time visitors is set in two places: `readStoredTheme()` (returns `'dark'`) and the pre-paint script in `index.html` (`localStorage.getItem('theme') || 'dark'`). Change both `'dark'` → `'light'` or `'system'` to alter the default.

## 16. SEO updates

- Title/description/OG tags: `index.html` (head section).
- Social sharing image: replace `public/og-image.png` (1200×630 px).
- Structured data (JSON-LD): also in `index.html`.
- `public/sitemap.xml` — update `<lastmod>` when you make major changes.
