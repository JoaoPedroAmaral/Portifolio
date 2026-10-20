import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { LANGUAGES } from '../../i18n/languages'
import { useTranslation } from '../../i18n/languageContext'
import { DURATION, EASE_OUT_SOFT } from '../../constants/motion'

const ICON_SIZE = 17
const MENU_ID = 'seletor-idioma'

export default function LanguageSwitcher() {
  const { language, changeLanguage, t } = useTranslation()
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

  const current = LANGUAGES.find((entry) => entry.code === language)

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t.language.choose}
        aria-expanded={open}
        aria-controls={MENU_ID}
        className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line px-3 text-ink-muted transition-colors duration-300 hover:border-accent hover:text-accent"
      >
        <Languages size={ICON_SIZE} aria-hidden="true" />
        <span className="font-mono text-xs">{current?.short}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={MENU_ID}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: DURATION.fast, ease: EASE_OUT_SOFT }}
            className="absolute right-0 top-13 z-50 min-w-[9.5rem] overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-card"
          >
            {LANGUAGES.map((entry) => {
              const isCurrent = entry.code === language
              const tone = isCurrent ? 'text-accent' : 'text-ink-muted hover:text-ink'

              return (
                <li key={entry.code}>
                  <button
                    type="button"
                    onClick={() => {
                      changeLanguage(entry.code)
                      setOpen(false)
                    }}
                    aria-current={isCurrent ? 'true' : undefined}
                    className={`flex min-h-[44px] w-full items-center gap-3 px-4 text-left text-sm transition-colors duration-300 hover:bg-raised ${tone}`}
                  >
                    <span className="font-mono text-[11px]">{entry.short}</span>
                    {entry.label}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
