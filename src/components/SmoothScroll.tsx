'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const pathname = usePathname()
  const isInitializedRef = useRef(false)

  // Initialize Lenis once
  useEffect(() => {
    if (typeof window === 'undefined' || isInitializedRef.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    lenisRef.current = new Lenis({
      duration: isTouchDevice ? 0.6 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: isTouchDevice ? 0.05 : 0.1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: isTouchDevice ? 1 : 2,
      wheelMultiplier: 1,
      infinite: false,
    })

    const lenis = lenisRef.current
    isInitializedRef.current = true

    function raf(time: number) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }
    
    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      isInitializedRef.current = false
    }
  }, [])

  // Reset scroll position on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [pathname])

  return <>{children}</>
}
