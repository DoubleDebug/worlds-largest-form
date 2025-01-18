<script lang="ts">
  import Form from "../components/Form.svelte";
</script>

<main>
  <h1>World's largest form</h1>
  <div class="form-container">
    <Form />
  </div>
</main>

<style>
  main {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 40px;
  }

  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
  }
</style>
