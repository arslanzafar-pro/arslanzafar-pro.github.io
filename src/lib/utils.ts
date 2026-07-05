/** Join conditional class names — tiny local alternative to `clsx`. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/** Format an ISO month ('2024-10') as a localized 'Okt. 2024' / 'Oct 2024'. */
export function formatMonthYear(isoMonth: string, locale: string): string {
  const [year, month] = isoMonth.split('-').map(Number)
  const date = new Date(year, (month ?? 1) - 1, 1)
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(date)
}
