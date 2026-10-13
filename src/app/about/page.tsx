"use client";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
export default function AboutPage() {
  const { language } = useI18n();
  const ru = language === "ru";
  return (
    <div>
      <header className="page-heading">
        <p>HIDEKI / The people behind the frame</p>
        <h1>
          {ru
            ? "Один визуальный мир.\nДва взгляда."
            : "One visual world.\nTwo perspectives."}
        </h1>
      </header>
      <section className="about-duo">
        <article>
          <div className="founder-mark" aria-hidden="true">
            AH
          </div>
          <h2>Alexandro Hideki</h2>
          <p className="section-kicker">
            {ru
              ? "Александро Хидеки / Фотография и режиссура"
              : "Photography & direction"}
          </p>
          <p className="muted">
            {ru
              ? "Фотография, свет, видео и звук. Визуальное направление HIDEKI — от замысла и атмосферы до съёмки и финального кадра."
              : "Photography, light, film and sound. HIDEKI’s visual direction, from the initial idea and atmosphere to the shoot and final frame."}
          </p>
          <Link href="/contact" className="quiet-link">
            {ru ? "Обсудить съёмку" : "Discuss a shoot"}
          </Link>
        </article>
        <article>
          <div className="founder-mark secondary" aria-hidden="true">
            PE
          </div>
          <h2>Platon Estko</h2>
          <p className="section-kicker">
            {ru ? "Платон Эстко / Дизайн одежды" : "Clothing design"}
          </p>
          <p className="muted">
            {ru
              ? "Дизайн и разработка одежды. Работа с формой, конструкцией, текстилем и индивидуальной посадкой — в одном пространстве с фотографией."
              : "Design and garment development. Shape, construction, textiles and individual fit, in the same space as photography."}
          </p>
          <Link href="/shop" className="quiet-link">
            {ru ? "Посмотреть объекты" : "Explore objects"}
          </Link>
        </article>
      </section>
      <section className="studio-manifesto">
        <p>{ru ? "Наш подход" : "Our approach"}</p>
        <h2>
          {ru
            ? "Характер важнее\nидеальной позы."
            : "Character before\nthe perfect pose."}
        </h2>
        <div className="manifesto-bottom">
          <p>
            {ru
              ? "Мы начинаем с человека или задачи бренда. Подбираем свет, форму и движение, которые помогают выразить именно вашу историю. Съёмка и одежда становятся частью одного образа."
              : "We begin with the person or the brand’s goal. We find the light, form and movement that express your story. The shoot and clothing become parts of the same image."}
          </p>
          <Link href="/studio" className="outline-button">
            {ru ? "Познакомиться с процессом" : "Explore the process"}
          </Link>
        </div>
      </section>
      <section className="private-teaser">
        <h2>{ru ? "Москва.\nИ дальше." : "Moscow.\nAnd beyond."}</h2>
        <div>
          <p>
            {ru
              ? "Базируемся в Москве. Локацию и возможность выезда обсуждаем под конкретный проект."
              : "Based in Moscow. Locations and travel arrangements are discussed for each project."}
          </p>
          <Link href="/contact" className="solid-button">
            {ru ? "Расскажите свою идею" : "Tell us your idea"} ↗
          </Link>
        </div>
      </section>
      <Footer showShopPreview={false} />
    </div>
  );
}
