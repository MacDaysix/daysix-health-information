module.exports = {
  routes: [
    {
      method: "GET",
      path: "/infos/:slug",
      handler: "info.findOne",
      config: {
        auth: false,
      },
    },
  ],
};
