// src/menuPaths.js
const menuPaths = {
  home: "/",

  sauna: {
    parent: "/sauna", // clickable parent
    heaters: {
      wallMounted: "/sauna/heaters/wall-mounted",
      tower: "/sauna/heaters/tower",
      stone: "/sauna/heaters/stone",
      floor: "/sauna/heaters/floor",
      combi: "/sauna/heaters/combi",
      dragonfire: "/sauna/heaters/dragonfire",
    },
    controls: "/sauna/controls",
    accessories: "/sauna/accessories",
    rooms: "/sauna/rooms",
  },

  steam: {
    parent: "/steam", // clickable parent
    generators: "/steam/generators",
    controls: "/steam/controls",
    accessories: "/steam/accessories",
  },

  infrared: "/infrared",

  support: {
    parent: "/support", // clickable parent
    faq: "/support/faq",
    manuals: "/support/manuals",
    catalogue: "/support/catalogue",
  },

  contact: "/contact",

  about: {
    parent: "/about", // clickable parent
    news: "/about/news",
    sustainability: "/about/sustainability",
  },

  careers: "/careers",
};

export default menuPaths;
