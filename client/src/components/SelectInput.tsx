import { FC } from "react";
import { Select, Option } from "@mui/joy";
import { handleUpdateValue } from "../utils/form";
import { SelectInputValue } from "../types/client/form";
import { useSelectOptions } from "../hooks/useSelectOptions";

export const SelectInput: FC<SelectInputValue> = (props) => {
  const { options } = useSelectOptions();
  const myOptions = options.filter((o) => o.inputId === props.id);

  return (
    <Select
      placeholder="Select an option"
      value={props.value}
      onChange={(_, newVal) => handleUpdateValue(props, newVal)}
    >
      {myOptions.map((option) => (
        <Option key={`option-${option.id}-${option.name}`} value={option.id}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};
