export type ServerInputValue = {
  id: number;
  text_value: string | null;
  number_value: number | null;
  bool_value: boolean | null;
  select_value: number | null;
};

export type ServerSelectOption = {
  id: number;
  input_id: number;
  option_index: number;
  option_name: string;
};
