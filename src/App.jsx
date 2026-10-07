import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  CirclePlay,
  Heart,
  MessageCircle,
  Pause,
  Play,
  ShoppingBag,
  Signature,
  Sparkles,
  TicketPercent,
} from 'lucide-react'
import AmbientBackground from './components/AmbientBackground.jsx'
import CouponShowcase from './components/CouponShowcase.jsx'
import Intro from './components/Intro.jsx'
import { useMotionPreference } from './hooks/useMotionPreference.js'
import { content } from './data/content.js'
import { CONTACT_PHONE, STORE_URL } from './config.js'
import { buildWhatsAppUrl } from './lib/contact.js'

function LetterTitle({ lines }) {
  let letterIndex = 0
  return (
    <h1 id="main-title" tabIndex={-1} aria-label={lines.join(' ')}>
      {lines.map((line, lineIndex) => (
        <span
          className={`title-line ${lineIndex === 2 ? 'title-shimmer' : ''}`}
          key={line}
          aria-hidden="true"
        >
          {line.split(' ').map((word, wordIndex) => (
            <span className="title-word" key={wordIndex}>
              {Array.from(word).map((letter, index) => (
                <span
                  className="title-letter"
                  key={index}
                  style={{ '--letter-delay': `${letterIndex++ * 19}ms` }}
                >
                  {letter}
                </span>
              ))}
              {wordIndex < line.split(' ').length - 1 && '\u00a0'}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}

function WhatsAppLink({ href, children, className = '' }) {
  return (
    <a
      className={`button button-whatsapp ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span>{children}</span>
      <ArrowRight className="button-arrow" size={18} aria-hidden="true" />
    </a>
  )
}

export default function App() {
  const [language, setLanguage] = useState('es')
  const [introActive, setIntroActive] = useState(true)
  const [selection, setSelection] = useState(null)
  const { active: motion, reduced, toggle } = useMotionPreference()
  const text = content[language]
  const main = useRef(null)
  const closeIntro = useCallback(() => {
    setIntroActive(false)
    requestAnimationFrame(() =>
      document.getElementById('main-title')?.focus({ preventScroll: true }),
    )
  }, [])
  const href = buildWhatsAppUrl({
    phone: CONTACT_PHONE,
    language,
    ...selection,
  })
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])
  useEffect(() => {
    document.documentElement.style.scrollBehavior = motion ? 'smooth' : 'auto'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [motion])
  useEffect(() => {
    document.body.style.overflow = introActive ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [introActive])
  useEffect(() => {
    if (introActive) return
    const elements = main.current?.querySelectorAll('.scroll-reveal') ?? []
    if (!motion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [introActive, motion])
  const replayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setIntroActive(true)
  }
  const stepIcons = [MessageCircle, Signature, ShoppingBag]
  return (
    <div className={`app ${motion ? 'motion-enabled' : 'motion-paused'}`}>
      <AmbientBackground active={motion && !introActive} />
      <Intro
        active={introActive}
        reduced={!motion}
        text={text}
        onComplete={closeIntro}
      />
      <div
        className={`page-scene ${introActive ? 'scene-waiting' : 'scene-ready'}`}
        inert={introActive ? '' : undefined}
      >
        <a className="skip-link" href="#contenido">
          {language === 'es' ? 'Saltar al contenido' : 'Ir para o conteúdo'}
        </a>
        <header className="site-header">
          <a className="brand" href="#inicio" aria-label="ElaBela Influencers">
            <img
              src="/brand/logo-dark.png"
              alt="ElaBela Glow"
              width="76"
              height="70"
            />
            <span className="brand-divider" aria-hidden="true" />
            <span>
              Influencers
              <TicketPercent size={13} aria-hidden="true" />
            </span>
          </a>
          <nav
            aria-label={
              language === 'es' ? 'Navegación principal' : 'Navegação principal'
            }
          >
            <a href="#como-funciona">{text.how}</a>
            <a href="#tu-cupon">{text.yourCoupon}</a>
          </nav>
          <div className="header-tools">
            <div
              className="language-switch"
              role="group"
              aria-label={text.languageLabel}
            >
              {['es', 'pt'].map((lang) => (
                <button
                  type="button"
                  key={lang}
                  aria-pressed={language === lang}
                  onClick={() => setLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              className="icon-button motion-control"
              type="button"
              onClick={toggle}
              disabled={reduced}
              aria-label={
                reduced
                  ? text.motionReduced
                  : motion
                    ? text.motionOn
                    : text.motionOff
              }
              title={
                reduced
                  ? text.motionReduced
                  : motion
                    ? text.motionOn
                    : text.motionOff
              }
            >
              {motion ? (
                <Pause size={15} aria-hidden="true" />
              ) : (
                <Play size={15} aria-hidden="true" />
              )}
            </button>
            <button
              className="icon-button intro-replay"
              type="button"
              onClick={replayIntro}
              aria-label={text.replay}
              title={text.replay}
            >
              <CirclePlay size={18} aria-hidden="true" />
            </button>
          </div>
        </header>
        <main ref={main} id="contenido">
          <section className="hero page-width" id="inicio">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                <span />
                <Sparkles size={13} aria-hidden="true" />
                {text.eyebrow}
              </p>
              <LetterTitle lines={text.heroLines} />
              <p className="hero-description">{text.heroCopy}</p>
              <div className="hero-action">
                <WhatsAppLink href={href}>{text.cta}</WhatsAppLink>
                <p>
                  <span className="status-dot" />
                  {text.heroHint}
                </p>
              </div>
              <div className="benefits">
                <div className="benefit">
                  <div className="benefit-number">
                    7<span>%</span>
                  </div>
                  <div>
                    <h2>{text.discountTitle}</h2>
                    <p>{text.discountBody}</p>
                  </div>
                </div>
                <div className="benefit">
                  <div className="benefit-number">
                    3<span>%</span>
                  </div>
                  <div>
                    <h2>{text.commissionTitle}</h2>
                    <p>{text.commissionBody}</p>
                  </div>
                </div>
              </div>
            </div>
            <CouponShowcase
              text={text}
              motion={motion}
              ready={!introActive}
              onSelection={setSelection}
            />
            <a className="scroll-cue" href="#como-funciona">
              <ArrowDown size={15} aria-hidden="true" />
              {text.how}
            </a>
          </section>
          <section
            className="how-section page-width scroll-reveal"
            id="como-funciona"
          >
            <div className="section-heading">
              <p className="eyebrow">
                <span />
                {text.stepsEyebrow}
              </p>
              <h2>{text.stepsTitle}</h2>
              <p className="section-flourish" aria-hidden="true">
                ✧
              </p>
            </div>
            <ol className="steps">
              {text.steps.map((step, index) => {
                const Icon = stepIcons[index]
                return (
                  <li key={step.title} className="step">
                    <div className="step-top">
                      <span className="step-icon">
                        <Icon size={25} strokeWidth={1.4} aria-hidden="true" />
                      </span>
                      <span className="step-number">0{index + 1}</span>
                    </div>
                    <span className="step-tag">{step.tag}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                )
              })}
            </ol>
          </section>
          <section className="freedom-section page-width scroll-reveal">
            <div className="freedom-art" aria-hidden="true">
              <div className="mini-ticket mini-nude">
                <TicketPercent size={26} />
                <span>YOUR GLOW</span>
              </div>
              <div className="mini-ticket mini-cocoa">
                <Sparkles size={23} />
                <span>YOUR WAY</span>
              </div>
              <Signature
                className="freedom-signature"
                size={60}
                strokeWidth={1}
              />
            </div>
            <div>
              <p className="eyebrow">
                <Sparkles size={14} aria-hidden="true" />
                {text.yourCoupon}
              </p>
              <h2>{text.freedomTitle}</h2>
              <p>{text.freedomBody}</p>
              <a href="#tu-cupon" className="text-link">
                {text.styleLabel}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </section>
          <section
            className="closing-section page-width scroll-reveal"
            id="contacto"
          >
            <div className="closing-glow" aria-hidden="true" />
            <Heart
              className="closing-heart"
              size={110}
              strokeWidth={0.5}
              aria-hidden="true"
            />
            <p className="eyebrow">{text.closingEyebrow}</p>
            <h2>{text.closingTitle}</h2>
            <p className="closing-copy">{text.closingCopy}</p>
            <WhatsAppLink href={href}>{text.closingCta}</WhatsAppLink>
            <span className="closing-signature" aria-hidden="true">
              with love,
            </span>
            <img
              className="closing-logo"
              src="/brand/logo-cream.svg"
              alt="ElaBela Glow"
              width="66"
              height="60"
            />
          </section>
          <section className="faq-section page-width scroll-reveal">
            <h2>
              {text.faqTitle}
              <Sparkles size={18} aria-hidden="true" />
            </h2>
            <div className="faq-list">
              {text.faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>
        <footer className="site-footer page-width">
          <div>
            <img
              src="/brand/logo-dark.png"
              alt="ElaBela Glow"
              width="54"
              height="49"
            />
            <p>{text.footer}</p>
          </div>
          <a href={STORE_URL} target="_blank" rel="noopener noreferrer">
            {text.visitStore}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
          <span>© {new Date().getFullYear()} ElaBela</span>
        </footer>
      </div>
    </div>
  )
}
