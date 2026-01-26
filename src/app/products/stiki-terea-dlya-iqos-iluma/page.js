export const dynamic = "force-dynamic";
import ClientFilters from "./client";

async function fetchItems() {
  const res = await fetch("https://iluma-store.ru/api/products/getterea", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json();
}

export async function generateMetadata() {
  const title = "Стики TEREA в Москве";
  return {
    title,
    description:
      "Купить стики TEREA в Москве. В наличии, оригинал, удобный заказ.",
    alternates: {
      canonical: `https://tereamsk.ru/products/stiki-terea-dlya-iqos-iluma`,
    },
    openGraph: {
      title: `Стики TEREA в Москве`,
      description: `Купить стики TEREA в Москве. В наличии, оригинал, удобный заказ.`,
      url: `https://tereamsk.ru/products/stiki-terea-dlya-iqos-iluma`,
      images: [
        {
          url: `/favicon/web-app-manifest-512x512`,
          alt: `Tereamsk`,
        },
      ],
    },
  };
}

export default async function Page() {
  let items = [];
  try {
    items = await fetchItems();
  } catch (error) {
    console.error(error);
    return <p>Ошибка загрузки данных</p>;
  }

  return (
    <div className="products-container">
      <h1 className="page-title">
        Купить стики Terea для IQOS ILUMA в Москве и России
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
