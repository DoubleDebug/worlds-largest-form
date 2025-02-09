import type {
  ServerInputValue,
  ServerSelectOption,
} from "../types/server/form";
import type { InputType, InputValue, SelectOption } from "../types/client/form";

export const DataMapper = {
  toInputType(value: ServerInputValue): InputType {
    if (value.text_value !== null) return "text";
    if (value.number_value !== null) return "number";
    if (value.bool_value !== null) return "bool";
    if (value.select_value !== null) return "select";

    return null as never;
  },

  toServerColumnName(inputType: InputType): keyof ServerInputValue {
    switch (inputType) {
      case "text":
        return "text_value";
      case "number":
        return "number_value";
      case "bool":
        return "bool_value";
      case "select":
        return "select_value";
      default:
        return null as never;
    }
  },

  toInputValue(value: ServerInputValue): InputValue {
    const type = DataMapper.toInputType(value);
    const columnName = DataMapper.toServerColumnName(type);

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
      select_value: value.type === "select" ? value.value : null,
    };
  },

  toWsState(readyState: number) {
    switch (readyState) {
      case WebSocket.CLOSED:
        return "CLOSED";
      case WebSocket.CONNECTING:
        return "CONNECTING";
      case WebSocket.OPEN:
        return "OPEN";
      case WebSocket.CLOSING:
        return "CLOSING";
      default:
        return null as never;
    }
  },

  toSelectOption(option: ServerSelectOption): SelectOption {
    return {
      id: option.option_index,
      inputId: option.input_id,
      name: option.option_name,
    };
  },
};
