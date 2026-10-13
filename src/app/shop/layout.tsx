import { socialMetadata } from '@/lib/social-metadata'
import type { Metadata } from 'next'
export const metadata: Metadata = {...socialMetadata('/shop'),alternates: {canonical: '/shop'},title: 'Объекты | HIDEKI', description: 'Одежда и экспериментальный дизайн HIDEKI.'}
export default function Layout({children}:{children:React.ReactNode}){return children}
