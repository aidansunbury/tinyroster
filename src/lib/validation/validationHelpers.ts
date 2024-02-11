import { z } from "zod";

import { FormSchemaItem } from "../types";

// Returns a zod schema for the given form schema
// Still needs the last z.object() call, but that allows it to be combined with other zod schemas
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
  return fields;
}
