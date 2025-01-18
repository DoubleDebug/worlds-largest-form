import { getRandValue } from "../utils/rand";
import { INPUT_TYPES, type InputValue } from "../types/client/form";

// create random form state
const NUM_OF_INPUTS = 10;
const randState = Array.from({ length: NUM_OF_INPUTS }, (_, i) => {
  const randIndex = Math.floor(Math.random() * INPUT_TYPES.length);
  const randType = INPUT_TYPES[randIndex];
  const randValue = getRandValue(randType);
  return {
    id: i + 2,
    type: randType,
    value: randValue,
  } as InputValue;
}).reduce((state, input) => ({ ...state, [input.id]: input }), {
  1: {
    id: 1,
    type: "number",
    value: 20,
  },
} as Record<number, InputValue>);

export const formState = $state<Record<number, InputValue>>(randState);
export const test = $state({ test: "test" });
