import { socialMetadata } from '@/lib/social-metadata'
import type { Metadata } from 'next'
export const metadata: Metadata = {...socialMetadata('/archive'),robots: {index:false,follow:true},alternates: {canonical: '/archive'},title: 'Архив | HIDEKI', description: 'Архивные концепты HIDEKI.'}
export default function Layout({children}:{children:React.ReactNode}){return children}
