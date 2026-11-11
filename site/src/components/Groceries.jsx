import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Bean, CookingPot, Cookie, Leaf, Navigation, Phone, ShoppingBasket, Wheat } from 'lucide-react'
import { MAPS_URL, PHONE_HREF, ease, img } from '../lib'

// Typical aisles of an Indian grocery — confirm against what the store actually stocks.
const AISLES = [
  { icon: Leaf, name: 'Spices & masalas', note: 'Whole spices, ground powders and ready blends' },
  { icon: Wheat, name: 'Rice & flours', note: 'Basmati, sona masoori, atta and more' },
  { icon: Bean, name: 'Lentils & dals', note: 'Toor, moong, chana, urad' },
  { icon: CookingPot, name: 'Pickles & chutneys', note: 'Andhra-style favourites' },
  { icon: Cookie, name: 'Snacks & sweets', note: 'Namkeen, murukku and treats' },
  { icon: ShoppingBasket, name: 'Everyday essentials', note: 'Ghee, oils, tea and pantry basics' },
]

export default function Groceries() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // The photo "window" opens from a rounded inset to full width as it scrolls in.
  const inset = useTransform(scrollYProgress, [0, 0.4], [12, 0])
  const radius = useTransform(scrollYProgress, [0, 0.4], [48, 0])
  const clip = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`)
  const scale = useTransform(scrollYProgress, [0, 1], [1.35, 1])
  const textY = useTransform(scrollYProgress, [0.1, 0.6], [30, -30])

  return (
    <section id="groceries" className="groceries" aria-labelledby="groceries-title">
      <div ref={ref} className="grocer">
        <motion.div className="grocer-window" style={{ clipPath: clip }}>
          <motion.img
            src={img('spices')}
            alt="Rows of bowls filled with whole and ground Indian spices"
            loading="lazy"
            style={{ scale }}
          />
          <motion.div className="grocer-copy" style={{ y: textY }}>
            <p className="eyebrow eyebrow-light">06 — More than a kitchen</p>
            <h2 id="groceries-title" className="grocer-title">Groceries</h2>
            <p>
              Shubham is also your neighbourhood <em>Indian grocery</em>. Pick up your pantry staples while your order
              comes off the stove.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="container">
        <ul className="aisles">
          {AISLES.map(({ icon: Icon, name, note }, i) => (
            <motion.li
              key={name}
              className="aisle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.7, ease: ease.out, delay: i * 0.07 }}
            >
              <span className="aisle-icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <span className="aisle-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{name}</h3>
              <p>{note}</p>
            </motion.li>
          ))}
        </ul>

        <div className="grocer-ctas">
          <p>Looking for something specific? Give us a call and we&apos;ll check the shelves.</p>
          <div>
            <a href={PHONE_HREF} className="btn btn-chili">
              <Phone size={16} aria-hidden="true" /> Ask about stock
            </a>
            <a href={MAPS_URL} className="btn btn-ghost" target="_blank" rel="noopener">
              <Navigation size={16} aria-hidden="true" /> Visit the store
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
