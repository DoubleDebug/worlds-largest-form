import { DataMapper } from "./data-mapper";
import { setWsData } from "../hooks/useWsState";
import { InputValue } from "../types/client/form";
import { updateValue } from "../hooks/useFormState";

let socket: WebSocket | null = null;

export function handleConnect() {
  // initialize websocket connection
  const url = `${import.meta.env.VITE_WS_SERVER_URL}/form-updates`;
  socket = new WebSocket(url);
  setWsData("CONNECTING");

  // add event listeners
  socket.addEventListener("open", () => {
    console.log("Connected to server");
    setWsData(DataMapper.toWsState(socket!.readyState));
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
      updateValue(parsedData);
    }
  });
  socket.addEventListener("close", () => {
    console.log("Disconnected from server");
    setWsData(DataMapper.toWsState(socket!.readyState));
  });
}

export function handleDisconnect() {
  if (!socket) return;
  socket.close();
  setWsData(DataMapper.toWsState(socket!.readyState));
}

export function updateValueOnServer(value: InputValue) {
  if (!socket) return;
  const mappedValue = DataMapper.toServerInputValue(value);
  socket.send(JSON.stringify(mappedValue));
}
