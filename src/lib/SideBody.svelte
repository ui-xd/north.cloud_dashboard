<script lang="ts">
  const placeholderArray = Array(5).fill(0);
</script>

<div
  id="side-body"
  class="p-4 w-16 h-full md:w-1/3 border border-zenix rounded-md
  bg-[image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_0)]
  bg-[size:10px_10px] overflow-auto"
>
  <slot />
  <div class="flex flex-col gap-4">
    <div
      class="aspect-square w-full bg-zenix/20 rounded-md animate-pulse transition-all"
    ></div>

    {#each placeholderArray as _}
      <div
        class="h-12 w-full bg-zenix/20 rounded-md animate-pulse transition-all"
      ></div>
    {/each}
  </div>
</div>
