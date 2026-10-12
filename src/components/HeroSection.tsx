 'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { Reveal } from './Reveal'
import { SmartMedia } from './SmartMedia'
import { useI18n } from '@/i18n/I18nProvider'
export function HeroSection({video='/media/hero/hero.mp4',image='/media/hero/hero-poster.jpg',title='HIDEKI'}:{video?:string;image?:string;title?:string;subtitle?:string}){
 const {language}=useI18n();const ru=language==='ru';const section=useRef<HTMLElement>(null);const [sound,setSound]=useState(false)
 function toggle(){const el=section.current?.querySelector('video');if(!el)return;el.muted=!el.muted;setSound(!el.muted);void el.play().catch(()=>{})}
 return <section ref={section} className="relative w-full hero-screen overflow-hidden">
 <div className="absolute inset-0"><SmartMedia src={video} type="video" poster={image} priority alt="HIDEKI showreel"/></div>
 <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-bg-primary pointer-events-none"/>
 <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-12"><Reveal><p className="text-mono text-white/70 mb-5">ALEXANDRO HIDEKI / MOSCOW</p><h1 className="text-editorial text-text-secondary font-light tracking-tighter mb-6">{title}</h1><p className="text-lg md:text-2xl max-w-xl font-light mb-3">{ru?'Фотография и фильмы с характером.':'Photography and films with character.'}</p><p className="text-mono text-white/60 mb-8">{ru?'Частные съёмки и проекты для брендов · от 50 000 ₽':'Personal shoots and brand projects · from ₽50,000'}</p><div className="flex flex-wrap gap-4"><Link href="/work" className="border border-white/30 px-6 py-4 text-xs-custom hover:bg-white/10 transition-colors">{ru?'Смотреть работы':'View work'}</Link><Link href="/studio#packages" className="bg-white text-black px-6 py-4 text-xs-custom hover:bg-white/80 transition-colors">{ru?'Выбрать съёмку':'Choose a shoot'}</Link></div></Reveal></div>
 <button onClick={toggle} aria-pressed={sound} className="absolute bottom-6 right-6 z-20 text-xs-custom border border-white/20 px-4 py-3">{ru?(sound?'ЗВУК ВКЛ':'ЗВУК ВЫКЛ'):(sound?'SOUND ON':'SOUND OFF')}</button><a href="#selected-work" aria-label={ru?'К работам':'Scroll to work'} className="absolute bottom-6 left-6 z-20 text-mono">↓ {ru?'Работы':'Work'}</a>
 </section>
}
