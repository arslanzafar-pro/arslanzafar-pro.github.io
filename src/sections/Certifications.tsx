import { useTranslation } from 'react-i18next'
import { FiAward } from 'react-icons/fi'

import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { siteConfig } from '@/config/site'

export function Certifications() {
  const { t } = useTranslation()

  // Hide the section gracefully when there is nothing to show
  if (siteConfig.certifications.length === 0) return null

  return (
    <section id="certifications" className="section-pad bg-surface/40">
      <div className="container-site">
        <SectionHeading eyebrow={t('certifications.eyebrow')} title={t('certifications.title')} />

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {siteConfig.certifications.map((cert, index) => (
            <Reveal key={cert.id} delay={index * 0.1}>
              <article className="card flex h-full items-center gap-4 p-5 transition-transform duration-300 hover:-translate-y-1">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-lg text-primary">
                  <FiAward aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-balance">
                    {t(`certifications.items.${cert.id}`)}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">{cert.issuer}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
