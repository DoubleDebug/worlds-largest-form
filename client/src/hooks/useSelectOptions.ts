import { useQuery } from "@tanstack/react-query";
import { DataMapper } from "../utils/data-mapper";
import { SelectOption } from "../types/client/form";

const QUERY_KEY = "select-options" as const;

export function useSelectOptions() {
  const { data } = useQuery<SelectOption[]>({
    queryFn: async () => {
      const url = `${import.meta.env.VITE_HTTP_SERVER_URL}/select-options`;
      const response = await fetch(url);
      const json = await response.json();

      return Array.isArray(json) ? json.map(DataMapper.toSelectOption) : [];
    },
    queryKey: [QUERY_KEY],
  });

  return { options: data || [] };
}
