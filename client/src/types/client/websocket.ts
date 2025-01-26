export type WsState = "CLOSED" | "CONNECTING" | "OPEN" | "CLOSING";

export type WsConnection = {
  state: WsState;
};
