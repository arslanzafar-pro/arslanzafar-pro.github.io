import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in view, for navbar highlighting.
 * `sectionIds` must be in document order and referentially stable.
 */
export function useScrollSpy(sectionIds: readonly string[], offset = 120): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const scrollPos = window.scrollY + offset
      let current = sectionIds[0] ?? ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) current = id
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds, offset])

  return activeId
}
