import { socialMetadata } from '@/lib/social-metadata'
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { MeasurementProfile } from "@/components/account/MeasurementProfile";
import { AccountActions } from "@/components/account/AccountActions";
import { Footer } from "@/components/Footer";
export const dynamic = "force-dynamic";
export const metadata = {...socialMetadata('/account'),
  alternates: { canonical: "/account" },
  title: "Личный кабинет | HIDEKI",
  robots: { index: false, follow: false },
};
export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <div className="account-page">
      <header className="page-heading">
        <p>HIDEKI / Your space</p>
        <h1>Личный кабинет</h1>
        <div className="account-welcome">
          <p>
            {session
              ? `Добро пожаловать, ${session.user.name}.`
              : "Ваше пространство для подготовки к съёмке и индивидуальной одежде."}
          </p>
          {session ? (
            <AccountActions
              email={session.user.email}
              verified={session.user.emailVerified}
            />
          ) : (
            <Link href="/login" className="outline-button">
              Войти / Создать аккаунт
            </Link>
          )}
        </div>
      </header>
      <MeasurementProfile signedIn={Boolean(session)} />
      <section className="account-next">
        <div>
          <h2>Следующий кадр — твой.</h2>
          <p>
            Обсудим формат, образ и дату. Без обязательств до согласования
            сметы.
          </p>
          <Link href="/contact" className="solid-button">
            Запланировать съёмку ↗
          </Link>
        </div>
        <div>
          <h2>За кадром</h2>
          <p>
            Закрытый уровень студии. Доступ по приглашению после согласования
            проекта.
          </p>
          <Link href="/private" className="outline-button">
            Проверить доступ ↗
          </Link>
        </div>
      </section>
      <Footer showShopPreview={false} />
    </div>
  );
}
