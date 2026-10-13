"use client";
import Link from "next/link";
import { CinematicHero } from "@/components/CinematicHero";
import { Packages } from "@/components/Packages";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";

export default function HomePage() {
  const { language } = useI18n();
  const ru = language === "ru";
  return (
    <div>
      <CinematicHero />
      <section id="shoots">
        <Packages compact />
      </section>
      <section className="studio-manifesto">
        <p>
          {ru
            ? "Кадр начинается раньше камеры."
            : "The image starts before the camera."}
        </p>
        <h2>
          {ru ? (
            <>
              Не нужно уметь
              <br />
              позировать.
              <br />
              <span>Нужно быть собой.</span>
            </>
          ) : (
            <>
              You don’t need
              <br />
              to know how to pose.
              <br />
              <span>Just be yourself.</span>
            </>
          )}
        </h2>
        <div className="manifesto-bottom">
          <p>
            {ru
              ? "Обсудим образ, подберём референсы и выстроим свет. Во время съёмки поможем с движением и позами. После — вместе выберем кадры для обработки."
              : "We discuss your look, build references and shape the light. On set, we guide movement and posing. Afterwards, we select images for editing together."}
          </p>
          <Link href="/studio" className="outline-button">
            {ru ? "Как проходит съёмка" : "Inside the process"}
          </Link>
        </div>
      </section>
      <section className="universe-grid">
        <Link href="/work" className="universe-panel panel-work">
          <span>{ru ? "Фотография и фильм" : "Photography & film"}</span>
          <h2>{ru ? "Визуальный мир" : "Visual world"}</h2>
          <span>{ru ? "Исследовать" : "Explore"} ↗</span>
        </Link>
        <Link href="/shop" className="universe-panel panel-shop">
          <span>
            {ru
              ? "Одежда. Объекты. Индивидуальные проекты."
              : "Clothing. Objects. Individual projects."}
          </span>
          <h2>
            HIDEKI
            <br />
            Objects
          </h2>
          <span>{ru ? "Открыть магазин" : "Enter the shop"} ↗</span>
        </Link>
      </section>
      <section className="private-teaser">
        <div>
          <p>
            {ru
              ? "Пространство для тех, кто внутри"
              : "A space for those on the inside"}
          </p>
          <h2>{ru ? "За кадром" : "Behind the frame"}</h2>
        </div>
        <div>
          <p>
            {ru
              ? "Личный кабинет, подготовка к съёмке и профиль мерок для индивидуальной одежды."
              : "Your account, shoot preparation and a measurement profile for made-to-order clothing."}
          </p>
          <Link className="outline-button" href="/account">
            {ru ? "Мой личный кабинет" : "My account"} ↗
          </Link>
        </div>
      </section>
      <section className="final-invite">
        <p>{ru ? "Начнём с разговора" : "Start with a conversation"}</p>
        <h2>
          {ru
            ? "Какой ты хочешь\nувидеть себя?"
            : "How do you want\nto see yourself?"}
        </h2>
        <Link href="/contact" className="solid-button">
          {ru ? "Создать мою съёмку" : "Create my shoot"} ↗
        </Link>
      </section>
      <Footer showShopPreview={false} />
    </div>
  );
}
