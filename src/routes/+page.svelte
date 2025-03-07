<script>
  import { onMount } from "svelte";
  import SideNav from "$lib/SideNav.svelte";
  import SideBody from "$lib/SideBody.svelte";
  import MainBody from "$lib/MainBody.svelte";
  import TopNav from "$lib/TopNav.svelte";
  export let data;

  $: ({ apiData, error } = data);
</script>

<main class="bg-black h-dvh overflow-clip max-w-full">
  <TopNav />

  <div class="flex gap-2 px-2 h-[calc(100dvh-4.5rem)]">
    <SideNav />
    <div class="rounded-md flex-1 flex gap-2">
      <MainBody />
      <SideBody on:click>
        <div class=" text-white">
          <h1 class="mb-6">API Data</h1>

          <div
            class="flex flex-col gap-4 overflow-y-scroll rounded-xs overflow-x-hidden h-96"
          >
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
      </SideBody>
    </div>
  </div>
</main>
