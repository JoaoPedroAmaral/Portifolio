import { PROFILE, SECTION_IDS } from '../../constants/site'
import { useTranslation } from '../../i18n/languageContext'
import Monogram from '../ui/Monogram'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-4 px-5 py-10 sm:grid-cols-3 sm:px-8">
        <a
          href={`#${SECTION_IDS.hero}`}
          aria-label={t.footer.backToTop}
          className="inline-flex min-h-[44px] items-center justify-self-center sm:justify-self-start"
        >
          <Monogram size="small" />
        </a>

        <p className="justify-self-center text-center font-mono text-xs text-ink-muted">
          {year} · {PROFILE.fullName}
        </p>

        <span aria-hidden="true" className="hidden sm:block" />
      </div>
    </footer>
  )
}
