import { socialMetadata } from '@/lib/social-metadata'
import type { Metadata } from 'next'
export const metadata: Metadata = {...socialMetadata('/login'), title: 'Вход в кабинет | HIDEKI', alternates: { canonical: '/login' }, robots: { index: false, follow: false } }
export default function Layout({children}:{children:React.ReactNode}){return children}
