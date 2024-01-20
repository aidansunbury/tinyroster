import Link from 'next/link';
import SignInButton from '~/components/auth/SignInButton';
import SignOutButton from '~/components/auth/SignOutButton';
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/trpc/server';

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          tiny<span className="text-[hsl(280,100%,70%)]">roster</span>
        </h1>
        <p className="text-center text-2xl">
          A minimal and highly configurable organization management software.
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            {session ? <SignOutButton /> : <SignInButton />}
          </div>
        </div>
      </div>
    </main>
  );
}
