import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";

export default function OrgCard({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={`/${slug}`}>Open Org</Link>
      </CardContent>
      <CardFooter>
        <Checkbox id="Default" />
        <label htmlFor="Default">Default view on login</label>
      </CardFooter>
    </Card>
  );
}
