import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'outline' | 'ghost'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
  /** Renders an <a> instead of a <button> */
  href?: string
  external?: boolean
  download?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  ariaLabel?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white shadow-[0_8px_24px_-8px_var(--glow-1)] hover:brightness-110 active:scale-[0.98]',
  outline:
    'border border-border bg-surface text-foreground hover:border-primary/60 hover:text-primary active:scale-[0.98]',
  ghost: 'text-foreground hover:bg-primary-soft active:scale-[0.98]',
}

/** Polymorphic button — renders an anchor when `href` is set. */
export function Button({
  children,
  variant = 'primary',
  className,
  href,
  external,
  download,
  onClick,
  type = 'button',
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200',
    variantClasses[variant],
    disabled && 'pointer-events-none opacity-60',
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        download={download}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
