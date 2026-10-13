import { socialMetadata } from '@/lib/social-metadata'
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { hasPrivateAccess } from "@/lib/private-access";
export const dynamic = "force-dynamic";
export const metadata = {...socialMetadata('/private'),
  alternates: { canonical: "/private" },
  title: "За кадром | HIDEKI",
  robots: { index: false, follow: false },
};
export default async function PrivatePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const admitted = hasPrivateAccess(
    session?.user,
    process.env.HIDEKI_PRIVATE_EMAILS || "",
  );
  return (
    <section className="private-page">
      <p className="section-kicker">HIDEKI / By invitation</p>
      <h1>За кадром</h1>
      <p className="private-lead">
        {admitted ? "Вы внутри." : "Некоторые истории\nостаются между нами."}
      </p>
      <p className="muted">
        {admitted
          ? "Доступ подтверждён. Материалы вашего проекта появятся здесь после подключения защищённого хранилища."
          : "Закрытое пространство для клиентов студии. Создание аккаунта не открывает доступ: приглашение выдаётся после согласования проекта и подтверждения email."}
      </p>
      <Link href={session ? "/contact" : "/login"} className="solid-button">
        {session ? "Обсудить доступ" : "Войти в кабинет"} ↗
      </Link>
      <Link href="/account" className="quiet-link">
        Вернуться в личный кабинет
      </Link>
    </section>
  );
}
