import { motion } from 'framer-motion'
import { ease } from '../lib'

/** Fade + rise when scrolled into view. */
export function Reveal({ children, delay = 0, y = 40, as = 'div', className, ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: ease.out, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

/** Masked line-by-line rise. Pass an array of lines. */
export function MaskLines({ lines, className, delay = 0, stagger = 0.09, as = 'h2', animate }) {
  const M = motion[as]
  const trigger = animate === undefined ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } } : { animate: animate ? 'show' : 'hide' }
  return (
    <M className={className} initial="hide" {...trigger} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span className="mask" key={i} aria-hidden="true">
          <motion.span
            className="mask-inner"
            variants={{ hide: { y: '110%' }, show: { y: '0%' } }}
            transition={{ duration: 1, ease: ease.out, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </M>
  )
}
