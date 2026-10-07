import { useEffect, useState } from 'react'

const systemMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useMotionPreference() {
  const [reduced, setReduced] = useState(systemMotion)
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem('elabela-effects') !== 'off'
    } catch {
      return true
    }
  })
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  function toggle() {
    setEnabled((current) => {
      const next = !current
      try {
        localStorage.setItem('elabela-effects', next ? 'on' : 'off')
      } catch {
        /* Preference stays in this tab. */
      }
      return next
    })
  }
  return { active: enabled && !reduced, reduced, enabled, toggle }
}
