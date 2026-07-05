import { useTranslation } from 'react-i18next'
import { FiArrowRight, FiExternalLink } from 'react-icons/fi'
import { SiMedium } from 'react-icons/si'

import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { siteConfig } from '@/config/site'

/**
 * Blog section. Articles come from `siteConfig.blogArticles` (plus matching
 * copy under `blog.items.<id>` in the locale files). While the list is empty,
 * only the Medium profile card is shown — see CUSTOMIZATION.md for how to add
 * articles.
 */
export function Blog() {
  const { t, i18n } = useTranslation()

  return (
    <section id="blog" className="section-pad">
      <div className="container-site">
        <SectionHeading
          eyebrow={t('blog.eyebrow')}
          title={t('blog.title')}
          subtitle={t('blog.subtitle')}
        />

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Medium profile card */}
          <Reveal className={siteConfig.blogArticles.length === 0 ? 'md:col-span-2' : undefined}>
            <a
              href={siteConfig.social.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex h-full flex-col items-center gap-4 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_-20px_var(--glow-1)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-2xl text-primary transition-transform duration-300 group-hover:scale-110">
                <SiMedium aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-bold">{t('blog.mediumCardTitle')}</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                  {t('blog.mediumCardText')}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {t('blog.readOnMedium')}
                <FiArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </a>
          </Reveal>

          {/* Individual articles (empty by default) */}
          {siteConfig.blogArticles.map((article, index) => (
            <Reveal key={article.id} delay={(index + 1) * 0.08}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <time className="font-mono text-xs text-muted" dateTime={article.date}>
                  {new Intl.DateTimeFormat(i18n.language, { dateStyle: 'medium' }).format(
                    new Date(article.date),
                  )}
                </time>
                <h3 className="mt-2 flex-1 text-base font-bold">
                  {t(`blog.items.${article.id}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted">{t(`blog.items.${article.id}.excerpt`)}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {t('blog.readArticle')}
                  <FiExternalLink aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
