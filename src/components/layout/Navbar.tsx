import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMenu, FiX } from 'react-icons/fi'

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { siteConfig } from '@/config/site'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/utils'

const allSectionIds = siteConfig.sections.map((s) => s.id)
const navSections = siteConfig.sections.filter((s) => s.inNav)

export function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(allSectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent background scrolling while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const linkClass = (id: string) =>
    cn(
      'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      activeId === id ? 'text-primary' : 'text-muted hover:text-foreground',
    )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-[0_8px_32px_-16px_rgba(2,6,23,0.4)]' : 'bg-transparent',
      )}
    >
      <nav
        aria-label={t('a11y.mainNavigation')}
        className="container-site flex h-16 items-center justify-between"
      >
        {/* Logo */}
        <a
          href="#home"
          className="font-mono text-lg font-bold tracking-tight"
          aria-label={siteConfig.name}
        >
          <span className="gradient-text">&lt;AZ /&gt;</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navSections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className={linkClass(section.id)}>
                {t(`nav.${section.id}`)}
                {activeId === section.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:text-primary md:hidden"
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="glass overflow-hidden border-t border-border md:hidden"
          >
            <ul className="container-site flex flex-col gap-1 py-4">
              {navSections.map((section, index) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <a
                    href={`#${section.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'block rounded-lg px-3 py-2.5 text-base font-medium transition-colors',
                      activeId === section.id
                        ? 'bg-primary-soft text-primary'
                        : 'text-muted hover:bg-primary-soft/50 hover:text-foreground',
                    )}
                  >
                    {t(`nav.${section.id}`)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
