import ru from "vuetify/src/locale/ru";
export default {
  target: "static",
  head: {
    title: "Uch",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    link: [
      {
        hid: "favicon",
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
  components: true,
  buildModules: [
    [
      "@nuxtjs/vuetify",
      {
        lang: {
          locales: { ru },
          current: "ru",
        },
      },
    ],
  ],
  modules: ["@nuxtjs/axios"],
  axios: {
    baseURL: "https://api.airtable.com/v0/", // Used as fallback if no runtime config is provided
  },
  build: {
    postcss: null,
  },
};
