<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import gsap from "gsap";

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  $: {
    console.log("layout");
  }
</script>

<slot />
