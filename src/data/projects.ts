import { Project } from './types'

export const projects: Project[] = [
  {
    id: '1',
    slug: 'echoes-of-silence',
    title: 'ECHOES OF SILENCE',
    year: 2026,
    category: 'FASHION',
    coverType: 'video',
    coverVideo: '/media/projects/echoes/cover.mp4',
    coverImage: '/media/projects/echoes/cover.jpg',
    theme: 'dark',
    accentColor: '#FFFFFF',
    gallery: [
      { type: 'video', src: '/media/projects/echoes/video-01.mp4', size: 'fullscreen' },
      { type: 'image', src: '/media/projects/echoes/img-01.jpg', caption: 'Look 01', size: 'large', align: 'center' },
      { type: 'image', src: '/media/projects/echoes/img-02.jpg', size: 'medium', align: 'right' },
      { type: 'image', src: '/media/projects/echoes/img-03.jpg', size: 'small', align: 'left' },
      { type: 'video', src: '/media/projects/echoes/video-02.mp4', size: 'huge' },
      { type: 'image', src: '/media/projects/echoes/img-04.jpg', size: 'medium', align: 'center' },
    ],
    credits: [
      { role: 'Photography', name: 'HIDEKI Studio' },
      { role: 'Direction', name: 'HIDEKI Studio' },
      { role: 'Styling', name: 'HIDEKI Studio' },
    ],
    description: 'Fashion / light / movement.',
  },
  {
    id: '2',
    slug: 'shadow-ritual',
    title: 'SHADOW RITUAL',
    year: 2026,
    category: 'CAMPAIGN',
    coverType: 'image',
    coverImage: '/media/projects/shadow/cover.jpg',
    theme: 'dark',
    accentColor: '#EAEAEA',
    gallery: [
      { type: 'image', src: '/media/projects/shadow/img-01.jpg', size: 'fullscreen' },
      { type: 'image', src: '/media/projects/shadow/img-02.jpg', size: 'large', align: 'center' },
      { type: 'image', src: '/media/projects/shadow/img-03.jpg', size: 'medium', align: 'right' },
      { type: 'video', src: '/media/projects/shadow/video-01.mp4', size: 'huge' },
    ],
    credits: [
      { role: 'Photography', name: 'HIDEKI Studio' },
      { role: 'Art Direction', name: 'HIDEKI Studio' },
    ],
  },
  {
    id: '3',
    slug: 'void-portraits',
    title: 'VOID PORTRAITS',
    year: 2025,
    category: 'PORTRAIT',
    coverType: 'image',
    coverImage: '/media/projects/void/cover.jpg',
    theme: 'light',
    accentColor: '#050505',
    gallery: [
      { type: 'image', src: '/media/projects/void/img-01.jpg', size: 'large', align: 'center' },
      { type: 'image', src: '/media/projects/void/img-02.jpg', size: 'medium', align: 'left' },
      { type: 'image', src: '/media/projects/void/img-03.jpg', size: 'small', align: 'right' },
      { type: 'image', src: '/media/projects/void/img-04.jpg', size: 'large', align: 'center' },
    ],
    credits: [
      { role: 'Photography', name: 'HIDEKI Studio' },
      { role: 'Light', name: 'HIDEKI Studio' },
    ],
  },
  {
    id: '4',
    slug: 'neural-dreams',
    title: 'NEURAL DREAMS',
    year: 2026,
    category: 'AI',
    coverType: 'video',
    coverVideo: '/media/projects/neural/cover.mp4',
    coverImage: '/media/projects/neural/cover.jpg',
    theme: 'dark',
    accentColor: '#A855F7',
    gallery: [
      { type: 'video', src: '/media/projects/neural/video-01.mp4', size: 'fullscreen' },
      { type: 'image', src: '/media/projects/neural/img-01.jpg', size: 'large', align: 'center' },
      { type: 'image', src: '/media/projects/neural/img-02.jpg', size: 'medium', align: 'right' },
    ],
    credits: [
      { role: 'AI Direction', name: 'HIDEKI Studio' },
      { role: 'Post-Production', name: 'HIDEKI Studio' },
    ],
  },
  {
    id: '5',
    slug: 'concrete-garden',
    title: 'CONCRETE GARDEN',
    year: 2025,
    category: 'COMMERCIAL',
    coverType: 'image',
    coverImage: '/media/projects/concrete/cover.jpg',
    theme: 'light',
    accentColor: '#111111',
    gallery: [
      { type: 'image', src: '/media/projects/concrete/img-01.jpg', size: 'huge' },
      { type: 'image', src: '/media/projects/concrete/img-02.jpg', size: 'medium', align: 'left' },
      { type: 'video', src: '/media/projects/concrete/video-01.mp4', size: 'fullscreen' },
      { type: 'image', src: '/media/projects/concrete/img-03.jpg', size: 'large', align: 'center' },
    ],
    credits: [
      { role: 'Photography', name: 'HIDEKI Studio' },
      { role: 'Direction', name: 'HIDEKI Studio' },
    ],
  },
  {
    id: '6',
    slug: 'motion-study-001',
    title: 'MOTION STUDY 001',
    year: 2026,
    category: 'FILM',
    coverType: 'video',
    coverVideo: '/media/projects/motion/cover.mp4',
    coverImage: '/media/projects/motion/cover.jpg',
    theme: 'dark',
    accentColor: '#FFFFFF',
    gallery: [
      { type: 'video', src: '/media/projects/motion/video-01.mp4', size: 'fullscreen' },
      { type: 'video', src: '/media/projects/motion/video-02.mp4', size: 'huge' },
    ],
    credits: [
      { role: 'Direction', name: 'HIDEKI Studio' },
      { role: 'Camera', name: 'HIDEKI Studio' },
      { role: 'Sound', name: 'HIDEKI Studio' },
    ],
  },
]

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug)
}

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'ALL') return projects
  return projects.filter((p) => p.category === category)
}

export const getAllCategories = (): string[] => {
  const categories = projects.map((p) => p.category)
  return ['ALL', ...Array.from(new Set(categories))]
}
