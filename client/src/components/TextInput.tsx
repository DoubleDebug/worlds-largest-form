import { FC } from "react";
import { Input } from "@mui/joy";
import { handleUpdateValue } from "../utils/form";
import { TextInputValue } from "../types/client/form";

export const TextInput: FC<TextInputValue> = (props) => {
  return (
    <Input
      value={props.value ?? ""}
      onChange={(e) => handleUpdateValue(props, e.target.value)}
    />
  );
};
