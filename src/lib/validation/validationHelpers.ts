import { z } from "zod";

import { FormSchemaItem } from "../types";

//[{"id":"phone","name":"phone number","options":[],"required":false,"type":"text"}]

export function createZodSchema(schema: FormSchemaItem[]) {
  const fields = {};
  for (const field of schema) {
    switch (field.type) {
      case "text":
        fields[field.name] = z.string();
        break;
      case "boolean":
        fields[field.name] = z.boolean();
        break;
      case "datetime":
        fields[field.name] = z.date();
        break;
      case "select":
        fields[field.name] = z.string().array().length(1);
        break;
      case "multiselect":
        fields[field.name] = z.array(z.string());
        break;
    }
  }
  return z.object(fields);
}
