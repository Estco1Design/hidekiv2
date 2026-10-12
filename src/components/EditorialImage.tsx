import { Reveal } from './Reveal'
import { Media } from './Media'

interface EditorialImageProps {
  src: string
  caption?: string
  number?: string
  category?: string
  year?: number
  fullWidth?: boolean
  offset?: 'left' | 'right' | 'center'
}

export function EditorialImage({
  src,
  caption = '',
  number = '01',
  category = 'FASHION',
  year = 2026,
  fullWidth = false,
  offset = 'center',
}: EditorialImageProps) {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      <div
        className={`w-full ${fullWidth ? '' : 'px-6 md:px-12'} flex ${
          offset === 'left'
            ? 'justify-start'
            : offset === 'right'
            ? 'justify-end'
            : 'justify-center'
        }`}
      >
        <div
          className={`relative ${fullWidth ? 'w-full' : 'w-full md:w-[85%]'}`}
        >
          {/* Image Container */}
          <Reveal direction="scale" delay={0.2}>
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-bg-tertiary">
              <Media src={src} alt={caption} type="image" />
            </div>
          </Reveal>

          {/* Caption */}
          {(number || caption || category) && (
            <Reveal direction="up" delay={0.4}>
              <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="flex items-center gap-4 text-mono text-text-primary/60">
                  <span className="text-text-secondary">{number}</span>
                  <span>/</span>
                  <span>{category}</span>
                  <span>/</span>
                  <span>{year}</span>
                </div>
                {caption && (
                  <p className="text-xs-custom text-text-primary/50 max-w-md">
                    {caption}
                  </p>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
