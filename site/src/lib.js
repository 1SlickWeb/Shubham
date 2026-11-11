import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export const PHONE_DISPLAY = '+1 656-244-5870'
export const PHONE_HREF = 'tel:+16562445870'
export const ORDER_URL = 'https://www.doordash.com/store/shubham-odessa-34979501/73484346/'
export const ADDRESS_LINE_1 = '14530 Black Lake Rd'
export const ADDRESS_LINE_2 = 'Odessa, FL 33556'
export const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=14530+Black+Lake+Rd,+Odessa,+FL+33556'
export const MAP_EMBED =
  'https://www.google.com/maps?q=14530+Black+Lake+Rd,+Odessa,+FL+33556&output=embed'

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.76, 0, 0.24, 1],
}

export const img = (name) => `/img/${name}.webp`

/** Smooth scrolling (Lenis). Starts only when `enabled`, skipped for reduced motion. */
export function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    window.__lenis = lenis
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [enabled])
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

export function useViewport() {
  const [vp, setVp] = useState(() => ({
    w: typeof window === 'undefined' ? 1440 : window.innerWidth,
    h: typeof window === 'undefined' ? 900 : window.innerHeight,
  }))
  useEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return vp
}

export const money = (n) => `$${n.toFixed(2)}`
