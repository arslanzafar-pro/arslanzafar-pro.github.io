import { motion, useReducedMotion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { TypingEffect } from '@/components/ui/TypingEffect'
import { siteConfig } from '@/config/site'

// three.js is heavy — load it in its own chunk, after first paint
const ParticleField = lazy(() => import('@/components/three/ParticleField'))

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
}

export function Hero() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const roles = t('hero.roles', { returnObjects: true }) as string[]

  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden">
      {/* Background: 3D particles + soft gradient glows */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-125 w-125 rounded-full blur-3xl"
        style={{ background: 'var(--glow-1)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-125 w-125 rounded-full blur-3xl"
        style={{ background: 'var(--glow-2)' }}
      />

      <motion.div
        className="container-site relative z-10 py-28 text-center"
        variants={container}
        initial={reduceMotion ? false : 'hidden'}
        animate={reduceMotion ? undefined : 'visible'}
      >
        <motion.p variants={item} className="mb-6">
          <span className="chip">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t('hero.available')}
          </span>
        </motion.p>

        <motion.p variants={item} className="font-mono text-sm text-accent sm:text-base">
          {t('hero.greeting')}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-3 text-5xl font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          <span className="gradient-text">{siteConfig.name}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 min-h-8 text-xl font-semibold text-foreground sm:text-2xl"
        >
          <TypingEffect words={roles} />
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-base text-pretty text-muted sm:text-lg"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton>
            <Button href={siteConfig.resumeFile} download variant="primary">
              <FiDownload aria-hidden="true" />
              {t('hero.downloadResume')}
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button href="#contact" variant="outline">
              <FiMail aria-hidden="true" />
              {t('hero.contactMe')}
            </Button>
          </MagneticButton>
          <div className="flex gap-2">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('hero.githubProfile')}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
            >
              <FiGithub aria-hidden="true" />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('hero.linkedinProfile')}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
            >
              <FiLinkedin aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label={t('hero.scrollDown')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-primary"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FiChevronDown size={26} aria-hidden="true" />
      </motion.a>
    </section>
  )
}
