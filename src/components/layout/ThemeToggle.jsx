import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/themeContext'
import { useTranslation } from '../../i18n/languageContext'

const ICON_SIZE = 17

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const actionLabel = isDark ? t.theme.toLight : t.theme.toDark

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={actionLabel}
      title={actionLabel}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      {isDark ? <Sun size={ICON_SIZE} /> : <Moon size={ICON_SIZE} />}
    </button>
  )
}
