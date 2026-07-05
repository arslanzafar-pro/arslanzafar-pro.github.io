import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { FiCheck } from 'react-icons/fi'

import { cn } from '@/lib/utils'

export interface DropdownItem<T extends string> {
  value: T
  label: string
  icon?: ReactNode
}

interface DropdownMenuProps<T extends string> {
  ariaLabel: string
  trigger: ReactNode
  items: ReadonlyArray<DropdownItem<T>>
  value: T
  onSelect: (value: T) => void
  align?: 'left' | 'right'
}

/** Small accessible dropdown used by the theme and language switchers. */
export function DropdownMenu<T extends string>({
  ariaLabel,
  trigger,
  items,
  value,
  onSelect,
  align = 'right',
}: DropdownMenuProps<T>) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-primary/50 hover:text-primary"
      >
        {trigger}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'glass absolute top-12 z-50 min-w-40 overflow-hidden rounded-xl p-1.5 shadow-xl',
              align === 'right' ? 'right-0' : 'left-0',
            )}
          >
            {items.map((item) => (
              <li key={item.value} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={item.value === value}
                  onClick={() => {
                    onSelect(item.value)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                    item.value === value
                      ? 'bg-primary-soft text-primary'
                      : 'text-foreground hover:bg-primary-soft/60',
                  )}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.value === value && <FiCheck aria-hidden="true" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
