import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { img } from '../lib'
import { CurryLeaf, Chili, Sparkle } from './Decor'

const SOUTH = ['Masala Dosa', 'Onion Dosa', 'Sambar', 'Dadojanam', 'Poornallu', 'Prasadam Combo']
const WOK = ['Chicken Manchuria', 'Gobi Manchurian', 'Chicken Noodles', 'Egg Noodles', 'Shrimp Fried Rice', 'Veg Manchuria']

function Panel({ variant, title, kicker, lead, items, images, p }) {
  const a = useTransform(p, [0, 1], variant === 'south' ? [0, -120] : [140, -40])
  const b = useTransform(p, [0, 1], variant === 'south' ? [60, -220] : [220, -60])
  const r = useTransform(p, [0, 1], variant === 'south' ? [-6, 4] : [8, -4])
  return (
    <div className={`kitchen kitchen-${variant}`}>
      <div className="kitchen-copy">
        <p className="eyebrow eyebrow-light">{kicker}</p>
        <h3 className="kitchen-title">{title}</h3>
        <p className="kitchen-lead">{lead}</p>
        <ul className="kitchen-list">
          {items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      <div className="kitchen-visual" aria-hidden="true">
        <motion.img className="kv-main" src={img(images[0])} alt="" loading="lazy" style={{ y: a, rotate: r }} />
        <motion.img className="kv-small" src={img(images[1])} alt="" loading="lazy" style={{ y: b }} />
        {variant === 'south' ? <CurryLeaf className="kv-deco" /> : <Chili className="kv-deco" />}
      </div>
    </div>
  )
}

export default function Kitchens() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const wipe = useTransform(p, [0.2, 0.8], [100, 0])
  const clip = useTransform(wipe, (v) => `inset(0 0 0 ${v}%)`)
  const lineX = useTransform(wipe, (v) => `${v}vw`)
  const handleRotate = useTransform(p, [0.2, 0.8], [0, 360])
  const lineOpacity = useTransform(p, [0.15, 0.22, 0.78, 0.85], [0, 1, 1, 0])

  const south = (
    <Panel
      variant="south"
      p={p}
      kicker="Kitchen one · Andhra & the South"
      title={
        <>
          From the <em>tawa</em>
        </>
      }
      lead="Paper-thin dosas, soulful sambar and temple-style prasadam — the comfort food of the South, made the old way."
      items={SOUTH}
      images={['dosa', 'idli']}
    />
  )
  const wok = (
    <Panel
      variant="wok"
      p={p}
      kicker="Kitchen two · Indo-Chinese"
      title={
        <>
          Into the <em>wok</em>
        </>
      }
      lead="Fire-tossed noodles, glossy Manchurian and fried rice with that unmistakable street-side smoke and chilli kick."
      items={WOK}
      images={['noodles', 'manchuria']}
    />
  )

  if (reduce) {
    return (
      <section className="kitchens is-static" aria-label="Our two kitchens">
        {south}
        {wok}
      </section>
    )
  }

  return (
    <section ref={ref} className="kitchens" aria-label="Our two kitchens">
      <div className="kitchens-stage">
        {south}
        <motion.div className="kitchen-wipe" style={{ clipPath: clip }}>
          {wok}
        </motion.div>
        <motion.div className="kitchen-line" style={{ x: lineX, opacity: lineOpacity }} aria-hidden="true">
          <motion.span className="kitchen-handle" style={{ rotate: handleRotate }}>
            <Sparkle />
          </motion.span>
        </motion.div>
        <div className="kitchens-label" aria-hidden="true">
          Two kitchens · one table
        </div>
      </div>
    </section>
  )
}
