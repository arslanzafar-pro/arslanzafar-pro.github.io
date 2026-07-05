import { useTranslation } from 'react-i18next'
import { FiCheckCircle, FiMapPin } from 'react-icons/fi'

import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { siteConfig } from '@/config/site'
import { cn, formatMonthYear } from '@/lib/utils'

export function Experience() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const period = (start: string, end: string | null) =>
    `${formatMonthYear(start, locale)} — ${end ? formatMonthYear(end, locale) : t('experience.present')}`

  return (
    <section id="experience" className="section-pad bg-surface/40">
      <div className="container-site">
        <SectionHeading
          eyebrow={t('experience.eyebrow')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        <div className="relative">
          {/* Timeline axis */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-4 h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/70 via-border to-transparent md:left-1/2"
          />

          <ol>
            {siteConfig.experience.map((job, index) => {
              const highlights = t(`experience.items.${job.id}.highlights`, {
                returnObjects: true,
              }) as string[]
              const isLeft = index % 2 === 0

              return (
                <li
                  key={job.id}
                  className={cn(
                    'relative mb-10 pl-12 last:mb-0 md:w-1/2 md:pl-0',
                    isLeft ? 'md:pr-12' : 'md:ml-auto md:pl-12',
                  )}
                >
                  {/* Timeline dot */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-7 left-4 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-primary bg-background',
                      isLeft
                        ? 'md:left-auto md:right-0 md:translate-x-1/2'
                        : 'md:left-0 md:-translate-x-1/2',
                    )}
                  />

                  <Reveal>
                    <article className="card group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_-20px_var(--glow-1)]">
                      <span className="chip mb-3 font-mono">{period(job.start, job.end)}</span>
                      <h3 className="text-lg font-bold">{t(`experience.items.${job.id}.role`)}</h3>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                        <span className="font-medium text-primary">{job.company}</span>
                        <span className="inline-flex items-center gap-1">
                          <FiMapPin aria-hidden="true" className="h-3 w-3" />
                          {t(`experience.items.${job.id}.location`)}
                        </span>
                      </p>
                      <p className="mt-3 text-sm text-pretty text-muted italic">
                        {t(`experience.items.${job.id}.summary`)}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2 text-sm">
                            <FiCheckCircle
                              aria-hidden="true"
                              className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                            />
                            <span className="text-pretty">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {job.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
