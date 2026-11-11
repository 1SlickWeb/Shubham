import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ShoppingBag } from 'lucide-react'
import { ORDER_URL, ease, img, scrollToId, useViewport } from '../lib'
import { Cardamom, Chili, CurryLeaf, StarAnise } from './Decor'

const WORD = 'SHUBHAM'.split('')
// Vertical centre of the word, plate and ring — sits above the bottom copy block.
const CY = 0.44
const RING = 'DINE IN ✦ TAKE OUT ✦ ORDER ONLINE ✦ BIRYANI ✦ DOSA ✦ MANCHURIAN ✦ '

function Letter({ ch, i, spread, ready, outline }) {
  const offset = i - (WORD.length - 1) / 2
  const x = useTransform(spread, (s) => `${offset * s * 22}vw`)
  const rotate = useTransform(spread, (s) => offset * s * 8)
  return (
    <motion.span className="hero-letter-wrap" style={{ x, rotate }}>
      <span className="hero-letter-mask">
        <motion.span
          className={outline ? 'hero-letter is-outline' : 'hero-letter'}
          initial={{ y: '105%' }}
          animate={{ y: ready ? '0%' : '105%' }}
          transition={{ duration: 1.1, ease: ease.out, delay: 0.1 + i * 0.06 }}
        >
          {ch}
        </motion.span>
      </span>
    </motion.span>
  )
}

function Word({ spread, ready, outline }) {
  return (
    <div className="hero-word" aria-hidden="true">
      {WORD.map((ch, i) => (
        <Letter key={i} ch={ch} i={i} spread={spread} ready={ready} outline={outline} />
      ))}
    </div>
  )
}

function Floater({ children, p, speed, className, rot = 90 }) {
  const y = useTransform(p, [0, 0.6], [0, -520 * speed])
  const rotate = useTransform(p, [0, 0.6], [0, rot])
  return (
    <motion.div className={`floater ${className}`} style={{ y, rotate }}>
      {children}
    </motion.div>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { w, h } = useViewport()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const r0 = Math.min(w, h) * (w < 700 ? 0.38 : 0.23)
  const r1 = Math.hypot(w / 2, h * (1 - CY)) + 40
  const clip = useTransform(p, (v) => {
    const t = Math.min(1, Math.max(0, v / 0.55))
    const e = t * t * (3 - 2 * t)
    return `circle(${r0 + (r1 - r0) * e}px at 50% ${CY * 100}%)`
  })
  const imgScale = useTransform(p, [0, 0.6], [1.35, 1])
  const spread = useTransform(p, [0, 0.45], [0, 1])
  const wordOpacity = useTransform(p, [0.2, 0.42], [1, 0])
  const ringOpacity = useTransform(p, [0, 0.12], [1, 0])
  const ringRotate = useTransform(p, [0, 1], [0, 220])
  const uiOpacity = useTransform(p, [0, 0.1], [1, 0])
  const uiY = useTransform(p, [0, 0.1], [0, -40])
  const capOpacity = useTransform(p, [0.55, 0.7], [0, 1])
  const capY = useTransform(p, [0.55, 0.75], [80, 0])
  const shade = useTransform(p, [0.4, 0.7], [0, 0.6])

  const ringSize = (r0 + 46) * 2

  return (
    <section id="top" ref={ref} className={`hero ${reduce ? 'is-static' : ''}`} aria-label="Welcome">
      <div className="hero-stage">
        {/* Layer A — cream ground, chili letters */}
        <h1 className="sr-only">Shubham — Indian Groceries &amp; Food, Odessa FL</h1>
        <motion.div className="hero-layer" style={{ opacity: wordOpacity }}>
          <Word spread={spread} ready={ready} />
        </motion.div>

        <Floater p={p} speed={1.3} className="f1" rot={120}><Chili /></Floater>
        <Floater p={p} speed={0.7} className="f2" rot={-60}><CurryLeaf /></Floater>
        <Floater p={p} speed={1.6} className="f3" rot={200}><StarAnise /></Floater>
        <Floater p={p} speed={0.9} className="f4" rot={-140}><Cardamom /></Floater>
        <Floater p={p} speed={1.1} className="f5" rot={80}><CurryLeaf /></Floater>

        {/* Layer B — the plate. Same letters, outlined, visible only inside the circle. */}
        <motion.div className="hero-plate" style={{ clipPath: clip }}>
          <motion.img
            src={img('hero-biryani')}
            alt="Biryani in a clay pot with raita, chillies and spices on a red cloth"
            style={{ scale: imgScale }}
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1.2 }}
          />
          <motion.div className="hero-shade" style={{ opacity: shade }} />
          <motion.div className="hero-layer" style={{ opacity: wordOpacity }}>
            <Word spread={spread} ready={ready} outline />
          </motion.div>
          <motion.div className="hero-caption" style={{ opacity: capOpacity, y: capY }}>
            <p className="eyebrow eyebrow-light">Hyderabadi-style · slow-cooked</p>
            <h2>
              Every grain,
              <br />
              <em>patiently</em> layered.
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-ring"
          style={{
            width: ringSize,
            height: ringSize,
            top: `calc(${CY * 100}% - ${ringSize / 2}px)`,
            left: `calc(50% - ${ringSize / 2}px)`,
            opacity: ringOpacity,
            rotate: ringRotate,
          }}
          aria-hidden="true"
        >
          <div className="ring-spin">
          <motion.svg
            viewBox="0 0 200 200"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: ready ? 1 : 0.6, opacity: ready ? 1 : 0 }}
            transition={{ duration: 1.2, ease: ease.out, delay: 0.5 }}
          >
            <defs>
              <path id="ringPath" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
            </defs>
            <text>
              <textPath href="#ringPath" textLength="550">
                {RING}
              </textPath>
            </text>
          </motion.svg>
          </div>
        </motion.div>

        <motion.div className="hero-ui" style={{ opacity: uiOpacity, y: uiY }}>
          <motion.div
            className="hero-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
            transition={{ duration: 0.9, delay: 0.7, ease: ease.out }}
          >
            <p className="eyebrow">South Indian · Indo-Chinese · Street food</p>
            <p className="hero-tag">
              Authentic Indian flavours, <em>bold spices</em> and warm hospitality — right here on Black Lake Rd,
              Odessa.
            </p>
            <div className="hero-ctas">
              <a
                href="#menu"
                className="btn btn-chili"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('menu')
                }}
              >
                Explore the menu
              </a>
              <a href={ORDER_URL} className="btn btn-ghost" target="_blank" rel="noopener">
                <ShoppingBag size={16} aria-hidden="true" /> Order online
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-cue"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 1.2 }}
            aria-hidden="true"
          >
            <span>Scroll to taste</span>
            <span className="hero-cue-icon">
              <ArrowDown size={16} />
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
