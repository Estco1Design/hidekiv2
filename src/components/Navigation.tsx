'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import gsap from 'gsap'
import { Reveal } from './Reveal'
import { useI18n } from '@/i18n/I18nProvider'

interface NavItem {
  labelKey: string
  href: string
}

const navItems: NavItem[] = [
  { labelKey: 'nav.work', href: '/work' },
  { labelKey: 'nav.studio', href: '/studio' },
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.shop', href: '/shop' },
  { labelKey: 'nav.contact', href: '/contact' },
  { labelKey: 'nav.account', href: '/account' },
]

interface NavigationProps {
  theme?: 'dark' | 'light'
  hidden?: boolean
}

export function Navigation({ theme = 'dark', hidden = false }: NavigationProps) {
  const pathname = usePathname()
  const { language, setLanguage, t } = useI18n()
  const navRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const isDark = theme === 'dark'

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouch(isTouchDevice)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current && !mobileMenuOpen) {
      gsap.fromTo(
        navRef.current.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
      )
    }
  }, [mobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const textColor = isDark ? 'text-text-secondary' : 'text-text-primary'

  useEffect(() => {
    if (!mobileMenuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => document.querySelector<HTMLAnchorElement>('#mobile-menu a')?.focus(), 50)
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
      if (e.key === 'Tab') {
        const items = Array.from(document.querySelectorAll<HTMLElement>('#mobile-menu a, button[aria-controls="mobile-menu"]'))
        const first = items[0], last = items[items.length - 1]
        if(e.shiftKey && document.activeElement === first) {e.preventDefault();last?.focus()}
        else if(!e.shiftKey && document.activeElement === last) {e.preventDefault();first?.focus()}
      }
    }
    window.addEventListener('keydown', handler)
    return () => { window.clearTimeout(timer); document.body.style.overflow = previous; window.removeEventListener('keydown', handler); document.querySelector<HTMLButtonElement>('button[aria-controls="mobile-menu"]')?.focus() }
  }, [mobileMenuOpen])
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en')
  }

  return (
    <>
      <nav
        ref={navRef}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 md:py-8 transition-[background-color,opacity] duration-500',
          scrolled && 'bg-bg-primary/80 backdrop-blur-sm',
          hidden && 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex justify-between items-start">
          <Link
            href="/"
            className={clsx(
              'text-sm tracking-[0.2em] uppercase transition-opacity z-50',
              textColor
            )}
            data-hover="true"
          >
            HIDEKI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'text-xs-custom transition-colors relative group',
                  pathname === item.href ? textColor : `${textColor}/80`
                )}
                data-hover="true"
              >
                {t(item.labelKey)}
                <span
                  className={clsx(
                    'absolute -bottom-1 left-0 h-[1px] transition-[width] duration-300',
                    isDark ? 'bg-white' : 'bg-text-primary',
                    pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={clsx(
                'text-xs-custom transition-colors min-h-11 min-w-11',
                textColor
              )}
              data-hover="true"
            >
              {language.toUpperCase()}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Language Switcher for Mobile */}
            <button
              onClick={toggleLanguage}
              className={clsx('text-xs-custom min-h-11 min-w-11', textColor)}
              data-hover="true"
            >
              {language.toUpperCase()}
            </button>
            <button
              className={clsx('z-50 min-h-11 min-w-11 flex items-center justify-center', textColor)}
              onClick={toggleMobileMenu}
              aria-label={language === 'ru' ? 'Меню' : 'Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              data-hover="true"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu" data-lenis-prevent className="fixed inset-0 z-40 bg-bg-primary md:hidden overflow-y-auto"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
            {navItems.map((item, index) => (
              <Reveal key={item.href} direction="up" delay={index * 0.1}>
                <Link
                  href={item.href}
                  className={clsx(
                    'text-2xl tracking-[0.2em] uppercase transition-colors',
                    pathname === item.href ? textColor : `${textColor}/60`
                  )}
                  onClick={toggleMobileMenu}
                  data-hover="true"
                >
                  {t(item.labelKey)}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
