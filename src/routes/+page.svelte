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

  function checkService(service: string) {
    switch (true) {
      case service.includes("EC2"):
        return "ec2";
      case service.includes("Lambda"):
        return "lambda";
      case service.includes("S3"):
        return "s3";
      case service.includes("RDS"):
        return "rds";
      default:
        return "aws";
    }
  }
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
            <div class="border mt-6 col-span-4 border-zenix rounded-md p-4">
              <h2
                class="text-light text-sm uppercase tracking-wider text-overline"
              >
                Savings by Category
              </h2>

              <div class="flex flex-col gap-4">
                <table class="w-full text-left whitespace-nowrap">
                  <colgroup>
                    <col class="w-full sm:w-4/12" />
                    <col class="lg:w-4/12" />
                    <col class="lg:w-2/12" />
                  </colgroup>
                  <thead class="border-b border-white/10 text-sm/6 text-white">
                    <tr>
                      <th
                        scope="col"
                        class="py-2 pr-8 pl-4 font-semibold sm:pl-6 lg:pl-8"
                        >Service</th
                      >
                      <th
                        scope="col"
                        class="hidden py-2 pr-8 pl-0 font-semibold sm:table-cell"
                        >Details</th
                      >

                      <th
                        scope="col"
                        class="hidden py-2 pr-4 pl-0 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                        >Savings</th
                      >
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/5">
                    {#each apiData?.savingsByCategory as category}
                      <tr
                        class="hover:bg-zenix/30 transition-all duration-300 ease-in-out"
                      >
                        <td class="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
                          <div class="flex items-center gap-x-4">
                            <img
                              src={`/${checkService(category?.service)}.svg`}
                              alt=""
                              class="size-8 fill-zenix"
                            />
                            <div
                              class="truncate text-sm/6 font-medium text-white"
                            >
                              {category?.service}
                            </div>
                          </div>
                        </td>
                        <td class="hidden py-4 pr-4 pl-0 sm:table-cell sm:pr-8">
                          <div class="flex gap-x-3">
                            <div class="font-mono text-sm/6 text-gray-400">
                              Amazon {category?.service}
                            </div>
                            <div
                              class="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-white/10 ring-inset"
                            >
                              <img
                                src="/aws.svg"
                                alt=""
                                class="size-4 fill-light"
                              />
                            </div>
                          </div>
                        </td>

                        <td
                          class="hidden text-aurora/90 py-4 pr-4 pl-0 text-right text-sm/6 sm:table-cell sm:pr-6 lg:pr-8"
                        >
                          <sup class="text-xs">$</sup>{category?.savings}
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>

              <!-- <CategoryDoughnutChart data={apiData?.savingsByCategory} /> -->
            </div>

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
          <h1 class="mb-6">API Data</h1>
        </div>
      </SideBody>
    </div>
  </div>
</main>
