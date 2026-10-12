import type { Metadata } from 'next'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'
import { CustomCursor } from '@/components/CustomCursor'
import { Navigation } from '@/components/Navigation'
import { CommandPaletteProvider } from '@/components/CommandPaletteProvider'
import { I18nProvider } from '@/i18n/I18nProvider'

export const metadata: Metadata = {
  title: 'HIDEKI | Creative Studio',
  description: 'Alexandro Hideki — photography, fashion films and visual direction. Personal shoots and brand projects. Moscow.',
  keywords: ['fashion', 'photography', 'art direction', 'creative studio', 'moscow'],
  openGraph: {
    title: 'HIDEKI | Creative Studio',
    description: 'Independent creative platform at the intersection of fashion, photography, film and contemporary art.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIDEKI | Creative Studio',
    description: 'Independent creative platform at the intersection of fashion, photography, film and contemporary art.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-bg-primary text-text-primary">
      <head>
        <meta name="theme-color" content="#050505" />
      </head>
      <body className="antialiased">
        <I18nProvider>
          <CommandPaletteProvider>
            <SmoothScroll>
              <CustomCursor enabled={true} />
              <Navigation theme="dark" />
              <a className="skip-link" href="#main-content">Skip to content</a>
              <main id="main-content">{children}</main>

            </SmoothScroll>
          </CommandPaletteProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
