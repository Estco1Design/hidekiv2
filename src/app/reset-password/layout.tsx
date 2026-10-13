import { socialMetadata } from '@/lib/social-metadata'
import type { Metadata } from 'next'
export const metadata: Metadata = {...socialMetadata('/reset-password'), title: 'Восстановление доступа | HIDEKI', alternates: { canonical: '/reset-password' }, robots: { index: false, follow: false } }
export default function Layout({children}:{children:React.ReactNode}){return children}
