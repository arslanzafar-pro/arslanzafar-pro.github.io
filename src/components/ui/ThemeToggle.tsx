import { useTranslation } from 'react-i18next'
import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi'

import { DropdownMenu } from '@/components/ui/DropdownMenu'
import { useTheme } from '@/hooks/useTheme'
import type { Theme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { t } = useTranslation()
  const { theme, resolvedTheme, setTheme } = useTheme()

  const items: Array<{ value: Theme; label: string; icon: React.ReactNode }> = [
    { value: 'dark', label: t('a11y.themeDark'), icon: <FiMoon aria-hidden="true" /> },
    { value: 'light', label: t('a11y.themeLight'), icon: <FiSun aria-hidden="true" /> },
    { value: 'system', label: t('a11y.themeSystem'), icon: <FiMonitor aria-hidden="true" /> },
  ]

  return (
    <DropdownMenu
      ariaLabel={t('a11y.themeMenu')}
      trigger={
        resolvedTheme === 'dark' ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />
      }
      items={items}
      value={theme}
      onSelect={setTheme}
    />
  )
}
