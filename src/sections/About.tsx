import { useTranslation } from 'react-i18next'
import { FiAward, FiGlobe, FiMapPin, FiTarget } from 'react-icons/fi'
import type { IconType } from 'react-icons'

import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface Fact {
  labelKey: string
  valueKey: string
  Icon: IconType
}

const facts: Fact[] = [
  { labelKey: 'about.facts.location', valueKey: 'about.facts.locationValue', Icon: FiMapPin },
  { labelKey: 'about.facts.degree', valueKey: 'about.facts.degreeValue', Icon: FiAward },
  { labelKey: 'about.facts.focus', valueKey: 'about.facts.focusValue', Icon: FiTarget },
  { labelKey: 'about.facts.languages', valueKey: 'about.facts.languagesValue', Icon: FiGlobe },
]

export function About() {
  const { t } = useTranslation()
  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[]
  const stats = t('about.stats', { returnObjects: true }) as Array<{
    value: string
    label: string
  }>
  const interests = t('about.interests', { returnObjects: true }) as string[]

  return (
    <section id="about" className="section-pad">
      <div className="container-site">
        <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Story + goals */}
          <div className="space-y-5 lg:col-span-3">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="leading-relaxed text-pretty text-muted">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <div className="card border-l-4 border-l-primary p-5">
                <h3 className="mb-1.5 text-sm font-semibold tracking-wider text-primary uppercase">
                  {t('about.goalsTitle')}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{t('about.goals')}</p>
              </div>
            </Reveal>
          </div>

          {/* Facts + interests */}
          <div className="space-y-6 lg:col-span-2">
            <Reveal delay={0.1}>
              <div className="card p-6">
                <h3 className="mb-5 text-sm font-semibold tracking-wider text-foreground uppercase">
                  {t('about.factsTitle')}
                </h3>
                <ul className="space-y-4">
                  {facts.map(({ labelKey, valueKey, Icon }) => (
                    <li key={labelKey} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                        <Icon aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-medium tracking-wide text-muted uppercase">
                          {t(labelKey)}
                        </p>
                        <p className="text-sm font-medium">{t(valueKey)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="card p-6">
                <h3 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
                  {t('about.interestsTitle')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span key={interest} className="chip">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="card p-6 text-center transition-transform duration-300 hover:-translate-y-1">
                <p className="gradient-text text-3xl font-extrabold sm:text-4xl">{stat.value}</p>
                <p className="mt-1.5 text-sm text-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
