import { useMemo } from "react";

export const useGroupImage = (items) => {
  const aliasNames = {
    znaki: "Знаки",
    poetry: "Поэзия юности",
    free: "Произвольные произведения",
    sculpture: "Скульптуры",
    scenery: "Пейзажи",
    life: "Натюрморты",
    experiments: "Эксперименты",
  };

  const grouped = useMemo(() => {
    const map = new Map();

    for (const item of items) {
      const alias = item.alias ?? "unknown";
      const rus = aliasNames[alias] ?? "Другое";

      if (!map.has(rus)) {
        map.set(rus, { alias, rus, items: [] });
      }

      map.get(rus).items.push(item);
    }

    return Array.from(map.values());
  }, [items]);

  return { grouped, aliasNames };
};
