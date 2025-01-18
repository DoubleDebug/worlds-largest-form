<script lang="ts">
  import { onMount } from "svelte";
  import FormInput from "./FormInput.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { DataMapper } from "../utils/data-mapper";
  import type { WsState } from "../types/client/ws";
  import { formState, test } from "../store/form-state.svelte";

  let socket: WebSocket | null = null;
  let socketState = $state<WsState>("CLOSED");
  let connected = $state(true);

  const handleConnect = () => {
    // initialize websocket connection
    socket = new WebSocket("ws://localhost:8080/echo");
    socketState = "CONNECTING";

    // add event listeners
    socket.addEventListener("open", () => {
      console.log("Connected to server");
      connected = true;
      socketState = DataMapper.toWsState(socket!.readyState);
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
        if (Object.keys(formState).includes(String(parsedData.id))) {
          formState[parsedData.id] = parsedData;
          test.test = String(Math.random());
        }
      }
    });
    socket.addEventListener("close", () => {
      console.log("Disconnected from server");
      connected = false;
      socketState = DataMapper.toWsState(socket!.readyState);
    });
  };

  const handleDisconnect = () => {
    if (socket) {
      socketState = "CLOSING";
      socket.close();
      socketState = DataMapper.toWsState(socket!.readyState);
    }
  };

  $effect(() => {
    console.log("dule1", test);
  });

  onMount(() => {
    handleConnect();
    () => handleDisconnect();
  });
</script>

<div class="grid">
  <div class="controls">
    <p>{socketState}</p>
    <Button
      disabled={socketState === "OPEN"}
      onclick={handleConnect}
      class="w-[100px]"
    >
      {socketState === "CONNECTING" ? "..." : "connect"}
    </Button>
    <Button
      disabled={socketState === "CLOSED"}
      onclick={handleDisconnect}
      class="w-[100px]"
    >
      {socketState === "CLOSING" ? "..." : "disconnect"}
    </Button>
  </div>
  <div class="form">
    <FormInput id={1} type="number" />
    {#each Object.values(formState) as input}
      <FormInput id={input.id + 1} type={input.type} />
    {/each}
  </div>
</div>

<style>
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
</style>
