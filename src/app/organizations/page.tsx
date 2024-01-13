"use client";
import React from 'react';

// import { Button } from '~/components/ui/button';
import CreateOrg from './CreateOrg';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          My Organizations (client rendered)
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            {/* {orgs.map((org) => (
              <div key={org.id}>{org.name}</div>
            ))} */}
          </div>
        </div>
        <CreateOrg />
      </div>
    </main>
  );
}
