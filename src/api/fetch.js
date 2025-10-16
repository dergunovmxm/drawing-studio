export const fetchGallery = async () => {
  const res = await fetch(
    "https://drawing-studio-server.onrender.com/api/images"
  );
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(
      `Ошибка запроса галерии: ${res.status} ${res.statusText}${
        text ? " — " + text : ""
      }`
    );
  }
  return res.json();
};
