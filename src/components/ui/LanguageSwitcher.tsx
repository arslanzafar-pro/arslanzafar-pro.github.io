import { useTranslation } from 'react-i18next'
import { FiGlobe } from 'react-icons/fi'

import { DropdownMenu } from '@/components/ui/DropdownMenu'
import { languages } from '@/lib/i18n'
import type { LanguageCode } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const current = (i18n.language?.split('-')[0] ?? 'de') as LanguageCode

  return (
    <DropdownMenu
      ariaLabel={t('a11y.languageMenu')}
      trigger={<FiGlobe aria-hidden="true" />}
      items={languages.map((lang) => ({ value: lang.code, label: lang.label }))}
      value={current}
      onSelect={(code) => void i18n.changeLanguage(code)}
    />
  )
}
