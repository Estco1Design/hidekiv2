"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AccountActions({
  email,
  verified,
}: {
  email: string;
  verified: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [mail, setMail] = useState(false);
  const [pending, setPending] = useState(false);
  useEffect(() => {
    fetch("/api/account-capabilities")
      .then((r) => r.json())
      .then((d) => setMail(d.emailDelivery))
      .catch(() => {});
  }, []);
  async function verify() {
    setPending(true);
    try {
      const r = await authClient.sendVerificationEmail({
        email,
        callbackURL: "/private",
      });
      setStatus(
        r.error
          ? "Не удалось отправить письмо. Повторите."
          : "Письмо для подтверждения email отправлено.",
      );
    } catch {
      setStatus("Нет соединения. Повторите.");
    } finally {
      setPending(false);
    }
  }
  async function signOut() {
    try {
      const r = await authClient.signOut();
      if (r.error) setStatus("Не удалось выйти. Повторите.");
      else router.refresh();
    } catch {
      setStatus("Нет соединения. Повторите.");
    }
  }
  return (
    <div>
      {!verified && mail && (
        <button disabled={pending} className="quiet-link" onClick={verify}>
          Подтвердить email
        </button>
      )}
      <button className="quiet-link" onClick={signOut}>
        Выйти из кабинета
      </button>
      <p role="status">{status}</p>
    </div>
  );
}
