 'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'
if(typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)
interface RevealProps { children: React.ReactNode; className?: string; delay?: number; direction?: 'up'|'down'|'left'|'right'|'scale' }
export function Reveal({children,className,delay=0,direction='up'}:RevealProps){
 const ref=useRef<HTMLDivElement>(null)
 useEffect(()=>{
  if(!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const ctx=gsap.context(()=>{
   const from={opacity:0,x:direction==='left'?35:direction==='right'?-35:0,y:direction==='up'?35:direction==='down'?-35:0,scale:direction==='scale'?.97:1}
   gsap.fromTo(ref.current,from,{opacity:1,x:0,y:0,scale:1,duration:.85,delay:Math.min(delay,.3),ease:'power3.out',clearProps:'all',scrollTrigger:{trigger:ref.current,start:'top 95%',once:true}})
  },ref)
  return()=>ctx.revert()
 },[delay,direction])
 return <div ref={ref} className={clsx('reveal-element',className)}>{children}</div>
}
