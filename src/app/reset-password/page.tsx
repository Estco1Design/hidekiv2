"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("token") || "");
    fetch("/api/account-capabilities")
      .then((r) => r.json())
      .then((d) => setAvailable(d.emailDelivery))
      .catch(() => {});
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const d = new FormData(e.currentTarget);
    try {
      const r = token
        ? await authClient.resetPassword({
            token,
            newPassword: String(d.get("password")),
          })
        : await authClient.requestPasswordReset({
            email: String(d.get("email")),
            redirectTo: "/reset-password",
          });
      setStatus(
        r.error
          ? "Не удалось выполнить запрос. Проверьте данные и повторите."
          : token
            ? "Пароль обновлён. Теперь можно войти."
            : "Если аккаунт существует, письмо со ссылкой придёт на указанный email.",
      );
    } catch {
      setStatus("Не удалось связаться с сервером. Повторите.");
    } finally {
      setPending(false);
    }
  }
  return (
    <section className="login-page">
      <Link href="/login" className="quiet-link">
        ← Войти в кабинет
      </Link>
      <h1>Восстановить доступ</h1>
      {available ? (
        <form onSubmit={submit}>
          {token ? (
            <label>
              Новый пароль
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={12}
                maxLength={128}
                required
              />
            </label>
          ) : (
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
          )}
          <button disabled={pending} className="solid-button">
            {pending
              ? "Подождите…"
              : token
                ? "Сохранить пароль"
                : "Получить ссылку"}
          </button>
          <p role="status">{status}</p>
        </form>
      ) : (
        <p className="muted">
          Доставка писем ещё не подключена. Восстановление станет доступно после
          настройки студией.
        </p>
      )}
    </section>
  );
}
