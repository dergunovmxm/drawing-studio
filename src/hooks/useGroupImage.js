import { useMemo } from "react";

export const useGroupImage = (items) => {
  const aliasNames = {
    znaki: "Знаки",
    poetry: "Поэзия юности",
    free: "Произвольные произведения",
    sculpture: "Скульптуры",
    scenery: "Пейзажи и этюды",
    life: "Натюрморты",
    experiments: "Эксперименты",
  };

  const grouped = useMemo(() => {
    const map = new Map();

    for (const item of items) {
      const alias = item.alias ?? "unknown";
      const rus = aliasNames[alias] ?? "Другое";
      const section = item.section;

      if (!map.has(rus)) {
        map.set(rus, { alias, rus, section, items: [] });
      }

      map.get(rus).items.push(item);
    }

    for (const group of map.values()) {
      group.items.sort((a, b) => a.id - b.id);
    }

    return Array.from(map.values()).sort((a, b) => {
      if (a.section > b.section) return 1;
      if (a.section < b.section) return -1;
      return 0;
    });
  }, [items]);

  return { grouped, aliasNames };
};
