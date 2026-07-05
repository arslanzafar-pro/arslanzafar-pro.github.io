import { useTranslation } from 'react-i18next'

import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TechIcon } from '@/components/ui/TechIcon'
import { siteConfig } from '@/config/site'

export function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="section-pad bg-surface/40">
      <div className="container-site">
        <SectionHeading
          eyebrow={t('skills.eyebrow')}
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.skills.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.06}>
              <div className="card h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_-20px_var(--glow-1)]">
                <h3 className="mb-4 text-sm font-semibold tracking-wider text-primary uppercase">
                  {t(`skills.categories.${category.id}`)}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <TechIcon name={skill} className="h-4 w-4 text-accent" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
