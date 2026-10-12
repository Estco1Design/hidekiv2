export interface Project {
  id: string
  slug: string
  title: string
  year: number
  category: 'FASHION' | 'PORTRAIT' | 'CAMPAIGN' | 'COMMERCIAL' | 'FILM' | 'ART' | 'AI' | 'PRODUCT'
  coverType: 'image' | 'video'
  coverImage?: string
  coverVideo?: string
  previewVideo?: string
  theme: 'dark' | 'light'
  accentColor?: string
  gallery: {
    type: 'image' | 'video'
    src: string
    caption?: string
    size?: 'small' | 'medium' | 'large' | 'huge' | 'fullscreen'
    align?: 'left' | 'center' | 'right'
  }[]
  credits: {
    role: string
    name: string
  }[]
  description?: string
  client?: string
  location?: string
}

export interface Product {
  id: string
  slug: string
  objectNumber: string
  title: string
  price: number
  status: 'available' | 'pre-order' | 'sold-out' | 'archive'
  sizes: {
    label: string
    measurements: string
  }[]
  materials: string[]
  images: string[]
  campaignVideo?: string
  description: string
  isLimited?: boolean
  numberOfObjects?: number
  year?: number
}

export interface Service {
  id: string
  title: string
  description: string
  startingPrice?: number
}

export interface InquiryData {
  projectType: string
  services: string[]
  budget: string
  date: string
  idea: string
  contact: {
    name: string
    telegram?: string
    email?: string
    phone?: string
  }
}
