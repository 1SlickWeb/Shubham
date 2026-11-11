import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useReducedMotion } from 'framer-motion'
import { ease } from '../lib'

// "Welcome" across the languages of the South — then English.
const GREETINGS = [
  { text: 'నమస్కారం', lang: 'te' },
  { text: 'வணக்கம்', lang: 'ta' },
  { text: 'ನಮಸ್ಕಾರ', lang: 'kn' },
  { text: 'നമസ്കാരം', lang: 'ml' },
  { text: 'नमस्ते', lang: 'hi' },
  { text: 'Namaste', lang: 'en' },
]

export default function Preloader({ onDone }) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const idx = Math.min(GREETINGS.length - 1, Math.floor((count / 100) * GREETINGS.length))

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    document.documentElement.classList.add('is-loading')
    const ctrl = animate(0, 100, {
      duration: reduce ? 0.3 : 2.1,
      ease: [0.6, 0.05, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setDone(true), reduce ? 0 : 350),
    })
    return () => ctrl.stop()
  }, [reduce])

  useEffect(() => {
    if (!done) return
    document.documentElement.classList.remove('is-loading')
    onDone()
  }, [done, onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          role="status"
          aria-label="Loading Shubham"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.05, ease: ease.inOut }}
        >
          <div className="loader-greeting">
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                lang={GREETINGS[idx].lang}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.28, ease: ease.out }}
              >
                {GREETINGS[idx].text}
              </motion.span>
            </AnimatePresence>
          </div>
          <img className="loader-logo" src="/img/logo.png" alt="" width="223" height="63" />
          <div className="loader-bar" aria-hidden="true">
            <span style={{ transform: `scaleX(${count / 100})` }} />
          </div>
          <div className="loader-count" aria-hidden="true">
            {String(count).padStart(3, '0')}
          </div>
          <p className="loader-meaning">
            <em>Shubham</em> (शुभम्) — Sanskrit for <em>auspicious</em>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
