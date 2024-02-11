"use server";
import React from "react";
import { api } from "~/trpc/server";

import { ProfileForm } from "./ProfileForm";

export default async function Profile({
  params,
}: {
  params: { organization: string; profile: string };
}) {
  const user = await api.user.getUserBySlug.query({
    userSlug: params.profile,
    organizationSlug: params.organization,
  });

  return (
    <div className="flex w-full justify-center border">
      <div className="w-8/12 border">
        <h1 className="text-3xl">{user.name}</h1>
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
