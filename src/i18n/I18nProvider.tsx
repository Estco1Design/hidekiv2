'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language } from '@/i18n/translations'

type TranslationValue = string | { [key: string]: TranslationValue }

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function getNestedValue(obj: TranslationValue, keyPath: string): string {
  const keys = keyPath.split('.')
  let current: TranslationValue = obj
  
  for (const key of keys) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = current[key]
    } else {
      return keyPath // Return the key if path not found
    }
  }
  
  return typeof current === 'string' ? current : keyPath
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ru')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check localStorage or browser language on mount
    setMounted(true)
    let savedLang: Language | null = null
    try { savedLang = localStorage.getItem('hideki-language') as Language | null } catch {}
    if (savedLang && (savedLang === 'en' || savedLang === 'ru')) {
      setLanguageState(savedLang)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('ru')) {
        setLanguageState('ru')
      }
    }
  }, [])

  useEffect(() => { document.documentElement.lang = language }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try { localStorage.setItem('hideki-language', lang) } catch {}
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    const langTranslations = translations[language]
    return getNestedValue(langTranslations as TranslationValue, key)
  }

  const value = {
    language,
    setLanguage,
    t,
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
