import { Reveal } from './Reveal'

interface CTASectionProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
}

export function CTASection({
  title = 'START A PROJECT',
  subtitle = 'Let us create something together',
  ctaText = 'BEGIN',
  ctaHref = '/contact',
}: CTASectionProps) {
  return (
    <section className="relative w-full py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl">
        <Reveal direction="up" delay={0.2}>
          <h2 className="text-editorial text-text-secondary font-light tracking-tighter mb-8">
            {title}
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <p className="text-mono text-text-primary/60 uppercase tracking-[0.15em] mb-12 max-w-md">
            {subtitle}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.6}>
          <a
            href={ctaHref}
            className="inline-flex items-center gap-4 text-text-secondary hover:text-text-primary/70 transition-colors group"
            data-hover="true"
          >
            <span className="text-mono uppercase tracking-[0.2em]">{ctaText}</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="transform group-hover:translate-x-2 transition-transform duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
