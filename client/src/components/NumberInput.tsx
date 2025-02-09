import { FC } from "react";
import { Slider } from "@mui/joy";
import { handleUpdateValue } from "../utils/form";
import { NumberInputValue } from "../types/client/form";

export const NumberInput: FC<NumberInputValue> = (props) => {
  return (
    <Slider
      value={props.value ?? 0}
      onChange={(_, newVal) => handleUpdateValue(props, newVal)}
    />
  );
};
