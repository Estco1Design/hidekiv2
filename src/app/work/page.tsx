'use client'
import { SafeImage } from '@/components/SafeImage'

import { useState } from 'react'
import Link from 'next/link'
import { SmartMedia } from '@/components/SmartMedia'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { projects, getAllCategories, getProjectsByCategory } from '@/data/projects'
import { useI18n } from '@/i18n/I18nProvider'

type ViewMode = 'INDEX' | 'VISUAL'

export default function WorkPage() {
  const { t } = useI18n()
  const [viewMode, setViewMode] = useState<ViewMode>('VISUAL')
  const [activeCategory, setActiveCategory] = useState('ALL')
  const categories = getAllCategories()
  const filteredProjects = getProjectsByCategory(activeCategory)

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      'ALL': t('work.all'),
      'FASHION': t('work.fashion'),
      'PORTRAIT': t('work.portrait'),
      'CAMPAIGN': t('work.campaign'),
      'COMMERCIAL': t('work.commercial'),
      'FILM': t('work.film'),
      'ART': t('work.art'),
      'AI': t('work.ai'),
      'PRODUCT': t('work.product'),
    }
    return categoryMap[category] || category
  }

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6 md:px-12">
      {/* Header */}
      <div className="mb-16">
        <Reveal direction="up">
          <h1 className="text-editorial text-text-secondary font-light tracking-tighter mb-8">
            {t('work.title')}
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode('INDEX')}
                className={`text-mono uppercase tracking-[0.15em] transition-colors ${
                  viewMode === 'INDEX'
                    ? 'text-text-secondary'
                    : 'text-text-primary/50 hover:text-text-primary/80'
                }`}
                data-hover="true"
              >
                {t('work.indexView')}
              </button>
              <span className="text-text-primary/30">/</span>
              <button
                onClick={() => setViewMode('VISUAL')}
                className={`text-mono uppercase tracking-[0.15em] transition-colors ${
                  viewMode === 'VISUAL'
                    ? 'text-text-secondary'
                    : 'text-text-primary/50 hover:text-text-primary/80'
                }`}
                data-hover="true"
              >
                {t('work.visualView')}
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-mono text-xs-custom transition-colors ${
                    activeCategory === category
                      ? 'text-text-secondary'
                      : 'text-text-primary/50 hover:text-text-primary/80'
                  }`}
                  data-hover="true"
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <p className="text-mono text-white/50 mb-10">{t('work.demoNote')}</p>
      {/* Content */}
      {viewMode === 'INDEX' ? (
        <div className="space-y-4">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} direction="up" delay={index * 0.05}>
              <Link
                href={`/work/${project.slug}`}
                className="block group py-6 border-b border-white/10 hover:border-white/30 transition-colors"
                data-hover="true"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <span className="text-mono text-text-primary/40">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className="text-xl text-text-secondary font-light tracking-tight group-hover:text-text-primary/80 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 md:gap-8 text-mono text-text-primary/50">
                    <span>{project.year}</span>
                    <span>{getCategoryLabel(project.category)}</span>
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
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} direction="scale" delay={index * 0.05}>
              <Link
                href={`/work/${project.slug}`}
                className="group block"
                data-hover="true"
              >
                <div className="aspect-[3/4] overflow-hidden bg-bg-tertiary mb-4">
                  <SmartMedia src={project.coverType === 'video' ? project.coverVideo! : project.coverImage!} type={project.coverType} poster={project.coverImage} alt={project.title} />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-lg text-text-secondary font-light tracking-tight">
                    {project.title}
                  </h3>
                  <span className="text-mono text-text-primary/40">
                    {project.year}
                  </span>
                </div>
                <p className="text-mono text-text-primary/50 text-xs-custom mt-1">
                  {getCategoryLabel(project.category)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}

      <Footer showShopPreview={false} />
    </div>
  )
}
