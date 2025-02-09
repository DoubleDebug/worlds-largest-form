import { useQuery } from "@tanstack/react-query";
import { DataMapper } from "../utils/data-mapper";
import { queryClient } from "../utils/query-client";
import { FormState, InputValue } from "../types/client/form";

const QUERY_KEY = "form-state" as const;

export function setValues(newValues: InputValue[]) {
  queryClient.setQueryData([QUERY_KEY], { values: newValues });
}

export function updateValue(newValue: InputValue) {
  queryClient.setQueryData<FormState>([QUERY_KEY], (prev) => ({
    values: (prev?.values || []).map((item) =>
      item.id === newValue.id ? newValue : item
    ),
  }));
}

export function useFormState() {
  const { data } = useQuery<FormState>({
    queryFn: async () => {
      const url = `${import.meta.env.VITE_HTTP_SERVER_URL}/form-state`;
      const res = await fetch(url);
      const json = await res.json();
      const mappedValues = Array.isArray(json)
        ? json.map(DataMapper.toInputValue)
        : [];

      return { values: mappedValues };
    },
    queryKey: [QUERY_KEY],
    initialData: { values: [] },
  });

  return { ...data, setValues, updateValue };
}
