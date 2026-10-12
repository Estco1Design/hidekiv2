export const site = {
 email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
 telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || '',
 instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
}
export function safeContactUrl(value:string,kind:'telegram'|'instagram'){
 try {const url=new URL(value);return url.protocol==='https:' && (kind==='telegram'?url.hostname==='t.me':url.hostname==='instagram.com'||url.hostname==='www.instagram.com')?url.href:''}catch{return ''}
}
