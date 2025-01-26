export const INPUT_TYPES = ["text", "number", "bool", "select"] as const;
export type InputType = (typeof INPUT_TYPES)[number];

export type BaseInput = {
  id: number;
};

export type TextInputValue = BaseInput & {
  type: "text";
  value: string | null;
};

export type NumberInputValue = BaseInput & {
  type: "number";
  value: number | null;
};

export type BoolInputValue = BaseInput & {
  type: "bool";
  value: boolean | null;
};

export type SelectInputValue = BaseInput & {
  type: "select";
  value: number | null;
};

export type InputValue =
  | TextInputValue
  | NumberInputValue
  | BoolInputValue
  | SelectInputValue;

export type FormState = {
  values: InputValue[];
};
