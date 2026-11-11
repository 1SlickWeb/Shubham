import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { Sparkle } from './Decor'

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

function VelocityRow({ items, baseVelocity, className }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const skewX = useTransform(smooth, [-2500, 2500], [14, -14], { clamp: true })
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = dir.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    baseX.set(baseX.get() + move)
  })

  const content = items.map((t, i) => (
    <span key={i} className="marquee-item">
      {t}
      <Sparkle className="marquee-star" />
    </span>
  ))

  return (
    <div className={`marquee-row ${className}`}>
      <motion.div className="marquee-track" style={{ x, skewX }}>
        {content}
        {content}
        {content}
        {content}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Some of our dishes">
      <div className="marquee-band band-a">
        <VelocityRow
          baseVelocity={-3}
          items={['Hyderabadi Biryani', 'Chicken 65', 'Masala Dosa', 'Gobi Manchurian', 'Mirchi Bajji', 'Pani Puri']}
        />
      </div>
      <div className="marquee-band band-b">
        <VelocityRow
          baseVelocity={3}
          className="is-outline"
          items={['Butter Chicken', 'Chicken Noodles', 'Mango Lassi', 'Punugulu', 'Paneer Tikka', 'Gulab Jamun']}
        />
      </div>
    </section>
  )
}
