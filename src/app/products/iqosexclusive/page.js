export const dynamic = "force-dynamic";
import ClientFilters from "./client";

// Безопасный fetch с таймаутом
async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

async function fetchItems() {
  // Для tereamsk.ru порт 3007
  const baseUrl =
    process.env.NODE_ENV === "production" && typeof window === "undefined"
      ? "http://localhost:3007"
      : "";

  try {
    return await safeFetch(`${baseUrl}/api/products/getiqos`, {
      cache: "no-store",
    });
  } catch (error) {
    console.error("Fetch error for iqos devices:", error.message);
    throw new Error("Ошибка загрузки товаров");
  }
}

export async function generateMetadata() {
  const title = "Купить устройства IQOS ILUMA в TereaMsk с доставкой по России";

  return {
    title,
    description:
      "Каталог устройств IQOS ILUMA с доставкой по всей России. Лучший выбор вкусов и брендов!",
    alternates: {
      canonical: `https://tereamsk.ru/products/iqosexclusive`,
    },
    openGraph: {
      title:
        "Купить лимитированные устройства IQOS ILUMA в TereaMsk с доставкой по России",
      description:
        "Каталог лимитированных устройств IQOS ILUMA с доставкой по всей России. Лучший выбор вкусов и брендов!", // Исправил "устройствв" → "устройств"
      url: `https://tereamsk.ru/products/iqosexclusive`,
      images: [
        {
          url: `https://tereamsk.ru/favicon/web-app-manifest-512x512.png`,
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
    console.error("Page fetch error:", error);

    // Компонент ошибки
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Ошибка загрузки каталога
          </h1>
          <p style={{ marginBottom: "1.5rem", color: "#666" }}>
            Не удалось загрузить список устройств IQOS ILUMA. Пожалуйста,
            попробуйте позже.
          </p>
          <a
            href="/"
            style={{
              display: "inline-block",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              textDecoration: "none",
            }}
          >
            На главную
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      {/* УБРАЛ скрытый заголовок! Это плохо для SEO */}
      <h1 className="page-title" style={{ marginBottom: "2rem" }}>
        Лимитированные устройства IQOS ILUMA с доставкой по России
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
