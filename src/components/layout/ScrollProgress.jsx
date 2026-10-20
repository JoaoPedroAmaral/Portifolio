import { motion, useScroll, useSpring } from 'framer-motion'

const SPRING_CONFIG = { stiffness: 180, damping: 30, restDelta: 0.001 }

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, SPRING_CONFIG)

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      aria-hidden="true"
    />
  )
}
