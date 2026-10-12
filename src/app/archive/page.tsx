'use client'
import { SafeImage } from '@/components/SafeImage'

import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { getArchiveProducts } from '@/data/products'
import { useI18n } from '@/i18n/I18nProvider'

export default function ArchivePage() {
  const { t } = useI18n()
  const archiveProducts = getArchiveProducts()

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6 md:px-12">
      {/* Header */}
      <section className="mb-16 md:mb-24">
        <Reveal direction="up">
          <h1 className="text-editorial text-text-secondary font-light tracking-tighter mb-8">
            {t('archive.title')}
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <p className="text-mono text-text-primary/60 uppercase tracking-[0.15em] max-w-2xl whitespace-pre-line">
            {t('archive.subtitle')}
          </p>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="space-y-12">
        {archiveProducts.map((product, index) => (
          <Reveal key={product.id} direction="up" delay={index * 0.1}>
            <div className="group">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Year / Number */}
                <div className="md:col-span-2">
                  <p className="text-mono text-text-primary/40">
                    {product.objectNumber}
                  </p>
                  <p className="text-mono text-text-primary/30 text-sm">
                    {product.year || 2026}
                  </p>
                </div>

                {/* Image */}
                <div className="md:col-span-5">
                  <div className="aspect-[3/4] overflow-hidden bg-bg-tertiary">
                    <SafeImage
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="md:col-span-5 flex flex-col justify-center">
                  <h3 className="text-2xl text-text-secondary font-light tracking-tight mb-4">
                    {product.title}
                  </h3>
                  <p className="text-mono text-text-primary/50 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-4 text-mono text-text-primary/40 text-xs-custom">
                    <a href={`/shop/${product.slug}`} className="underline underline-offset-4">{t('shop.viewObject')}</a>
                    <span>/</span>
                    <span>{t('shop.archiveLabel')}</span>
                  </div>
                </div>
              </div>

              {index < archiveProducts.length - 1 && (
                <div className="mt-12 md:mt-20 border-b border-white/5" />
              )}
            </div>
          </Reveal>
        ))}
      </section>

      {archiveProducts.length === 0 && (
        <Reveal direction="up">
          <div className="py-32 text-center">
            <p className="text-mono text-text-primary/40 uppercase tracking-[0.15em]">
              {t('archive.noObjects')}
            </p>
          </div>
        </Reveal>
      )}

      <Footer showShopPreview={false} />
    </div>
  )
}
