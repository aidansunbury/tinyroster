import { postRouter } from "~/server/api/routers/post";
import { orgRouter } from "./routers/organizations";
import { userRouter } from "./routers/users";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  org: orgRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
