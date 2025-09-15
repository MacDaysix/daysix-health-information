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
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
