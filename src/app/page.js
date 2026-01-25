import Image from "next/image";
import "./main.scss";
import Hero from "../../components/Home/Hero/Hero";
import Poster from "../../components/Home/Poster/Poster";
import Preview from "../../components/Home/Preview/Preview";
import About from "../../components/Home/About/About";
import New from "../../components/Home/New/New";
import Exclusive from "../../components/Home/Exclusive/Exclusive";
import Reviews from "../../components/Home/Reviews/Reviews";
import ModalManager from "../../components/ModalManager/ModalManager";

export const metadata = {
  title: "Купить стики Terea в Москве | TereaMsk",
  description:
    "Terea и Iluma – доставка по Москве, оригинальные товары, лучшие цены.",
  alternates: {
    canonical: `https://tereamsk.ru`,
  },
  openGraph: {
    title: `Купить стики Terea в Москве | TereaMsk`,
    description: `Terea и Iluma – доставка по Москве, оригинальные товары, лучшие цены.`,
    url: `https://tereamsk.ru`,
    images: [
      {
        url: `/favicon/web-app-manifest-512x512`,
        alt: `tereamsk`,
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <h1 className="hidden-h1">Купить стики Terea в Москве</h1>
      <Hero />
      <Poster />
      <Preview />
      <Exclusive />
      <New />
      <About />
      <Reviews />
    </>
  );
}
