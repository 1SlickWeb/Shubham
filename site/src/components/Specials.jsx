import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Phone } from 'lucide-react'
import { PHONE_HREF, img } from '../lib'
import { Mandala } from './Decor'
import { Reveal } from './Reveal'

// From the "Today's Dinner Menu" flyer.
const SNACKS = [
  { name: 'Mirchi Bajji' },
  { name: 'Aloo Samosa', img: 'samosa' },
  { name: 'Punugulu', img: 'vada' },
  { name: 'Stuffed Mirchi Bajji' },
  { name: 'Onion Samosa', img: 'samosa-board' },
  { name: 'Ghee Karam Punugulu' },
  { name: 'Onion Pakoda' },
]
const APPETIZER = ['Chicken 65']
const BIRYANIS = ['Chef Spl Boneless Biryani', 'Mutton Ghee Roast Biryani', 'Mixed Veg Biryani']

function Chip({ snack, i, n, rotate }) {
  const angle = (i / n) * Math.PI * 2 - Math.PI / 2
  const counter = useTransform(rotate, (r) => -r)
  return (
    <div
      className="orbit-slot"
      style={{ '--x': Math.cos(angle).toFixed(4), '--y': Math.sin(angle).toFixed(4) }}
    >
      <motion.div
        className={`orbit-chip ${snack.img ? 'has-img' : `tone-${i % 3}`}`}
        style={{ rotate: counter }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 160, damping: 14, delay: i * 0.07 }}
      >
        {snack.img && <img src={img(snack.img)} alt="" loading="lazy" />}
        <span>{snack.name}</span>
      </motion.div>
    </div>
  )
}

export default function Specials() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -220])
  const mandala = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <section id="tonight" ref={ref} className="tonight" aria-labelledby="tonight-title">
      <div className="container tonight-grid">
        <div className="tonight-col">
          <Reveal>
            <p className="eyebrow eyebrow-light">04 — Tonight's dinner menu</p>
            <h2 id="tonight-title" className="display">
              Hot off the <em>kadai</em>.
            </h2>
            <p className="tonight-lead">
              Crisp, golden Andhra street snacks fried to order every evening, plus the specials that sell out first.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="tonight-card">
            <h3>Appetizer</h3>
            <ul>
              {APPETIZER.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <h3>Biryanis</h3>
            <ul>
              {BIRYANIS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <a href={PHONE_HREF} className="btn btn-turmeric">
              <Phone size={16} aria-hidden="true" /> Ask what&apos;s cooking
            </a>
          </Reveal>
        </div>

        <div className="orbit-wrap">
          <motion.div className="orbit-mandala" style={{ rotate: mandala }} aria-hidden="true">
            <Mandala />
          </motion.div>
          <motion.div className="orbit" style={{ rotate }} aria-hidden="true">
            <div className="orbit-ring" aria-hidden="true" />
            {SNACKS.map((s, i) => (
              <Chip key={s.name} snack={s} i={i} n={SNACKS.length} rotate={rotate} />
            ))}
          </motion.div>
          <div className="orbit-center">
            <img src={img('chilli-chicken')} alt="Chicken 65 tossed with peppers and onions" loading="lazy" />
            <div>
              <span className="orbit-hot">Hot</span>
              <span className="orbit-snacks">Snacks</span>
            </div>
          </div>
          <ul className="sr-only">
            {SNACKS.map((s) => (
              <li key={s.name}>{s.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
