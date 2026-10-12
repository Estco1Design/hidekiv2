'use client'

import { Reveal } from '@/components/Reveal'
import { SmartMedia } from '@/components/SmartMedia'
import { Footer } from '@/components/Footer'
import { getAvailableProducts, getArchiveProducts } from '@/data/products'
import { useI18n } from '@/i18n/I18nProvider'

export default function ShopPage() {
  const { t } = useI18n()
  const availableProducts = getAvailableProducts()
  const archiveProducts = getArchiveProducts()

  // Focus on OBJECT 001 as the main drop
  const object001 = availableProducts.find(p => p.slug === 'object-001')

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6 md:px-12">
      {/* Header */}
      <section className="mb-16 md:mb-24">
        <Reveal direction="up">
          <h1 className="text-editorial text-text-secondary font-light tracking-tighter mb-8">
            {t('shop.title')}
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <p className="text-mono text-text-primary/60 uppercase tracking-[0.15em] max-w-2xl">
            {t('shop.intro')}
          </p>
        </Reveal>
      </section>

      {/* Main Campaign Media - OBJECT 001 */}
      {object001 && (
        <section className="mb-20 md:mb-32">
          <Reveal direction="scale">
            <div className="aspect-[21/9] overflow-hidden bg-bg-tertiary mb-8">
              <SmartMedia
                src={object001.images[0]}
                alt={object001.title}
                aspectRatio="21/9"
                priority={true}
              />
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <p className="text-mono text-text-primary/40 text-xs-custom mb-2">
                  {t('shop.objectPrefix')} {object001.objectNumber}
                </p>
                <h2 className="text-3xl md:text-4xl text-text-secondary font-light tracking-tight">
                  {object001.title}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-2xl md:text-3xl text-text-secondary font-light tracking-tight">
                  {t('shop.onRequest')}
                </p>
                {object001.status === 'pre-order' && (
                  <p className="text-mono text-text-primary/40 text-xs-custom mt-1">
                    {t('shop.individual')}
                  </p>
                )}
                {object001.status === 'available' && (
                  <p className="text-mono text-text-primary/40 text-xs-custom mt-1">
                    AVAILABLE
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="mt-8 max-w-2xl">
              <p className="text-mono text-text-primary/50 text-sm leading-relaxed">
                {t('shop.blackSetDescription')}
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.5}>
            <a
              href={`/shop/${object001.slug}`}
              className="inline-block mt-12 px-12 py-4 bg-text-secondary text-bg-primary text-mono uppercase tracking-[0.2em] hover:bg-text-primary/80 transition-colors"
              data-hover="true"
            >
              {t('shop.viewObject')}
            </a>
          </Reveal>
        </section>
      )}

      {/* Archive Section */}
      {archiveProducts.length > 0 && (
        <section className="border-t border-white/10 pt-20">
          <Reveal direction="up">
            <p className="text-mono text-text-primary/40 uppercase tracking-[0.15em] mb-8">
              {t('shop.archive')}
            </p>
          </Reveal>

          <div className="space-y-4">
            {archiveProducts.map((product, index) => (
              <Reveal key={product.id} direction="up" delay={index * 0.1}>
                <a
                  href={`/shop/${product.slug}`}
                  className="block group py-6 border-b border-white/10 hover:border-white/30 transition-colors"
                  data-hover="true"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className="text-mono text-text-primary/40">
                        {product.objectNumber}
                      </span>
                      <h3 className="text-xl text-text-secondary font-light tracking-tight group-hover:text-text-primary/80 transition-colors">
                        {product.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-8 text-mono text-text-primary/40">
                      <span>{t('shop.archiveLabel')}</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="transform group-hover:translate-x-2 transition-transform opacity-0 group-hover:opacity-100"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Footer showShopPreview={false} />
    </div>
  )
}
