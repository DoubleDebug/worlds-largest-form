import { updateValueOnServer } from "./websocket";
import { InputValue } from "../types/client/form";
import { updateValue } from "../hooks/useFormState";

let timeoutId: number | null = null;
const DEBOUNCE_TIMEOUT_DURATION = 500 as const;

export function handleUpdateValue(input: InputValue, newValue: any) {
  const inputValue = { ...input, value: newValue };
  updateValue(inputValue);

  // debounce server updates
  if (timeoutId) clearTimeout(timeoutId);
  const tid = setTimeout(() => {
    updateValueOnServer(inputValue);
    timeoutId = null;
  }, DEBOUNCE_TIMEOUT_DURATION);
  timeoutId = tid;
}
