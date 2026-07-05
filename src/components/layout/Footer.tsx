import { useTranslation } from 'react-i18next'
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiMedium } from 'react-icons/si'

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { siteConfig } from '@/config/site'

const socialLinks = [
  { href: siteConfig.social.github, label: 'GitHub', Icon: FiGithub },
  { href: siteConfig.social.linkedin, label: 'LinkedIn', Icon: FiLinkedin },
  { href: siteConfig.social.medium, label: 'Medium', Icon: SiMedium },
  { href: `mailto:${siteConfig.email}`, label: 'E-Mail', Icon: FiMail },
]

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-2">
          <a href="#home" className="font-mono text-lg font-bold">
            <span className="gradient-text">&lt;AZ /&gt;</span>
          </a>
          <p className="mt-3 max-w-sm text-sm text-muted">{t('footer.tagline')}</p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label={t('footer.quickLinks')}>
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
            {t('footer.quickLinks')}
          </h3>
          <ul className="grid grid-cols-2 gap-2">
            {siteConfig.sections
              .filter((s) => s.id !== 'home')
              .map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {t(`nav.${section.id}`)}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        {/* Preferences */}
        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
            {t('footer.connect')}
          </h3>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <a
              href="#home"
              aria-label={t('a11y.backToTop')}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:text-primary"
            >
              <FiArrowUp aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {year} {siteConfig.name}. {t('footer.rights')}
          </p>
          <p>{t('footer.builtWith')}</p>
        </div>
      </div>
    </footer>
  )
}
