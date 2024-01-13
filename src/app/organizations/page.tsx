import React from "react";
import { api } from "~/trpc/server";

export default function Page() {
  const orgs = api.org.getOrgs.query();
  return <div>P</div>;
}
