import { NextResponse } from "next/server";
import { renderTrpcPanel } from "trpc-panel";
import { appRouter } from "~/server/api/root";

// Todo ensure that this can only be accessed in dev mode
export async function GET(req: Request) {
  return new NextResponse(
    renderTrpcPanel(appRouter, {
      url: "/api/panel",
      transformer: "superjson",
    }),
    {
      status: 200,
      headers: [["Content-Type", "text/html"] as [string, string]],
    },
  );
}
