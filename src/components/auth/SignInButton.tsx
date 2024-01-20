"use client";
import { signIn } from 'next-auth/react';
import React from 'react';
import { Button } from '~/components/ui/button';
import { env } from '~/env';

export default function SignInButton() {
  return (
    <Button
      onClick={() =>
        signIn("google", { callbackUrl: env.NEXT_PUBLIC_BASE_DOMAIN + "/home" })
      }
    >
      <p>Sign in with google</p>
    </Button>
  );
}
