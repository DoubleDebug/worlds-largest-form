import { FC } from "react";
import { InputValue } from "../types/client/form";
import { Checkbox, Input, Option, Select, Slider } from "@mui/joy";

export const FormInput: FC<InputValue> = (props) => {
  switch (props.type) {
    case "bool":
      return <Checkbox checked={props.value ?? false} />;
    case "number":
      return <Slider value={props.value ?? 0} />;
    case "select":
      return (
        <Select value={props.value}>
          <Option value={1}>System</Option>
          <Option value={2}>Light</Option>
          <Option value={3}>Dark</Option>
        </Select>
      );
    case "text":
      return <Input value={props.value ?? ""} />;
    default:
      return null;
  }
};
