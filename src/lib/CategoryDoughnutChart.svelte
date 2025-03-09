<script lang="ts">
  import { Doughnut } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";
  import type { ChartOptions } from "chart.js";

  ChartJS.register(Title, Tooltip, Legend, ArcElement);

  interface SavingsCategory {
    service: string;
    savings: number;
  }

  export let data: SavingsCategory[] = [];

  $: chartData = {
    labels: data?.map((item) => item.service) || [],
    datasets: [
      {
        label: "Savings by Service",
        data: data?.map((item) => item.savings) || [],
        backgroundColor: [
          "rgba(126, 87, 194, 0.7)", // Aurora
          "rgba(66, 165, 245, 0.7)", // Nebula
          "rgba(38, 50, 56, 0.7)", // Zenix
          "rgba(120, 144, 156, 0.7)", // Light variant
        ],
        borderWidth: 1,
        borderColor: "rgba(38, 50, 56, 0.2)",
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            const total = context.dataset.data.reduce(
              (acc: number, curr: number) => acc + curr,
              0
            );
            const percentage = Math.round((value / total) * 100);
            return `$${value} (${percentage}%)`;
          },
        },
      },
    },
  };
</script>

<div
  class="chart-container flex items-start justify-start"
  style="position: relative; height: 200px;"
>
  <Doughnut data={chartData} options={chartOptions} />
</div>
