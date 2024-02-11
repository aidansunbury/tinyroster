import { nanoid } from "nanoid";
import { z } from "zod";
import {
  formEntryItemValidator,
  formSchemaValidator,
} from "~/lib/validation/dynamicFormValidators";
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
  // Todo move to a new router
  // Only used for specifically submitting custom form items
  // built in items such as use name, slug, etc. are handled by the update user mutation
  submitForm: protectedProcedure
    .input(
      z.object({
        form: formSchemaValidator,
        entries: formEntryItemValidator,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const form = await db.formEntry.upsert({
        where: {
          id: input.form.id,
        },
        update: {
          data: input.entries,
        },
        create: {
          id: "fe_" + nanoid(),
          formId: input.form.id,
          data: input.entries,
          userId: ctx.session.user.id,
        },
      });
      console.log(form);
      return form;
    }),
  // todo test this garbage code
  getForm: protectedProcedure
    .input(z.object({ formId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await db.formEntry.findFirst({
        where: {
          formId: input,
          userId: ctx.session.user.id, // This eventually needs to change to the user who we are actually looking at
        },
      });
    }),
});

const thing = {
  id: "test",
  name: "phone number",
  type: "string",
  required: false,
  options: [],
};
