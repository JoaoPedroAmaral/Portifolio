import { STATUS_PRESENTATION } from '../../constants/projectStatus'
import { useTranslation } from '../../i18n/languageContext'

export default function StatusBadge({ status }) {
  const { t } = useTranslation()
  const presentation = STATUS_PRESENTATION[status]
  if (!presentation) return null

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] ${presentation.containerClassName}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${presentation.dotClassName}`} aria-hidden="true" />
      {t.status[status]}
    </span>
  )
}
