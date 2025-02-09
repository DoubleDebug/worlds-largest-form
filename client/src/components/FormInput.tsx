import { FC } from "react";
import { TextInput } from "./TextInput";
import { BoolInput } from "./BoolInput";
import { SelectInput } from "./SelectInput";
import { NumberInput } from "./NumberInput";
import { InputValue } from "../types/client/form";

export const FormInput: FC<InputValue> = (props) => {
  switch (props.type) {
    case "bool":
      return <BoolInput {...props} />;
    case "number":
      return <NumberInput {...props} />;
    case "select":
      return <SelectInput {...props} />;
    case "text":
      return <TextInput {...props} />;
    default:
      return null;
  }
};
