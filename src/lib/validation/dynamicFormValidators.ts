import { z } from "zod";

import { FormEntry, FormSchema } from "@prisma/client";

import { FormEntryItem, FormSchemaItem, InputOptionsArray } from "../types";

// Individual items in the form schema
export const formSchemaItemValidator = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(InputOptionsArray),
    required: z.boolean(),
    options: z.array(z.string()),
  }),
);

// Entire form schema
export const formSchemaValidator = z.object({
  id: z.string(),
  name: z.string(),
  schema: formSchemaItemValidator,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const formEntryItemValidator = z.array(
  z.object({
    id: z.string(),
    value: z.any(),
  }),
);
