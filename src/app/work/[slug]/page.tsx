import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/data/projects'
import { ProjectView } from '@/components/ProjectView'
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getProjectBySlug(slug);return {title:item?`${item.title} | HIDEKI`:'Not found | HIDEKI'}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getProjectBySlug(slug))notFound();return <ProjectView slug={slug}/>}
