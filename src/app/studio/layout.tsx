import { socialMetadata } from '@/lib/social-metadata'
import type { Metadata } from 'next'
export const metadata: Metadata = {...socialMetadata('/studio'),alternates: {canonical: '/studio'},title: 'Съёмки и пакеты | HIDEKI', description: 'Портрет, fashion editorial и проекты для брендов. Форматы, подготовка и условия съёмки.'}
export default function Layout({children}:{children:React.ReactNode}){return children}
