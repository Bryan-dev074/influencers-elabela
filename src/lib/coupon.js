/** Formats a preview only; ElaBela confirms the final coupon name by WhatsApp. */
export function formatCouponName(raw, fallback = 'TUNOMBRE') {
  const name = String(raw ?? '')
    .trim()
    .replace(/\s+/gu, ' ')
    .toUpperCase()
  return name ? Array.from(name).slice(0, 20).join('') : fallback
}

export function nextExampleIndex(current, total) {
  const count = Number.isFinite(total) ? Math.trunc(total) : 0
  if (count <= 0 || !Number.isFinite(current)) return 0
  const next = Math.trunc(current) + 1
  return ((next % count) + count) % count
}
