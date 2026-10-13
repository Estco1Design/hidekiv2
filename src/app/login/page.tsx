"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [mail, setMail] = useState(false);
  useEffect(() => {
    fetch("/api/account-capabilities")
      .then((r) => r.json())
      .then((d) => setMail(d.emailDelivery))
      .catch(() => {});
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const d = new FormData(e.currentTarget);
    try {
      const data = {
        email: String(d.get("email")),
        password: String(d.get("password")),
      };
      const r =
        mode === "signup"
          ? await authClient.signUp.email({
              ...data,
              name: String(d.get("name")),
            })
          : await authClient.signIn.email(data);
      if (r.error) {
        setError(
          mode === "signup"
            ? "Не удалось создать аккаунт. Проверьте email и пароль или попробуйте войти."
            : "Не удалось войти. Проверьте email и пароль.",
        );
        return;
      }
      router.push("/account");
      router.refresh();
    } catch {
      setError("Нет соединения. Попробуйте ещё раз.");
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="login-page">
      <Link href="/account" className="quiet-link">
        ← Личный кабинет
      </Link>
      <p className="section-kicker">HIDEKI / Your space</p>
      <h1>{mode === "login" ? "С возвращением." : "Твоё пространство."}</h1>
      <p className="muted">
        {mode === "login"
          ? "Войдите, чтобы сохранить мерки и продолжить подготовку."
          : "Создайте аккаунт для своего профиля мерок. Закрытый уровень выдаётся отдельно по приглашению."}
      </p>
      <form onSubmit={submit}>
        {mode === "signup" && (
          <label>
            Имя
            <input name="name" autoComplete="name" required maxLength={100} />
          </label>
        )}
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={200}
          />
        </label>
        <label>
          Пароль
          <input
            name="password"
            type="password"
            autoComplete={
              mode === "signup" ? "new-password" : "current-password"
            }
            minLength={12}
            maxLength={128}
            required
          />
          <span className="muted">От 12 символов</span>
        </label>
        {mode === "signup" && (
          <label className="consent-row">
            <input type="checkbox" required />Я согласен с{" "}
            <Link href="/privacy">условиями обработки данных</Link>.
          </label>
        )}
        <p role="alert">{error}</p>
        <button disabled={pending} className="solid-button">
          {pending
            ? "Подождите…"
            : mode === "login"
              ? "Войти"
              : "Создать аккаунт"}
        </button>
      </form>
      <button
        className="quiet-link"
        onClick={() => {
          setMode(mode === "login" ? "signup" : "login");
          setError("");
        }}
      >
        {mode === "login"
          ? "Первый раз здесь? Создать аккаунт"
          : "Уже есть аккаунт? Войти"}
      </button>
      {mail ? (
        <Link href="/reset-password" className="quiet-link">
          Забыли пароль?
        </Link>
      ) : (
        <p className="measurement-note">
          Восстановление пароля через email пока не подключено. Сохраните пароль
          в менеджере паролей.
        </p>
      )}
    </div>
  );
}
