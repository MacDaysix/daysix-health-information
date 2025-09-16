/**
 * info controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::info.info",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { slug } = ctx.params;

      const entity = await strapi.db.query("api::info.info").findOne({
        where: { slug },
        select: ["documentId", "BackgroundColor", "Title", "slug"],
        populate: {
          Content: {
            on: {
              "shared.title": {
                select: ["Title"],
              },
              "shared.paragraph": {
                select: ["Paragraph"],
              },
              "shared.media": {
                populate: {
                  Media: {
                    select: ["documentId", "alternativeText", "url", "formats"],
                  },
                },
              },
            },
          },
        },
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
