import { useTranslation } from '../../i18n/languageContext'

export default function Tag({ children }) {
  const { t } = useTranslation()
  const label = t.terms[children] ?? children

  return (
    <span className="inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-muted">
      {label}
    </span>
  )
}
