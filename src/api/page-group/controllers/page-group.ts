/**
 * page-group controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::page-group.page-group",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { slug } = ctx.params;

      const entity = await strapi
        .documents("api::page-group.page-group")
        .findFirst({
          filters: { slug: { $eq: slug } },
          fields: ["Title", "slug", "BackgroundColor"],
          populate: {
            relatedpages: {
              fields: ["Title"],
              populate: {
                Content: {
                  on: {
                    "shared.title": true,
                    "shared.paragraph": true,
                    "shared.media": {
                      populate: {
                        Media: {
                          fields: ["alternativeText", "url", "formats"],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });

      const schema = strapi.getModel("api::page-group.page-group");

      const sanitizedEntity = await strapi.contentAPI.sanitize.output(
        entity,
        schema
      );

      return this.transformResponse(sanitizedEntity);
    },
  })
);
