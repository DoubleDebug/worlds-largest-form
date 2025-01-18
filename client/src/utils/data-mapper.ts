import { InputType, InputValue, ServerInputValue } from "../types/form";

export const DataMapper = {
  toInputType(value: ServerInputValue): InputType {
    if (value.text_value !== null) return "text";
    if (value.number_value !== null) return "number";
    if (value.bool_value !== null) return "bool";
    if (value.select_option !== null) return "select";

    return null as never;
  },

  toServerColumnName(inputType: InputType) {
    switch (inputType) {
      case "text":
        return "text_value";
      case "number":
        return "number_value";
      case "bool":
        return "bool_value";
      case "select":
        return "select_option";
      default:
        return null as never;
    }
  },

  toInputValue(value: ServerInputValue): InputValue {
    const type = this.toInputType(value);
    const columnName = this.toServerColumnName(type);

    return {
      id: value.id,
      value: value[columnName],
      type: type as unknown as any, // why do I get a typescript error here?
    };
  },

  toServerInputValue(value: InputValue): ServerInputValue {
    return {
      id: value.id,
      text_value: value.type === "text" ? value.value : null,
      number_value: value.type === "number" ? value.value : null,
      bool_value: value.type === "bool" ? value.value : null,
      select_option: value.type === "select" ? value.value : null,
    };
  },
};
