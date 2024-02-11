"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  slug: z.string(),
  email: z.string().email(),
});

export function ProfileForm({ user }: { user: User }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user.name,
      slug: user.slug,
      email: user.email,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center rounded-md border bg-slate-100">
                <FormLabel className="mx-2 w-20">Username</FormLabel>
                <FormControl className="rounded-none border-y-0 border-e-0 outline-none">
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center rounded-md border bg-slate-100">
                <FormLabel className="mx-2 w-20">slug</FormLabel>
                <FormControl className="rounded-none border-y-0 border-e-0 outline-none">
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center rounded-md border bg-slate-100">
                <FormLabel className="mx-2 w-20">Email</FormLabel>
                <FormControl className="rounded-none border-y-0 border-e-0 outline-none">
                  <Input disabled={true} placeholder="shadcn" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.isDirty && <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
}
