"use client";
import React from "react";
import { api } from "~/trpc/react";

// import { Button } from '~/components/ui/button';
import CreateOrg from "./CreateOrg";
import OrgCard from "./OrgCard";

export default function Page() {
  const { data: orgs, isLoading: orgsLoading } = api.org.getUserOrgs.useQuery();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          My Organizations
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            {orgs?.map((org) => (
              <OrgCard slug={org.slug} title={org.name} key={org.id} />
            ))}
          </div>
        </div>
        <CreateOrg />
      </div>
    </main>
  );
}
