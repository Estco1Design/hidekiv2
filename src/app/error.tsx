 'use client'
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="min-h-screen flex flex-col justify-center items-center gap-8 px-6"><h1 className="text-3xl font-light">Не удалось загрузить страницу / Unable to load</h1><button onClick={reset} className="border border-white/30 px-6 py-4">Повторить / Try again</button><a href="/">Главная / Home</a></section>}
