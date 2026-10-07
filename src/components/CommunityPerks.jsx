import { ReceiptText, Truck } from 'lucide-react'
import './CommunityPerks.css'

export default function CommunityPerks({ text }) {
  return (
    <section
      className="community-perks"
      aria-labelledby="community-perks-title"
    >
      <h2 id="community-perks-title">{text.perksLabel}</h2>
      <div className="community-perk community-perk-vat">
        <span className="community-perk-art" aria-hidden="true">
          <ReceiptText
            className="community-perk-icon"
            size={34}
            strokeWidth={1.35}
          />
        </span>
        <div>
          <h3>
            <span>{text.vatTitle}</span>
          </h3>
          <p>{text.vatCopy}</p>
        </div>
      </div>
      <div className="community-perk community-perk-shipping">
        <span className="community-perk-art" aria-hidden="true">
          <span className="community-perk-trail" />
          <Truck className="community-perk-icon" size={38} strokeWidth={1.35} />
        </span>
        <div>
          <h3>
            <span>{text.shippingTitle}</span>
          </h3>
          <p>{text.shippingCopy}</p>
        </div>
      </div>
    </section>
  )
}
