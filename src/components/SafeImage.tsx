 'use client'
import { useState, type ImgHTMLAttributes } from 'react'
import assets from '@/data/media-assets.json'
const localAssets = new Set(assets)
export function SafeImage({src, alt = '', onError, ...props}: ImgHTMLAttributes<HTMLImageElement>) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>()
  const missing = !src || failedSrc === src || (typeof src === 'string' && src.startsWith('/') && !localAssets.has(src))
  return <img width={800} height={1000} loading="lazy" decoding="async" {...props} src={missing ? '/media/placeholder.svg' : src} alt={missing ? `${alt} — media coming soon` : alt} onError={e => { if (!missing) setFailedSrc(typeof src === 'string' ? src : undefined); onError?.(e) }} />
}
