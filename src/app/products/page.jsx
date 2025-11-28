import "./products.scss";
import "../../../components/Home/Hero/Hero.scss";
import Link from "next/link";
import Image from "next/image";
import Preview from "../../../components/Home/Preview/Preview";
import Exclusive from "../../../components/Home/Exclusive/Exclusive";

export const metadata = {
  title: "Купить IQOS ILUMA и стики Terea с доставкой по Москве",
  description:
    "Каталог устройств IQOS ILUMA и стиков Terea. Только оригинальная продукция. Быстрая доставка.",
  alternates: {
    canonical: `https://tereamsk.ru/products`,
  },
  openGraph: {
    title: `Купить IQOS ILUMA и стики Terea с доставкой по Москве`,
    description: `Каталог устройств IQOS ILUMA и стиков Terea. Только оригинальная продукция. Быстрая доставка.`,
    url: `https://tereamsk.ru/products`,
    images: [
      {
        url: `/favicon/web-app-manifest-512x512`,
        alt: `Tereamsk`,
      },
    ],
  },
};

export default function Products() {
  return (
    <>
      <div className="products-catalog-container">
        <h1>Каталог товаров</h1>
        <Preview />
        <h2>Популярное</h2>
        <Exclusive />
      </div>
    </>
  );
}
