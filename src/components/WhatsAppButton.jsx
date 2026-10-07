import { ArrowUpRight } from 'lucide-react'

export default function WhatsAppButton({
  href,
  children,
  detail,
  variant = 'hero',
}) {
  return (
    <a
      className={`button button-whatsapp button-whatsapp--${variant}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="whatsapp-icon" aria-hidden="true">
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
  )
}
