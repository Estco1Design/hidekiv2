import type { Metadata } from 'next'
export function socialMetadata(path: string, title = 'HIDEKI — фотография, фильмы и мода'): Metadata {
 const description='Съёмки с характером, визуальное направление и индивидуальная одежда HIDEKI.'
 return {openGraph:{type:'website',locale:'ru_RU',url:path,title,description,images:[{url:'/og-image.png',width:1200,height:630,alt:'HIDEKI Studio'}]},twitter:{card:'summary_large_image',title,description,images:['/og-image.png']}}
}
