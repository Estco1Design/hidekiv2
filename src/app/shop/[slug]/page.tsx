import { socialMetadata } from '@/lib/social-metadata'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/data/products'
import { ProductView } from '@/components/ProductView'
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getProductBySlug(slug);return {...socialMetadata(`/shop/${slug}`,item?.title),title:item?`${item.title} | HIDEKI`:'Not found | HIDEKI', alternates:{canonical:`/shop/${slug}`}, robots:{index:item?.status!=='archive',follow:true}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getProductBySlug(slug))notFound();return <ProductView slug={slug}/>}
