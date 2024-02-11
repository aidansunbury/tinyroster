import { z } from "zod";

const urlFriendlyRegex = /^[a-zA-Z0-9-_.]+$/;

export const newProjectSchema = z.object({
  name: z.string().min(3).max(50),
  slug: z.string().min(3).max(50).regex(urlFriendlyRegex, {
    message:
      "Slug must be url friendly. Only letters, numbers, dashes, underscores and periods are allowed.",
  }),
});
