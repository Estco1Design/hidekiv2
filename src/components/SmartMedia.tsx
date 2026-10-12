 'use client'
import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { SafeImage } from './SafeImage'
interface SmartMediaProps {
 src: string; alt?: string; priority?: boolean; className?: string; type?: 'image' | 'video';
 autoPlay?: boolean; loop?: boolean; muted?: boolean; poster?: string; playsInline?: boolean;
 onLoad?: () => void; onVisible?: () => void; aspectRatio?: string; hideOnLoad?: boolean; controls?: boolean;
}
export function SmartMedia({src, alt='', priority=false, className, type='image', autoPlay=true, loop=true, muted=true, poster, playsInline=true, onLoad, onVisible, aspectRatio, controls=false}: SmartMediaProps) {
 const wrapper=useRef<HTMLDivElement>(null)
 const video=useRef<HTMLVideoElement>(null)
 const [visible,setVisible]=useState(priority)
 const [failed,setFailed]=useState(false)
 const [reduced,setReduced]=useState(false)
 useEffect(()=>{setFailed(false)},[src])
 useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(mq.matches);change();mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change)},[])
 useEffect(()=>{
  if (!wrapper.current) return
  const obs=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);onVisible?.()} if(video.current){if(entry.isIntersecting && autoPlay && !reduced){void video.current.play().catch(()=>{})}else{video.current.pause()}}},{rootMargin:'100px'})
  obs.observe(wrapper.current);return()=>obs.disconnect()
 },[autoPlay,reduced,onVisible])
 return <div ref={wrapper} className={clsx('w-full h-full overflow-hidden bg-bg-tertiary media-frame',className)} style={{aspectRatio}}>
  {type==='video' && visible && !failed ? <video ref={video} src={src} className="w-full h-full object-cover" autoPlay={autoPlay && !reduced} loop={loop} muted={muted} playsInline={playsInline} preload={priority?'auto':'metadata'} poster={poster || '/media/placeholder.svg'} controls={controls || reduced} onLoadedData={onLoad} onError={()=>setFailed(true)} /> : <SafeImage src={type==='video' ? poster || '/media/placeholder.svg' : src} alt={alt} className="w-full h-full object-cover" loading={priority?'eager':'lazy'} decoding="async" onLoad={onLoad} />}
 </div>
}
