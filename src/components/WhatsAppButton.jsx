import { ArrowUpRight } from 'lucide-react'
import './WhatsAppButton.css'

export default function WhatsAppButton({
  href,
  children,
  detail,
  variant = 'hero',
}) {
  return (
    <div className={`whatsapp-beacon whatsapp-beacon--${variant}`}>
      <span className="whatsapp-lights" aria-hidden="true">
        <span className="whatsapp-light whatsapp-aura" />
        <span className="whatsapp-light whatsapp-orbit whatsapp-orbit--soft" />
        <span className="whatsapp-light whatsapp-orbit" />
        {['one', 'two', 'three', 'four', 'five', 'six'].map((spark) => (
          <span
            className={`whatsapp-light whatsapp-spark whatsapp-spark--${spark}`}
            key={spark}
          />
        ))}
      </span>
      <a
        className={`button button-whatsapp button-whatsapp--${variant}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="whatsapp-icon" aria-hidden="true">
          <span className="whatsapp-call-wave whatsapp-call-wave--left" />
          <span className="whatsapp-call-wave whatsapp-call-wave--right" />
          <img
            className="whatsapp-mark"
            src={
              variant === 'closing'
                ? '/brand/whatsapp-black.svg'
                : '/brand/whatsapp-white.svg'
            }
            alt=""
            width="32"
            height="32"
          />
        </span>
        <span className="whatsapp-copy">
          <span className="whatsapp-title">
            {children}
            {variant === 'closing' && (
              <span className="sr-only"> (WhatsApp)</span>
            )}
          </span>
          <span className="whatsapp-detail">{detail}</span>
        </span>
        <span className="whatsapp-arrow" aria-hidden="true">
          <ArrowUpRight size={20} strokeWidth={1.7} />
        </span>
      </a>
    </div>
  )
}
