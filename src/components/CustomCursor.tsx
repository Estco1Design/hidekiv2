'use client'

import { useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import gsap from 'gsap'

interface CursorProps {
  enabled?: boolean
}

export function CustomCursor({ enabled = true }: CursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const isHoveringRef = useRef(false)
  const isVisibleRef = useRef(false)
  const hoverLabelRef = useRef<string | null>(null)
  const isTouchRef = useRef(false)
  const isInitializedRef = useRef(false)

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || isInitializedRef.current) return

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isTouchRef.current = true
      return
    }

    isVisibleRef.current = true
    isInitializedRef.current = true

    // Initial show animation
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 0 })
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return
      
      // Direct GSAP update without React state
      gsap.to(cursorRef.current, {
        opacity: 1,
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const label = target.getAttribute('data-hover-label')
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.hover === 'true'

      if (label) {
        hoverLabelRef.current = label
        if (labelRef.current) {
          gsap.to(labelRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        }
      } else if (isInteractive) {
        hoverLabelRef.current = null
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            scale: 2.5,
            duration: 0.3,
            ease: 'power2.out',
          })
        }
      } else {
        hoverLabelRef.current = null
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        }
      }

      isHoveringRef.current = !!(isInteractive || label)
    }

    const handleMouseOut = () => {
      hoverLabelRef.current = null
      if (labelRef.current) {
        gsap.to(labelRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.2,
          ease: 'power2.in',
        })
      }
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
      isHoveringRef.current = false
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', checkHover, { passive: true })
    window.addEventListener('mouseleave', handleMouseOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', checkHover)
      window.removeEventListener('mouseleave', handleMouseOut)
      isInitializedRef.current = false
    }
  }, [enabled])

  if (!enabled || isTouchRef.current) return null

  return (
    <>
      <div
        ref={cursorRef}
        className={clsx(
          'fixed top-0 left-0 w-2 h-2 bg-text-secondary rounded-full pointer-events-none z-[9999]',
          'mix-blend-difference'
        )}
        style={{ opacity: 0 }}
      />
      <div
        ref={labelRef}
        className={clsx(
          'fixed px-3 py-1.5 bg-text-secondary text-bg-primary',
          'text-xs-custom tracking-wider uppercase rounded-full pointer-events-none z-[9999]',
          'opacity-0 scale-0'
        )}
      >
        {hoverLabelRef.current}
      </div>
    </>
  )
}
