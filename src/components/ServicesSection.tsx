 'use client'
import Link from 'next/link'
import { Reveal } from './Reveal'
import { useI18n } from '@/i18n/I18nProvider'
export function ServicesSection(){const {t}=useI18n();return <section className="py-20 md:py-32 px-6 md:px-12"><Reveal><p className="text-mono text-white/50 mb-12">{t('services.title')}</p></Reveal><div className="grid md:grid-cols-2 gap-12">{['fashionPhotography','campaigns','videoProduction','artDirection'].map((key,i)=><Reveal key={key} delay={i*.1}><Link href="/studio#packages" className="group block"><p className="text-mono text-white/40 mb-4">0{i+1} / ↗</p><h3 className="text-2xl font-light mb-4 group-hover:translate-x-2 transition-transform">{t('services.'+key)}</h3><p className="text-mono text-white/50 leading-relaxed">{t('services.'+key+'Desc')}</p></Link></Reveal>)}</div></section>}
