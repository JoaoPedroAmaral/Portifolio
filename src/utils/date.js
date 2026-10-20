const MILLISECONDS_PER_DAY = 86400000
const DAYS_PER_MONTH = 30
const MONTHS_PER_YEAR = 12

export function formatTimeAgo(dateString, labels) {
  const days = Math.floor((Date.now() - new Date(dateString).getTime()) / MILLISECONDS_PER_DAY)
  if (days <= 0) return labels.today
  if (days === 1) return labels.yesterday
  if (days < DAYS_PER_MONTH) return labels.days(days)

  const months = Math.floor(days / DAYS_PER_MONTH)
  if (months < MONTHS_PER_YEAR) return labels.months(months)

  return labels.years(Math.floor(months / MONTHS_PER_YEAR))
}

const MONTH_INDEX_OFFSET = 1

function toDate(yearMonth) {
  const [year, month] = yearMonth.split('-').map(Number)
  return new Date(year, month - MONTH_INDEX_OFFSET)
}

export function formatMonthYear(yearMonth, locale) {
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(
    toDate(yearMonth)
  )
}

export function formatPeriod(start, end, locale, presentLabel) {
  const startLabel = formatMonthYear(start, locale)
  const endLabel = end === null ? presentLabel : formatMonthYear(end, locale)
  return `${startLabel} — ${endLabel}`
}
