export default {
  target: "static",
  head: {
    title: "Test component",
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
  buildModules: [["@nuxtjs/vuetify"]],
  build: {
    postcss: null,
  },
}
