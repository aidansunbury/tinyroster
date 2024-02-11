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
import { api } from "~/trpc/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  slug: z.string(),
  email: z.string().email(),
});

export function ProfileForm({
  user,
  profileSchema,
}: {
  user: User;
  profileSchema: any;
}) {
  const defaults = {
    name: user.name,
    slug: user.slug,
    email: user.email,
  };

  for (const field of profileSchema.schema) {
    defaults[field.name] = "";
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaults,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-3">
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
                <FormLabel className="mx-2 w-20">URL Slug</FormLabel>
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
        {profileSchema.schema.map((field: any) => {
          return (
            <FormField
              control={form.control}
              name={field.name}
              key={field.id}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center rounded-md border bg-slate-100">
                    <FormLabel className="mx-2 w-20">{field.name}</FormLabel>
                    <FormControl className="rounded-none border-y-0 border-e-0 outline-none">
                      <Input placeholder={field.name} {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        {form.formState.isDirty && <Button type="submit">Submit</Button>}
      </form>
      <div>{JSON.stringify(profileSchema)}</div>
    </Form>
  );
}
