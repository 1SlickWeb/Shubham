import { motion, useMotionValue, useSpring } from 'framer-motion'
import { MapPin, Navigation, Phone, ShoppingBag, Smartphone, UtensilsCrossed } from 'lucide-react'
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  MAPS_URL,
  MAP_EMBED,
  ORDER_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  ease,
  useMediaQuery,
} from '../lib'
import { MaskLines, Reveal } from './Reveal'

export function Magnetic({ children, className, href, ...rest }) {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15 })
  const sy = useSpring(y, { stiffness: 220, damping: 15 })
  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (!fine) return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.35)
        y.set((e.clientY - r.top - r.height / 2) * 0.35)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      {...rest}
    >
      {children}
    </motion.a>
  )
}

const MODES = [
  { icon: UtensilsCrossed, label: 'Dine in' },
  { icon: ShoppingBag, label: 'Take out' },
  { icon: Smartphone, label: 'Order online', href: ORDER_URL },
]

export default function Visit() {
  return (
    <section id="visit" className="visit" aria-labelledby="visit-title">
      <div className="container visit-grid">
        <div className="visit-copy">
          <p className="eyebrow">07 — Visit us</p>
          <MaskLines as="h2" className="display visit-title" lines={['Come', 'hungry.']} />
          <span id="visit-title" className="sr-only">
            Visit and order
          </span>
          <Reveal className="visit-modes">
            {MODES.map(({ icon: Icon, label, href }) =>
              href ? (
                <a key={label} className="mode mode-link" href={href} target="_blank" rel="noopener">
                  <Icon size={18} aria-hidden="true" /> {label}
                </a>
              ) : (
                <span key={label} className="mode">
                  <Icon size={18} aria-hidden="true" /> {label}
                </span>
              ),
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <address className="visit-address">
              <MapPin aria-hidden="true" />
              <span>
                {ADDRESS_LINE_1}
                <br />
                {ADDRESS_LINE_2}
              </span>
            </address>
          </Reveal>
          <Reveal delay={0.15} className="visit-ctas">
            <Magnetic href={ORDER_URL} className="btn btn-chili btn-xl" target="_blank" rel="noopener">
              <ShoppingBag size={20} aria-hidden="true" /> Order on DoorDash
            </Magnetic>
            <Magnetic href={PHONE_HREF} className="btn btn-ghost btn-xl">
              <Phone size={20} aria-hidden="true" /> {PHONE_DISPLAY}
            </Magnetic>
            <Magnetic href={MAPS_URL} className="btn btn-ghost btn-xl" target="_blank" rel="noreferrer">
              <Navigation size={20} aria-hidden="true" /> Get directions
            </Magnetic>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="visit-hint">Specials change daily — give us a call to hear what&apos;s cooking tonight.</p>
          </Reveal>
        </div>

        <motion.div
          className="visit-map"
          initial={{ clipPath: 'inset(100% 0 0 0 round 28px)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0 round 28px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.2, ease: ease.inOut }}
        >
          <iframe
            title="Map to Shubham, 14530 Black Lake Rd, Odessa, FL"
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  )
}
