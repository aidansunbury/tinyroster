"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui/button-loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
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
import { newProjectSchema } from "~/lib/validators";
import { api } from "~/trpc/react";

import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateOrg() {
  const [open, setOpen] = useState(false); // Controls dialog open state
  const [submitting, setSubmitting] = useState(false); // Manual state to indicate if form is submitting and disable submit button until response is received form the server
  const createOrg = api.org.create.useMutation();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  async function onSubmit(values: z.infer<typeof newProjectSchema>) {
    setSubmitting(true);
    console.log(values);
    createOrg.mutate(values, {
      onSuccess: () => {
        console.log("success");
        form.reset();
        setSubmitting(false);
        setOpen(false);
        void utils.org.invalidate();
      },
      onError: (err) => {
        console.log(err);
        setSubmitting(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Organization</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Organization</DialogTitle>
          <DialogDescription>Create a new organization.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the display name of your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization slug</FormLabel>
                  <FormControl>
                    <Input placeholder="slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the identifier for your organization that will
                    appear in the URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {submitting ? (
              <ButtonLoading Content="Submitting" />
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
