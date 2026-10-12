import { Product } from './types'

export const products: Product[] = [
  {
    id: '1',
    slug: 'object-001',
    objectNumber: '001',
    title: 'BLACK SET',
    price: 0,
    status: 'pre-order',
    sizes: [
      { label: '01', measurements: 'By arrangement / По согласованию' },
      { label: '02', measurements: 'By arrangement / По согласованию' },
      { label: '03', measurements: 'By arrangement / По согласованию' },
    ],
    materials: ['Three-thread sweatshirt fabric / Футер трёхнитка'],
    images: [
      '/media/shop/object-001/front.jpg',
      '/media/shop/object-001/side.jpg',
      '/media/shop/object-001/back.jpg',
      '/media/shop/object-001/detail.jpg',
    ],
    description: 'Первый чёрный лук HIDEKI: футболка и шорты из трёхниточного футера. Разработку, посадку и изготовление обсуждаем индивидуально.',
    isLimited: false,
  },
  {
    id: '2',
    slug: 'object-002',
    objectNumber: '002',
    title: 'ASYMMETRIC TROUSER',
    price: 0,
    status: 'archive',
    sizes: [
      { label: '01', measurements: 'By arrangement / По согласованию' },
      { label: '02', measurements: 'By arrangement / По согласованию' },
      { label: '03', measurements: 'By arrangement / По согласованию' },
    ],
    materials: ['Wool Blend', 'Asymmetric Pattern', 'Custom Hardware'],
    images: [
      '/media/shop/object-002/front.jpg',
      '/media/shop/object-002/side.jpg',
      '/media/shop/object-002/back.jpg',
      '/media/shop/object-002/detail.jpg',
    ],
    description: 'Концепт из исходного макета сайта. Изделие не представлено к продаже.',
    isLimited: false,
  },
  {
    id: '3',
    slug: 'object-003',
    objectNumber: '003',
    title: 'VOID HOODIE',
    price: 0,
    status: 'archive',
    sizes: [
      { label: '01', measurements: 'By arrangement / По согласованию' },
      { label: '02', measurements: 'By arrangement / По согласованию' },
      { label: '03', measurements: 'By arrangement / По согласованию' },
    ],
    materials: ['French Terry', 'Garment Dyed', 'Hand-distressed'],
    images: [
      '/media/shop/object-003/front.jpg',
      '/media/shop/object-003/side.jpg',
      '/media/shop/object-003/back.jpg',
    ],
    description: 'Концепт из исходного макета сайта. Изделие не представлено к продаже.',
    isLimited: false,
  },
]

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug)
}

export const getAvailableProducts = (): Product[] => {
  return products.filter((p) => p.status === 'available' || p.status === 'pre-order')
}

export const getArchiveProducts = (): Product[] => {
  return products.filter((p) => p.status === 'archive')
}
