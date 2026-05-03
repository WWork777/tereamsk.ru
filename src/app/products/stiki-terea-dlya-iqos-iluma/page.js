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
       ? "https://iluma-store.ru"
       : "http://localhost:3000";

  try {
    return await safeFetch(`${baseUrl}/api/products/getterea`, {
      cache: "no-store",
    });
  } catch (error) {
    console.error("Fetch error for terea sticks:", error.message);
    throw new Error("Ошибка загрузки товаров");
  }
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
      title,
      description:
        "Купить стики TEREA в Москве. В наличии, оригинал, удобный заказ.",
      url: `https://tereamsk.ru/products/stiki-terea-dlya-iqos-iluma`,
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
            Не удалось загрузить список стиков TEREA. Пожалуйста, попробуйте
            позже.
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
      <h1 className="page-title">
        Купить стики Terea для IQOS ILUMA в Москве и России
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
