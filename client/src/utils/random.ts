import {
  INPUT_TYPES,
  type InputType,
  type InputValue,
} from "../types/client/form";

function getRandomValue(inputType: InputType) {
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

export const randomValues: InputValue[] = [
  {
    id: 1,
    type: "number",
    value: 20,
  },
  ...Array.from({ length: 10 }, (_, i) => {
    const randomIndex = Math.floor(Math.random() * INPUT_TYPES.length);
    const randomType = INPUT_TYPES[randomIndex];
    const randomValue = getRandomValue(randomType);
    return {
      id: i + 2,
      type: randomType,
      value: randomValue,
    } as InputValue;
  }),
];
