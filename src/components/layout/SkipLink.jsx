import { MAIN_CONTENT_ID } from '../../constants/site'
import { useTranslation } from '../../i18n/languageContext'

export default function SkipLink() {
  const { t } = useTranslation()

  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-full focus:bg-accent focus:px-5 focus:font-mono focus:text-sm focus:text-accent-ink"
    >
      {t.nav.skipToContent}
    </a>
  )
}
