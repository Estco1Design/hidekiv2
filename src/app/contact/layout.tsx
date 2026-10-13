import { socialMetadata } from '@/lib/social-metadata'
import type { Metadata } from 'next'
export const metadata: Metadata = {...socialMetadata('/contact'),alternates: {canonical: '/contact'},title: 'Обсудить проект | HIDEKI', description: 'Расскажите о вашей идее: формат съёмки, бюджет и желаемая дата.'}
export default function Layout({children}:{children:React.ReactNode}){return children}
