<script lang="ts">
  import type { FormInputProps } from "../types/client/form-input";
  import Input from "$lib/components/ui/input/input.svelte";
  import Slider from "$lib/components/ui/slider/slider.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "$lib/components/ui/select";

  const { type, id: _id }: FormInputProps = $props();
  const id = String(_id);
</script>

<div class="input">
  {#if type === "text"}
    <Input {id} />
  {:else if type === "number"}
    <Slider {id} />
  {:else if type === "bool"}
    <Checkbox {id} />
  {:else if type === "select"}
    <Select>
      <SelectTrigger {id} class="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  {/if}
</div>

<style>
  .input {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 100px;
    min-width: 10px;
    max-width: 100px;
    height: 100px;
  }
</style>
