import { nanoid } from "nanoid";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    return await db.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
  getUserBySlug: protectedProcedure
    .input(z.object({ userSlug: z.string(), organizationSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      // User slugs are not unique, but user slugs are unique within an organization
      // Finds the user with a given user slug, who is also a member of the organization with the given organization slug

      const user = await db.user.findFirstOrThrow({
        where: {
          slug: input.userSlug,
          organizations: {
            some: {
              slug: input.organizationSlug,
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      return user;
    }),
});

const thing = {
  id: "test",
  name: "phone number",
  type: "string",
  required: false,
  options: [],
};
