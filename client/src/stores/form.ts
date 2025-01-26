import { create } from "zustand";
import { randomValues } from "../utils/random";
import { FormState, InputValue } from "../types/client/form";

export const useFormState = create<FormState>((set) => ({
  values: randomValues,
  updateValue: (value: InputValue) => {
    set((state) => ({
      values: state.values.map((val) => {
        if (val.id === value.id)
          return { ...val, value: value.value } as InputValue;
        return val;
      }),
    }));
  },
}));
