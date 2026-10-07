import { useEffect, useRef } from 'react'

export default function AmbientBackground({ active }) {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    if (!active || !window.matchMedia('(pointer: fine)').matches) {
      node.style.setProperty('--pointer-x', '0px')
      node.style.setProperty('--pointer-y', '0px')
      return
    }
    let frame = 0
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    const render = () => {
      if (document.hidden) {
        frame = 0
        return
      }
      x += (targetX - x) * 0.075
      y += (targetY - y) * 0.075
      node.style.setProperty('--pointer-x', `${x.toFixed(2)}px`)
      node.style.setProperty('--pointer-y', `${y.toFixed(2)}px`)
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1)
        frame = requestAnimationFrame(render)
      else frame = 0
    }
    const move = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 105
      targetY = (event.clientY / window.innerHeight - 0.5) * 85
      if (!frame) frame = requestAnimationFrame(render)
    }
    const rest = () => {
      targetX = 0
      targetY = 0
      if (!frame) frame = requestAnimationFrame(render)
    }
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
      } else rest()
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', rest)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', rest)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [active])
  return (
    <div
      className={`ambient ${active ? 'is-moving' : ''}`}
      ref={ref}
      aria-hidden="true"
    >
      <div className="ambient-pointer">
        <div className="ambient-bloom bloom-one" />
        <div className="ambient-bloom bloom-two" />
        <div className="ambient-bloom bloom-three" />
      </div>
      <div className="ambient-orbit orbit-one" />
      <div className="ambient-orbit orbit-two" />
      <div className="ambient-grain" />
    </div>
  )
}
