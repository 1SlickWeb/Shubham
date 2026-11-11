import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { useSmoothScroll } from './lib'
import Preloader from './components/Preloader'
import Nav, { ScrollProgress } from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Story from './components/Story'
import Kitchens from './components/Kitchens'
import Signatures from './components/Signatures'
import MostLoved from './components/MostLoved'
import Specials from './components/Specials'
import Menu from './components/Menu'
import Visit from './components/Visit'
import Groceries from './components/Groceries'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])
  useSmoothScroll(ready)

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#menu">
        Skip to menu
      </a>
      <Preloader onDone={onDone} />
      <ScrollProgress />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Story />
        <Kitchens />
        <Signatures />
        <MostLoved />
        <Specials />
        <Menu />
        <Groceries />
        <Visit />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
