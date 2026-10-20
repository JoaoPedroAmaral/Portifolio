import { motion, useReducedMotion } from 'framer-motion'
import { revealVariants, VIEWPORT_ONCE } from '../../constants/motion'

export default function Reveal({ children, step = 0, as = 'div', className = '', ...rest }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    const PlainComponent = as
    return (
      <PlainComponent className={className} {...rest}>
        {children}
      </PlainComponent>
    )
  }

  const MotionComponent = motion[as]

  return (
    <MotionComponent
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      custom={step}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}
