<script>
  import { onMount } from "svelte";

  export let data;

  $: ({ apiData, error } = data);
</script>

<main class="bg-black h-dvh overflow-clip max-w-full">
  <nav class="h-16 p-2 max-w-full max-h-16">
    <div
      class="flex justify-between items-center bg-zenix rounded-md h-full px-4"
    >
      <img src="/MainLogo_V2.svg" alt="Logo" class="h-5" />
    </div>
  </nav>

  <div class="flex gap-2 px-2 h-[calc(100dvh-4.5rem)]">
    <aside class="bg-zenix rounded-md p-4 w-16"></aside>
    <div class="rounded-md flex-1 flex gap-2">
      <div id="main-body" class="bg-zenix rounded-md p-4 flex-1 h-full">
        <div class="p-6 bg-zenix text-white h-dvh">
          <h1 class="mb-6">API Data</h1>

          <div class="flex flex-col gap-4 overflow-y-scroll h-96">
            {#if error}
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              >
                <p>Error: {error.message}</p>
              </div>
            {:else if apiData}
              <div class="bg-zenix p-4 rounded shadow-sm">
                <pre class="font-mono text-sm overflow-x-auto">{JSON.stringify(
                    apiData,
                    null,
                    2
                  )}</pre>

                {#if Array.isArray(apiData)}
                  <div class="mt-6">
                    <h2 class="mb-4">Items</h2>
                    <div
                      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {#each apiData as item}
                        <div class="border p-4 rounded bg-zenix text-light">
                          <h3 class="text-aurora">
                            {item.name || "Unnamed Item"}
                          </h3>
                          <p>
                            {item.description || "No description available"}
                          </p>
                        </div>
                      {/each}
                    </div>
                  </div>
                {:else}
                  <div class="mt-6">
                    <h2 class="mb-4">API Response</h2>
                    <div class="border p-4 rounded bg-zenix text-light">
                      {#each Object.entries(apiData) as [key, value]}
                        <div class="mb-2">
                          <span class="text-nebula font-bold">{key}:</span>
                          <span>
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : value}
                          </span>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}
              </div>
            {:else}
              <div class="flex items-center justify-center h-64">
                <div
                  class="animate-spin h-10 w-10 border-4 border-aurora border-t-transparent rounded-full"
                ></div>
              </div>
            {/if}
          </div>
        </div>
      </div>
      <div
        id="side-body"
        class="bg-zenix rounded-md p-4 w-16 h-full md:w-1/4"
      ></div>
    </div>
  </div>
</main>
