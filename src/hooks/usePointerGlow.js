import { useCallback, useRef } from 'react'
import { useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const OFF_SCREEN = -9999
const PARALLAX_RANGE = 18
const SPRING_CONFIG = { stiffness: 140, damping: 22, mass: 0.6 }
const GLOW_RADIUS = '620px'

export function usePointerGlow() {
  const containerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const glowX = useMotionValue(OFF_SCREEN)
  const glowY = useMotionValue(OFF_SCREEN)

  const smoothX = useSpring(offsetX, SPRING_CONFIG)
  const smoothY = useSpring(offsetY, SPRING_CONFIG)

  const parallaxX = useTransform(smoothX, [-1, 1], [-PARALLAX_RANGE, PARALLAX_RANGE])
  const parallaxY = useTransform(smoothY, [-1, 1], [-PARALLAX_RANGE / 2, PARALLAX_RANGE / 2])

  const glowBackground = useMotionTemplate`radial-gradient(${GLOW_RADIUS} circle at ${glowX}px ${glowY}px, var(--accent-wash), transparent 70%)`

  const handlePointerMove = useCallback(
    (event) => {
      if (prefersReducedMotion) return
      const bounds = containerRef.current?.getBoundingClientRect()
      if (!bounds || bounds.width === 0 || bounds.height === 0) return

      const localX = event.clientX - bounds.left
      const localY = event.clientY - bounds.top

      glowX.set(localX)
      glowY.set(localY)
      offsetX.set((localX / bounds.width) * 2 - 1)
      offsetY.set((localY / bounds.height) * 2 - 1)
    },
    [glowX, glowY, offsetX, offsetY, prefersReducedMotion]
  )

  const handlePointerLeave = useCallback(() => {
    offsetX.set(0)
    offsetY.set(0)
    glowX.set(OFF_SCREEN)
    glowY.set(OFF_SCREEN)
  }, [glowX, glowY, offsetX, offsetY])

  return {
    containerRef,
    handlePointerMove,
    handlePointerLeave,
    glowBackground,
    parallax: prefersReducedMotion ? null : { x: parallaxX, y: parallaxY },
    prefersReducedMotion,
  }
}
