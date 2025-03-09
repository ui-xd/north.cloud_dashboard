<script lang="ts">
  import { onMount } from "svelte";
  import SideNav from "$lib/SideNav.svelte";
  import SideBody from "$lib/SideBody.svelte";
  import MainBody from "$lib/MainBody.svelte";
  import TopNav from "$lib/TopNav.svelte";
  import SavingsChart from "$lib/SavingsChart.svelte";
  import CategoryPieChart from "$lib/CategoryPieChart.svelte";
  import CategoryDoughnutChart from "$lib/CategoryDoughnutChart.svelte";
  import DailySavingsChart from "$lib/DailySavingsChart.svelte";
  import CategorySavingsSection from "$lib/CategorySavingsSection.svelte";
  export let data;

  $: ({ apiData, error } = data);

  let showTotal = false;
  let displayValue = 0;
  let browser = false;

  $: currentValue = showTotal
    ? apiData?.overview?.totalSavings || 0
    : apiData?.overview?.currentMonthSavings || 0;

  $: savingsLabel = showTotal ? "Total Savings" : "Savings this month";

  $: console.log(apiData);

  onMount(() => {
    browser = true;

    import("gsap").then((module) => {
      const gsap = module.default;

      animateNumber(0, currentValue);

      function animateNumber(from, to) {
        const obj = { value: from };

        gsap.to(obj, {
          value: to,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            displayValue = Math.round(obj.value * 100) / 100;
          },
        });
      }

      let lastValue = currentValue;
      const interval = setInterval(() => {
        if (currentValue !== lastValue) {
          animateNumber(displayValue, currentValue);
          lastValue = currentValue;
        }
      }, 100);

      return () => clearInterval(interval);
    });
  });
</script>

<main class="bg-zenix/20 h-dvh overflow-clip max-w-full">
  <TopNav />

  <div class="flex gap-2 px-2 h-[calc(100dvh-4.5rem)]">
    <SideNav />
    <div class="rounded-md flex-1 flex gap-2">
      <MainBody>
        <div class="flex flex-col relative">
          <div class="flex flex-col mb-4">
            <div class="flex justify-between items-end">
              <p
                class="text-light uppercase font-regular text-sm tracking-wider text-overline"
              >
                {savingsLabel}
              </p>

              <button
                class="flex items-center bg-zenix/30 border border-white/10 rounded-md px-3 py-2 transition-colors hover:bg-zenix/50"
                on:click={() => (showTotal = !showTotal)}
              >
                <span class="text-xs text-light/70 mr-2">Month</span>
                <div class="relative w-10 h-5 bg-zenix rounded-full">
                  <div
                    class="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all duration-300 ease-in-out"
                    class:translate-x-5={showTotal}
                    class:bg-aurora={showTotal}
                    class:bg-light={!showTotal}
                  ></div>
                </div>
                <span class="text-xs text-light/70 ml-2">Total</span>
              </button>
            </div>

            <h1 class="text-light text-4xl mb-0 mt-0">
              ${browser ? displayValue.toFixed(2) : currentValue.toFixed(2)}
            </h1>

            <p
              class="text-aurora text-overline flex items-center transition-all duration-300 ease-in-out gap-2 {showTotal
                ? 'filter-blur-md blur-sm'
                : ''}  {apiData?.overview?.percentageChange > 0
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

          <div class="chart-section max-w-full border-b border-zenix pb-4">
            <SavingsChart data={apiData?.savingsTrends} on:hover />
          </div>

          <div class="grid grid-cols-6 gap-4">
            <CategorySavingsSection {apiData} />
            <div class="border mt-6 col-span-2 border-zenix rounded-md p-4">
              <h2
                class="text-light text-sm uppercase tracking-wider text-overline"
              >
                Daily Savings
              </h2>
              <DailySavingsChart data={apiData?.detailedSavings} />
            </div>
          </div>
        </div></MainBody
      >
      <SideBody on:click>
        <div class="text-white">
          <h1 class="mb-6 text-lg">Detailed View</h1>
        </div>
      </SideBody>
    </div>
  </div>
</main>
