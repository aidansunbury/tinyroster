"use server";
import React from 'react';
import { api } from '~/trpc/server';

export default async function Organization({
  params,
}: {
  params: { organization: string };
}) {
  const org = await api.org.getOrganization.query({
    slug: params.organization,
  });

  return <div>{org.name}</div>;
}
