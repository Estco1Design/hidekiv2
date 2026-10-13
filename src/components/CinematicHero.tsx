"use client";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

export function CinematicHero() {
  const { language } = useI18n();
  const ru = language === "ru";
  return (
    <section className="cinematic-hero">
      <div className="hero-aperture" aria-hidden="true">
        <div className="aperture-core" />
        <i />
        <i />
        <i />
      </div>
      <div className="hero-meta">
        <span>Alexandro Hideki</span>
        <span>
          {ru
            ? "Фотография / Режиссура / Мода"
            : "Photography / Direction / Fashion"}
        </span>
      </div>
      <h1 className="hero-wordmark" translate="no">
        HIDEKI<span>STUDIO</span>
      </h1>
      <div className="hero-story">
        <h2>
          {ru ? (
            <>
              Ты — не просто
              <br />в кадре. Ты — сюжет.
            </>
          ) : (
            <>
              More than a face.
              <br />
              You are the story.
            </>
          )}
        </h2>
        <div>
          <p>
            {ru
              ? "Свет, движение и характер. Создаём съёмку, в которой можно увидеть себя по-новому."
              : "Light, movement and character. A shoot that lets you see yourself differently."}
          </p>
          <Link href="/contact?package=portrait" className="solid-button">
            {ru ? "Обсудить мою съёмку" : "Plan my shoot"}{" "}
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/work" className="quiet-link">
            {ru ? "Посмотреть визуальный мир" : "Explore the visual world"}
          </Link>
        </div>
      </div>
      <div className="hero-foot">
        <span>
          {ru
            ? "Москва. Работаем с частными клиентами и брендами."
            : "Moscow. Personal shoots and brand projects."}
        </span>
        <a href="#shoots">
          {ru ? "Найти свой формат ↓" : "Find your format ↓"}
        </a>
      </div>
    </section>
  );
}
