import { socialMetadata } from '@/lib/social-metadata'
import type { Metadata } from 'next'
export const metadata: Metadata = {...socialMetadata('/work'),robots: {index:false,follow:true},alternates: {canonical: '/work'},title: 'Портфолио | HIDEKI', description: 'Фотография и fashion films HIDEKI.'}
export default function Layout({children}:{children:React.ReactNode}){return children}
