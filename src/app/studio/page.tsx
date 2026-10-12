'use client'

import { Packages } from '@/components/Packages'
import { Process } from '@/components/Process'
import { Reveal } from '@/components/Reveal'
import { SmartMedia } from '@/components/SmartMedia'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'
import { useI18n } from '@/i18n/I18nProvider'

export default function StudioPage() {
  const { t } = useI18n()

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6 md:px-12">
      {/* Header */}
      <section className="mb-20 md:mb-32">
        <Reveal direction="up">
          <h1 className="text-editorial text-text-secondary font-light tracking-tighter mb-8">
            {t('studio.title')}
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <p className="text-mono text-text-primary/60 uppercase tracking-[0.15em] max-w-2xl leading-relaxed">
            {t('studio.manifesto')}
          </p>
        </Reveal>
      </section>

      <Packages />
      <Process />
      {/* Large Media Section */}
      <section className="mb-20 md:mb-32">
        <Reveal direction="scale">
          <div className="aspect-[21/9] overflow-hidden bg-bg-tertiary">
            <SmartMedia
              src="/media/projects/shadow/img-01.jpg"
              alt="HIDEKI Studio"
              aspectRatio="21/9"
              priority={true}
            />
          </div>
        </Reveal>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-32 border-t border-white/10">
        <Reveal direction="up">
          <div className="max-w-4xl">
            <p className="text-2xl md:text-4xl text-text-secondary font-light tracking-tight leading-relaxed mb-12">
              {t('studio.philosophy')}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mt-20">
          <Reveal direction="up" delay={0.2}>
            <div>
              <h3 className="text-xl text-text-secondary font-light tracking-tight mb-4">
                {t('studio.fashionPart')}
              </h3>
              <p className="text-mono text-text-primary/50 text-sm leading-relaxed whitespace-pre-line">
                {t('studio.fashionDesc')}
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div>
              <h3 className="text-xl text-text-secondary font-light tracking-tight mb-4">
                {t('studio.productionPart')}
              </h3>
              <p className="text-mono text-text-primary/50 text-sm leading-relaxed whitespace-pre-line">
                {t('studio.productionDesc')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services - Editorial Style */}
      <section className="py-20 md:py-32 border-t border-white/10">
        <Reveal direction="up">
          <p className="text-mono text-text-primary/40 uppercase tracking-[0.15em] mb-12">
            {t('services.title')}
          </p>
        </Reveal>

        <div className="space-y-16">
          <Reveal direction="up" delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-8 border-b border-white/10">
              <span className="text-mono text-text-primary/30 text-xs-custom">01</span>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl text-text-secondary font-light tracking-tight">
                  {t('services.fashionPhotography')}
                </h3>
                <p className="text-mono text-text-primary/50 text-sm mt-2 max-w-xl">
                  {t('services.fashionPhotographyDesc')}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-8 border-b border-white/10">
              <span className="text-mono text-text-primary/30 text-xs-custom">02</span>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl text-text-secondary font-light tracking-tight">
                  {t('services.campaigns')}
                </h3>
                <p className="text-mono text-text-primary/50 text-sm mt-2 max-w-xl">
                  {t('services.campaignsDesc')}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-8 border-b border-white/10">
              <span className="text-mono text-text-primary/30 text-xs-custom">03</span>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl text-text-secondary font-light tracking-tight">
                  {t('services.videoProduction')}
                </h3>
                <p className="text-mono text-text-primary/50 text-sm mt-2 max-w-xl">
                  {t('services.videoProductionDesc')}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-8 border-b border-white/10">
              <span className="text-mono text-text-primary/30 text-xs-custom">04</span>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl text-text-secondary font-light tracking-tight">
                  {t('services.artDirection')}
                </h3>
                <p className="text-mono text-text-primary/50 text-sm mt-2 max-w-xl">
                  {t('services.artDirectionDesc')}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.5}>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-8 border-b border-white/10">
              <span className="text-mono text-text-primary/30 text-xs-custom">05</span>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl text-text-secondary font-light tracking-tight">
                  {t('services.aiPhotography')}
                </h3>
                <p className="text-mono text-text-primary/50 text-sm mt-2 max-w-xl">
                  {t('services.aiPhotographyDesc')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Selected Work Preview */}
      <section className="py-20 md:py-32 border-t border-white/10">
        <Reveal direction="up">
          <p className="text-mono text-text-primary/40 uppercase tracking-[0.15em] mb-12">
            {t('home.selectedWorks')}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal direction="up" delay={0.1}>
            <a href="/work/echoes-of-silence" className="group block">
              <div className="aspect-[3/4] overflow-hidden bg-bg-tertiary mb-4">
                <SmartMedia
                  src="/media/projects/echoes/img-01.jpg"
                  alt="Echoes of Silence"
                  aspectRatio="3/4"
                />
              </div>
              <p className="text-mono text-text-primary/40 text-xs-custom">FASHION / 2026</p>
              <h4 className="text-lg text-text-secondary font-light tracking-tight group-hover:text-text-primary/80 transition-colors">
                ECHOES OF SILENCE
              </h4>
            </a>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <a href="/work/shadow-ritual" className="group block">
              <div className="aspect-[3/4] overflow-hidden bg-bg-tertiary mb-4">
                <SmartMedia
                  src="/media/projects/shadow/img-01.jpg"
                  alt="Shadow Ritual"
                  aspectRatio="3/4"
                />
              </div>
              <p className="text-mono text-text-primary/40 text-xs-custom">CAMPAIGN / 2026</p>
              <h4 className="text-lg text-text-secondary font-light tracking-tight group-hover:text-text-primary/80 transition-colors">
                SHADOW RITUAL
              </h4>
            </a>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <a href="/work/motion-study-001" className="group block">
              <div className="aspect-[3/4] overflow-hidden bg-bg-tertiary mb-4">
                <SmartMedia
                  src="/media/projects/concrete/img-01.jpg"
                  alt="Motion Study 001"
                  aspectRatio="3/4"
                />
              </div>
              <p className="text-mono text-text-primary/40 text-xs-custom">FILM / 2026</p>
              <h4 className="text-lg text-text-secondary font-light tracking-tight group-hover:text-text-primary/80 transition-colors">
                MOTION STUDY 001
              </h4>
            </a>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
        ctaText={t('cta.ctaText')}
        ctaHref="/contact"
      />

      <Footer showShopPreview={false} />
    </div>
  )
}
