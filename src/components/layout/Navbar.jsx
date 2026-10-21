import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SECTION_IDS } from '../../constants/site'
import { DURATION, EASE_OUT_SOFT } from '../../constants/motion'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTranslation } from '../../i18n/languageContext'
import Monogram from '../ui/Monogram'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

const SCROLLED_OFFSET = 24
const ICON_SIZE = 20
const MOBILE_MENU_ID = 'menu-navegacao'

export default function Navbar() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pendingTarget, setPendingTarget] = useState(null)

  const sectionIds = useMemo(() => NAV_LINKS.map((link) => link.id), [])
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLLED_OFFSET)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMobileNavigate = (event, id) => {
    if (!document.getElementById(id)) return
    event.preventDefault()
    event.currentTarget.blur()
    setPendingTarget(id)
    setMenuOpen(false)
  }

  const scrollToPendingTarget = () => {
    if (pendingTarget === null) return
    const target = document.getElementById(pendingTarget)
    setPendingTarget(null)
    if (!target) return

    window.history.replaceState(null, '', `#${pendingTarget}`)
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const surfaceClass = scrolled
    ? 'border-line bg-bg/85 backdrop-blur-md'
    : 'border-transparent bg-transparent'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${surfaceClass}`}>
      <nav
        aria-label={t.nav.label}
        className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a
          href={`#${SECTION_IDS.hero}`}
          aria-label={t.nav.home}
          className="inline-flex min-h-[44px] items-center"
        >
          <Monogram size="small" />
        </a>

        <ul className="hidden items-center lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id
            const linkTone = isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'

            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative inline-flex min-h-[44px] items-center px-3 text-sm transition-colors duration-300 ${linkTone}`}
                >
                  {t.nav[link.key]}
                  <span
                    className={`absolute inset-x-3 bottom-4 h-px origin-left bg-accent transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-300 hover:border-accent hover:text-accent lg:hidden"
          >
            {menuOpen ? <X size={ICON_SIZE} /> : <Menu size={ICON_SIZE} />}
          </button>
        </div>
      </nav>

      <AnimatePresence onExitComplete={scrollToPendingTarget}>
        {menuOpen ? (
          <motion.div
            id={MOBILE_MENU_ID}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE_OUT_SOFT }}
            className="overflow-hidden border-t border-line bg-surface lg:hidden"
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2 sm:px-8">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => handleMobileNavigate(event, link.id)}
                    className="flex min-h-[48px] items-center border-b border-line text-sm text-ink-muted transition-colors duration-300 last:border-0 hover:text-accent"
                  >
                    {t.nav[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
