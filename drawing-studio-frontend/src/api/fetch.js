export const fetchGallery = async () => {
  const res = await fetch("http://localhost:3000/api/images");
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
