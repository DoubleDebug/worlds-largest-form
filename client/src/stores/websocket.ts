import { create } from "zustand";
import { useFormState } from "./form";
import { DataMapper } from "../utils/data-mapper";
import { InputValue } from "../types/client/form";
import { WsConnection, WsState } from "../types/client/websocket";

let socket: WebSocket | null = null;

export const useWsConnection = create<WsConnection>()((set) => ({
  state: "CLOSED",
  setState: (wsState: WsState) => set({ state: wsState }),
}));

export function handleConnect() {
  // initialize websocket connection
  socket = new WebSocket("ws://localhost:8080/echo");
  useWsConnection.setState({ state: "CONNECTING" });
  // add event listeners
  socket.addEventListener("open", () => {
    console.log("Connected to server");
    useWsConnection.setState({
      state: DataMapper.toWsState(socket!.readyState),
    });
  });
  socket.addEventListener("message", (event) => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      console.warn("Non JSON message received from server", error);
    }
    if (data) {
      const parsedData = DataMapper.toInputValue(data);
      console.log("Parsed message from server", parsedData);
      // handle message from server
      useFormState.setState((state) => ({
        values: state.values.map((val) => {
          if (val.id === parsedData.id)
            return { ...val, value: parsedData.value } as InputValue;
          return val;
        }),
      }));
    }
  });
  socket.addEventListener("close", () => {
    console.log("Disconnected from server");
    useWsConnection.setState({
      state: DataMapper.toWsState(socket!.readyState),
    });
  });
}

export function handleDisconnect() {
  if (socket) {
    socket.close();
    useWsConnection.setState({
      state: DataMapper.toWsState(socket!.readyState),
    });
  }
}
