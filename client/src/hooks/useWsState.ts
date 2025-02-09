import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../utils/query-client";
import { WsConnection } from "../types/client/websocket";

const QUERY_KEY = "websocket" as const;

export function useWsState() {
  const { data } = useQuery<WsConnection>({
    queryKey: [QUERY_KEY],
    initialData: {
      state: "CLOSED",
    },
  });
  return data;
}

export function getWsData() {
  return queryClient.getQueryData<WsConnection>([QUERY_KEY])!;
}

export function setWsData(state: WsConnection["state"]) {
  queryClient.setQueryData([QUERY_KEY], { state });
}
