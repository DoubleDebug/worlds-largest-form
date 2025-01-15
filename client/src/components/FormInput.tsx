import { FC } from "react";
import { FormType } from "../types/form";
import { Checkbox, Input, Select, Slider } from "@mui/joy";

type Props = {
  type: FormType;
};

export const FormInput: FC<Props> = (props) => {
  switch (props.type) {
    case "checkbox":
      return <Checkbox />;
    case "slider":
      return <Slider />;
    case "select":
      return <Select />;
    case "textbox":
      return <Input />;
    default:
      return null;
  }
};
