import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiExternalLink, FiGithub, FiLock, FiZap } from 'react-icons/fi'

import { SectionHeading } from '@/components/ui/SectionHeading'
import { TechIcon } from '@/components/ui/TechIcon'
import { siteConfig } from '@/config/site'
import type { ProjectTag } from '@/config/site'
import { cn } from '@/lib/utils'

type Filter = 'all' | ProjectTag

export function Projects() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const [filter, setFilter] = useState<Filter>('all')

  const tags = useMemo(() => {
    const unique = new Set<ProjectTag>()
    siteConfig.projects.forEach((project) => project.tags.forEach((tag) => unique.add(tag)))
    return [...unique]
  }, [])

  const visibleProjects = siteConfig.projects.filter(
    (project) => filter === 'all' || (project.tags as readonly ProjectTag[]).includes(filter),
  )

  return (
    <section id="projects" className="section-pad">
      <div className="container-site">
        <SectionHeading
          eyebrow={t('projects.eyebrow')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        {/* Technology filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="group">
          {(['all', ...tags] as Filter[]).map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={filter === tag}
              onClick={() => setFilter(tag)}
              className={cn(
                'cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
                filter === tag
                  ? 'border-primary bg-primary text-white shadow-[0_6px_20px_-8px_var(--glow-1)]'
                  : 'border-border bg-surface text-muted hover:border-primary/50 hover:text-primary',
              )}
            >
              {tag === 'all' ? t('projects.filterAll') : t(`projects.filters.${tag}`)}
            </button>
          ))}
        </div>

        <motion.div layout={!reduceMotion} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.article
                key={project.id}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className="card group flex flex-col overflow-hidden"
              >
                {/* Visual: screenshot, or generated placeholder */}
                <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-border bg-gradient-to-br from-primary-soft via-background to-primary-soft">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={t(`projects.items.${project.id}.title`)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <TechIcon
                      name={project.technologies[0]}
                      className="h-14 w-14 text-primary/60 transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="glass rounded-full px-2.5 py-0.5 text-xs font-medium"
                      >
                        {t(`projects.filters.${tag}`)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold">{t(`projects.items.${project.id}.title`)}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-muted">
                    {t(`projects.items.${project.id}.description`)}
                  </p>

                  <p className="mt-4 flex items-start gap-2 rounded-lg bg-primary-soft px-3 py-2 text-xs font-medium">
                    <FiZap aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {t(`projects.items.${project.id}.achievement`)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted"
                      >
                        <TechIcon name={tech} className="h-3 w-3" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-4 text-sm">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-primary"
                      >
                        <FiGithub aria-hidden="true" />
                        {t('projects.viewCode')}
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-primary"
                      >
                        <FiExternalLink aria-hidden="true" />
                        {t('projects.viewLive')}
                      </a>
                    )}
                    {project.proprietary && !project.github && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                        <FiLock aria-hidden="true" />
                        {t('projects.proprietary')}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
