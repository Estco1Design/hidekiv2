"use client";
import Link from "next/link";
import { Packages } from "@/components/Packages";
import { Process } from "@/components/Process";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
export default function StudioPage() {
  const { language } = useI18n();
  const ru = language === "ru";
  return (
    <div>
      <header className="page-heading studio-heading">
        <p>HIDEKI / Photography & production</p>
        <h1>
          {ru ? "Съёмка, в которой\nесть ты." : "A shoot that\nfeels like you."}
        </h1>
        <div className="studio-heading-bottom">
          <p className="muted">
            {ru
              ? "Для себя, своего бренда или новой истории. Начинаем с идеи, собираем визуальное направление и помогаем пройти весь путь от первого разговора до готовых материалов."
              : "For yourself, your brand or a new story. We start with an idea, build a visual direction and guide you from the first conversation to the finished materials."}
          </p>
          <Link href="/contact" className="solid-button">
            {ru ? "Обсудить задачу" : "Discuss your project"} ↗
          </Link>
        </div>
      </header>
      <Packages />
      <div className="studio-process">
        <Process />
      </div>
      <section className="studio-manifesto">
        <p>
          {ru ? "Без неожиданностей в финале" : "No surprises at the finish"}
        </p>
        <h2>
          {ru
            ? "Сначала договоримся.\nПотом создадим."
            : "Agree the details.\nThen create."}
        </h2>
        <div className="manifesto-bottom">
          <p>
            {ru
              ? "Смета, команда, локация, количество материалов, сроки и права использования фиксируются до съёмки. Ваш комфорт и понятный процесс — часть результата."
              : "Estimate, team, location, deliverables, timeline and usage rights are agreed before the shoot. Your comfort and a clear process are part of the result."}
          </p>
          <Link href="/contact" className="outline-button">
            {ru ? "Составить мой бриф" : "Create my brief"}
          </Link>
        </div>
      </section>
      <Footer showShopPreview={false} />
    </div>
  );
}
