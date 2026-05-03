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

async function fetchItems(type, ref) {
  // Для tereamsk.ru порт 3007
  const baseUrl =
    process.env.NODE_ENV === "production" && typeof window === "undefined"
      ? "http://localhost:3007"
      : "";

  try {
    return await safeFetch(
      `${baseUrl}/api/products/getproductinfo/${type}/${ref}`,
      { cache: "no-store" },
    );
  } catch (error) {
    console.error(`Fetch error for ${type}/${ref}:`, error.message);
    throw new Error("Ошибка загрузки товаров");
  }
}

export async function generateMetadata({ params }) {
  const { type, ref } = await params;

  try {
    const items = await fetchItems(type, ref);
    return {
      title: `Купить ${items.name} с доставкой по Москве`,
      description: items.description || `Купить ${items.name}`,
      alternates: {
        canonical: `https://tereamsk.ru/products/product-info/${type}/${ref}`,
      },
      openGraph: {
        title: `Купить ${items.name} с доставкой по Москве`,
        description: items.description || `Купить ${items.name}`,
        url: `https://tereamsk.ru/products/product-info/${type}/${ref}`,
        images: [
          {
            url: items.image
              ? `https://tereamsk.ru/images/${items.image}`
              : `https://tereamsk.ru/favicon/web-app-manifest-512x512.png`,
            alt: items.name,
          },
        ],
      },
    };
  } catch (error) {
    console.error("generateMetadata error:", error);
    // Возвращаем объект, не JSX!
    return {
      title: "Товар не найден | Tereamsk",
      description: "Товар не найден или временно недоступен",
      robots: { index: false, follow: false },
    };
  }
}

export default async function Page({ params }) {
  const { type, ref } = await params;

  try {
    const items = await fetchItems(type, ref);
    return <ClientFilters items={items} />;
  } catch (error) {
    console.error(`Page error for ${type}/${ref}:`, error);
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
            Товар не найден
          </h1>
          <p style={{ marginBottom: "1.5rem", color: "#666" }}>
            Не удалось загрузить информацию о товаре. Пожалуйста, попробуйте
            позже.
          </p>
          <a
            href="/products"
            style={{
              display: "inline-block",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              textDecoration: "none",
            }}
          >
            Вернуться в каталог
          </a>
        </div>
      </div>
    );
  }
}
