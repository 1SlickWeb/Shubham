import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from 'framer-motion'
import { Flame, Search, ShoppingBag, Star, X } from 'lucide-react'
import { categories, menu } from '../data/menu'
import { ORDER_URL, ease, img, money, useMediaQuery } from '../lib'
import { VegMark } from './Decor'
import { MaskLines, Reveal } from './Reveal'

const ALL = 'All'

export default function Menu() {
  const [active, setActive] = useState(ALL)
  const [query, setQuery] = useState('')
  const [vegOnly, setVegOnly] = useState(false)
  const [hover, setHover] = useState(null)
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 300, damping: 30, mass: 0.5 })
  const py = useSpring(my, { stiffness: 300, damping: 30, mass: 0.5 })

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    return categories
      .filter((c) => active === ALL || c === active)
      .map((c) => ({
        category: c,
        items: menu.filter(
          (m) =>
            m.category === c &&
            (!vegOnly || m.veg) &&
            (!q || m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)),
        ),
      }))
      .filter((g) => g.items.length)
  }, [active, query, vegOnly])

  const total = groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <section
      id="menu"
      className="menu"
      aria-labelledby="menu-title"
      onPointerMove={(e) => {
        mx.set(e.clientX)
        my.set(e.clientY)
      }}
    >
      <div className="container">
        <div className="menu-head">
          <p className="eyebrow">05 — The full menu</p>
          <MaskLines as="h2" className="display menu-title" lines={['Pick your', 'craving.']} />
          <span id="menu-title" className="sr-only">
            Full menu
          </span>
          <Reveal className="menu-note">
            <p>
              {menu.length} dishes across {categories.length} categories. Prices in USD. Look for{' '}
              <VegMark veg /> vegetarian and <VegMark veg={false} /> non-vegetarian.
            </p>
            <a href={ORDER_URL} className="btn btn-chili menu-order" target="_blank" rel="noopener">
              <ShoppingBag size={16} aria-hidden="true" /> Order online on DoorDash
            </a>
          </Reveal>
        </div>

        <div className="menu-controls">
          <div className="menu-tabs" role="tablist" aria-label="Menu categories">
            <LayoutGroup id="tabs">
              {[ALL, ...categories].map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active === c}
                  className={`tab ${active === c ? 'is-active' : ''}`}
                  onClick={() => setActive(c)}
                >
                  {active === c && (
                    <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                  )}
                  <span className="tab-label">{c}</span>
                </button>
              ))}
            </LayoutGroup>
          </div>
          <div className="menu-tools">
            <label className="menu-search">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Search dishes</span>
              <input
                type="search"
                placeholder="Search — paneer, dosa, noodles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button className="menu-clear" onClick={() => setQuery('')} aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
            </label>
            <button
              className={`veg-toggle ${vegOnly ? 'is-on' : ''}`}
              aria-pressed={vegOnly}
              onClick={() => setVegOnly((v) => !v)}
            >
              <span className="veg-switch" aria-hidden="true">
                <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
              </span>
              Veg only
            </button>
          </div>
        </div>

        <p className="menu-count" aria-live="polite">
          Showing {total} {total === 1 ? 'dish' : 'dishes'}
        </p>

        <motion.div layout className="menu-groups">
          <AnimatePresence mode="popLayout" initial={false}>
            {groups.map((g) => (
              <motion.section
                layout
                key={g.category}
                className="menu-group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: ease.out }}
                aria-label={g.category}
              >
                <header className="menu-group-head">
                  <h3>{g.category}</h3>
                  <span>{String(g.items.length).padStart(2, '0')}</span>
                </header>
                <ul className="menu-items">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {g.items.map((m) => (
                      <motion.li
                        layout
                        key={m.name}
                        className="menu-item"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
                        onPointerEnter={() => finePointer && m.img && setHover(m.img)}
                        onPointerLeave={() => setHover(null)}
                      >
                        <div className="menu-item-top">
                          <VegMark veg={m.veg} />
                          <h4>{m.name}</h4>
                          {m.note && <small className="menu-note-tag">{m.note}</small>}
                          <span className="leader" aria-hidden="true" />
                          <span className="menu-price">{money(m.price)}</span>
                        </div>
                        {m.description && <p>{m.description}</p>}
                        {(m.mostOrdered || m.featured) && (
                          <div className="menu-badges">
                            {m.mostOrdered && (
                              <span className="badge badge-hot">
                                <Flame size={12} aria-hidden="true" /> Most ordered
                              </span>
                            )}
                            {m.featured && (
                              <span className="badge">
                                <Star size={12} aria-hidden="true" /> Chef&apos;s pick
                              </span>
                            )}
                          </div>
                        )}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </motion.section>
            ))}
          </AnimatePresence>
          {total === 0 && (
            <p className="menu-empty">
              Nothing matches “{query}”. Try “chicken”, “dosa” or “paneer”.
            </p>
          )}
        </motion.div>
      </div>

      {finePointer && (
        <motion.div
          className="menu-preview"
          style={{ x: px, y: py }}
          animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.35, ease: ease.out }}
          aria-hidden="true"
        >
          <AnimatePresence mode="popLayout">
            {hover && (
              <motion.img
                key={hover}
                src={img(hover)}
                alt=""
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  )
}
