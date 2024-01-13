"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "~/components/ui/button";
import { env } from "~/env";

export default function SignOutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: env.NEXT_PUBLIC_BASE_DOMAIN })}
    >
      <p>Sign Out</p>
    </Button>
  );
}
