import { useTranslation } from 'react-i18next'
import { FiBookOpen, FiMapPin } from 'react-icons/fi'

import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { siteConfig } from '@/config/site'
import { formatMonthYear } from '@/lib/utils'

export function Education() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  return (
    <section id="education" className="section-pad">
      <div className="container-site">
        <SectionHeading
          eyebrow={t('education.eyebrow')}
          title={t('education.title')}
          subtitle={t('education.subtitle')}
        />

        <div className="mx-auto grid max-w-4xl gap-6">
          {siteConfig.education.map((entry, index) => {
            const coursework = t(`education.items.${entry.id}.coursework`, {
              returnObjects: true,
            }) as string[]

            return (
              <Reveal key={entry.id} delay={index * 0.1}>
                <article className="card flex flex-col gap-5 p-6 sm:flex-row sm:p-8">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-xl text-primary">
                    <FiBookOpen aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <span className="chip mb-2 font-mono">
                      {formatMonthYear(entry.start, locale)} — {formatMonthYear(entry.end, locale)}
                    </span>
                    <h3 className="text-lg font-bold text-balance">
                      {t(`education.items.${entry.id}.degree`)}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                      <span className="font-medium text-primary">{entry.institution}</span>
                      <span className="inline-flex items-center gap-1">
                        <FiMapPin aria-hidden="true" className="h-3 w-3" />
                        {t(`education.items.${entry.id}.location`)}
                      </span>
                    </p>
                    <p className="mt-4 mb-2 text-xs font-semibold tracking-wider text-muted uppercase">
                      {t('education.courseworkLabel')}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {coursework.map((course) => (
                        <span
                          key={course}
                          className="rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
