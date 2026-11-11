import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ADDRESS_LINE_1, ADDRESS_LINE_2, ORDER_URL, PHONE_DISPLAY, PHONE_HREF, scrollToId } from '../lib'

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const fill = useTransform(scrollYProgress, [0.15, 0.9], [100, 0])
  const clip = useTransform(fill, (v) => `inset(${v}% 0 0 0)`)
  const y = useTransform(scrollYProgress, [0, 1], ['30%', '0%'])

  return (
    <footer ref={ref} className="footer">
      <div className="container footer-top">
        <div>
          <img src="/img/logo.png" alt="Shubham Indian Groceries & Food" className="footer-logo" width="200" height="56" />
          <p className="footer-thanks">
            ధన్యవాదాలు — <em>thank you</em> for stopping by.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <h3>Find us</h3>
            <p>
              {ADDRESS_LINE_1}
              <br />
              {ADDRESS_LINE_2}
            </p>
          </div>
          <div>
            <h3>Order</h3>
            <p>
              <a href={ORDER_URL} target="_blank" rel="noopener">
                Order online (DoorDash)
              </a>
              <br />
              <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
              <br />
              Dine in · Take out
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <p className="footer-links">
              {['story', 'signatures', 'tonight', 'menu', 'groceries', 'visit'].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(id)
                  }}
                >
                  {id[0].toUpperCase() + id.slice(1)}
                </a>
              ))}
            </p>
          </div>
        </div>
      </div>

      <motion.div className="footer-word" style={{ y }} aria-hidden="true">
        <span className="fw-outline">SHUBHAM</span>
        <motion.span className="fw-fill" style={{ clipPath: clip }}>
          SHUBHAM
        </motion.span>
      </motion.div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Shubham Indian Groceries &amp; Food · Odessa, Florida</span>
        <span>
          Powered by{' '}
          <a href="https://1slick.com/" target="_blank" rel="noopener">
            1Slick Technologies
          </a>
        </span>
      </div>
    </footer>
  )
}
