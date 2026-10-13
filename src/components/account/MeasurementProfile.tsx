"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import {
  measurements,
  type MeasurementId,
  type MeasurementValues,
} from "@/data/measurements";
const BodyModel = dynamic(() => import("./BodyModel"), {
  ssr: false,
  loading: () => (
    <div className="body-stage model-loading">Загружаем 3D-модель…</div>
  ),
});
export function MeasurementProfile({ signedIn }: { signedIn: boolean }) {
  const { language } = useI18n();
  const ru = language === "ru";
  const [selected, setSelected] = useState<MeasurementId>("neck");
  const [values, setValues] = useState<MeasurementValues>({});
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [loaded, setLoaded] = useState(!signedIn);
  const [loadError, setLoadError] = useState(false);
  const active = measurements.find((m) => m.id === selected)!;
  useEffect(() => {
    if (!signedIn) return;
    let cancelled = false;
    fetch("/api/measurements")
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((d) => {
        if (!cancelled) {
          setValues(d.measurements);
          setLoaded(true);
        }
      })
      .catch(() => { if (!cancelled) setLoadError(true) });
    return () => {
      cancelled = true;
    };
  }, [signedIn]);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!signedIn) return;
    setPending(true);
    try {
      const r = await fetch("/api/measurements", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!r.ok) throw Error();
      setStatus(
        ru
          ? "Мерки сохранены в вашем кабинете."
          : "Measurements saved to your account.",
      );
    } catch {
      setStatus(
        ru
          ? "Не удалось сохранить. Проверьте соединение и повторите."
          : "Could not save. Check your connection and retry.",
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <section className="measurement-layout">
      <BodyModel selected={selected} ru={ru} value={values[selected]} />
      <form onSubmit={save} className="measurement-form">
        <p className="section-kicker">
          {ru ? "Профиль посадки" : "Fit profile"}
        </p>
        <h2>
          {ru ? "Твои мерки.\nТвоя посадка." : "Your measurements.\nYour fit."}
        </h2>
        <p className="muted">
          {ru
            ? "Выберите мерку — на модели появится линия и инструкция. Лента прилегает к телу, но не сдавливает его."
            : "Select a measurement to see its line and instructions. Keep the tape snug without compressing your body."}
        </p>
        <div className="measurement-list">
          {measurements.map((m) => (
            <div
              className={`measurement-row ${selected === m.id ? "is-selected" : ""}`}
              key={m.id}
            >
              <button
                type="button"
                aria-pressed={selected === m.id}
                onClick={() => setSelected(m.id)}
              >
                {ru ? m.ru : m.en}
              </button>
              <label>
                <span className="sr-only">{ru ? m.ru : m.en}</span>
                <input
                  aria-label={ru ? m.ru : m.en}
                  name={m.id}
                  type="number"
                  inputMode="decimal"
                  min={m.min}
                  max={m.max}
                  step="0.1"
                  value={values[m.id] ?? ""}
                  placeholder="—"
                  disabled={!loaded}
                  onFocus={() => setSelected(m.id)}
                  onChange={(e) => {
                    setValues((v) => {
                      const next = { ...v };
                      if (e.target.value === "") delete next[m.id];
                      else next[m.id] = Number(e.target.value);
                      return next;
                    });
                    setStatus("");
                  }}
                />
                <span>
                  {m.unit === "cm" ? (ru ? "см" : "cm") : ru ? "кг" : "kg"}
                </span>
              </label>
            </div>
          ))}
        </div>
        <div className="measurement-hint" aria-live="polite">
          <h3>{ru ? active.ru : active.en}</h3>
          <p>{ru ? active.hintRu : active.hintEn}</p>
        </div>
        {signedIn ? (
          <button className="solid-button" disabled={pending || !loaded}>
            {pending
              ? ru
                ? "Сохраняем…"
                : "Saving…"
              : ru
                ? "Сохранить мерки"
                : "Save measurements"}
          </button>
        ) : (
          <>
            <p className="muted">
              {ru
                ? "Попробуйте модель. Чтобы сохранить мерки, войдите в кабинет."
                : "Try the model. Sign in to save your measurements."}
            </p>
            <Link className="solid-button" href="/login">
              {ru ? "Войти и сохранить" : "Sign in to save"}
            </Link>
          </>
        )}
        <p role="status">{loadError ? (ru ? "Не удалось загрузить мерки. Обновите страницу." : "Could not load measurements. Reload this page.") : status}</p>
        <p className="measurement-note">
          {ru
            ? "Мерки не передаются в заявку автоматически. Перед изготовлением уточним посадку и проверим измерения вместе."
            : "Measurements are not automatically sent with an inquiry. We confirm fit and measurements before production."}
        </p>
      </form>
    </section>
  );
}
