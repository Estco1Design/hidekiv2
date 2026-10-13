import { clsx } from 'clsx'
interface RevealProps { children: React.ReactNode; className?: string; delay?: number; direction?: 'up'|'down'|'left'|'right'|'scale' }
// Content stays visible before hydration, in screenshots and with motion disabled.
// The entrance sequence is owned by BrandIntro rather than every page section.
export function Reveal({children,className}:RevealProps){return <div className={clsx('reveal-element',className)}>{children}</div>}
