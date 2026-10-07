import { useEffect, useRef } from 'react'
import { ArrowRight, TicketPercent } from 'lucide-react'

export default function Intro({ active, reduced, text, onComplete }) {
  const skip = useRef(null)
  const done = useRef(false)
  useEffect(() => {
    if (!active) return
    done.current = false
    skip.current?.focus({ preventScroll: true })
    const timer = setTimeout(
      () => {
        if (!done.current) {
          done.current = true
          onComplete()
        }
      },
      reduced ? 650 : 4850,
    )
    return () => clearTimeout(timer)
  }, [active, reduced, onComplete])
  if (!active) return null
  const finish = () => {
    if (!done.current) {
      done.current = true
      onComplete()
    }
  }
  return (
    <div
      className={`intro ${reduced ? 'intro-reduced' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={text.introLabel}
    >
      <div className="intro-lights" aria-hidden="true" />
      <div className="intro-grain" aria-hidden="true" />
      <div className="intro-drop" aria-hidden="true" />
      <div className="intro-ripples" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="intro-composition">
        <div className="intro-logo">
          <img
            src="/brand/logo-cream.svg"
            alt="ElaBela Glow"
            width="220"
            height="200"
          />
          <span className="intro-logo-shine" aria-hidden="true" />
        </div>
        <div className="intro-word">
          <span>Influencers</span>
          <TicketPercent
            className="intro-ticket"
            strokeWidth={1.35}
            aria-hidden="true"
          />
        </div>
        <p className="intro-caption">{text.introCaption}</p>
      </div>
      <div className="intro-progress" aria-hidden="true">
        <span />
      </div>
      <button ref={skip} type="button" className="intro-skip" onClick={finish}>
        {text.skip}
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
