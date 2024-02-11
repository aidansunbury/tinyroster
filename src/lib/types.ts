export type InputOptions =
  | "text"
  | "boolean"
  | "datetime"
  | "select"
  | "multiselect";

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
