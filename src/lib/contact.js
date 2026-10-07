export function buildWhatsAppUrl({
  phone,
  language = 'es',
  couponName = '',
  design = '',
}) {
  const formattedPhone = String(phone ?? '').trim()
  const digits = formattedPhone.replace(/\D/gu, '')
  if (
    !/^\+?[\d\s().-]+$/u.test(formattedPhone) ||
    digits.length < 8 ||
    digits.length > 15
  ) {
    throw new Error(
      'El teléfono debe tener entre 8 y 15 dígitos en formato internacional.',
    )
  }

  const isPortuguese = language === 'pt'
  const lines = [
    isPortuguese
      ? 'Olá ElaBela! Quero conversar sobre uma colaboração como influencer e negociar os detalhes do programa de cupons.'
      : '¡Hola ElaBela! Quiero conversar sobre una colaboración como influencer y negociar los detalles del programa de cupones.',
  ]
  const selectedName = String(couponName ?? '').trim()
  const selectedDesign = String(design ?? '').trim()

  if (selectedName)
    lines.push(
      `${isPortuguese ? 'Nome do meu cupom' : 'Nombre de mi cupón'}: ${selectedName}`,
    )
  if (selectedDesign)
    lines.push(
      `${isPortuguese ? 'Design de que gostei' : 'Diseño que me gusta'}: ${selectedDesign}`,
    )

  const url = new URL(`https://wa.me/${digits}`)
  url.searchParams.set('text', lines.join('\n'))
  return url.href
}
