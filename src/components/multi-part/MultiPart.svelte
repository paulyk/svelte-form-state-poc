<script lang="ts">
  import {
    loadPart_1,
    loadPart_2,
    loadPart_3,
    reset_part_1,
    reset_part_2,
    reset_part_3,
    store,
  } from "./stateMachine";
</script>

<h1>Test: {$store.title}</h1>
<div class="box">
  <button on:click={loadPart_1}>Load part 1</button>
  {#if $store.part_1.completed}
    <button on:click={reset_part_1}>Reset</button>
  {/if}
</div>
{#if $store.part_1.completed}
  <div class="box">
    <button on:click={loadPart_2}>Load part 2</button>
    {#if $store.part_2.completed}
      <button on:click={reset_part_2}>Reset</button>
    {/if}
  </div>
{/if}
{#if $store.part_2.completed}
  <div class="box">
    <button on:click={loadPart_3}>Load part 3</button>
    {#if $store.part_3.completed}
      <button on:click={reset_part_3}>Reset</button>
    {/if}
  </div>
{/if}

<pre>
    {JSON.stringify($store, null, 2)}
</pre>
