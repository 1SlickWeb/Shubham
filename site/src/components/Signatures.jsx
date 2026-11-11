import { useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { img, money, scrollToId } from '../lib'
import { featured, menu } from '../data/menu'
import { VegMark } from './Decor'

const DISHES = featured.filter((d) => d.img).slice(0, 8)

function Card({ dish, i, progress, skew }) {
  const n = DISHES.length
  const center = (i + 0.5) / n
  const imgX = useTransform(progress, [center - 0.5, center + 0.5], ['-12%', '12%'])
  return (
    <motion.article className={`sig-card ${i % 2 ? 'is-low' : ''}`} style={{ skewX: skew }}>
      <span className="sig-rank" aria-hidden="true">
        {String(i + 1).padStart(2, '0')}
      </span>
      <div className="sig-img">
        <motion.img src={img(dish.img)} alt={dish.name} loading="lazy" style={{ x: imgX }} />
      </div>
      <div className="sig-body">
        <div className="sig-row">
          <h3>{dish.name}</h3>
          <span className="sig-price">{money(dish.price)}</span>
        </div>
        <p>
          <VegMark veg={dish.veg} /> {dish.description || dish.category}
        </p>
      </div>
    </motion.article>
  )
}

export default function Signatures() {
  const ref = useRef(null)
  const trackRef = useRef(null)
  const reduce = useReducedMotion()
  const [range, setRange] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      setRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -range])
  const smoothX = useSpring(x, { stiffness: 140, damping: 30, mass: 0.4 })
  const velocity = useVelocity(smoothX)
  const skew = useTransform(velocity, [-3000, 3000], [-6, 6], { clamp: true })
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="signatures"
      ref={ref}
      className={`sig ${reduce ? 'is-static' : ''}`}
      style={reduce ? undefined : { height: `calc(100vh + ${range}px)` }}
      aria-labelledby="sig-title"
    >
      <div className="sig-stage">
        <motion.div className="sig-track" ref={trackRef} style={reduce ? undefined : { x: smoothX }}>
          <div className="sig-intro">
            <p className="eyebrow eyebrow-light">02 — The signatures</p>
            <h2 id="sig-title" className="display">
              Plates people
              <br />
              <em>drive back</em> for.
            </h2>
            <p className="sig-lead">
              Our most-requested dishes, from creamy butter chicken to fire-kissed Manchurian. Keep scrolling — they
              come to you.
            </p>
          </div>
          {DISHES.map((d, i) => (
            <Card key={d.name} dish={d} i={i} progress={scrollYProgress} skew={reduce ? 0 : skew} />
          ))}
          <div className="sig-end">
            <a
              href="#menu"
              className="sig-end-link"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('menu')
              }}
            >
              <span>See all {menu.length} dishes</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </motion.div>
        {!reduce && (
          <div className="sig-progress" aria-hidden="true">
            <motion.span style={{ scaleX: bar }} />
          </div>
        )}
      </div>
    </section>
  )
}
