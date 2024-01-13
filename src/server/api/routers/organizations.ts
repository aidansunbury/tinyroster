import { nanoid } from "nanoid";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const orgRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string(), slug: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const org = ctx.db.organization.create({
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
