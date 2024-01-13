import { nanoid } from "nanoid";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

import { Organization } from "@prisma/client";

export const orgRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string(), slug: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const org: Organization[] = ctx.db.organization.create({
        data: {
          id: "org_" + nanoid(),
          slug: input.slug,
          name: input.name,
          ownerId: ctx.session.user.id,
        },
      });
      return org;
    }),
  getOrgs: protectedProcedure.query(async ({ ctx }) => {
    const orgs = await ctx.db.organization.findMany({
      where: { ownerId: ctx.session.user.id },
    });
    return orgs;
  }),
});
