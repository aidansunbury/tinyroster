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
  // get the organization by the slug, only returns the organization if the user is a member
  getOrganization: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      // get the organization by the slug, include the users where the user id is the current user
      const organization = await ctx.db.organization.findUnique({
        where: { slug: input.slug },
        include: { users: { where: { id: ctx.session.user.id } } },
      });

      if (!organization) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });
      }

      if (!organization.users.length) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not a member of this organization",
        });
      }

      return organization;
    }),
});
