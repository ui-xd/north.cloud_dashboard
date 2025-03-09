<aside
  class="border border-zenix rounded-md p-4 w-16 hover:bg-zenix/30 transition-all flex space-between items-center flex-col group gap-6 hover:w-32"
>
  <button
    class="rounded-md border-white/10 flex py-4 items-start justify-between"
  >
    <img src="/dashboard.svg" alt="" class="mr-4 w-5 fill-light text-light" />
    <span
      class="text-light/90 hidden transition-all opacity-0 group-hover:opacity-100 group-hover:block hover:block text-sm"
      >Dashboard</span
    >
  </button>
  <button
    class="rounded-md border-white/10 flex items-center justify-center hover:bg-zenix/30 transition-all"
  >
    <img src="/grid2.svg" alt="" class="w-5 fill-light text-light" />
    <span class="text-light/90 hidden group-hover:block hover:block text-sm"
      >Services</span
    >
  </button>
  <button
    class="rounded-md border-white/10 flex items-center justify-center hover:bg-zenix/30 transition-all"
  >
    <img src="/connect.svg" alt="" class="w-5 fill-light" />
    <span class="text-light/90 hidden group-hover:block text-sm">Connect</span>
  </button>

  <slot name="content"></slot>
</aside>
