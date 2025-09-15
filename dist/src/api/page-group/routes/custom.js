module.exports = {
    routes: [
        {
            method: "GET",
            path: "/page-groups/:slug",
            handler: "info.findOne",
            config: {
                auth: false,
            },
        },
    ],
};
