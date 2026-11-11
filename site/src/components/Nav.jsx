import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Phone, ShoppingBag } from 'lucide-react'
import { ORDER_URL, PHONE_DISPLAY, PHONE_HREF, ease, scrollToId } from '../lib'

const LINKS = [
  { id: 'story', label: 'Story' },
  { id: 'signatures', label: 'Signatures' },
  { id: 'tonight', label: 'Tonight' },
  { id: 'menu', label: 'Menu' },
  { id: 'groceries', label: 'Groceries' },
  { id: 'visit', label: 'Visit' },
]

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
}

export default function Nav({ ready }) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 300 && !open)
    setSolid(y > 60)
  })

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <motion.header
        className={`nav ${solid ? 'is-solid' : ''}`}
        initial={{ y: -120 }}
        animate={{ y: ready && !hidden ? 0 : -120 }}
        transition={{ duration: 0.6, ease: ease.out }}
      >
        <a href="#top" className="nav-logo" onClick={go('top')} aria-label="Shubham — back to top">
          <img src="/img/logo.png" alt="Shubham Indian Groceries & Food" width="160" height="45" />
        </a>
        <nav aria-label="Primary" className="nav-links">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>
              <span className="roll"><span data-text={l.label}>{l.label}</span></span>
            </a>
          ))}
        </nav>
        <a className="btn btn-chili nav-cta" href={ORDER_URL} target="_blank" rel="noopener">
          <ShoppingBag size={16} aria-hidden="true" />
          <span>Order now</span>
        </a>
        <button
          className={`burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.7, ease: ease.inOut }}
          >
            <nav aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: ease.out }}
                >
                  <small>0{i + 1}</small>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="mobile-ctas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a className="btn btn-cream" href={ORDER_URL} target="_blank" rel="noopener">
                <ShoppingBag size={18} aria-hidden="true" /> Order online
              </a>
              <a className="btn btn-outline-cream" href={PHONE_HREF}>
                <Phone size={18} aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
