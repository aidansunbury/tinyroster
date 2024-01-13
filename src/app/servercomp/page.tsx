import React from 'react';
// import { Button } from '~/components/ui/button';
import { api } from '~/trpc/server';

// import CreateOrg from './CreateOrg';

export default async function Page() {
  //   const createPost = api.post.create.useMutation({
  //     onSuccess: () => {
  //       router.refresh();
  //       setName("");
  //     },
  //   });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Server Rendered Page
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4"></div>
        </div>
        {/* {DoThing()} */}
      </div>
    </main>
  );
}

// async function DoThing() {
//   return <CreateOrg />;
// }
