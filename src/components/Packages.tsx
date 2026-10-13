 'use client'
import Link from 'next/link'
import { offers } from '@/data/offers'
import { useI18n } from '@/i18n/I18nProvider'
import { Reveal } from './Reveal'
export function Packages({compact=false}:{compact?:boolean}) {
 const {language}=useI18n();const ru=language==='ru'
 return <section id="packages" className="py-20 md:py-32 px-6 md:px-12 border-t border-white/10">
 <Reveal><div className="flex flex-wrap justify-between gap-6 mb-12"><h2 className="text-3xl md:text-5xl font-light tracking-tight">{ru?'ВЫБЕРИТЕ СЪЁМКУ':'CHOOSE YOUR SHOOT'}</h2><p className="text-mono text-white/50 max-w-sm">{ru?'Начните с задачи. Мы поможем определить формат и соберём смету до бронирования.':'Start with your goal. We help define the format and agree an estimate before booking.'}</p></div></Reveal>
 <div className="grid md:grid-cols-3 gap-8">{offers.map((o,i)=><Reveal key={o.id} delay={i*.1} className="h-full"><article className="h-full flex flex-col border-t border-white/30 pt-8"><p className="text-mono text-white/40 mb-5">0{i+1}</p><h3 className="text-xl tracking-tight font-light mb-5">{o.name[language]}</h3><p className="text-white/60 leading-relaxed mb-6">{o.summary[language]}</p><p className="text-2xl font-light mb-8">{o.price?(ru?'от ':'from ₽')+o.price.toLocaleString('ru-RU')+(ru?' ₽':''):(ru?'По запросу':'On request')}</p>{!compact&&<><ul className="text-mono text-white/70 space-y-4 mb-8">{o.items[language].map(item=><li key={item}>— {item}</li>)}</ul><p className="text-mono text-white/45 mb-8 leading-relaxed">{o.note[language]}</p></>}<Link href={`/contact?package=${o.id}`} className="mt-auto inline-block py-4 border-b border-white/30 text-xs-custom hover:text-white transition-colors">{ru?'Обсудить съёмку':'Discuss your shoot'} ↗</Link></article></Reveal>)}</div>
 <p className="mt-10 text-mono text-white/45 leading-relaxed">{ru?'Итоговая стоимость зависит от команды, локации и задачи. Сроки, состав результата и права использования согласуем до съёмки.':'Final pricing depends on crew, location and scope. Delivery dates, deliverables and usage rights are agreed before the shoot.'}</p>
 {compact&&<Link href="/studio#packages" className="inline-block mt-6 text-mono underline underline-offset-8">{ru?'Что входит и как проходит съёмка':'See inclusions and process'}</Link>}
 </section>
}
