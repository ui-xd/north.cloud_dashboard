<script lang="ts">
  import CategoryDoughnutChart from "$lib/CategoryDoughnutChart.svelte";
  export let apiData: any;

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

<div class="border mt-6 col-span-4 border-zenix rounded-md p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-light text-sm uppercase tracking-wider text-overline">
      Savings by Category
    </h2>
    <button class="aspect-square h-9 rounded-md border-white/10">
      <img src="/pie.svg" alt="" class="w-7 fill-light/50 text-white" />
    </button>
  </div>

  <div class="flex flex-col gap-4">
    <table class="w-full text-left whitespace-nowrap">
      <colgroup>
        <col class="w-full sm:w-4/12" />
        <col class="lg:w-4/12" />
        <col class="lg:w-2/12" />
      </colgroup>
      <thead class="border-b border-white/10 text-sm/6 text-white">
        <tr>
          <th scope="col" class="py-2 pr-8 pl-4 font-semibold sm:pl-6 lg:pl-8"
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
          <tr class="hover:bg-zenix/30 transition-all duration-300 ease-in-out">
            <td class="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
              <div class="flex items-center gap-x-4">
                <img
                  src={`/${checkService(category?.service)}.svg`}
                  alt=""
                  class="size-8 fill-zenix"
                />
                <div class="truncate text-sm/6 font-medium text-white">
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
                  <img src="/aws.svg" alt="" class="size-4 fill-light" />
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

  <CategoryDoughnutChart data={apiData?.savingsByCategory} />
</div>
