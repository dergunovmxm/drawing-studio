export const navs = [
  {
    path: "/",
    name: "Главная",
  },
  {
    path: "/about",
    name: "О художнике",
  },
  {
    path: "/gallery",
    name: "Галерея",
    dropdown: [
      { link: "/gallery/znaki", name: "Знаки" },
      { link: "/gallery/poetry", name: "Поэзия юности" },
      { link: "/gallery/free", name: "Произвольные произведения" },
      { link: "/gallery/sculpture", name: "Скульптуры" },
      { link: "/gallery/scenery", name: "Пейзажи и этюды" },
      { link: "/gallery/life", name: "Натюрморты" },
      { link: "/gallery/experiments", name: "Эксперименты" },
    ],
  },
  {
    path: "/contacts",
    name: "Контакты",
  },
];
