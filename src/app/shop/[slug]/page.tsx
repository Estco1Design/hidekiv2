import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/data/products'
import { ProductView } from '@/components/ProductView'
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getProductBySlug(slug);return {title:item?`${item.title} | HIDEKI`:'Not found | HIDEKI'}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getProductBySlug(slug))notFound();return <ProductView slug={slug}/>}
