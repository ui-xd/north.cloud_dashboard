<aside
  class="border border-zenix rounded-md p-4 w-16 hover:w-[180px] hover:bg-zenix/30
  transition-[width,background-color] duration-300 ease-in-out
  flex space-between items-center flex-col group gap-6 relative overflow-hidden"
>
  <div
    class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
    bg-[image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_0)]
    bg-[size:10px_10px]"
  ></div>

  <div class="flex flex-col gap-6 w-full relative z-10">
    <button
      class="rounded-md border-white/10 flex py-4 items-start justify-between hover:bg-zenix/40 transition-colors duration-200 px-2 w-full"
    >
      <img src="/dashboard.svg" alt="" class="mr-4 w-5 nav-icon" />
      <span
        class="text-light/90 hidden transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:block text-sm whitespace-nowrap"
        >Dashboard</span
      >
    </button>

    <button
      class="rounded-md border-white/10 flex items-center justify-between hover:bg-zenix/40 transition-colors duration-200 p-2 w-full"
    >
      <img src="/grid2.svg" alt="" class="w-5 nav-icon" />
      <span
        class="text-light/90 hidden group-hover:block text-sm whitespace-nowrap"
        >Services</span
      >
    </button>

    <button
      class="rounded-md border-white/10 flex items-center justify-between hover:bg-zenix/40 transition-colors duration-200 p-2 w-full"
    >
      <img src="/connect.svg" alt="" class="w-5 nav-icon" />
      <span
        class="text-light/90 hidden group-hover:block text-sm whitespace-nowrap"
        >Connect</span
      >
    </button>

    <button
      class="rounded-md border-white/10 flex items-center justify-between hover:bg-zenix/40 transition-colors duration-200 p-2 w-full"
    >
      <img src="/chart.svg" alt="" class="w-5 nav-icon" />
      <span
        class="text-light/90 hidden group-hover:block text-sm whitespace-nowrap"
        >Analytics</span
      >
    </button>

    <button
      class="rounded-md border-white/10 flex items-center justify-between hover:bg-zenix/40 transition-colors duration-200 p-2 w-full"
    >
      <img src="/settings.svg" alt="" class="w-5 nav-icon" />
      <span
        class="text-light/90 hidden group-hover:block text-sm whitespace-nowrap"
        >Settings</span
      >
    </button>
  </div>

  <div class="mt-auto pt-4 w-full relative z-10">
    <button
      class="rounded-md border-white/10 flex items-center justify-between hover:bg-zenix/40 transition-colors duration-200 p-2 w-full"
    >
      <img src="/help.svg" alt="" class="w-5 nav-icon" />
      <span
        class="text-light/90 hidden group-hover:block text-sm whitespace-nowrap"
        >Help</span
      >
    </button>
  </div>

  <slot name="content"></slot>
</aside>

<style>
  /* Filter to make any SVG icon white */
  .nav-icon {
    filter: brightness(0) invert(1); /* This makes any color white */
    opacity: 0.9; /* Slight transparency for design */
  }
</style>
