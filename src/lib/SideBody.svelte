<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  let visibleItems: number[] = [];
  const totalItems = 5;

  onMount(() => {
    // just doing some stuff on mount to trigger transition animations
    visibleItems = [];

    setTimeout(() => {
      visibleItems = Array.from({ length: totalItems }, (_, i) => i);
    }, 10);
  });
</script>

<div
  id="side-body"
  class="p-4 w-16 h-full md:w-1/3 border border-zenix rounded-md
  bg-[image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_0)]
  bg-[size:10px_10px] overflow-auto"
>
  <slot />
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 w-full h-24">
      <div
        class="aspect-square max-w-32 bg-zenix/20 rounded-md animate-pulse transition-all"
      ></div>
      <div
        class="aspect-square max-w-32 bg-zenix/20 rounded-md animate-pulse transition-all"
      ></div>
    </div>

    {#each visibleItems as i (i)}
      <div
        in:fly={{
          y: 50,
          duration: 300,
          delay: i * 120,
        }}
        class="h-12 w-full bg-zenix/20 rounded-md animate-pulse transition-all"
      ></div>
    {/each}
  </div>
</div>

<style>
  #side-body {
    position: relative;
  }
</style>
