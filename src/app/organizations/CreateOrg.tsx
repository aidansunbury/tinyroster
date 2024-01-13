"use client";
import React from 'react';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';

export default function CreateOrg() {
  const createOrg = api.post.create.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });
  return (
    <Button
      onClick={() => {
        createOrg.mutate({ name: "test" });
      }}
    >
      Create Organization
    </Button>
  );
}
