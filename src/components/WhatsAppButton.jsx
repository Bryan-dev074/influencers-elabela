import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react'

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
        <MessageCircle className="whatsapp-bubble" strokeWidth={1.6} />
        <Phone className="whatsapp-phone" strokeWidth={2} />
      </span>
      <span className="whatsapp-copy">
        <span className="whatsapp-title">{children}</span>
        <span className="whatsapp-detail">{detail}</span>
      </span>
      <span className="whatsapp-arrow" aria-hidden="true">
        <ArrowUpRight size={20} strokeWidth={1.7} />
      </span>
    </a>
  )
}
