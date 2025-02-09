import { FC } from "react";
import { Checkbox } from "@mui/joy";
import { handleUpdateValue } from "../utils/form";
import { BoolInputValue } from "../types/client/form";

export const BoolInput: FC<BoolInputValue> = (props) => {
  return (
    <Checkbox
      checked={props.value ?? false}
      onChange={(e) => handleUpdateValue(props, e.target.checked)}
    />
  );
};
