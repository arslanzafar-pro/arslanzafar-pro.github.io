import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TypingEffectProps {
  words: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
}

/** Types, pauses, deletes and rotates through `words`. Static for reduced motion. */
export function TypingEffect({
  words,
  className,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseMs = 1800,
}: TypingEffectProps) {
  const reduceMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion || words.length === 0) return
    const current = words[wordIndex % words.length]

    let delay: number
    let tick: () => void
    if (!deleting && text === current) {
      // Word fully typed — pause, then start deleting
      delay = pauseMs
      tick = () => setDeleting(true)
    } else if (deleting && text === '') {
      // Word fully deleted — move on to the next one
      delay = typingSpeed
      tick = () => {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }
    } else {
      delay = deleting ? deletingSpeed : typingSpeed
      tick = () => setText(current.slice(0, text.length + (deleting ? -1 : 1)))
    }

    const timeout = window.setTimeout(tick, delay)
    return () => window.clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, reduceMotion, typingSpeed, deletingSpeed, pauseMs])

  if (reduceMotion) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className={className} aria-live="polite">
      {text}
      <span aria-hidden="true" className="ml-0.5 inline-block w-0.5 animate-pulse bg-accent">
        &nbsp;
      </span>
    </span>
  )
}
