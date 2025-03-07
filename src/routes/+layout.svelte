<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { navigating } from "$app/stores";
  export let data;
</script>

{#if $navigating}
  <div class="fixed inset-0 flex items-center justify-center bg-zenix z-50">
    <div class="p-6 rounded-lg bg-bruma-800 shadow-lg">
      <div class="flex items-center space-x-4">
        <div
          class="animate-spin h-8 w-8 border-4 border-aurora border-t-transparent rounded-full"
        ></div>
        <p class="text-light">Loading...</p>
      </div>
    </div>
  </div>
{/if}

<slot />
