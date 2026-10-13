import "server-only";
export const mailConfigured = Boolean(
  process.env.RESEND_API_KEY && process.env.HIDEKI_EMAIL_FROM,
);
export async function sendAccountEmail(
  email: string,
  url: string,
  purpose: "verify" | "reset",
) {
  if (!mailConfigured) throw new Error("Email delivery is not configured");
  const base = new URL(process.env.BETTER_AUTH_URL || "http://localhost:3000");
  if (new URL(url).origin !== base.origin)
    throw new Error("Unexpected account link origin");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.HIDEKI_EMAIL_FROM,
      to: [email],
      subject:
        purpose === "verify"
          ? "HIDEKI — подтвердите email"
          : "HIDEKI — восстановление доступа",
      text: `${purpose === "verify" ? "Подтвердите ваш email" : "Задайте новый пароль"}: ${url}\n\nЕсли вы не отправляли запрос, проигнорируйте это письмо.`,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("Account email delivery failed");
}
