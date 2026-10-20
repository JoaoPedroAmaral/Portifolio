import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Github, GraduationCap, Linkedin, Mail, MessageCircle, Phone, X } from 'lucide-react'
import { CONTACT_CHANNELS } from '../../constants/contact'
import { EASE_OUT_SOFT } from '../../constants/motion'
import { useTranslation } from '../../i18n/languageContext'

const TRIGGER_ICON_SIZE = 22
const BUBBLE_ICON_SIZE = 18
const BUBBLE_GAP = 60
const BUBBLE_STAGGER = 0.055
const CENTER_SHIFT = '-50%'
const PANEL_ID = 'contato-rapido'

const CHANNEL_ICONS = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  phone: Phone,
  graduation: GraduationCap,
}

const bubbleSpring = { type: 'spring', stiffness: 420, damping: 26 }

function bubbleVariants(index) {
  return {
    hidden: { opacity: 0, x: CENTER_SHIFT, y: 12, scale: 0.4 },
    visible: {
      opacity: 1,
      x: CENTER_SHIFT,
      y: -(BUBBLE_GAP * (index + 1)),
      scale: 1,
      transition: { ...bubbleSpring, delay: index * BUBBLE_STAGGER },
    },
    exit: {
      opacity: 0,
      x: CENTER_SHIFT,
      y: 12,
      scale: 0.4,
      transition: { duration: 0.18, ease: EASE_OUT_SOFT, delay: index * 0.03 },
    },
  }
}

const staticBubbleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

export default function QuickContact() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const triggerLabel = open ? t.contact.closeQuickContact : t.contact.openQuickContact

  const stackClassName = prefersReducedMotion
    ? 'absolute inset-x-0 bottom-16 flex flex-col-reverse items-center gap-3'
    : 'absolute inset-x-0 bottom-1'

  const bubbleClassName = prefersReducedMotion
    ? 'group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-ink-muted shadow-card transition-colors duration-300 hover:border-accent hover:text-accent'
    : 'group absolute bottom-0 left-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-ink-muted shadow-card transition-colors duration-300 hover:border-accent hover:text-accent'

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 sm:bottom-8 sm:right-8"
    >
      <div className={stackClassName}>
        <AnimatePresence>
          {open
            ? CONTACT_CHANNELS.map((channel, index) => {
                const Icon = CHANNEL_ICONS[channel.icon]
                const label = t.contact.channels[channel.id]
                const value = channel.value ?? t.contact.lattesValue
                const externalProps = channel.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {}

                return (
                  <motion.a
                    key={channel.id}
                    href={channel.href}
                    {...externalProps}
                    aria-label={`${label}: ${value}`}
                    title={label}
                    variants={
                      prefersReducedMotion ? staticBubbleVariants : bubbleVariants(index)
                    }
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={bubbleClassName}
                  >
                    <Icon size={BUBBLE_ICON_SIZE} aria-hidden="true" />
                    <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] text-ink opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                      {label}
                    </span>
                  </motion.a>
                )
              })
            : null}
        </AnimatePresence>
      </div>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={triggerLabel}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
        className="absolute inset-0 inline-flex items-center justify-center rounded-full bg-accent text-accent-ink shadow-card"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
            transition={{ duration: 0.2, ease: EASE_OUT_SOFT }}
            className="inline-flex"
          >
            {open ? <X size={TRIGGER_ICON_SIZE} /> : <MessageCircle size={TRIGGER_ICON_SIZE} />}
          </motion.span>
        </AnimatePresence>

        {open || prefersReducedMotion ? null : (
          <span aria-hidden="true" className="absolute inset-0 animate-pulse-dot rounded-full" />
        )}
      </motion.button>

      <span id={PANEL_ID} className="sr-only">
        {t.contact.label}
      </span>
    </div>
  )
}
