import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import de from '@/locales/de.json'
import en from '@/locales/en.json'

/**
 * To add a language:
 *  1. Copy src/locales/en.json to src/locales/<code>.json and translate it.
 *  2. Import it above and add it to `resources` and `languages` below.
 * That's it — the switcher, <html lang> and persistence pick it up automatically.
 */
export const languages = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
] as const

export type LanguageCode = (typeof languages)[number]['code']

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      en: { translation: en },
    },
    // German is the site default; only an explicit visitor choice overrides it.
    fallbackLng: 'de',
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      // React already escapes rendered strings
      escapeValue: false,
    },
  })

// Keep <html lang> in sync for SEO and screen readers
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng.split('-')[0]
})

export default i18n
