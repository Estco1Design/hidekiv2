import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
const attempts=new Map<string,{count:number;until:number}>()
export async function POST(request:Request){
 const length=Number(request.headers.get('content-length') || 0)
 if(length>12000)return NextResponse.json({error:'Too large'},{status:413})
 let data:Record<string,unknown>
 try{const body=await request.text();if(body.length>12000)return NextResponse.json({error:'Too large'},{status:413});data=JSON.parse(body);if(!data || typeof data!=='object')throw Error()}catch{return NextResponse.json({error:'Invalid request'},{status:400})}
 if(data.website)return NextResponse.json({error:'Invalid request'},{status:400})
 if(data.consent!==true || typeof data.name!=='string' || !data.name.trim() || data.name.length>100 || typeof data.contact!=='string' || !data.contact.trim() || data.contact.length>200)return NextResponse.json({error:'Check fields'},{status:400})
 for(const field of ['projectType','budget','date','message'])if(data[field]!==undefined && (typeof data[field]!=='string' || (data[field] as string).length>(field==='message'?2500:100)))return NextResponse.json({error:'Check fields'},{status:400})
 const token=process.env.TELEGRAM_BOT_TOKEN;const chat=process.env.TELEGRAM_CHAT_ID
 if(!token || !chat)return NextResponse.json({error:'Delivery not configured'},{status:503})
 const now=Date.now();for(const [key,value] of attempts)if(value.until<now)attempts.delete(key)
 const key=request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
 const entry=attempts.get(key) || {count:0,until:now+600000};if(entry.count>=5)return NextResponse.json({error:'Try later'},{status:429});entry.count++;attempts.set(key,entry)
 const text=`HIDEKI / REQUEST\nName: ${data.name}\nContact: ${data.contact}\nFormat: ${data.projectType || '—'}\nBudget: ${data.budget || '—'}\nDate: ${data.date || '—'}\n${data.message || ''}`
 try{const response=await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chat,text}),signal:AbortSignal.timeout(10000)});const result=await response.json();if(!response.ok || result.ok!==true)throw Error();return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'Delivery unavailable'},{status:502})}
}
