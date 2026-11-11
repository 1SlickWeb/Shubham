import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { img } from '../lib'
import { categories, menu } from '../data/menu'
import { Mandala } from './Decor'
import { Reveal } from './Reveal'

const STORY =
  'We bring you the authentic flavours of India with a menu rich in tradition, taste and aroma — mouthwatering biryanis, irresistible appetizers, and the classic dishes that taste like home.'

function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <span className="story-word">
      <motion.span style={{ opacity, y }}>{children}</motion.span>{' '}
    </span>
  )
}

function ScrubText({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="story-text" aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => {
          const start = i / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
              {w}
            </Word>
          )
        })}
      </span>
    </p>
  )
}

function Counter({ to, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  useEffect(() => {
    if (!inView || !ref.current) return
    const c = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v)
      },
    })
    return () => c.stop()
  }, [inView, to])
  return (
    <div className="stat">
      <span className="stat-num" ref={ref} aria-hidden="true">
        0
      </span>
      <span className="sr-only">{to}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function ParallaxImg({ src, alt, speed, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 60}px`, `${-speed * 60}px`])
  const inner = useTransform(scrollYProgress, [0, 1], [1.25, 1.05])
  return (
    <motion.figure ref={ref} className={`story-img ${className}`} style={{ y }}>
      <motion.img src={src} alt={alt} loading="lazy" style={{ scale: inner }} />
    </motion.figure>
  )
}

export default function Story() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const spin = useTransform(scrollYProgress, [0, 1], [0, 180])
  return (
    <section id="story" className="story" ref={ref}>
      <motion.div className="story-mandala" style={{ rotate: spin }} aria-hidden="true">
        <Mandala />
      </motion.div>
      <div className="container story-grid">
        <div className="story-side">
          <Reveal>
            <p className="eyebrow">01 — Our story</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="story-aside">
              Perfect for casual meals, family gatherings and special celebrations. Every dish is made with
              high-quality ingredients and time-honoured recipes.
            </p>
          </Reveal>
        </div>
        <ScrubText text={STORY} />
      </div>

      <div className="container story-collage">
        <ParallaxImg className="c1" src={img('thali')} alt="South Indian meal on a banana leaf" speed={1.4} />
        <ParallaxImg className="c2" src={img('spice-tin')} alt="Indian meal of rice, naan, dal and curries in brass bowls" speed={-0.8} />
        <ParallaxImg className="c3" src={img('samosa')} alt="Golden samosas with green chilli" speed={2} />
        <div className="story-stats">
          <Counter to={menu.length} label="dishes on the menu" />
          <Counter to={categories.length} label="ways to be hungry" />
          <Counter to={2} label="kitchens, one table" />
          <Counter to={3} label="dine in · take out · online" />
        </div>
      </div>
    </section>
  )
}
