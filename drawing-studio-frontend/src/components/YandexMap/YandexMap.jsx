// YandexMap.jsx
// Компонент React для внедрения Яндекс.Карты с меткой и опциональной геолокацией.
// Использует динамическую загрузку ymaps JS API.
// Пример использования:
// <YandexMap apiKey="ВАШ_API_КЛЮЧ" defaultCenter={[55.751574, 37.573856]} zoom={12} showUserLocation={true} height="400px" />

import React, { useEffect, useRef } from "react";

function loadYandexScript(apiKey, lang = "ru_RU") {
  const global = window;
  return new Promise((resolve, reject) => {
    if (global.ymaps) {
      resolve(global.ymaps);
      return;
    }
    const existing = document.querySelector(`script[data-ymaps="${apiKey || "no-key"}"]`);
    if (existing) {
      existing.addEventListener("load", () => {
        if (global.ymaps) resolve(global.ymaps);
        else reject(new Error("ymaps script loaded but ymaps is undefined"));
      });
      existing.addEventListener("error", () => reject(new Error("Failed to load ymaps script")));
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://api-maps.yandex.ru/2.1/?lang=${lang}${apiKey ? `&apikey=${apiKey}` : ""}`;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-ymaps", apiKey || "no-key");
    script.onload = () => {
      if (global.ymaps) resolve(global.ymaps);
      else reject(new Error("ymaps loaded but ymaps is undefined"));
    };
    script.onerror = () => reject(new Error("Failed to load ymaps script"));
    document.head.appendChild(script);
  });
}

export default function YandexMap({
  apiKey = "4b3403e8-92a8-460d-8242-b0a0c1125234",
  defaultCenter = [ 54.382520, 48.595037], // Москва по умолчанию
  zoom = 16,
  height = "400px",
  width = "100%",
  showUserLocation = false,
  placemarkProps = { hintContent: "Метка", balloonContent: "Здесь" },
  onMapReady = null, // callback(map, ymaps)
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const placemarkRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const ymaps = await loadYandexScript(apiKey);
        if (!mounted) return;
        await ymaps.ready();

        // Создать карту только если контейнер доступен и карта ещё не создана
        if (!containerRef.current) return;
        if (mapRef.current) {
          // Обновим центр и зум если нужно
          mapRef.current.setCenter(defaultCenter);
          mapRef.current.setZoom(zoom);
          return;
        }

        const map = new ymaps.Map(containerRef.current, {
          center: defaultCenter,
          zoom,
          controls: ["zoomControl", "fullscreenControl"],
        }, {
          autoFitToViewport: "always",
        });

        mapRef.current = map;

        // Добавим метку в центр
        const placemark = new ymaps.Placemark(
          defaultCenter,
          placemarkProps,
          { preset: "islands#redIcon" }
        );
        placemarkRef.current = placemark;
        map.geoObjects.add(placemark);

        // Если нужно показать локацию пользователя
        if (showUserLocation && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              if (!mapRef.current) return;
              const coords = [pos.coords.latitude, pos.coords.longitude];
              // Обновить центр и метку
              mapRef.current.setCenter(coords);
              mapRef.current.setZoom(Math.max(12, zoom));
              // Обновим или создадим метку пользователя
              if (placemarkRef.current) {
                mapRef.current.geoObjects.remove(placemarkRef.current);
              }
              const userMark = new ymaps.Placemark(coords, { hintContent: "Ваша локация" }, { preset: "islands#blueCircleDotIcon" });
              placemarkRef.current = userMark;
              mapRef.current.geoObjects.add(userMark);
            },
            (err) => {

              // Ошибка геолокации — игнорируем или можно вывести предупреждение
              console.warn("Geolocation error:", err);
            },
            { enableHighAccuracy: true, timeout: 10000 }
          );
        }

        if (typeof onMapReady === "function") {
          onMapReady(map, ymaps);
        }
      } catch (err) {
        console.error("Failed to initialize Yandex.Maps:", err);
      }
    }

    init();

    return () => {
      mounted = false;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
        placemarkRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]); // при смене apiKey перезагружается скрипт/инициализация

  // Статические стили контейнера; можно переопределить через пропсы
  const containerStyle = {
    width,
    height,
  };

  return (
    <div style={containerStyle}>
      <div ref={containerRef} style={{ width: "500px", height: "100%" }} />
    </div>
  );
}
