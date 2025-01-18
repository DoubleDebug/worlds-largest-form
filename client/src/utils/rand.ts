import type { InputType } from "../types/client/form";

export function getRandValue(inputType: InputType) {
  switch (inputType) {
    case "text":
      return Math.random().toString(36).substring(2);
    case "number":
      return Math.floor(Math.random() * 100);
    case "bool":
      return Math.random() < 0.5;
    case "select":
      return Math.floor(Math.random() * 3);
    default:
      return null;
  }
}
