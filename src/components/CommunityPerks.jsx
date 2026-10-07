import { ReceiptText, Truck } from 'lucide-react'
import './CommunityPerks.css'

export default function CommunityPerks({ text }) {
  return (
    <section
      className="community-perks"
      aria-labelledby="community-perks-title"
    >
      <h2 id="community-perks-title">{text.perksLabel}</h2>
      <div className="community-perk">
        <span className="community-perk-icon" aria-hidden="true">
          <ReceiptText size={25} strokeWidth={1.5} />
        </span>
        <div>
          <h3>{text.vatTitle}</h3>
          <p>{text.vatCopy}</p>
        </div>
      </div>
      <div className="community-perk">
        <span className="community-perk-icon" aria-hidden="true">
          <Truck size={26} strokeWidth={1.5} />
        </span>
        <div>
          <h3>{text.shippingTitle}</h3>
          <p>{text.shippingCopy}</p>
        </div>
      </div>
    </section>
  )
}
