// api/fetch.js
export const fetchGallery = async () => {
  try {
    const res = await fetch(
      "https://dergunovmxm-drawing-studio-server-38f1.twc1.net/api/images"
    );

    if (!res.ok) {
      const text = await res.text().catch(() => null);
      throw new Error(
        `Ошибка запроса галереи: ${res.status} ${res.statusText}${
          text ? " — " + text : ""
        }`
      );
    }

    const data = await res.json();
    console.log("Gallery data fetched:", data);
    return data.data;
  } catch (error) {
    console.error("Fetch gallery error:", error);
    throw error;
  }
};
