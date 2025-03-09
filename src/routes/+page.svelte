<script>
  import { onMount } from "svelte";
  import SideNav from "$lib/SideNav.svelte";
  import SideBody from "$lib/SideBody.svelte";
  import MainBody from "$lib/MainBody.svelte";
  import TopNav from "$lib/TopNav.svelte";
  import SavingsChart from "$lib/SavingsChart.svelte";
  import CategoryPieChart from "$lib/CategoryPieChart.svelte";
  import DailySavingsChart from "$lib/DailySavingsChart.svelte";
  export let data;

  $: ({ apiData, error } = data);
</script>

<main class="bg-zenix/20 h-dvh overflow-clip max-w-full">
  <TopNav />

  <div class="flex gap-2 px-2 h-[calc(100dvh-4.5rem)]">
    <SideNav />
    <div class="rounded-md flex-1 flex gap-2">
      <MainBody>
        <div class="flex flex-col relative">
          <div class="flex flex-col mb-12">
            <p class="text-light uppercase text-sm tracking-wide">
              Savings this month
            </p>
            <h1 class="text-light text-4xl mb-0">
              ${apiData?.overview?.currentMonthSavings}
            </h1>
            <p
              class="text-aurora flex items-center gap-2 {apiData?.overview
                ?.percentageChange > 0
                ? 'text-aurora'
                : 'text-nebula'} text-md font-bold"
            >
              <span class="flex items-end justify-end leading-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="w-3 h-3 fill-aurora {apiData?.overview
                    ?.percentageChange > 0
                    ? 'fill-aurora'
                    : 'fill-nebula rotate-180'}"
                  ><path
                    d="M290.5 51.8C283.3 39.5 270.2 32 256 32s-27.3 7.5-34.5 19.8l-216 368c-7.3 12.4-7.3 27.7-.2 40.1S25.7 480 40 480l432 0c14.3 0 27.6-7.7 34.7-20.1s7-27.8-.2-40.1l-216-368z"
                  /></svg
                ></span
              >
              {apiData?.overview?.percentageChange} %
            </p>
          </div>

          <div class="chart-section max-w-full border-b border-white/10 pb-4">
            <SavingsChart data={apiData?.savingsTrends} on:hover />
          </div>

          <div class="flex gap-4 mt-6">
            <div class="flex-1">
              <CategoryPieChart data={apiData?.savingsByCategory} />
            </div>
            <div class="flex-1">
              <DailySavingsChart data={apiData?.detailedSavings} />
            </div>
          </div>
        </div>
      </MainBody>
      <SideBody on:click>
        <div class="text-white">
          <h1 class="mb-6">API Data</h1>
        </div>
      </SideBody>
    </div>
  </div>
</main>
