import test from 'node:test'
import assert from 'node:assert/strict'
import { formatCouponName, nextExampleIndex } from '../src/lib/coupon.js'
import { buildWhatsAppUrl } from '../src/lib/contact.js'

test('coupon preview trims, collapses whitespace and uppercases Unicode names', () => {
  assert.equal(formatCouponName('  María\t  del\n Mar  '), 'MARÍA DEL MAR')
})

test('empty coupon preview uses the default or requested fallback', () => {
  assert.equal(formatCouponName('\t \n'), 'TUNOMBRE')
  assert.equal(formatCouponName('', 'MICUPON'), 'MICUPON')
  assert.equal(formatCouponName(null), 'TUNOMBRE')
})

test('coupon preview caps Unicode codepoints without breaking surrogate pairs', () => {
  const formatted = formatCouponName(`${'✨'.repeat(19)}💖EXTRA`)
  assert.equal(formatted, `${'✨'.repeat(19)}💖`)
  assert.equal(Array.from(formatted).length, 20)
})

test('coupon preview applies the limit after uppercase expansion', () => {
  assert.equal(formatCouponName(`${'a'.repeat(19)}ß`), `${'A'.repeat(19)}S`)
})

test('example rotation advances and wraps at the end', () => {
  assert.equal(nextExampleIndex(0, 3), 1)
  assert.equal(nextExampleIndex(2, 3), 0)
  assert.equal(nextExampleIndex(-1, 3), 0)
  assert.equal(nextExampleIndex(7, 3), 2)
})

test('example rotation safely handles an empty list and invalid indexes', () => {
  assert.equal(nextExampleIndex(5, 0), 0)
  assert.equal(nextExampleIndex(5, -2), 0)
  assert.equal(nextExampleIndex(2, 1), 0)
  assert.equal(nextExampleIndex(Number.NaN, 3), 0)
  assert.equal(nextExampleIndex(0, Number.NaN), 0)
})

test('WhatsApp contact accepts international phone separators and opens negotiation in Spanish', () => {
  const url = new URL(buildWhatsAppUrl({ phone: '+595 (993) 038-777' }))
  assert.equal(url.origin, 'https://wa.me')
  assert.equal(url.pathname, '/595993038777')
  assert.match(url.searchParams.get('text'), /influencer/i)
  assert.match(url.searchParams.get('text'), /conversar|negociar|colaboración/i)
  assert.equal(url.searchParams.size, 1)
})

test('WhatsApp contact encodes Unicode, ampersands and spaces without changing the chosen options', () => {
  const couponName = 'LÍA & CO. / 💖'
  const design = 'Nude + café? edición #2'
  const url = new URL(
    buildWhatsAppUrl({ phone: '595993038777', couponName, design }),
  )
  assert.ok(url.searchParams.get('text').includes(couponName))
  assert.ok(url.searchParams.get('text').includes(design))
  assert.equal(url.searchParams.size, 1)
  assert.equal(url.hash, '')
  assert.ok(!url.href.includes(' '))
})

test('WhatsApp contact supports Portuguese negotiation and chosen design', () => {
  const url = new URL(
    buildWhatsAppUrl({ phone: '595993038777', language: 'pt', design: 'Rosé' }),
  )
  const message = url.searchParams.get('text')
  assert.match(message, /Olá|Quero|Gostaria/)
  assert.match(message, /conversar|negociar|colaboração/)
  assert.ok(message.includes('Rosé'))
})

test('WhatsApp contact omits choice labels when no coupon or design was selected', () => {
  const message = new URL(
    buildWhatsAppUrl({ phone: '595993038777' }),
  ).searchParams.get('text')
  assert.doesNotMatch(message, /Nombre de mi cupón|Diseño que me gusta/)
})

test('WhatsApp contact rejects invalid lengths and dangerous phone formats', () => {
  for (const phone of [
    '',
    '1234567',
    '1234567890123456',
    'javascript:595993038777',
    '595993038777?text=evil',
    'https://wa.me/595993038777',
    '595993038777 ext 1',
    '595+993038777',
  ]) {
    assert.throws(() => buildWhatsAppUrl({ phone }), /teléfono/i, phone)
  }
})

test('WhatsApp contact keeps URL-like choices as message text', () => {
  const couponName = 'https://evil.example/?a=1&b=2'
  const url = new URL(buildWhatsAppUrl({ phone: '595993038777', couponName }))
  assert.equal(url.origin, 'https://wa.me')
  assert.equal(url.searchParams.size, 1)
  assert.ok(url.searchParams.get('text').includes(couponName))
})
