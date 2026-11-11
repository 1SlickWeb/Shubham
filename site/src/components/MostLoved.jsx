import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { img, money } from '../lib'
import { mostOrdered } from '../data/menu'
import { MaskLines } from './Reveal'
import { VegMark } from './Decor'

const STYLE = {
  'Chicken Noodles': {
    tone: 'wok',
    img: 'noodles',
    line: 'Wok-tossed, smoky, impossible to share.',
  },
  'Butter Chicken': {
    tone: 'saffron',
    img: 'butter-chicken',
    line: 'Velvety tomato-butter gravy. Basmati rice included.',
  },
  'Mango Lassi': {
    tone: 'mango',
    img: null,
    line: 'The cool-down. Mango and yogurt, blended thick.',
  },
}

function LassiGlass() {
  return (
    <svg viewBox="0 0 240 320" className="lassi" aria-hidden="true">
      <defs>
        <linearGradient id="lassiFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD166" />
          <stop offset="1" stopColor="#F28C18" />
        </linearGradient>
        <clipPath id="glassClip">
          <path d="M50 60h140l-16 230a14 14 0 0 1-14 13H80a14 14 0 0 1-14-13z" />
        </clipPath>
      </defs>
      <rect x="150" y="0" width="10" height="150" rx="5" fill="#C8161E" transform="rotate(14 155 75)" />
      <g clipPath="url(#glassClip)">
        <rect x="0" y="60" width="240" height="260" fill="url(#lassiFill)" />
        <motion.path
          d="M0 92 Q30 80 60 92 T120 92 T180 92 T240 92 V60 H0z"
          fill="#FFF4E2"
          animate={{ x: [0, -60, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="96" cy="160" r="5" fill="#fff" opacity=".5" />
        <circle cx="140" cy="210" r="4" fill="#fff" opacity=".4" />
        <circle cx="110" cy="250" r="3" fill="#fff" opacity=".4" />
      </g>
      <path
        d="M50 60h140l-16 230a14 14 0 0 1-14 13H80a14 14 0 0 1-14-13z"
        fill="none"
        stroke="#2B0B0C"
        strokeWidth="4"
      />
      <path d="M86 70c-8 2-12 6-12 6M92 64c6-14 22-18 30-14-6 10-18 16-30 14z" fill="#3F7D20" />
    </svg>
  )
}

function LovedCard({ item, i, n, progress }) {
  const s = STYLE[item.name]
  const slot = useRef(null)
  const { scrollYProgress: enter } = useScroll({ target: slot, offset: ['start end', 'start start'] })
  const imgScale = useTransform(enter, [0, 1], [1.5, 1])
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.06])
  const dim = useTransform(progress, [i / n, 1], [0, (n - 1 - i) * 0.18])

  return (
    <div className="loved-slot" ref={slot}>
      <motion.article
        className={`loved-card tone-${s.tone}`}
        style={{ scale, top: `calc(14vh + ${i * 26}px)` }}
      >
        <div className="loved-copy">
          <span className="loved-rank">#{i + 1}</span>
          <p className="eyebrow">Most ordered · {item.category}</p>
          <h3>{item.name}</h3>
          <p className="loved-line">{s.line}</p>
          <p className="loved-price">
            <VegMark veg={item.veg} /> {money(item.price)}
          </p>
        </div>
        <div className="loved-media">
          {s.img ? (
            <motion.img src={img(s.img)} alt={item.name} loading="lazy" style={{ scale: imgScale }} />
          ) : (
            <LassiGlass />
          )}
        </div>
        <motion.div className="loved-dim" style={{ opacity: dim }} aria-hidden="true" />
      </motion.article>
    </div>
  )
}

export default function MostLoved() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section className="loved" aria-labelledby="loved-title">
      <div className="container loved-head">
        <p className="eyebrow">03 — Most ordered</p>
        <MaskLines
          as="h2"
          className="display"
          lines={['The neighbourhood', 'has spoken.']}
        />
        <span id="loved-title" className="sr-only">
          Most ordered dishes
        </span>
      </div>
      <div className="container loved-stack" ref={ref}>
        {mostOrdered.map((item, i) => (
          <LovedCard key={item.name} item={item} i={i} n={mostOrdered.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
