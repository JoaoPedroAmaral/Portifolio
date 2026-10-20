export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1]

export const DURATION = {
  fast: 0.3,
  base: 0.5,
  slow: 0.7,
}

export const STAGGER_STEP = 0.07

export const VIEWPORT_ONCE = { once: true, margin: '-80px' }

export const revealVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: (step = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.slow,
      delay: step * STAGGER_STEP,
      ease: EASE_OUT_SOFT,
    },
  }),
}

export const staticVariants = {
  hidden: { opacity: 1, y: 0, filter: 'none' },
  visible: { opacity: 1, y: 0, filter: 'none' },
}
