"use client";

import { useState } from "react";
import Script from "next/script";
import styles from "./FAQ.module.scss";

export default function FAQ() {
  const faqs = [
    {
      question: "Что представляет собой Terea?",
      answer:
        "Terea — это современные табачные стики с технологией индукционного нагрева для IQOS ILUMA. Они отличаются отсутствием необходимости чистки устройства благодаря интегрированному нагревательному элементу, что обеспечивает гигиеничность и удобство использования.",
    },
    {
      question: "С какими девайсами совместимы стики Terea?",
      answer:
        "Стики Terea разработаны специально для линейки IQOS ILUMA, включая модели ILUMA, ILUMA PRIME и ILUMA ONE. С устройствами предыдущих поколений IQOS (которые используют стики Heets) они не совместимы из-за разной технологии нагрева.",
    },
    {
      question: "Как отличить оригинальные стики Terea?",
      answer:
        "Оригинальная продукция имеет многоуровневую защиту: акцизные марки РФ с QR-кодом для верификации, голографические элементы на упаковке, серийные номера и фирменную запайку. Все наши стики проходят проверку на подлинность перед отправкой.",
    },
    {
      question: "Какие вкусовые профили доступны в линейке Terea?",
      answer:
        "Ассортимент включает классические табачные вкусы (Regular, Smooth Regular, Dark Roast), ментоловые вариации (Menthol, Black Menthol, Green Menthol), а также специальные миксы (Bronze, Purple Wave, Yellow) с уникальными оттенками.",
    },
    {
      question: "Какие зоны доставки доступны?",
      answer:
        "Мы обеспечиваем доставку по Москве (включая НАО, ТАО) и всей Московской области через курьерские службы. В регионы отправка осуществляется транспортными компаниями СДЭК, Boxberry с возможностью получения в пунктах выдачи заказов.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className={styles.faq}>
      <h2 className={styles.title}>Ответы на вопросы о стиках Terea</h2>

      {/* JSON-LD для SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            name: "Вопросы и ответы о стиках Terea",
            description:
              "Часто задаваемые вопросы о совместимости, вкусах и доставке стиков Terea для IQOS ILUMA",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <div className={styles.list}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.item} ${openIndex === index ? styles.active : ""}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <button
              type="button"
              className={styles.question}
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(openIndex === index ? null : index);
              }}
              aria-expanded={openIndex === index}
              aria-controls={`answer-${index}`}
            >
              {faq.question}
              <span className={styles.icon}>
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <p
              id={`answer-${index}`}
              className={`${styles.answer} ${openIndex === index ? styles.open : ""}`}
              aria-hidden={openIndex !== index}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
