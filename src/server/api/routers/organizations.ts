import { nanoid } from "nanoid";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

import { Organization } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const orgRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string(), slug: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const org = await ctx.db.organization.create({
        data: {
          id: "org_" + nanoid(),
          slug: input.slug,
          name: input.name,
          ownerId: ctx.session.user.id,
          users: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      // Throw a trpc error if the org failed to create
      if (!org) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Failed to create organization, likely due to a duplicate slug.",
        });
      }
      return org;
    }),
  getUserOrgs: protectedProcedure.query(async ({ ctx }) => {
    const orgs = await ctx.db.organization.findMany({
      where: { ownerId: ctx.session.user.id },
    });
    return orgs;
  }),
});
