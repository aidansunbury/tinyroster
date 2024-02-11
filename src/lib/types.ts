export const InputOptionsArray = [
  "text",
  "boolean",
  "datetime",
  "select",
  "multiselect",
] as const;

export type InputOptions = (typeof InputOptionsArray)[number];

export type FormSchemaItem = {
  id: string;
  name: string;
  type: InputOptions;
  required: boolean;
  options: string[];
};

export type FormEntryItem = {
  id: string;
  value: any;
};
