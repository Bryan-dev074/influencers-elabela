import { useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  TicketPercent,
} from 'lucide-react'
import { COUPON_DESIGNS, EXAMPLE_NAMES } from '../config.js'
import { formatCouponName, nextExampleIndex } from '../lib/coupon.js'

export default function CouponShowcase({ text, motion, ready, onSelection }) {
  const [example, setExample] = useState(0)
  const [designId, setDesignId] = useState('nude')
  const [draft, setDraft] = useState('')
  const [automatic, setAutomatic] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const [status, setStatus] = useState('')
  const container = useRef(null)
  const design = COUPON_DESIGNS.find((item) => item.id === designId)
  const name = draft ? formatCouponName(draft) : EXAMPLE_NAMES[example]
  const cycling =
    automatic &&
    motion &&
    ready &&
    visible &&
    pageVisible &&
    !hovered &&
    !focused

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    )
    if (container.current) observer.observe(container.current)
    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!cycling) return
    const timer = setInterval(() => {
      setExample((current) => nextExampleIndex(current, EXAMPLE_NAMES.length))
      setDesignId(
        (current) =>
          COUPON_DESIGNS[
            nextExampleIndex(
              COUPON_DESIGNS.findIndex((item) => item.id === current),
              COUPON_DESIGNS.length,
            )
          ].id,
      )
    }, 4800)
    return () => clearInterval(timer)
  }, [cycling])

  const choose = (id) => {
    setAutomatic(false)
    setDesignId(id)
    const label =
      id === 'custom'
        ? text.customSelected
        : COUPON_DESIGNS.find((item) => item.id === id).name
    setStatus(`${text.selected}: ${label}`)
    onSelection({ couponName: name, design: label })
  }
  const editName = (event) => {
    const value = Array.from(event.target.value).slice(0, 20).join('')
    setDraft(value)
    setAutomatic(false)
    onSelection({
      couponName: value.trim() ? formatCouponName(value) : '',
      design: designId === 'custom' ? text.customSelected : design.name,
    })
  }
  const toggleExamples = () => {
    if (!automatic) {
      setDraft('')
      setDesignId(COUPON_DESIGNS[example].id)
      onSelection(null)
    }
    setAutomatic((current) => !current)
  }

  return (
    <section
      className="coupon-showcase"
      id="tu-cupon"
      ref={container}
      aria-label={text.yourCoupon}
    >
      <div className="showcase-heading">
        <span className="mini-spark">
          <Sparkles size={14} aria-hidden="true" />
        </span>
        {text.cardEyebrow}
      </div>
      <div className="coupon-stage">
        <div className="stage-ring" aria-hidden="true" />
        <div className="stage-star star-one" aria-hidden="true">
          ✧
        </div>
        <div className="stage-star star-two" aria-hidden="true">
          ✧
        </div>
        <div className="coupon-back" aria-hidden="true" />
        <article className={`coupon-card design-${designId}`}>
          <div className="coupon-pattern" aria-hidden="true" />
          <div className="coupon-shine" aria-hidden="true" />
          <div className="coupon-top">
            <img
              src={
                design?.dark ? '/brand/logo-cream.svg' : '/brand/logo-dark.png'
              }
              alt="ElaBela Glow"
              width="66"
              height="60"
            />
            <span>
              {text.cardLabel}
              <TicketPercent size={17} aria-hidden="true" />
            </span>
          </div>
          <div className="coupon-main">
            <p className="coupon-name" key={name}>
              {name}
            </p>
            <div className="coupon-value">
              <span>
                7<small>%</small>
              </span>
              <p>
                {text.cardDiscount}
                <br />
                <strong>{text.cardCommunity}</strong>
              </p>
            </div>
          </div>
          <div className="coupon-tear" aria-hidden="true">
            <i />
            <span />
            <i />
          </div>
          <div className="coupon-bottom">
            <span>
              {designId === 'custom'
                ? text.customCard
                : 'YOUR NAME. YOUR GLOW.'}
            </span>
            <span className="barcode" aria-hidden="true" />
          </div>
        </article>
        <div className="commission-note">
          <span>
            3<small>%</small>
          </span>
          <div>
            {text.commission}
            <Sparkles size={13} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="example-controls">
        <span>
          <i className={cycling ? 'live-dot' : 'rest-dot'} />
          {automatic && motion ? text.rotating : text.paused}
        </span>
        <button
          type="button"
          onClick={toggleExamples}
          disabled={!motion}
          aria-label={automatic ? text.pause : text.play}
          title={automatic ? text.pause : text.play}
        >
          {automatic ? (
            <Pause size={14} aria-hidden="true" />
          ) : (
            <Play size={14} aria-hidden="true" />
          )}
        </button>
      </div>
      <div
        className="coupon-customizer"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false)
        }}
      >
        <fieldset className="style-options">
          <legend>{text.styleLabel}</legend>
          <div className="swatch-row">
            {COUPON_DESIGNS.map((item) => (
              <button
                key={item.id}
                className={`style-choice ${designId === item.id ? 'chosen' : ''}`}
                type="button"
                onClick={() => choose(item.id)}
                aria-pressed={designId === item.id}
              >
                <span className={`swatch swatch-${item.id}`}>
                  {designId === item.id && (
                    <Check size={15} aria-hidden="true" />
                  )}
                </span>
                <span>{item.name}</span>
              </button>
            ))}
            <button
              type="button"
              className={`style-choice custom-choice ${designId === 'custom' ? 'chosen' : ''}`}
              onClick={() => choose('custom')}
              aria-pressed={designId === 'custom'}
            >
              <span className="swatch swatch-custom">
                <Sparkles size={15} aria-hidden="true" />
              </span>
              <span>{text.customStyle}</span>
            </button>
          </div>
        </fieldset>
        <label htmlFor="coupon-name-input">{text.nameLabel}</label>
        <div className="name-field">
          <TicketPercent size={18} aria-hidden="true" />
          <input
            id="coupon-name-input"
            value={draft}
            onChange={editName}
            type="text"
            autoComplete="off"
            spellCheck="false"
            placeholder={text.namePlaceholder}
            aria-describedby="name-hint"
          />
          <ChevronRight size={18} aria-hidden="true" />
        </div>
        <p id="name-hint" className="input-hint">
          {text.nameHint}
        </p>
        <p className="sr-only" aria-live="polite">
          {status}
        </p>
      </div>
      <p className="sample-label">
        {text.cardExample} · {text.demoNote}
      </p>
    </section>
  )
}
