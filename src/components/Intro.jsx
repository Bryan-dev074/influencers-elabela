import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, TicketPercent } from 'lucide-react'
import './Intro.css'

const DURATION = 4550
const REVEAL_AT = 3750
const REDUCED_DURATION = 650

export default function Intro({ active, reduced, text, onReveal, onComplete }) {
  const skip = useRef(null)
  const done = useRef(false)
  const sequence = useRef(null)
  const [gentle, setGentle] = useState(reduced)
  const finish = useCallback(() => {
    if (!done.current) {
      done.current = true
      onComplete()
    }
  }, [onComplete])

  useEffect(() => {
    if (!active) {
      sequence.current = null
      setGentle(reduced)
      return
    }
    const now = performance.now()
    if (!sequence.current) {
      sequence.current = {
        startedAt: now,
        completeAt: now + (reduced ? REDUCED_DURATION : DURATION),
        revealed: false,
        gentle: reduced,
      }
      done.current = false
      setGentle(reduced)
      skip.current?.focus({ preventScroll: true })
    } else if (reduced) {
      sequence.current.completeAt = Math.min(
        sequence.current.completeAt,
        now + REDUCED_DURATION,
      )
      sequence.current.gentle = true
      setGentle(true)
    }
    const run = sequence.current
    const reveal = () => {
      if (!done.current && !run.revealed) {
        run.revealed = true
        onReveal()
      }
    }
    const revealTimer = setTimeout(
      reveal,
      run.gentle ? 0 : Math.max(0, run.startedAt + REVEAL_AT - now),
    )
    const completeTimer = setTimeout(finish, Math.max(0, run.completeAt - now))
    return () => {
      clearTimeout(revealTimer)
      clearTimeout(completeTimer)
    }
  }, [active, reduced, onReveal, finish])

  if (!active) return null

  return (
    <div
      className={`intro ${reduced || gentle ? 'intro-reduced' : ''}`}
      style={{
        '--intro-duration': `${DURATION}ms`,
        '--intro-exit-delay': `${REVEAL_AT}ms`,
        '--intro-exit-duration': `${DURATION - REVEAL_AT}ms`,
      }}
      role="dialog"
      aria-modal="true"
      aria-label={text.introLabel}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          event.preventDefault()
          skip.current?.focus({ preventScroll: true })
        } else if (event.key === 'Escape') {
          finish()
        }
      }}
    >
      <div className="intro-panel intro-panel-top" aria-hidden="true" />
      <div className="intro-panel intro-panel-bottom" aria-hidden="true" />
      <div className="intro-atmosphere" aria-hidden="true">
        <div className="intro-lights" />
        <div className="intro-grain" />
        <div className="intro-ticket-outline">
          <span />
        </div>
      </div>
      <div className="intro-topline" aria-hidden="true">
        <i />
        {text.program}
      </div>
      <div className="intro-composition">
        <div className="intro-logo-anchor">
          <div className="intro-logo">
            <div className="intro-logo-mark">
              <img
                src="/brand/logo-cream.svg"
                alt="ElaBela Glow"
                width="220"
                height="200"
              />
              <span className="intro-logo-shine" aria-hidden="true">
                <i />
              </span>
            </div>
          </div>
        </div>
        <div className="intro-word">
          <span className="sr-only">Influencers</span>
          <span className="intro-word-text" aria-hidden="true">
            {Array.from('Influencers').map((letter, index) => (
              <span
                className="intro-letter"
                key={index}
                style={{ '--intro-letter-delay': `${index * 38}ms` }}
              >
                {letter}
              </span>
            ))}
          </span>
          <span className="intro-ticket" aria-hidden="true">
            <TicketPercent strokeWidth={1.35} />
          </span>
        </div>
        <p className="intro-caption">{text.introCaption}</p>
        <span className="intro-underline" aria-hidden="true" />
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
