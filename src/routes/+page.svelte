<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
  });
</script>

<div class="min-h-dvh bg-black text-7xl text-white">test</div>
