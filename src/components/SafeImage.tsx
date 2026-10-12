 'use client'
import { useState, type ImgHTMLAttributes } from 'react'
export function SafeImage({src, alt = '', onError, ...props}: ImgHTMLAttributes<HTMLImageElement>) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>()
  const missing = !src || failedSrc === src
  return <img {...props} src={missing ? '/media/placeholder.svg' : src} alt={missing ? `${alt} — media coming soon` : alt} onError={e => { if (!missing) setFailedSrc(typeof src === 'string' ? src : undefined); onError?.(e) }} />
}
