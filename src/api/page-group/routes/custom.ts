module.exports = {
  routes: [
    {
      method: "GET",
      path: "/page-groups/:slug",
      handler: "page-group.findOne",
      config: {
        auth: false,
      },
    },
  ],
};
