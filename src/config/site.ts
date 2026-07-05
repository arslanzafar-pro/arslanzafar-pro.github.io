/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH for all personal data.
 *
 * Everything that is *not* prose lives here: links, dates, technologies,
 * section structure. Prose (role names, descriptions, bullet points) lives in
 * `src/locales/de.json` and `src/locales/en.json`, keyed by the `id`s below,
 * so it can be translated.
 *
 * See CUSTOMIZATION.md for a step-by-step guide.
 * ---------------------------------------------------------------------------
 */

export interface SectionDef {
  /** DOM id, i18n key under `nav.*` */
  id: string
  /** Show in the navbar (footer quick-links always show all sections) */
  inNav: boolean
}

export interface ExperienceItem {
  /** i18n key under `experience.items.*` */
  id: string
  company: string
  /** ISO month, e.g. '2024-10' */
  start: string
  /** ISO month or null = present */
  end: string | null
  technologies: string[]
}

export type ProjectTag = 'ai' | 'iot' | 'web' | 'cloud'

export interface ProjectItem {
  /** i18n key under `projects.items.*` */
  id: string
  tags: ProjectTag[]
  technologies: string[]
  /** TODO: replace with the real repository URL, or null to hide the button */
  github: string | null
  /** Live demo URL, or null to hide the button */
  live: string | null
  /** Path under /public, e.g. '/images/projects/greenhouse.jpg', or null for a generated placeholder */
  image: string | null
  /** Company/internal project — shows a badge instead of a repo link */
  proprietary: boolean
}

export interface SkillCategory {
  /** i18n key under `skills.categories.*` */
  id: string
  skills: string[]
}

export interface EducationItem {
  /** i18n key under `education.items.*` */
  id: string
  institution: string
  start: string
  end: string
}

export interface CertificationItem {
  /** i18n key under `certifications.items.*` */
  id: string
  issuer: string
}

export interface BlogArticle {
  /** i18n key under `blog.items.*` */
  id: string
  url: string
  /** ISO date, e.g. '2026-01-15' */
  date: string
}

export const siteConfig = {
  name: 'Arslan Zafar',
  /** Site origin — used for canonical URLs; also update index.html + public/sitemap.xml when it changes */
  url: 'https://arslanzafar-pro.github.io',
  email: 'arslanzafar.pro@gmail.com',

  social: {
    github: 'https://github.com/arslanzafar-pro',
    linkedin: 'https://www.linkedin.com/in/arslanzafar-pro/',
    medium: 'https://arslan-zafar.medium.com',
  },

  /** Served from /public — replace the file to update the downloadable resume */
  resumeFile: '/resume/Lebenslauf_Arslan_Zafar.pdf',

  /**
   * Contact form backend (Formspree).
   * TODO: create a free form at https://formspree.io and replace YOUR_FORM_ID.
   * Until then, submissions fail gracefully and visitors see the direct e-mail.
   */
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',

  /** Page sections, in render order */
  sections: [
    { id: 'home', inNav: false },
    { id: 'about', inNav: true },
    { id: 'experience', inNav: true },
    { id: 'projects', inNav: true },
    { id: 'skills', inNav: true },
    { id: 'education', inNav: true },
    { id: 'certifications', inNav: false },
    { id: 'blog', inNav: false },
    { id: 'contact', inNav: true },
  ] satisfies SectionDef[],

  experience: [
    {
      id: 'feeThesis',
      company: 'F.EE IndustrieAutomation GmbH & Co. KG',
      start: '2024-10',
      end: '2025-04',
      technologies: [
        'Python',
        'C#',
        'YOLOv5',
        'TensorFlow',
        'OpenCV',
        'NumPy',
        'Pandas',
        'OCR',
        'Python.NET',
        'Blazor',
      ],
    },
    {
      id: 'feeIntern',
      company: 'F.EE IndustrieAutomation GmbH & Co. KG',
      start: '2024-04',
      end: '2024-09',
      technologies: [
        'C#',
        '.NET',
        'ASP.NET Core',
        'Blazor',
        'Angular',
        'Entity Framework Core',
        'SQLite',
        'xUnit',
        'Postman',
        'Git',
      ],
    },
    {
      id: 'sgPm',
      company: 'Services Ground Pvt. Ltd.',
      start: '2021-01',
      end: '2023-01',
      technologies: [
        'Jira',
        'Confluence',
        'Scrum',
        'Kanban',
        'Jenkins',
        'GitLab CI/CD',
        'Docker',
        'AWS',
        'Azure',
        'Prometheus',
        'Grafana',
      ],
    },
    {
      id: 'sgDev',
      company: 'Services Ground Pvt. Ltd.',
      start: '2019-02',
      end: '2020-12',
      technologies: [
        'Java',
        'Spring Boot',
        'Node.js',
        'MongoDB',
        'React',
        'JavaScript',
        'Bootstrap',
        'PHP',
        'WordPress',
      ],
    },
  ] satisfies ExperienceItem[],

  projects: [
    {
      id: 'terminalAi',
      tags: ['ai'],
      technologies: ['Python', 'YOLOv5', 'TensorFlow', 'OpenCV', 'OCR', 'C#', 'Blazor'],
      github: null,
      live: null,
      image: null,
      proprietary: true,
    },
    {
      id: 'greenhouse',
      tags: ['iot'],
      technologies: ['M5Stack', 'MicroPython', 'UiFlow', 'PHP', 'MySQL'],
      // TODO: replace with the real repository URL
      github: 'https://github.com/arslanzafar-pro/smart-greenhouse',
      live: null,
      image: null,
      proprietary: false,
    },
    {
      id: 'wanderWave',
      tags: ['web', 'cloud'],
      technologies: ['PHP', 'Yii2', 'AWS', 'ownCloud', 'MySQL'],
      // TODO: replace with the real repository URL
      github: 'https://github.com/arslanzafar-pro/wander-wave',
      live: null,
      image: null,
      proprietary: false,
    },
    {
      id: 'proShop',
      tags: ['web'],
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'PayPal API'],
      // TODO: replace with the real repository URL
      github: 'https://github.com/arslanzafar-pro/pro-shop',
      live: null,
      image: null,
      proprietary: false,
    },
    {
      id: 'richtv',
      tags: ['web', 'cloud'],
      technologies: ['Java', 'Spring Boot', 'React', 'MongoDB', 'REST APIs'],
      github: null,
      live: 'https://richtv.io',
      image: null,
      proprietary: true,
    },
  ] satisfies ProjectItem[],

  skills: [
    {
      id: 'languages',
      skills: ['Java', 'Python', 'C#', 'JavaScript', 'TypeScript', 'PHP', 'MicroPython'],
    },
    {
      id: 'frontend',
      skills: ['React', 'Blazor', 'Angular', 'HTML5', 'CSS', 'Bootstrap', 'WordPress'],
    },
    {
      id: 'backend',
      skills: [
        'Spring Boot',
        'ASP.NET Core',
        'Node.js',
        'Entity Framework Core',
        'REST APIs',
        'Yii2',
      ],
    },
    {
      id: 'aiml',
      skills: ['YOLOv5', 'TensorFlow', 'OpenCV', 'NumPy', 'Pandas', 'Matplotlib', 'OCR'],
    },
    {
      id: 'cloud',
      skills: [
        'AWS',
        'Azure',
        'Docker',
        'Jenkins',
        'GitLab CI/CD',
        'Azure DevOps',
        'Prometheus',
        'Grafana',
      ],
    },
    {
      id: 'databases',
      skills: ['MongoDB', 'MySQL', 'SQLite', 'Redis', 'InfluxDB'],
    },
    {
      id: 'tools',
      skills: ['Git', 'GitHub', 'Jira', 'Confluence', 'Postman', 'xUnit', 'Scrum & Kanban'],
    },
  ] satisfies SkillCategory[],

  education: [
    {
      id: 'hof',
      institution: 'Hochschule Hof',
      start: '2023-03',
      end: '2025-06',
    },
    {
      id: 'umt',
      institution: 'University of Management and Technology, Lahore',
      start: '2012-09',
      end: '2018-06',
    },
  ] satisfies EducationItem[],

  certifications: [
    { id: 'ccna', issuer: 'Cisco' },
    { id: 'aws', issuer: 'Amazon Web Services' },
  ] satisfies CertificationItem[],

  /**
   * Blog articles rendered in the Blog section.
   * Add an entry here + matching copy under `blog.items.<id>` in both locale
   * files. When empty, only the "read on Medium" card is shown.
   */
  blogArticles: [] satisfies BlogArticle[] as BlogArticle[],
} as const

export type SiteConfig = typeof siteConfig
