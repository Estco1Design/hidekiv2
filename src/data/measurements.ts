export const measurements = [
  {
    id: "height",
    ru: "Рост",
    en: "Height",
    unit: "cm",
    min: 100,
    max: 230,
    y: 0,
    rx: 0,
    rz: 0,
    hintRu: "Без обуви, от пола до макушки. Встаньте прямо у стены.",
    hintEn:
      "Barefoot, from floor to the top of your head. Stand straight against a wall.",
  },
  {
    id: "weight",
    ru: "Вес",
    en: "Weight",
    unit: "kg",
    min: 25,
    max: 250,
    y: 0,
    rx: 0,
    rz: 0,
    hintRu:
      "Показание весов. Вес не является обхватом и не определяет размер одежды сам по себе.",
    hintEn:
      "Read from a scale. Weight is not a circumference and does not determine clothing size on its own.",
  },
  {
    id: "neck",
    ru: "Обхват шеи",
    en: "Neck",
    unit: "cm",
    min: 20,
    max: 65,
    y: 1.16,
    rx: 0.14,
    rz: 0.13,
    hintRu:
      "Вокруг основания шеи, без натяжения. Лента должна лежать горизонтально.",
    hintEn:
      "Around the base of the neck, without pulling. Keep the tape horizontal.",
  },
  {
    id: "chest",
    ru: "Обхват груди",
    en: "Chest",
    unit: "cm",
    min: 50,
    max: 180,
    y: 0.77,
    rx: 0.37,
    rz: 0.22,
    hintRu:
      "По наиболее выступающим точкам груди и лопаткам. Руки опущены, дыхание спокойное.",
    hintEn:
      "Around the fullest chest and shoulder blades. Arms down, breathe normally.",
  },
  {
    id: "waist",
    ru: "Обхват талии",
    en: "Waist",
    unit: "cm",
    min: 40,
    max: 180,
    y: 0.38,
    rx: 0.27,
    rz: 0.18,
    hintRu:
      "Вокруг естественной линии талии. Не втягивайте живот и не затягивайте ленту.",
    hintEn:
      "Around your natural waist. Do not pull in your stomach or tighten the tape.",
  },
  {
    id: "hips",
    ru: "Обхват бёдер",
    en: "Hips",
    unit: "cm",
    min: 50,
    max: 200,
    y: 0.06,
    rx: 0.34,
    rz: 0.22,
    hintRu:
      "По наиболее выступающим точкам ягодиц. Ноги вместе, лента горизонтально.",
    hintEn:
      "Around the fullest part of the hips. Feet together, tape horizontal.",
  },
  {
    id: "inseam",
    ru: "Длина по внутреннему шву",
    en: "Inseam",
    unit: "cm",
    min: 30,
    max: 120,
    y: -0.6,
    rx: 0,
    rz: 0,
    hintRu:
      "От паха до пола по внутренней стороне ноги, без обуви. Попросите кого-то помочь.",
    hintEn:
      "From crotch to floor along the inside leg, barefoot. Ask someone to help.",
  },
] as const;
export type MeasurementId = (typeof measurements)[number]["id"];
export type MeasurementValues = Partial<Record<MeasurementId, number>>;
export function validMeasurements(value: unknown): value is MeasurementValues {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.entries(value).every(([key, n]) => {
    const m = measurements.find((x) => x.id === key);
    return (
      m &&
      typeof n === "number" &&
      Number.isFinite(n) &&
      n >= m.min &&
      n <= m.max
    );
  });
}
