 'use client'
import Link from 'next/link'
import { Reveal } from './Reveal'
import { SmartMedia } from './SmartMedia'
import { useI18n } from '@/i18n/I18nProvider'
export function Gallery3D(){const {language}=useI18n();return <section className="relative py-20 md:py-32 px-6 md:px-12"><Reveal><p className="text-mono text-text-primary/50 mb-12">PHOTOGRAPHY / IN MOTION</p></Reveal><div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12 items-center">{['echoes','void','shadow'].map((name,i)=><Reveal key={name} direction="scale" delay={i*.1} className={i===1?'md:-translate-y-10':''}><Link href={'/work/'+(['echoes-of-silence','void-portraits','shadow-ritual'][i])} className="block aspect-[3/4] media-frame"><SmartMedia src={`/media/projects/${name}/img-01.jpg`} alt={name}/></Link></Reveal>)}</div><Link href="/work" className="inline-block mt-10 text-mono border-b border-white/30 pb-2">{language==='ru'?'Смотреть все работы':'Explore all work'} ↗</Link></section>}
