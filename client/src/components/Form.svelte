<script lang="ts">
  import { INPUT_TYPES } from "../types/client/form";
  import FormInput from "./FormInput.svelte";

  const NUM_OF_INPUTS = 10;
  const inputIndices = Array.from({ length: NUM_OF_INPUTS }, (_, i) => i);
</script>

<div class="form">
  <FormInput id={1} type="number" />
  {#each inputIndices as input}
    {@const randomIndex = Math.floor(Math.random() * INPUT_TYPES.length)}
    {@const inputType = INPUT_TYPES[randomIndex]}
    <FormInput id={input + 1} type={inputType} />
  {/each}
</div>

<style>
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
</style>
