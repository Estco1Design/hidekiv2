import { socialMetadata } from '@/lib/social-metadata'
import type { Metadata } from 'next'
export const metadata: Metadata = {...socialMetadata('/about'),alternates: {canonical: '/about'},title: 'Команда | HIDEKI', description: 'Александро Хидеки — фотография, свет, видео и звук. Платон Эстко — дизайн и разработка одежды.'}
export default function Layout({children}:{children:React.ReactNode}){return children}
