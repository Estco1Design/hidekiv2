import type { MetadataRoute } from 'next'
export default function sitemap():MetadataRoute.Sitemap {const base=process.env.NEXT_PUBLIC_SITE_URL || process.env.BETTER_AUTH_URL || 'http://localhost:3000';return ['','/studio','/about','/shop','/shop/object-001','/contact','/privacy'].map(path=>({url:base+path}))}
