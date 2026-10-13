"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { getArchiveProducts } from "@/data/products";
export default function ShopPage() {
  const { language } = useI18n();
  const ru = language === "ru";
  const [category, setCategory] = useState("all");
  useEffect(() => {
    const sync = () => {
      const value = new URLSearchParams(window.location.search).get("category");
      setCategory(
        value && ["all", "clothing", "experience", "objects"].includes(value)
          ? value
          : "all",
      );
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const filters = [
    ["all", ru ? "Всё" : "All"],
    ["clothing", ru ? "Одежда" : "Clothing"],
    ["experience", ru ? "Съёмки" : "Experiences"],
    ["objects", ru ? "Арт-объекты" : "Art objects"],
  ];
  return (
    <div className="shop-new">
      <header className="shop-heading">
        <p>HIDEKI Objects</p>
        <h1>
          {ru
            ? "Носить.\nЧувствовать.\nБыть собой."
            : "Wear it.\nFeel it.\nBe yourself."}
        </h1>
        <p>
          {ru
            ? "Одежда и впечатления из одного визуального мира. Индивидуальное изготовление и съёмки — по согласованию."
            : "Clothing and experiences from one visual world. Made-to-order pieces and shoots, by arrangement."}
        </p>
      </header>
      <div
        className="shop-filters"
        aria-label={ru ? "Категории магазина" : "Shop categories"}
      >
        {filters.map(([id, label]) => (
          <button
            key={id}
            aria-pressed={category === id}
            onClick={() => {
              setCategory(id);
              const url = new URL(window.location.href);
              url.searchParams.set("category", id);
              window.history.replaceState(null, "", url);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {(category === "all" || category === "clothing") && (
        <section className="shop-feature">
          <Link href="/shop/object-001" className="shop-drawing">
            <Image
              src="/media/shop/object-001/design.svg"
              alt={
                ru
                  ? "Эскиз чёрного комплекта: футболка и шорты"
                  : "Black T-shirt and shorts design illustration"
              }
              width={1000}
              height={1200}
              priority
            />
          </Link>
          <div className="shop-feature-info">
            <p>
              {ru
                ? "Одежда / Индивидуальное изготовление"
                : "Clothing / Made to order"}
            </p>
            <h2>Black set</h2>
            <p className="muted">
              {ru
                ? "Чёрный лук HIDEKI. Футболка и шорты из трёхниточного футера. Посадку, детали и срок согласуем под ваш запрос."
                : "The HIDEKI black look. T-shirt and shorts in three-thread sweatshirt fabric. Fit, details and timing are agreed individually."}
            </p>
            <dl>
              <div>
                <dt>{ru ? "Стоимость" : "Price"}</dt>
                <dd>{ru ? "После согласования" : "By arrangement"}</dd>
              </div>
              <div>
                <dt>{ru ? "Посадка" : "Fit"}</dt>
                <dd>{ru ? "По вашим меркам" : "Your measurements"}</dd>
              </div>
            </dl>
            <Link href="/shop/object-001" className="solid-button">
              {ru ? "Посмотреть изделие" : "Explore the piece"} ↗
            </Link>
            <Link href="/account" className="quiet-link">
              {ru
                ? "Снять мерки на 3D-модели"
                : "Take measurements with the 3D model"}
            </Link>
            <p className="measurement-note">
              {ru
                ? "Показан дизайн-эскиз. Фотографии готового изделия добавим после съёмки. Оплата на сайте пока не принимается."
                : "Design illustration shown. Finished product photography will follow. Online payments are not enabled."}
            </p>
          </div>
        </section>
      )}
      {(category === "all" || category === "experience") && (
        <section className="shop-experience">
          <p>{ru ? "Впечатления" : "Experiences"}</p>
          <h2>
            {ru
              ? "Съёмка — тоже\nспособ выразить себя."
              : "A shoot is another\nway to express yourself."}
          </h2>
          <p className="muted">
            {ru
              ? "Персональная съёмка от 50 000 ₽. Концепция, свет и помощь с позированием. Состав пакета и финальную смету согласуем до бронирования."
              : "Personal shoots from ₽50,000. Concept, lighting and posing guidance. Package and final estimate agreed before booking."}
          </p>
          <Link href="/studio#packages" className="outline-button">
            {ru ? "Выбрать формат" : "Choose a format"} ↗
          </Link>
        </section>
      )}
      {category === "objects" && (
        <section className="shop-empty">
          <h2>{ru ? "Новые формы в работе." : "New forms in progress."}</h2>
          <p>
            {ru
              ? "Арт-объекты и принты ещё не представлены. Обсудите индивидуальную идею со студией."
              : "Art objects and prints are not listed yet. Discuss a custom idea with the studio."}
          </p>
          <Link href="/contact" className="outline-button">
            {ru ? "Обсудить идею" : "Discuss an idea"}
          </Link>
        </section>
      )}
      <section className="shop-archive">
        <h2>{ru ? "Архив концептов" : "Concept archive"}</h2>
        <p className="muted">
          {ru
            ? "Исследования формы из исходного проекта. Не в продаже."
            : "Form studies from the original project. Not for sale."}
        </p>
        {getArchiveProducts().map((p) => (
          <Link key={p.id} href={`/shop/${p.slug}`}>
            <span>{p.title}</span>
            <span>{ru ? "Концепт" : "Concept"} ↗</span>
          </Link>
        ))}
      </section>
      <Footer showShopPreview={false} />
    </div>
  );
}
