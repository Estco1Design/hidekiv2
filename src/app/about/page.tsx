'use client'

import { Reveal } from '@/components/Reveal'
import { SmartMedia } from '@/components/SmartMedia'
import { Footer } from '@/components/Footer'
import { useI18n } from '@/i18n/I18nProvider'

export default function AboutPage() {
  const { t, language } = useI18n()

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6 md:px-12">
      {/* Header */}
      <section className="mb-20 md:mb-32">
        <Reveal direction="up">
          <h1 className="text-editorial text-text-secondary font-light tracking-tighter mb-8">
            {t('about.title')}
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <p className="text-lg md:text-xl text-text-primary/70 leading-relaxed max-w-3xl">
            {t('about.description')}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="mt-6 text-mono text-text-primary/50 uppercase tracking-[0.15em]">
            {t('about.founders')}
          </p>
        </Reveal>
      </section>

      {/* Founders Section */}
      <section className="py-20 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Founder 1 - Fashion */}
          <Reveal direction="up" delay={0.2}>
            <div className="group">
              <div className="aspect-[3/4] overflow-hidden bg-bg-tertiary mb-8">
                <SmartMedia
                  src="/media/about/founder-fashion.jpg"
                  alt={t('about.fashionDirector')}
                  aspectRatio="3/4"
                  hideOnLoad={true}
                />
              </div>
              <h3 className="text-2xl text-text-secondary font-light tracking-tight mb-4">
                {t('about.fashionDirection')}<span className="block text-mono text-white/50 mt-3">{language === 'ru' ? 'Платон Эстко · дизайн и разработка одежды' : 'Platon Estko · design and garment development'}</span>
              </h3>
              <div className="space-y-3 text-mono text-text-primary/50 text-sm leading-relaxed">
                <p>{t('about.fashionDesigner')}</p>
                <p>{t('about.graphicDesigner')}</p>
                <p>{t('about.clothingDevelopment')}</p>
                <p>{t('about.patternMaking')}</p>
                <p>{t('about.textiles')}</p>
                <p>{t('about.inHouseProduction')}</p>
                <p>{t('about.avantGarde')}</p>
              </div>
            </div>
          </Reveal>

          {/* Founder 2 - Visual */}
          <Reveal direction="up" delay={0.4}>
            <div className="group">
              <div className="aspect-[3/4] overflow-hidden bg-bg-tertiary mb-8">
                <SmartMedia
                  src="/media/about/founder-visual.jpg"
                  alt={t('about.visualDirector')}
                  aspectRatio="3/4"
                  hideOnLoad={true}
                />
              </div>
              <h3 className="text-2xl text-text-secondary font-light tracking-tight mb-4">
                {t('about.visualDirection')}<span className="block text-mono text-white/50 mt-3">{language === 'ru' ? 'Александро Хидеки · фотография, свет, видео и звук' : 'Alexandro Hideki · photography, light, film and sound'}</span>
              </h3>
              <div className="space-y-3 text-mono text-text-primary/50 text-sm leading-relaxed">
                <p>{t('about.fashionPhotographer')}</p>
                <p>{t('about.directorOfPhotography')}</p>
                <p>{t('about.lightingGaffer')}</p>
                <p>{t('about.videoProduction')}</p>
                <p>{t('about.artDirection')}</p>
                <p>{t('about.soundDesign')}</p>
                <p>{t('about.visualArtist')}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-32 border-t border-white/10">
        <Reveal direction="up">
          <div className="max-w-4xl">
            <p className="text-2xl md:text-4xl text-text-secondary font-light tracking-tight leading-relaxed">
              {t('about.philosophy')}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Location */}
      <section className="py-20 border-t border-white/10">
        <Reveal direction="up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-mono text-text-primary/40 uppercase tracking-[0.15em] mb-2">
                {t('about.basedIn')}
              </p>
              <p className="text-3xl text-text-secondary font-light tracking-tighter">
                {t('about.moscow')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-mono text-text-primary/40 uppercase tracking-[0.15em] mb-2">
                {t('about.availableFor')}
              </p>
              <p className="text-3xl text-text-secondary font-light tracking-tighter">
                {t('about.worldwide')}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer showShopPreview={false} />
    </div>
  )
}
