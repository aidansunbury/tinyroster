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
import { FormSchemaItem } from "~/lib/types";
import { formSchemaItemValidator } from "~/lib/validation/dynamicFormValidators";
import { createZodSchema } from "~/lib/validation/validationHelpers";
import { defaultProfileSchema } from "~/lib/validators";
import { api } from "~/trpc/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, User } from "@prisma/client";

// TODO the form now properly submits, needs more thorough testing, now just needs to actually fetch the form entry
export function ProfileForm({
  user,
  profileSchema,
}: {
  user: User;
  profileSchema: FormSchema;
}) {
  console.log(profileSchema.schema);
  // Get proper type safety for the form schema
  const parsedSchema = formSchemaItemValidator.parse(profileSchema.schema);

  // Create a zod schema from the default profile schema and the parsed schema
  const FormSchema = z.object({
    ...defaultProfileSchema,
    ...createZodSchema(parsedSchema),
  });

  const defaults = {
    name: user.name,
    slug: user.slug,
    email: user.email,
  };

  for (const field of parsedSchema) {
    defaults[field.name] = "";
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaults,
  });

  const submit = api.user.submitForm.useMutation({
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const customItems = [];

    for (const field of parsedSchema) {
      for (const key in data) {
        if (key === field.name) {
          customItems.push({
            id: field.id,
            value: data[key],
          });
        }
      }
    }
    console.log(profileSchema);
    console.log(customItems);
    const result = submit.mutate({
      form: profileSchema,
      entries: customItems,
    });

    console.log(result);
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
        {parsedSchema.map((field: FormSchemaItem) => {
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
