/**
 * page-group controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::page-group.page-group",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { slug } = ctx.params;

      const entity = await strapi.db
        .query("api::page-group.page-group")
        .findOne({
          where: { slug },
        });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
