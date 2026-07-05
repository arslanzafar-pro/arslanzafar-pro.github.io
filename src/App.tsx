import { useTranslation } from 'react-i18next'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { BackToTop } from '@/components/ui/BackToTop'
import { About } from '@/sections/About'
import { Blog } from '@/sections/Blog'
import { Certifications } from '@/sections/Certifications'
import { Contact } from '@/sections/Contact'
import { Education } from '@/sections/Education'
import { Experience } from '@/sections/Experience'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'

export default function App() {
  const { t } = useTranslation()

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        {t('a11y.skipToContent')}
      </a>

      <Navbar />

      <main id="content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Blog />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
