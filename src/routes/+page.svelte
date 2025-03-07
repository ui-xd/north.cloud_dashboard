<script>
  import { onMount } from "svelte";

  export let data;

  $: ({ apiData, error } = data);

  let pageLoaded = false;

  onMount(() => {
    pageLoaded = true;
  });
</script>

<div class="p-6 bg-zenix text-white">
  <h1 class="mb-6">API Data</h1>

  {#if error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
    >
      <p>Error: {error.message}</p>
    </div>
  {:else if apiData || pageLoaded}
    {#if apiData}
      <div class="bg-bruma-800 p-4 rounded shadow-sm">
        <pre class="font-mono text-sm overflow-x-auto">{JSON.stringify(
            apiData,
            null,
            2
          )}</pre>

        {#if Array.isArray(apiData)}
          <div class="mt-6">
            <h2 class="mb-4">Items</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {#each apiData as item}
                <div class="border p-4 rounded bg-bruma-800 text-light">
                  <h3 class="text-aurora">{item.name || "Unnamed Item"}</h3>
                  <p>{item.description || "No description available"}</p>
                </div>
              {/each}
            </div>
          </div>
        {:else}
          <div class="mt-6">
            <h2 class="mb-4">API Response</h2>
            <div class="border p-4 rounded bg-bruma-800 text-light">
              {#each Object.entries(apiData) as [key, value]}
                <div class="mb-2">
                  <span class="text-nebula font-bold">{key}:</span>
                  <span
                    >{typeof value === "object"
                      ? JSON.stringify(value)
                      : value}</span
                  >
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <div class="flex items-center justify-center h-64">
        <div class="flex flex-col items-center">
          <div
            class="animate-spin h-12 w-12 border-4 border-aurora border-t-transparent rounded-full mb-4"
          ></div>
          <p class="text-nebula">Loading data from API...</p>
        </div>
      </div>
    {/if}
  {:else}
    <div
      class="animate-pulse bg-bruma-800 h-64 rounded flex items-center justify-center"
    >
      <div class="flex flex-col items-center">
        <div
          class="animate-spin h-12 w-12 border-4 border-aurora border-t-transparent rounded-full mb-4"
        ></div>
        <p class="text-light">Loading...</p>
      </div>
    </div>
  {/if}
</div>
